

// ---------------------------------------------------------------------------------------------
// IMPORT FIREBASE
// ---------------------------------------------------------------------------------------------

import { initializeApp } 
from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";                   // importar o app

import { collection, query, where, getDocs,getFirestore,orderBy,limit   } 
from "https://www.gstatic.com/firebasejs/10.3.1/firebase-firestore.js";             // importar firestore



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

const docRef = collection(db, "Produtos"); 



// ---------------------------------------------------------------------------------------------
// ELEMENTOS
// ---------------------------------------------------------------------------------------------


    const fecharModalProdutos = document.getElementById('fecharModalProdutos');

    const modalProduto = document.getElementById('modalProduto');

    const campoPesquisa = document.getElementById('Search');

    const galleryElement = document.getElementById('galeriaProdutos');

    const objOrdenarProduto = document.getElementById('objOrdenarProduto');

    const listaCategoria = document.getElementById('listaCategoria');

    const checkboxCategoria = document.querySelectorAll('.categoriaFiltro');

    const limparFiltroCategoria = document.getElementById('limparFiltroCategoria');

    const limparFiltroEstoque = document.getElementById('limparFiltroEstoque');




// ---------------------------------------------------------------------------------------------
// FUNCOES
// ---------------------------------------------------------------------------------------------


function statusEstoqueProduto(objLi,qtnestoque){

  const tagestoquesuccess = objLi.querySelector('.tagestoquesuccess');
  const tagestoqueWarning = objLi.querySelector('.tagestoqueWarning');
  const tagestoqueError = objLi.querySelector('.tagestoqueError');

  tagestoquesuccess.style.display="none";
  tagestoqueWarning.style.display="none";
  tagestoqueError.style.display="none";

  if (qtnestoque === 0) {

    tagestoqueError.style.display = "flex";

    } else if (qtnestoque >= 5 && qtnestoque < 10) {

        tagestoqueWarning.style.display = "flex";
        
    } else if (qtnestoque >= 10) {
      
        tagestoquesuccess.style.display = "flex";
    }


}



  //---------------------------------------------------


  // Limpar Filtro estoque

    function fLimparFiltroEstoque(){

      const FilterInStock1 = document.getElementById('FilterInStock1');
      const FilterInStock2 = document.getElementById('FilterInStock2');

      FilterInStock1.checked = false;
      FilterInStock2.checked = false;

      recuperarDados(docRef)


    }



  //---------------------------------------------------

  // Filtro de estoque

  function filtrarPorEstoque() {

    const FilterInStock1 = document.getElementById('FilterInStock1');
    const FilterInStock2 = document.getElementById('FilterInStock2');

    let q; 

    if (FilterInStock2.checked) {q = query(docRef, where("estoque", "<=", 0))};

    if (FilterInStock1.checked) {q = query(docRef, where("estoque", ">", 0))};
    
    if((FilterInStock1.checked && FilterInStock2.checked)||(!FilterInStock1.checked && !FilterInStock2.checked)){
        q = docRef
    }
    
    recuperarDados(q);
}


  //---------------------------------------------------


  // retornar lista de valores selecionados do checkbox

  function retornarCheckboxValuesSelected(){

    const valoresSelecionados = [];

    const checkboxCategoria = document.querySelectorAll('.categoriaFiltro');

    checkboxCategoria.forEach(checkbox => {

      if (checkbox.checked) {

        valoresSelecionados.push(checkbox.value);
      }

    });

    if (valoresSelecionados.length > 0) {

      const q = query(docRef, where("categoria", "in", valoresSelecionados));

      recuperarDados(q)

      

    }else{recuperarDados(docRef);}

  }


  //---------------------------------------------------


  // Recuperar todos os dados

  async function recuperarDados(q) {

    document.getElementById('loading').style.display="flex";

      try {

        const querySnapshot = await getDocs(q);

        galleryElement.innerHTML = "";

        querySnapshot.forEach((doc) => {

          const data = doc.data();

          let nome = data.nome;
          let categoria = data.categoria;
          let preco = data.preco;
          let custo = data.custo;
          let descricao = data.descricao;
          let estoque = data.estoque;
          let foto = data.foto;
    
          const listItem = document.createElement("li");

          listItem.addEventListener('click', ()=> {
            
            modalProduto.querySelector('#imagemModalProduto').src = foto;

            modalProduto.querySelector('#nomeModalProduto').textContent = nome;

            modalProduto.querySelector('#precoModalProduto').textContent = "R$ "+preco;

            modalProduto.querySelector('#categoriaModalProduto').textContent = categoria;

            modalProduto.querySelector('#custoModalProduto').textContent ="R$ "+ custo;

            modalProduto.querySelector('#descricaoModalProduto').textContent = descricao;

            modalProduto.querySelector('#estoqueModalProduto').textContent = estoque + " unid";
        
            modalProduto.style.display = "flex";

          });
        
          
          listItem.innerHTML = `

          <li class="max-sm:p-2 cursor-pointer">

          <div class="group block overflow-hidden p-4 max-sm:p-0 dark:bg-white rounded-md hover:scale-105">

            <div class="flex flex-wrap gap-2 justify-between z-20 relative">

            <!-- categoria -->

            <span class="whitespace-nowrap rounded-full bg-purple-100 px-2.5 py-0.5 text-sm text-purple-700 dark:bg-purple-700 dark:text-purple-100 max-sm:text-xs">${categoria}</span>

            <!-- categoria -->

            <!-- status -->

            <!-- Success -->
              <span
                class="tagestoquesuccess group/disponivel flex items-center justify-center rounded-full bg-emerald-100 px-2.5 py-0.5 text-emerald-700 dark:bg-emerald-700 dark:text-emerald-100"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="-ms-1 me-1.5 h-4 w-4 translate-x-1"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>

                <p class="whitespace-nowrap text-sm hidden">Disponível</p>
                <div class="group-hover/disponivel:flex absolute w-full border shadow-md p-4 text-xs rounded-lg top-0 left-0 bg-emerald-100 text-emerald-700 dark:bg-emerald-700 dark:text-emerald-100 hidden items-center justify-center">

                  ${estoque} unidades em estoque

                </div>
              </span>

              <!-- Warning -->
              <span
                class="tagestoqueWarning group/critico hidden  items-center justify-center rounded-full bg-amber-100 px-2.5 py-0.5 text-amber-700 dark:bg-amber-700 dark:text-amber-100"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="-ms-1 me-1.5 h-4 w-4 translate-x-1"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M8.25 9.75h4.875a2.625 2.625 0 010 5.25H12M8.25 9.75L10.5 7.5M8.25 9.75L10.5 12m9-7.243V21.75l-3.75-1.5-3.75 1.5-3.75-1.5-3.75 1.5V4.757c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0c1.1.128 1.907 1.077 1.907 2.185z"
                  />
                </svg>

                <p class="whitespace-nowrap text-sm hidden">Crítico</p>
                <div class="group-hover/critico:flex absolute w-full border shadow-md p-4 text-xs rounded-lg top-0 left-0 bg-amber-100 text-amber-700 dark:bg-amber-700 dark:text-amber-100 hidden items-center justify-center">

                ${estoque} unidades em estoque

                </div>
              </span>
              <!-- Error -->
              <span
                class="tagestoqueError group/indisponivel hidden items-center justify-center rounded-full bg-red-300 px-2.5 py-0.5 text-red-700 dark:bg-red-700 dark:text-red-100"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="-ms-1 me-1.5 h-4 w-4 translate-x-1"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                  />
                </svg>

                <p class="whitespace-nowrap text-sm hidden">Indisponível</p>

                <div class="group-hover/indisponivel:flex absolute w-full border shadow-md p-4 text-xs rounded-lg top-0 left-0 bg-red-200 hidden items-center justify-center">

                ${estoque} unidades em estoque

                </div>

              </span>

              </div>


            <!-- status -->


            <img
              id="objcardimg"
              src=${foto}
              alt=""
              class="w-full  transition duration-500 group-hover:scale-105 "
            />

            <div class="relative bg-white pt-3">
              <h3
              
                class="text-xs text-gray-700 group-hover:underline group-hover:underline-offset-4"
              >
              ${nome}
              </h3>

              <p class="mt-2">

                <span id="precoproduto" class="tracking-wider text-gray-900">R$ ${preco} </span>
                <span id="custoproduto" class="hidden tracking-wider text-gray-900">R$ ${custo} </span>
                <span id="estoqueproduto" class="hidden tracking-wider text-gray-900">R$ ${estoque} </span>
                <span id="descricaoproduto" class="hidden tracking-wider text-gray-900">R$ ${descricao} </span>
              
              </p>
            </div>
          </div>

        </li>


          `;

          
    
          
          galleryElement.appendChild(listItem);

          statusEstoqueProduto(listItem,estoque);

          
        
      });
      
  } catch (error) {
        console.error("Erro ao preencher a galeria com dados:", error);
      }

      document.getElementById('loading').style.display="none";
    };


    //-------------------------------------------------------------

    // Retornar categorias
    
    async function retornarCategorias(){

        const querySnapshot = await getDocs(docRef);

        const categorias = {};

        listaCategoria.innerHTML=""

        querySnapshot.forEach((doc) => {

          const data = doc.data();

          let categoria = data.categoria;

          if (categorias[categoria]) {
            categorias[categoria]++;
          } else {
            categorias[categoria] = 1;
          }
        
      })

      

      Object.keys(categorias).forEach((chave) => {
        
        const valor = categorias[chave];

        let listItem = document.createElement("li");

        listItem.addEventListener('change', retornarCheckboxValuesSelected );

        listItem.innerHTML=`

        <li>
              <label for="FilterInStock" class="inline-flex items-center gap-2">
                <input type="checkbox" value="${chave}" class="categoriaFiltro h-5 w-5 rounded border-gray-300" />
                <span class="text-sm font-medium text-gray-700"> ${chave} (${valor}) </span>
              </label>
            </li>

        
        `

        listaCategoria.appendChild(listItem);

      });

      
      
    };

    // ------------------------------------------------

    // Retornar qnt estoque

    async function retornarEstoque() {

      listaEstoque.innerHTML = "";
    
      const querySnapshot = await getDocs(docRef);
    
      let contador1 = 0;
      let contador2 = 0;
    
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        let estoque = data.estoque;
    
        if (estoque === 0) {
          contador2++;
        } else {
          contador1++;
        }
      });
    
      const listItem1 = document.createElement("li");
      listItem1.innerHTML = `
        <li>
          <label for="FilterInStock1" class="inline-flex items-center gap-2">
            <input type="checkbox" id="FilterInStock1" class="h-5 w-5 rounded border-gray-300" />
            <span class="text-sm font-medium text-gray-700"> Em estoque (${contador1}) </span>
          </label>
        </li>
      `;
    
      const listItem2 = document.createElement("li");
      listItem2.innerHTML = `
        <li>
          <label for="FilterInStock2" class="inline-flex items-center gap-2">
            <input type="checkbox" id="FilterInStock2" class="h-5 w-5 rounded border-gray-300" />
            <span class="text-sm font-medium text-gray-700"> Fora de estoque (${contador2}) </span>
          </label>
        </li>
      `;

      listItem1.addEventListener('change',filtrarPorEstoque);
      listItem2.addEventListener('change',filtrarPorEstoque);
    
      listaEstoque.appendChild(listItem1);
      listaEstoque.appendChild(listItem2);
    }
    
    



// ---------------------------------------------------------------------------------------------
// ADICIONAR EVENTOS
// ---------------------------------------------------------------------------------------------

    // Fechar modal de info 

    fecharModalProdutos.addEventListener('click',()=>{

      modalProduto.style.display="none";

    });

    //---------------------------------------------------------------


    // Campo pesquisa

    campoPesquisa.addEventListener('keyup',()=>{

      const q = query(docRef, where("nome", ">=", campoPesquisa.value), where("nome", "<=", campoPesquisa.value + "\uf8ff"));

      recuperarDados(q);

    })


    // -------------------------------------------------------------

    // Campo de ordenação

    objOrdenarProduto.addEventListener('change', () => {

      const valorSelecionado = objOrdenarProduto.value;
    
      if (valorSelecionado !== "Ordenar por") {
        
        let campoOrdenacao, ordem;
    
        [campoOrdenacao, ordem] = valorSelecionado.split(', ');
  
        let q;
    
        switch (campoOrdenacao) {
          case "nome":
            q = query(docRef, orderBy("nome", ordem));
            break;
          case "preco":
            q = query(docRef, orderBy("preco", ordem));
            break;
          case "estoque":
            q = query(docRef, orderBy("estoque", ordem));
            break;
          
          default:
            
            console.error("Campo de ordenação não reconhecido:", campoOrdenacao);
            break;
        }
    
        
        recuperarDados(q);

        //alert(q)

      }else{recuperarDados(docRef);}
    });



    //--------------------------------------------------

    // Limpar checkbox categoria

    limparFiltroCategoria.addEventListener('click',()=>{

      const listaCategoria2 = document.getElementById('listaCategoria');
      
      const todoschecks = listaCategoria2.querySelectorAll('input[type=checkbox]')

      todoschecks.forEach(checkbox => {
  
          checkbox.checked =false;
  
      });
  
      retornarCheckboxValuesSelected();

    })

    //--------------------------------------------------

    // Limpar filtro estoque

    limparFiltroEstoque.addEventListener('click',fLimparFiltroEstoque)

 

// ---------------------------------------------------------------------------------------------
// AO INICIAR A PAGINA
// ---------------------------------------------------------------------------------------------

recuperarDados(docRef);

retornarCategorias()

retornarEstoque()