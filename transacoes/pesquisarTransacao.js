
import * as funcao_alerta from '../funcoes/f_alerta_campo.js';


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

const docRef = collection(db, "Transacoes"); 

const auth = getAuth(app);

let vidUsuario;

let estoque;

let tipoTransacao;


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


// ---------------------------------------------------------------------------------------------
// FUNCOES
// ---------------------------------------------------------------------------------------------

// Retornar estoque

async function retornarEstoque(valorIDProduto) {
      
    const querySnapshot = await getDoc(doc(db, "Produtos",valorIDProduto));


      const data = querySnapshot.data();

       estoque = data.estoque;    
    
    
    };


// Recuperar todos os dados

async function recuperarDados(q) {

    document.getElementById('loading').style.display="flex";

      try {

        const querySnapshot = await getDocs(q);

        galleryElement.innerHTML = "";

        querySnapshot.forEach((doc) => {

          const data = doc.data();

          let uid = doc.id;

          let idProduto = data.idProduto;
          let nome = data.nome;
          let img = data.imgProduto;

          let vdata = data.data;
          let quantidade = data.quantidade;
          let descricao = data.descricao;
          let subtipo = data.subTipo;
          let tipo = data.tipo;
          let total = data.total;

          const dataObj = new Date(vdata);

          const ano = dataObj.getFullYear();
          const dia = dataObj.getDate();
          const mes = dataObj.toLocaleString('default', { month: 'short' });
          const mesAbreviado = mes.slice(0, 3).toUpperCase();
          
    
          const listItem = document.createElement("li");
        
          
          listItem.innerHTML = `

          <li class="max-sm:p-2">
                  <article class="flex rounded-lg bg-white group/descricao p-4 hover:shadow-xl hover:-translate-y-1 border transition dark:bg-gray-900 dark:shadow-gray-800/25 
                  max-md:flex-col relative">

                  <div id="abrirExcluirTran" class="absolute flex flex-col items-center top-4 max-md:hidden right-4 cursor-pointer group/delete gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 group-hover/delete:stroke-red-400 group-hover/delete:scale-110 stroke-slate-400">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                  </svg>
                  <p class="text-sm group-hover/delete:text-red-400 group-hover/delete:visible invisible delay-200">Excluir</p>
                    </div>

                
                    <div class="rotate-180 p-2 [writing-mode:_vertical-lr] max-md:hidden">
                      <time datetime="2022-10-10" class="flex items-center justify-between gap-4 text-xs font-bold uppercase text-gray-900 dark:text-white">
                        <span>${dia} ${mesAbreviado}</span>
                        <span class="w-px flex-1 bg-gray-900/10 dark:bg-white/10"></span>
                        <span>${ano}</span>
                      </time>
                    </div>
                    <div class="hidden rotate-0 p-2 [writing-mode:_vertical-lt] max-md:block">
                      <time datetime="2022-10-10" class="flex items-center justify-between gap-4 text-xs font-bold uppercase text-gray-900 dark:text-white">
                        <span>${dia} ${mesAbreviado}</span>
                        <span class="w-px flex-1 bg-gray-900/10 dark:bg-white/10"></span>
                        <span>${ano}</span>
                      </time>
                    </div>

                    <div class="relative block sm:basis-56">
                      <img alt="produto" src=${img} class="w-full object-contain" />

                      <span class="iconEntrada absolute right-2 top-2 flex items-center justify-center rounded-md bg-green-100 px-2.5 py-0.5 text-green-700 dark:bg-green-700 dark:text-green-100">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-6 w-6"><path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" /></svg>
                      </span>

                      <span class="iconSaida absolute right-2 top-2 hidden items-center justify-center rounded-md bg-red-100 px-2.5 py-0.5 text-red-700 dark:bg-red-700 dark:text-green-100">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-6 w-6"><path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" /></svg>
                      </span>
                    </div>

                    <div class="flex flex-1 flex-col justify-between">
                        <div class="border-s border-gray-900/10 p-4 dark:border-white/10 sm:!border-l-transparent sm:p-6">
                          <a href="#">
                            <h3 class="cls_idProduto hidden font-bold uppercase text-gray-900 dark:text-white">${idProduto}</h3>
                            <h3 class="font-bold uppercase text-gray-900 dark:text-white">${nome}</h3>
                          </a>
                          <p class="mt-2 line-clamp-3 text-sm/relaxed text-gray-700 dark:text-gray-200">${subtipo}</p>
                          <p class="mt-2 line-clamp-3 text-sm/relaxed text-gray-700 dark:text-gray-200">${quantidade} unid</p>
                          <p class="mt-2 line-clamp-3 text-sm/relaxed text-gray-700 dark:text-gray-200 font-semibold">R$ ${total}</p>
                          
                          
                          <div class="flex flex-col overflow-hidden relative  gap-16">
                          <p class="mt-2 line-clamp-3 group-hover/descricao:line-clamp-none text-sm/relaxed text-gray-600 dark:text-gray-300 font-light ">${descricao}</p>
  
                          <div id="abrirExcluirTran2" class=" flex-col items-center  group-hover/descricao:max-md:flex p-2 hidden mx-auto cursor-pointer group/delete gap-1 ">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 stroke-red-400 group-hover/delete:scale-110 ">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                              </svg>
                              <p class="text-sm text-red-400">Excluir</p>
                          </div>
  
                          </div>
  
                        </div>

                      </div>

                  </article>
                </li>


          `;

          if(tipo=="Saída")
          {listItem.querySelector('.iconEntrada').style.display="none";listItem.querySelector('.iconSaida').style.display="flex"}
          else{{listItem.querySelector('.iconEntrada').style.display="flex";listItem.querySelector('.iconSaida').style.display="none"}}

          listItem.querySelector('#abrirExcluirTran').addEventListener('click',()=> excluirTransacao(idProduto,tipo,quantidade,uid));
          listItem.querySelector('#abrirExcluirTran2').addEventListener('click',()=>excluirTransacao(idProduto,tipo,quantidade,uid));
    
          
          galleryElement.appendChild(listItem);
        
      });
      
  } catch (error) {
        console.error("Erro ao preencher a galeria com dados:", error);
      }

      document.getElementById('loading').style.display="none";
};


// Retornar meses
    
  async function retornarMes(q){

    const listaCategoria = document.getElementById('listaCategoria')

    const querySnapshot = await getDocs(q);

    const categorias = {};

    listaCategoria.innerHTML=""

    querySnapshot.forEach((doc) => {

      const data = doc.data();

      let categoria = data.data;

      const dataObj = new Date(categoria);

      const ano = dataObj.getFullYear();
      const dia = dataObj.getDate();
      const mes = dataObj.toLocaleString('default', { month: 'short' });
      const mesAbreviado = mes.slice(0, 3).toUpperCase();

      if (categorias[mesAbreviado]) {
        categorias[mesAbreviado]++;
      } else {
        categorias[mesAbreviado] = 1;
      }

    
  })



  Object.keys(categorias).forEach((chave) => {
    
    const valor = categorias[chave];

    let listItem = document.createElement("li");

    listItem.innerHTML=`

    <li>
          <label for="FilterInStock" class="inline-flex items-center gap-2">
            <input type="checkbox" value="${chave}" class="categoriaFiltro mes-checkbox h-5 w-5 rounded border-gray-300" />
            <span class="text-sm font-medium text-gray-700"> ${chave} (${valor}) </span>
          </label>
        </li>

    
    `

    listItem.addEventListener('change', filtrarTransacoes);

    listaCategoria.appendChild(listItem);

  });



  };

// Retornar tipos

async function retornarTipos(q){

  const listaEstoque = document.getElementById('listaEstoque');

  const querySnapshot = await getDocs(q);

    const categorias = {};

    listaEstoque.innerHTML=""

    querySnapshot.forEach((doc) => {

      const data = doc.data();

      let categoria = data.subTipo;

      if (categorias[categoria]) {
        categorias[categoria]++;
      } else {
        categorias[categoria] = 1;
      }

    
  })



  Object.keys(categorias).forEach((chave) => {
    
    const valor = categorias[chave];

    let listItem = document.createElement("li");

    listItem.innerHTML=`

    <li>
          <label for="FilterInStock" class="inline-flex items-center gap-2">
            <input type="checkbox" value="${chave}" class="categoriaFiltro tipo-transacao-checkbox h-5 w-5 rounded border-gray-300" />
            <span class="text-sm font-medium text-gray-700"> ${chave} (${valor}) </span>
          </label>
        </li>

    
    `

    listItem.addEventListener('change', filtrarTransacoes);

    listaEstoque.appendChild(listItem);

  });



}



// Excluir transacao

async function excluirTransacao(ExcluirIdProduto,tipoTransacao,quantidade,uidTran){

    const modalExcluir = document.createElement("div");

    modalExcluir.innerHTML=

    `
    <!-- modal excluir produto -->
    <div id="modalExcluirProduto" class="flex h-screen top-0 bg-gray-400/50 z-50 fixed w-screen items-center justify-center p-4">
    <div class="rounded-lg bg-white dark:bg-dark p-8 shadow-2xl mx-auto ">
      <h2 class="text-lg font-bold dark:bg-gray-200">🗑️ Excluir Transação</h2>
    
      <p class="mt-2 text-sm text-gray-500">
        Você quer realmente excluir essa transação?
      </p>
    
      <div class="mt-4 flex gap-2">
        <button
          id="btnModalExcluir"
          type="button"
          class="rounded bg-red-50 px-4 py-2 text-sm font-medium text-red-600"
        >
          Sim, Tenho certeza
        </button>
    
        <button
          id="fecharmodalexcluir"
          type="button"
          class="rounded bg-gray-50 px-4 py-2 text-sm font-medium text-gray-600"
        >
          Não, voltar
        </button>
      </div>
    </div>
    </div>

    `

    modalExcluir.querySelector('#btnModalExcluir').addEventListener('click',async ()=>{

        document.getElementById('loading').style.display="flex";


        await retornarEstoque(ExcluirIdProduto);

        document.body.removeChild(modalExcluir);

        // Verificar quantidade no estoque

        if(tipoTransacao=="Saída"){

            // Adicionar ao estoque

            console.log ("idTransacao: " + uidTran )
            console.log ("idProduto: " + ExcluirIdProduto )
            console.log ("Tipo: " + tipoTransacao )
            console.log ("qnt Transacao: " + quantidade )
            console.log ("estoque atual: " + estoque )
            console.log ("estoque atualizado: " + (parseInt(estoque) + parseInt(quantidade))  )

            func_excluir_transacao(uidTran,"Entrada",ExcluirIdProduto,quantidade)



        }
        else
        {
            // Subtrair ao estoque

            console.log ("idTransacao: " + uidTran )
            console.log ("idProduto: " + ExcluirIdProduto )
            console.log ("Tipo: " + tipoTransacao )
            console.log ("qnt Transacao: " + quantidade )
            console.log ("estoque atual: " + estoque )
            console.log ("estoque atualizado: " + (parseInt(estoque) - parseInt(quantidade))  )

            

            document.getElementById('loading').style.display="none";

            if( parseInt(estoque) >= parseInt(quantidade) ){

                document.getElementById('loading').style.display="none";

                func_excluir_transacao(uidTran,"Saída",ExcluirIdProduto,quantidade)

            }else{

                document.getElementById('loading').style.display="none";

                

                funcao_alerta.alerta_campo("Falha ao excluir a transação","Estoque Insuficiente : " +estoque+" unid","bg-red-200",undefined) ;
            }

        }


        

    });

    document.body.appendChild(modalExcluir);


    const fecharmodalexcluir = document.getElementById('fecharmodalexcluir');

    fecharmodalexcluir.addEventListener('click', () => {
        
        document.body.removeChild(modalExcluir);
    });




}


// Funcao excluir transacao

async function func_excluir_transacao(v_id_transacao,b_tipo,ExcluirIdProduto,quantidade){


    try{

        await deleteDoc (doc(db, "Transacoes", v_id_transacao));

        await alterarEstoqueProduto(ExcluirIdProduto,b_tipo,quantidade)

        funcao_alerta.alerta_campo("Transação Excluída com sucesso", "Atualizando estoque...","bg-green-200",undefined)
    
        setTimeout(function() {
            window.location.reload()
        }, 3000);

    }

    catch(error){ 
        
        funcao_alerta.alerta_campo("Falha ao excluir a transação",error.message,"bg-red-200",undefined) ;

        console.log(error.message);

        setTimeout( function() { window.location.reload() } , 3000) ;
    
    }



}

// Alterar estoque

async function alterarEstoqueProduto(valorIDProduto,vtipo,Quantity){


    if
    
    (vtipo=="Entrada"){await updateDoc(doc(db, "Produtos", valorIDProduto), {estoque : parseInt(estoque) + parseInt(Quantity)})}

    else

    {await updateDoc(doc(db, "Produtos", valorIDProduto), {estoque : parseInt(estoque) - parseInt(Quantity)})}


    


  }


// Filtro e ordenacao

async function filtrarTransacoes() {
  const mesesCheckboxes = document.querySelectorAll('.mes-checkbox');
  const tiposTransacaoCheckboxes = document.querySelectorAll('.tipo-transacao-checkbox');
  const objOrdenarTransacao = document.querySelector('#objOrdenarTransacao');

  let q;

  // Capture os meses selecionados.
  const mesesSelecionados = Array.from(mesesCheckboxes)
    .filter(checkbox => checkbox.checked)
    .map(checkbox => mesAbreviadoParaNumero(capitalizeFirstLetter(checkbox.value)));

  // Capture os tipos de transação selecionados e converta-os para números.
  const tiposTransacaoSelecionados = Array.from(tiposTransacaoCheckboxes)
    .filter(checkbox => checkbox.checked)
    .map(checkbox => checkbox.value);


  if (mesesSelecionados.length > 0) {
    
    q = where('mes', 'in', mesesSelecionados)
    
  }

  // Verifique se há tipos de transação selecionados.
  if (tiposTransacaoSelecionados.length > 0 ) {
    
    if(q){q = q , where("subTipo", "in", tiposTransacaoSelecionados)}else{q = where("subTipo", "in", tiposTransacaoSelecionados)}
    
  }

  if(objOrdenarTransacao.value!=="Ordenar por"){

    const stringOriginal = objOrdenarTransacao.value;
    const partes = stringOriginal.split(',');

    const primeiraParte = partes[0]; // "data"
    const segundaParte = partes[1];  // "asc"

    if( tiposTransacaoSelecionados.length > 0 || mesesSelecionados.length > 0 )

    { q = q , orderBy(primeiraParte,segundaParte) }

    else

    { q = orderBy(primeiraParte,segundaParte)}

    
    
  }

  if( mesesSelecionados.length == 0 && tiposTransacaoSelecionados.length == 0 && objOrdenarTransacao.value=="Ordenar por" )
  { recuperarDados(query(docRef, where("idUsuario", "==", vidUsuario),orderBy("data","desc"))); }

  else

  { recuperarDados(query(docRef,where("idUsuario", "==", vidUsuario),q)); }

  
}



// Deixar a astring com a primeira letra maiuscula
function capitalizeFirstLetter(str) {
  // Verifica se a string não está vazia
  if (str.length === 0) {
    return str;
  }

  // Converte o primeiro caractere para maiúscula e o restante para minúscula
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

// Retornar numero do mes
function mesAbreviadoParaNumero(mesAbreviado) {
  const mapaMeses = {
    'Jan': 1,
    'Fev': 2,
    'Mar': 3,
    'Abr': 4,
    'Mai': 5,
    'Jun': 6,
    'Jul': 7,
    'Ago': 8,
    'Set': 9,
    'Out': 10,
    'Nov': 11,
    'Dez': 12
  };

  // Verifica se o mês abreviado está no mapa e retorna o número correspondente.
  if (mapaMeses.hasOwnProperty(mesAbreviado)) {
    return mapaMeses[mesAbreviado];
  } else {
    // Retorna um valor padrão ou lança um erro, dependendo da sua lógica.
    return null; // Ou outra ação adequada, como lançar um erro.
  }
}



// ---------------------------------------------------------------------------------------------
// AO INICIAR A PAGINA
// ---------------------------------------------------------------------------------------------

await retornarIDUsuario()
.then((result) => {
    vidUsuario = result;
});

recuperarDados(query(docRef, where("idUsuario", "==", vidUsuario),orderBy("data","desc")));

retornarMes(query(docRef, where("idUsuario", "==", vidUsuario),orderBy("data","desc")));

retornarTipos(query(docRef, where("idUsuario", "==", vidUsuario)));
    


// ---------------------------------------------------------------------------------------------
// EVENTOS
// ---------------------------------------------------------------------------------------------

document.getElementById('objOrdenarTransacao').addEventListener('change', filtrarTransacoes);


// Campo pesquisa

const Search = document.getElementById('Search');

Search.addEventListener('keyup',()=>{

  const q = query(docRef, where("idUsuario", "==", vidUsuario), where("nome", ">=", Search.value), where("nome", "<=", Search.value + "\uf8ff"));

  recuperarDados(q);

})


// Limpar filtros

const limparFiltroCategoria = document.getElementById('limparFiltroCategoria');

const limparFiltroEstoque = document.getElementById('limparFiltroEstoque');


limparFiltroCategoria.addEventListener('click', () => {

  const checkboxes = document.querySelectorAll('.mes-checkbox');

  checkboxes.forEach((checkbox) => {
    checkbox.checked = false; // Desmarca a caixa de seleção.
  });

  filtrarTransacoes()

});

limparFiltroEstoque.addEventListener('click', () => {

  const checkboxes = document.querySelectorAll('.tipo-transacao-checkbox');

  checkboxes.forEach((checkbox) => {
    checkbox.checked = false; // Desmarca a caixa de seleção.
  });

  filtrarTransacoes()

});











