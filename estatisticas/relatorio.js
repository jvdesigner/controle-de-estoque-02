

import * as funcoes from '../funcoes/f_darkmode.js'


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
// DARKMODE
// ---------------------------------------------------------------------------------------------

const btndarkmode = document.getElementById('AcceptConditions');
const objdark = document.getElementById('divdark');
const objlight = document.getElementById('divlight');

btndarkmode.addEventListener('change',()=>{funcoes.efeitoDarkmode();

    

    if(objdark.style.display=="flex"){
        objlight.style.display="flex";
        objdark.style.display="none"
    }
    else{
        objlight.style.display="none";
        objdark.style.display="flex"
    }

});

if (localStorage.getItem('darkMode') === 'true') {

    btndarkmode.checked  = true;

    objlight.style.display="none";
    objdark.style.display="flex"


} else {

    document.querySelector('html').classList.remove('dark');

    btndarkmode.checked  = false;

    objlight.style.display="flex";
    objdark.style.display="none"

}


// ---------------------------------------------------------------------------------------------
// MEDIDAS
// ---------------------------------------------------------------------------------------------

// Total de produtos

async function TotaldeProdutos(){

    const q = query(docRefProd, where("idUsuario", "==", vidUsuario));

    const querySnapshot = await getDocs(q);

    const numberOfDocuments = querySnapshot.size;

    document.getElementById('txtTotaldeprodutos').textContent = numberOfDocuments;

};

TotaldeProdutos();

// Total de entrada

async function TotaldeEntradas(){

    const q = query(docRefTran, where("idUsuario", "==", vidUsuario) , where("tipo", "==", "Entrada")  );

    const querySnapshot = await getDocs(q);

    const numberOfDocuments = querySnapshot.size;

    document.getElementById('txtTotaldeentradas').textContent = numberOfDocuments;

};

TotaldeEntradas();


// Total de saida

async function TotaldeSaidas(){

    const q = query(docRefTran, where("idUsuario", "==", vidUsuario) , where("tipo", "==", "Saída")  );

    const querySnapshot = await getDocs(q);

    const numberOfDocuments = querySnapshot.size;

    document.getElementById('txtTotaldesaidas').textContent = numberOfDocuments;

};

TotaldeSaidas();


// Total de custo

async function TotaldeCusto(){

    const q = query(docRefTran, where("idUsuario", "==", vidUsuario) , where("subTipo", "==", "Compra")  );

    let valorTotal = 0;

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
        
        const data = doc.data();

        valorTotal += data.total

      });

      document.getElementById('txtCustoTotal').textContent = "R$ " + valorTotal.toFixed(2) 

};

TotaldeCusto();



// Total de lucro

async function TotaldeLucro(){

    const q = query(docRefTran, where("idUsuario", "==", vidUsuario) , where("subTipo", "==", "Venda")  );

    let valorTotal = 0;

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
        
        const data = doc.data();

        valorTotal += data.total

      });

      document.getElementById('txtLucroTotal').textContent = "R$ " + valorTotal.toFixed(2) 

};

TotaldeLucro();


// Total de faturameto

async function TotaldeFaturamento(){

    const txtfaturamento = document.getElementById('txtFaturamentoTotal');

    const labFaturamentoTotal = document.getElementById('labFaturamentoTotal');

    const qLucro = query(docRefTran, where("idUsuario", "==", vidUsuario) , where("subTipo", "==", "Venda")  );

    const qCusto = query(docRefTran, where("idUsuario", "==", vidUsuario) , where("subTipo", "==", "Compra")  );

    let valorCusto = 0;

    let valorLucro = 0;

    let valorTotal = 0;

    let querySnapshot = await getDocs(qLucro);

    querySnapshot.forEach((doc) => {
        
        const data = doc.data();

        valorLucro += data.total

      });

    querySnapshot = await getDocs(qCusto);

      querySnapshot.forEach((doc) => {
          
          const data = doc.data();
  
          valorCusto += data.total
  
        });

        valorTotal = valorLucro - valorCusto
  

        txtfaturamento.textContent = "R$ " + valorTotal.toFixed(2) 

      if(valorTotal<=0){ 
        txtfaturamento.style.color = "red" ;
        labFaturamentoTotal.style.color = "red"
        }
        else{
            txtfaturamento.style.color = "green" ;
            labFaturamentoTotal.style.color = "green"
        }

};

TotaldeFaturamento();




// ---------------------------------------------------------------------------------------------
// Graficos
// ---------------------------------------------------------------------------------------------


// -- Faturamento --

// Filtro

function FiltrarFaturamento(){

    const lastDaysdropdown = document.getElementById('lastDaysdropdown');
    const opcaoDropdown = lastDaysdropdown.querySelectorAll('a');

    opcaoDropdown.forEach((obj) => {
    obj.addEventListener('click', () => {
        alert(obj.textContent);
    });
    });

}

// faturamento

async function ListadeCusto(){

    const qCusto = query(docRefTran, where("idUsuario", "==", vidUsuario) , where("subTipo", "==", "Compra")  );

    let valorCusto = 0;

    let valorTotal = 0;

    const objData={};


    let querySnapshot = await getDocs(qCusto);

      querySnapshot.forEach((doc) => {
          
          const data = doc.data();
  
          valorCusto += data.total

          if (!objData[data.data]) {
            objData[data.data] = 0; 
          }
      
          
          objData[data.data] += data.total;
     
      
  
        });

        valorTotal = valorCusto
  

        //console.log( "R$ " + valorTotal.toFixed(2) ) 

        return objData 

};

async function ListadeLucro(){

    const qLucro = query(docRefTran, where("idUsuario", "==", vidUsuario) , where("subTipo", "==", "Venda")  );

    let valorLucro = 0;

    let valorTotal = 0;

    const objData={};


    let querySnapshot = await getDocs(qLucro);

      querySnapshot.forEach((doc) => {
          
          const data = doc.data();
  
          valorLucro += data.total

          if (!objData[data.data]) {
            objData[data.data] = 0; 
          }
      
          
          objData[data.data] += data.total;

      
  
        });

        valorTotal = valorLucro
  

        //console.log( "R$ " + valorTotal.toFixed(2) ) 

        return objData 

};

function ListadeFaturamento(listaCusto,listaLucro){

const custoPorData = listaCusto;
const lucroPorData = listaLucro;


    // Combine os objetos de custo e lucro em um único objeto
const transacoesPorData = { ...custoPorData, ...lucroPorData };

// Objeto para armazenar o faturamento por mês
const faturamentoPorMes = {};

// Percorra o objeto combinado e calcule o faturamento por mês
for (const data in transacoesPorData) {
  const mesAno = formatarDataParaMesAno(data.slice(0, 7)); // Extrai o mês e ano da data (yyyy-mm)
  const valor = transacoesPorData[data];

  // Inicializa o objeto para o mês, se não existir
  if (!faturamentoPorMes[mesAno]) {
    faturamentoPorMes[mesAno] = 0;
  }

  // Adicione o valor do faturamento (lucro - custo) ao mês
  if (custoPorData[data]) {
    faturamentoPorMes[mesAno] -= valor; // Subtrai o custo
  } else {
    faturamentoPorMes[mesAno] += valor; // Soma o lucro
  }
}

// Crie listas separadas para meses e valores do faturamento
const meses = Object.keys(faturamentoPorMes);
const valoresFaturamento = Object.values(faturamentoPorMes);

const somaFaturamento = valoresFaturamento.reduce((acumulador, valor) => acumulador + valor, 0);

document.getElementById('valorFaturamentoTotal').textContent = "R$ " + somaFaturamento.toFixed(2);

return [meses , valoresFaturamento]


}

function formatarDataParaMesAno(data) {
    const partes = data.split('-'); // Divide a data em partes [ano, mês]
    const mesesAbreviados = [
      'JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN',
      'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'
    ];
    const mes = mesesAbreviados[parseInt(partes[1], 10) - 1]; // Obtém o mês abreviado
    return `${mes} ${partes[0]}`;
  }

// GRAFICO FATURAMENTO 

async function GraficoFaturamento(){

    let objMeses;
    let objFaturamento;

    await ListadeCusto().then((result)=>{ objMeses = result  });

    await ListadeLucro().then((result)=>{ objFaturamento = result  });

    const [meses, valoresFaturamento] = ListadeFaturamento(objMeses, objFaturamento);

    let options = {
        chart: {
        height: "100%",
        maxWidth: "100%",
        type: "area",
        fontFamily: "Inter, sans-serif",
        dropShadow: {
            enabled: false,
        },
        toolbar: {
            show: false,
        },
        },
        tooltip: {
        enabled: true,
        x: {
            show: false,
        },
        },
        fill: {
        type: "gradient",
        gradient: {
            opacityFrom: 0.55,
            opacityTo: 0,
            shade: "#1C64F2",
            gradientToColors: ["#1C64F2"],
        },
        },
        dataLabels: {
        enabled: false,
        },
        stroke: {
        width: 6,
        },
        grid: {
        show: false,
        strokeDashArray: 4,
        padding: {
            left: 2,
            right: 2,
            top: 0
        },
        },
        series: [
        {
            name: "Faturamento",
            data: valoresFaturamento,
            color: "#1A56DB",
        },
        ],
        xaxis: {
        categories: meses,
        labels: {
            show: true,
        },
        axisBorder: {
            show: false,
        },
        axisTicks: {
            show: false,
        },
        },
        yaxis: {
        show: false,
        },
    }

    if (document.getElementById("area-chart") && typeof ApexCharts !== 'undefined') {
        const chart = new ApexCharts(document.getElementById("area-chart"), options);
        chart.render();
        
    }

}

GraficoFaturamento()