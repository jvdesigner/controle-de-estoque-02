

// ---------------------------------------------------------------------------------------------
// IMPORT FIREBASE
// ---------------------------------------------------------------------------------------------

import { initializeApp } 
from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";                   // importar o app

import { collection, query, where, getDocs,getDoc,getFirestore,orderBy,limit,deleteDoc ,doc,updateDoc   } 
from "https://www.gstatic.com/firebasejs/10.3.1/firebase-firestore.js";             // importar firestore

import { getAuth , onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-auth.js";


const firebaseConfig = {                                                            // Dados do app
    apiKey: "AIzaSyDBDHzIkLUVHJ3zvWyfEvEVXxXt3lUBSCI",
    authDomain: "controleestoque-480d1.firebaseapp.com",
    projectId: "controleestoque-480d1",
    storageBucket: "controleestoque-480d1.appspot.com",
    messagingSenderId: "1051780975078",
    appId: "1:1051780975078:web:89fc4a2a3404a50b996e27"
  };
  
  
  
const app = initializeApp(firebaseConfig);                                      // conectar com o app

const db = getFirestore(app);                                                   // conectar com o banco

const docRefTran = collection(db, "Transacoes");
const docRefProd = collection(db, "Produtos"); 

const auth = getAuth(app);

let vidUsuario;

const modalProdutos = document.getElementById('modalProdutos');
const iconcloseModal = document.getElementById('iconcloseModal');




// ---------------------------------------------------------------------------------------------
// USUARIO
// ---------------------------------------------------------------------------------------------

// Retornar id do usuario

function retornarIDUsuario() {
    return new Promise((resolve) => {
        onAuthStateChanged(auth, (user) => {
        if (user) {
            resolve(user.uid);
        }
        });
    });
    }
  
  await retornarIDUsuario()
  .then((result) => {
      vidUsuario = result;
  });
  


// ---------------------------------------------------------------------------------------------
// RETORNAR DADOS
// ---------------------------------------------------------------------------------------------

// -- 10 Produtos com o estoque zerado


async function produtosEstoqueZerado() {

    const galeriaProdutosZerados = document.getElementById('galeriaProdutosZerados');

    const q = query(
        docRefProd, 
        where("idUsuario", "==", vidUsuario) ,
        where("estoque","==",0)
        );


      try {

        const querySnapshot = await getDocs(q);

        galeriaProdutosZerados.innerHTML = "";

        querySnapshot.forEach((doc) => {

          const data = doc.data();

          let uid = doc.id;
          let nome = data.nome;
          let categoria = data.categoria;
          let preco = data.preco;
          let custo = data.custo;
          let descricao = data.descricao;
          let estoque = data.estoque;
          let foto = data.foto;
    
          const listItem = document.createElement("li");

          let listainfo = [uid,nome,categoria,preco,custo,descricao,estoque,foto];

          listItem.addEventListener('click',()=>{modalProdutos.style.display="flex"})
          
          listItem.addEventListener('click',()=>{ passarInfoModal(listainfo) })
        
          
          listItem.innerHTML = `

          <!-- card -->
          <li class="block">
            
            <img
              alt="Signage"
              src="${foto}"
              class="h-56 w-full rounded-bl-3xl rounded-tr-3xl object-cover sm:h-64 lg:h-72"
            />
          
            <div class="text-lg mt-4 sm:flex sm:items-center sm:justify-center sm:gap-4">
  
              
                <strong class="font-medium">${nome}</strong>
            
             
            </div>
  
          </li>


          `;

          
          galeriaProdutosZerados.appendChild(listItem);

          
        
      });
      
  } catch (error) {
        console.error("Erro ao preencher a galeria com dados:", error);
      }

    
};

produtosEstoqueZerado();




// ---------------------------------------------------------------------------------------------
// EVENTOS
// ---------------------------------------------------------------------------------------------

iconcloseModal.addEventListener('click',()=>{modalProdutos.style.display="none"})


// ---------------------------------------------------------------------------------------------
// FUNCOES
// ---------------------------------------------------------------------------------------------

let listaProdutos;

function passarInfoModal(lista){

    listaProdutos = lista;

    const modalProdutosFoto = document.getElementById('modalProdutosFoto')
    const modalProdutosNome = document.getElementById('modalProdutosNome')
    const modalProdutosCategoria = document.getElementById('modalProdutosCategoria')
    const modalProdutosEstoque = document.getElementById('modalProdutosEstoque')
    const modalProdutosPreço = document.getElementById('modalProdutosPreço')
    const modalProdutosCusto = document.getElementById('modalProdutosCusto')
    const modalProdutosID = document.getElementById('modalProdutosID')
    const modalProdutosDescricao = document.getElementById('modalProdutosDescricao')
    
    //const modalProdutosID = document.getElementById('modalProdutosID')

    //let lista = [uid,nome,categoria,preco,custo,descricao,estoque,foto];

    modalProdutosFoto.src = lista[7]

    modalProdutosNome.textContent = lista[1]
    modalProdutosCategoria.textContent = lista[2]
    modalProdutosEstoque.textContent = lista[6] + " unid"
    modalProdutosPreço.textContent = "R$ " + lista[3]
    modalProdutosCusto.textContent = "R$ " + lista[4]
    modalProdutosID.textContent = lista[0]
    modalProdutosDescricao.textContent = lista[5]


}



 // Passar informacoes do modal

const btnModalEditar = document.getElementById('btnModalEditar');

 btnModalEditar.addEventListener('click',()=>{

    // lista = [uid,nome,categoria,preco,custo,descricao,estoque,foto];
      

    const urlDestino = `produtos/editarProduto.html?vIdProduto=${encodeURIComponent(listaProdutos[0])}&vNomeProduto=${encodeURIComponent(listaProdutos[1])}&vFotoProduto=${encodeURIComponent(listaProdutos[7])}&vPrecoProduto=${encodeURIComponent(listaProdutos[3])}&vCategoriaProduto=${encodeURIComponent(listaProdutos[2])}&vCustoProduto=${encodeURIComponent(listaProdutos[4])}&vDescricaoProduto=${encodeURIComponent(listaProdutos[5])}`;

    window.location.href = urlDestino;


  })