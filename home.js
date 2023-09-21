

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
