

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


document.getElementById('loading').style.display="flex";


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
      document.getElementById('custo02').textContent = "R$ " + valorTotal.toFixed(2) 
     

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
      document.getElementById('lucro02').textContent = "R$ " + valorTotal.toFixed(2) 


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

    
    const anoAtual = new Date().getFullYear();
    
    const qCusto = query(
        docRefTran, 
        where("idUsuario", "==", vidUsuario) , 
        where("subTipo", "==", "Compra"), 
        where('data', '>=', `${anoAtual}-01-01`), 
        where('data', '<=', `${anoAtual}-12-31`)  );

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

    const anoAtual = new Date().getFullYear();
    
    const qLucro = query(
        docRefTran, 
        where("idUsuario", "==", vidUsuario) , 
        where("subTipo", "==", "Venda"), 
        where('data', '>=', `${anoAtual}-01-01`), 
        where('data', '<=', `${anoAtual}-12-31`)  );

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
    //return `${mes} ${partes[0]}`;
    return `${mes}`;
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





// -- Transacoes por categoria --

// gerar cores

function gerarCorHSL() {
    const matiz = Math.random() * 360; // Valor aleatório para a matiz (0-360)
    const saturacao = 70 + Math.random() * 10; // Saturação entre 70% e 80%
    const luminosidade = 60 + Math.random() * 10; // Luminosidade entre 60% e 70%
    return `hsl(${matiz.toFixed(0)}, ${saturacao.toFixed(0)}%, ${luminosidade.toFixed(0)}%)`;
  }

// Retornar categoria


let subtiposList;
let contagensList;
let contagemTotal;

async function retornarSubTipos() {
    const anoAtual = new Date().getFullYear();
  
    const q = query(
      docRefTran,
      where("idUsuario", "==", vidUsuario),
      where('data', '>=', `${anoAtual}-01-01`),
      where('data', '<=', `${anoAtual}-12-31`)
    );
  
    const querySnapshot = await getDocs(q);
  
    const subtiposContagem = {};
    contagemTotal = 0;
  
    querySnapshot.forEach((doc) => {
      const data = doc.data();
  
      if (data.subTipo) {
        if (subtiposContagem[data.subTipo]) {
          subtiposContagem[data.subTipo]++;
        } else {
          subtiposContagem[data.subTipo] = 1;
        }
  
        contagemTotal++;
      }
    });
  
    subtiposList = Object.keys(subtiposContagem);
    contagensList = subtiposList.map((subtipo) => {
      const porcentagem = (subtiposContagem[subtipo] / contagemTotal) * 100;
      return parseFloat( porcentagem.toFixed(1) ); // Arredonda para uma casa decimal
    });
  
   
  }

await retornarSubTipos()

const coresList = subtiposList.map(() => gerarCorHSL());

// Formatacao do grafico

function formatarGraficoTransacoesCategoria(){
  
    
      const getChartOptions = () => {
          return {
            series: contagensList,
            colors: coresList,
            chart: {
              height: "110%",
              width: "100%",
              type: "donut",
            },
            stroke: {
              colors: ["transparent"],
              lineCap: "",
            },
            plotOptions: {
              pie: {
                donut: {
                  labels: {
                    show: true,
                    name: {
                      show: true,
                      fontFamily: "Inter, sans-serif",
                      offsetY: 20,
                    },
                    total: {
                      showAlways: true,
                      show: true,
                      label: "Total",
                      fontFamily: "Inter, sans-serif",
                      formatter: function (w) {
                        const sum = w.globals.seriesTotals.reduce((a, b) => {
                          return a + b
                        }, 0)
                        return `${sum.toFixed(2)}%`
                      },
                    },
                    value: {
                      show: true,
                      fontFamily: "Inter, sans-serif",
                      offsetY: -20,
                      formatter: function (value) {
                        return value +'%'
                      },
                    },
                  },
                  size: "80%",
                },
              },
            },
            grid: {
              padding: {
                top: -2,
              },
            },
            labels: subtiposList,
            dataLabels: {
              enabled: false,
            },
            legend: {
              position: "bottom",
              fontFamily: "Inter, sans-serif",
            },
            yaxis: {
              labels: {
                formatter: function (value) {
                  return value +'%'
                },
              },
            },
            xaxis: {
              labels: {
                formatter: function (value) {
                  return value  +'%'
                },
              },
              axisTicks: {
                show: false,
              },
              axisBorder: {
                show: false,
              },
            },
          }
        }
  
        if (document.getElementById("donut-chart") && typeof ApexCharts !== 'undefined') {
          const chart = new ApexCharts(document.getElementById("donut-chart"), getChartOptions());
          chart.render();
  
          
        }
   



}

formatarGraficoTransacoesCategoria()


// CUSTO VS LUCRO

async function obterDadosTransacoes() {
  const anoAtual = new Date().getFullYear();
  const q = query(
    docRefTran,
    where("idUsuario", "==", vidUsuario),
    where('data', '>=', `${anoAtual}-01-01`), 
    where('data', '<=', `${anoAtual}-12-31`)  
  );

  const querySnapshot = await getDocs(q);

  const meses = [];
  const valoresLucro = [];
  const valoresCusto = [];

  querySnapshot.forEach((doc) => {
    const data = doc.data();
    const mesAno = formatarDataParaMesAno(data.data);

    // Verifique se o tipo de transação é compra ou venda
    if (data.subTipo === "Compra") {
      // Adicione o valor total como custo
      valoresCusto.push(data.total);
      valoresLucro.push(0); // Lucro é 0 para compras
    } else if (data.subTipo === "Venda") {
      // Adicione o valor total como lucro
      valoresLucro.push(data.total);
      valoresCusto.push(0); // Custo é 0 para vendas
    }

    // Adicione o mês ao array de meses, se ainda não estiver presente
    if (!meses.includes(mesAno)) {
      meses.push(mesAno);
    }
  });

  return [meses, valoresLucro, valoresCusto];
}


async function graficoCustoLucro(){

  const [meses, valoresLucro, valoresCusto] = await obterDadosTransacoes();
    
      let options = {
        // enable and customize data labels using the following example, learn more from here: https://apexcharts.com/docs/datalabels/
        dataLabels: {
          enabled: true,
          // offsetX: 10,
          style: {
            cssClass: 'text-xs text-white font-medium'
          },
        },
        grid: {
          show: false,
          strokeDashArray: 4,
          padding: {
            left: 16,
            right: 16,
            top: -26
          },
        },
        series: [
          {
            name: "Lucro",
            data: valoresLucro,
            color: "#1A56DB",
          },
          {
            name: "Custo",
            data: valoresCusto,
            color: "#7E3BF2",
          },
        ],
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
        legend: {
          show: true
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
        stroke: {
          width: 6,
        },
        xaxis: {
          categories: meses,
          labels: {
            show: false,
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
          labels: {
            formatter: function (value) {
              return '$' + value;
            }
          }
        },
      }
  
      if (document.getElementById("data-labels-chart") && typeof ApexCharts !== 'undefined') {
        const chart = new ApexCharts(document.getElementById("data-labels-chart"), options);
        chart.render();
      }
    



}

graficoCustoLucro();


// TOP 10 PRODUTOS

async function obterTop10ProdutosComMaiorLucro() {
  const anoAtual = new Date().getFullYear();
  const q = query(
    docRefTran,
    where("idUsuario", "==", vidUsuario),
    where("subTipo", "==", "Venda"),
    where('data', '>=', `${anoAtual}-01-01`), 
    where('data', '<=', `${anoAtual}-12-31`)
  );

  const querySnapshot = await getDocs(q);

  // Criar um objeto para rastrear o lucro por produto
  const lucroPorProduto = {};

  querySnapshot.forEach((doc) => {
    const data = doc.data();
    const produto = data.nome;
    const lucro = data.total;

    // Verificar se o produto já foi registrado
    if (!lucroPorProduto[produto]) {
      lucroPorProduto[produto] = 0;
    }

    // Adicionar o lucro ao produto
    lucroPorProduto[produto] += lucro;
  });

  // Classificar os produtos com base no lucro em ordem decrescente
  const produtosOrdenados = Object.keys(lucroPorProduto).sort(
    (produtoA, produtoB) => lucroPorProduto[produtoB] - lucroPorProduto[produtoA]
  );

  // Selecionar os top 10 produtos com maior lucro
  const top10Produtos = produtosOrdenados.slice(0, 10);

  // Obter os valores de lucro correspondentes
  const valoresLucroTop10 = top10Produtos.map((produto) => parseFloat(lucroPorProduto[produto].toFixed(2)));

  return [top10Produtos, valoresLucroTop10];
}

let vtop10Produtos
let vvaloresLucroTop10
// Uso da função
await obterTop10ProdutosComMaiorLucro().then(([top10Produtos, valoresLucroTop10]) => {
  //console.log("Top 10 Produtos com Maior Lucro:", top10Produtos);
  //console.log("Valores de Lucro Correspondentes:", valoresLucroTop10);
  vtop10Produtos=top10Produtos;
  vvaloresLucroTop10=valoresLucroTop10
});

function graficoTop10Produtos(){

  var options = {
      series: [
      {
          name: "Venda",
          color: "#31C48D",
          data: vvaloresLucroTop10,
      }
      ],
      chart: {
      sparkline: {
          enabled: false,
      },
      type: "bar",
      width: "100%",
      height: 400,
      toolbar: {
          show: false,
      }
      },
      fill: {
      opacity: 1,
      },
      plotOptions: {
      bar: {
          horizontal: true,
          columnWidth: "100%",
          borderRadiusApplication: "end",
          borderRadius: 6,
          dataLabels: {
          position: "top",
          },
      },
      },
      legend: {
      show: true,
      position: "bottom",
      },
      dataLabels: {
      enabled: false,
      },
      tooltip: {
      shared: true,
      intersect: false,
      formatter: function (value) {
          return "R$" + value
      }
      },
      xaxis: {
      labels: {
          show: true,
          style: {
          fontFamily: "Inter, sans-serif",
          cssClass: 'text-xs font-normal fill-gray-500 dark:fill-gray-400 '
          },
          formatter: function(value) {
          return "R$" + value
          }
      },
      categories: vtop10Produtos,
      axisTicks: {
          show: false,
      },
      axisBorder: {
          show: false,
      },
      },
      yaxis: {
      labels: {
          show: true,
          style: {
          fontFamily: "Inter, sans-serif",
          cssClass: 'text-xs font-normal fill-gray-500 dark:fill-gray-400 translate-x-2'
          }
      }
      },
      grid: {
      show: true,
      strokeDashArray: 4,
      padding: {
          left: 2,
          right: 2,
          top: -20
      },
      },
      fill: {
      opacity: 1,
      }
  }

  if(document.getElementById("bar-chart") && typeof ApexCharts !== 'undefined') {
      const chart = new ApexCharts(document.getElementById("bar-chart"), options);
      chart.render();
  }



}

graficoTop10Produtos();

// CARREGANDO


document.getElementById('loading').style.display="none";