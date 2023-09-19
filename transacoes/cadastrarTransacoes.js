
//---------------------------------------------------------------
// IMPORTAR FIREBASE
//---------------------------------------------------------------


import { initializeApp } 
    from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";                   // importar o app

    import { collection, query, where, getDocs,getDoc,getFirestore,orderBy,limit,deleteDoc ,doc,setDoc,updateDoc } 
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

    const auth = getAuth(app);

    const docRef = collection(db, "Produtos"); 

    let vidUsuario;

    


// ---------------------------------------------------------------------------------------------
// USUARIO
// ---------------------------------------------------------------------------------------------

    
    function retornarIDUsuario() {
        return new Promise((resolve) => {
            onAuthStateChanged(auth, (user) => {
            if (user) {
                resolve(user.uid);
            }
            });
        });
    }




//---------------------------------------------------------------
// IMPORTAR FUNCOES
//---------------------------------------------------------------

    import * as funcaoAlerta from '../funcoes/f_alerta_campo.js';



//---------------------------------------------------------------
// ELEMENTOS FORMULARIO
//---------------------------------------------------------------    


    const formCadastrarTransacao = document.getElementById('formCadastrarTransacao');
    
    const imgInput = document.getElementById('imgInput');
    
    const inputNomeProduto = document.getElementById('inputNomeProduto');

    const inputDataTransacao = document.getElementById('inputDataTransacao');

    const regexData = /^\d{4}-\d{2}-\d{2}$/;

    const Quantity = document.getElementById('Quantity');

    const HeadlineAct = document.getElementById('HeadlineAct');

    const inputObsTransacao = document.getElementById('inputObsTransacao');

    const btnSalvarTransacao = document.getElementById('btnSalvarTransacao');

    const txtTotalTransacao = document.getElementById('txtTotalTransacao');

    const txtValorTotalTransacao = document.getElementById('txtValorTotalTransacao');

    const txtValorTotalfaturamento = document.getElementById('txtValorTotalfaturamento');

    const diviconTransacao = document.getElementById('diviconTransacao');

    const objValorTransacao = document.getElementById('objValorTransacao');

    const btnAumentarQnt = document.getElementById('btnAumentarQnt');

    const btnDiminuirQnt = document.getElementById('btnDiminuirQnt');

    //const btnDiminuirQnt = document.getElementById('btnDiminuirQnt');



    let precoTotal; 
    let custoTotal;
    let faturamentoTotal;
    let totalTransacao;
    let tipoTransacao;

    let estoque;



//---------------------------------------------------------------
// Transferir informacoes
//--------------------------------------------------------------- 


const urlParams = new URLSearchParams(window.location.search);

const IdProduto         = urlParams.get("vIdProduto");
const NomeProduto       = urlParams.get("vNomeProduto");
const FotoProduto       = urlParams.get("vFotoProduto");
const PrecoProduto      = urlParams.get("vPrecoProduto");
const DescricaoProduto  = urlParams.get("vDescricaoProduto");
const CategoriaProduto  = urlParams.get("vCategoriaProduto");
const CustoProduto      = urlParams.get("vCustoProduto");

const Faturamento = converterStringParaDecimal(PrecoProduto)-converterStringParaDecimal(CustoProduto);

imgInput.src              = FotoProduto;
inputNomeProduto.value    = NomeProduto
//EditPreco.value         = PrecoProduto.replace("R$ ", "")
//EditCategoria.value     = CategoriaProduto
//EditCusto.value         = CustoProduto.replace("R$ ", "")
//EditDescricao.value     = DescricaoProduto



// ---------------------------------------------------------------------------------------------
// ADICIONAR EVENTOS
// ---------------------------------------------------------------------------------------------

    btnSalvarTransacao.addEventListener('click',async ()=>{

        

        if(verificarCampos()){

            document.getElementById('loading').style.display="flex";

            await retornarEstoque(IdProduto)

            // Verificar qnt no estoque

            if(tipoTransacao=="Saída" && parseInt(estoque) < parseInt(Quantity.value) )
                { funcaoAlerta.alerta_campo("Estoque Insuficiente","Não é permitido cadastrar uma saída, pois o estoque desse produto é de " + estoque + " unidades","bg-red-200",undefined) ; 
                document.getElementById('loading').style.display="none";
                return}

            // Adicionar nova transacao

            // ID do produto
            // Nome do produto
            // Data
            // Quantidade
            // Total
            // Tipo
            // Observacao

            const uid = generateUID();

            try{

                await setDoc(doc(db, "Transacoes", uid), {

                idProduto:IdProduto,
                imgProduto:FotoProduto,
                nome:NomeProduto,
                quantidade:parseInt(Quantity.value),
                data:inputDataTransacao.value,
                total:parseFloat(totalTransacao),
                tipo:tipoTransacao,
                subTipo:HeadlineAct.value,
                descricao:inputObsTransacao.value,
                idUsuario:vidUsuario

                });

                alterarEstoqueProduto(IdProduto)

                funcaoAlerta.alerta_campo("Transação Cadastrada com sucesso","Sua transação foi cadastrada com sucesso","bg-green-200",undefined)
            
                setTimeout(function() {
                    window.location.href="pesquisarTransacoes.html";
                }, 3000);

            }

            catch(error){ 
                
                funcaoAlerta.alerta_campo("Falha ao cadastrar a transação",error.message,"bg-red-200",undefined) ;

                console.log(error.message);

                setTimeout( function() { window.location.reload() } , 3000) ;
            
            }


            document.getElementById('loading').style.display="none";

        }



    })

    // -------

    HeadlineAct.addEventListener('change',()=>{

        calcularCustoPreco()
        
    })


    // -------

    Quantity.addEventListener('keyup',()=>{

        calcularCustoPreco()
        
    })

    // -------

    btnAumentarQnt.addEventListener('click',()=>{

        calcularCustoPreco()
        
    })

    // -------

    btnDiminuirQnt.addEventListener('click',()=>{

        calcularCustoPreco()
        
    })




// ---------------------------------------------------------------------------------------------
// FUNCOES
// ---------------------------------------------------------------------------------------------


    function converterStringParaDecimal(valorString) {
        // Remove o símbolo "R$" e quaisquer espaços em branco
        const valorLimpo = valorString.replace(/[^\d.,]/g, '');
    
        // Substitui vírgulas por pontos (caso a vírgula seja usada como separador decimal)
        const valorFormatado = valorLimpo.replace(',', '.');
    
        // Analisa a string formatada como um número de ponto flutuante
        const valorDecimal = parseFloat(valorFormatado);
    
        return valorDecimal;
    }


    // -------

    function verificarCampos(){

        let resultado = true;

        // Campo Data

        if (!regexData.test(inputDataTransacao.value)) 
            { funcaoAlerta.alerta_campo("Atenção","Preencha com uma data válida","bg-red-200",inputDataTransacao) ; resultado = false }

        // Quantidade

        if(resultado)
            {
                if(Quantity.value<=0)
                    { funcaoAlerta.alerta_campo("Atenção","Preencha a quantidade deve ser maior que 0","bg-red-200",Quantity) ; resultado = false }
            }


        // Tipo

        if(resultado)
            {
                if(HeadlineAct.value=="")
                    { funcaoAlerta.alerta_campo("Atenção","Selecione o tipo de transação","bg-red-200",HeadlineAct) ; resultado = false }
            }

        return resultado


    }

    // -------

    function calcularCustoPreco(){

        const valorTipo = HeadlineAct.value

        const valorQnt = Quantity.value

        if(Quantity.value<=0){return}

        objValorTransacao.style.display="flex";


        precoTotal = Quantity.value * converterStringParaDecimal(PrecoProduto);
        custoTotal = Quantity.value * converterStringParaDecimal(CustoProduto);
        faturamentoTotal = Faturamento * Quantity.value;

        if(valorTipo=="Ajuste entrada"||valorTipo=="Bonificaçao"||valorTipo=="Compra"||valorTipo=="Colheita"
        ||valorTipo=="Devoluçao"||valorTipo=="Transf materia")

        {
            txtTotalTransacao.textContent = "Custo Total";
            txtValorTotalTransacao.textContent = "R$ " + custoTotal.toFixed(2);
            diviconTransacao.style.display="none";
            tipoTransacao = "Entrada";
            totalTransacao = custoTotal.toFixed(2);
            return
        }

        if(valorTipo=="Avaria"||valorTipo=="Ajuste saida"||valorTipo=="Consumo"||valorTipo=="Venda"
        ||valorTipo=="Transf produto")

        {
            txtTotalTransacao.textContent = "Preço Total";
            txtValorTotalTransacao.textContent = "R$ " + precoTotal.toFixed(2);
            diviconTransacao.style.display="flex";
            txtValorTotalfaturamento.textContent="R$ " + faturamentoTotal.toFixed(2);
            tipoTransacao = "Saída"
            totalTransacao = precoTotal.toFixed(2);
            return
        }

        
        objValorTransacao.style.display="none";



    }


    // -------


    // funcao para gerar um ID
      
    function generateUID() {
        
        const timestamp = new Date().getTime();
        const randomNum = Math.floor(Math.random() * 1000000) + 1;
    
        const uid = `${timestamp}-${randomNum}`;
      
        return uid;
      }
      

      // ------------------

      async function retornarEstoque(valorIDProduto) {
      
        const querySnapshot = await getDoc(doc(db, "Produtos",valorIDProduto));
    
    
          const data = querySnapshot.data();
    
           estoque = data.estoque;    
        
        
        };

    
      // ------------------

      async function alterarEstoqueProduto(valorIDProduto){


        if
        
        (tipoTransacao=="Entrada"){await updateDoc(doc(db, "Produtos", valorIDProduto), {estoque : parseInt(estoque) + parseInt(Quantity.value)})}

        else

        {await updateDoc(doc(db, "Produtos", valorIDProduto), {estoque : parseInt(estoque) - parseInt(Quantity.value)})}


        


      }
        

    




// ---------------------------------------------------------------------------------------------
// RODAR AO INICIAR A PAGINA
// ---------------------------------------------------------------------------------------------


    // retornar usuario

    await retornarIDUsuario()
        .then((result) => {
            vidUsuario = result;
        });


        // campo data

        inputDataTransacao.valueAsDate = new Date();

        await retornarEstoque(IdProduto)

        
    
        

