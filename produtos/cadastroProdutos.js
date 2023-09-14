
// ---------------------------------------------------------------------------------------------
// IMPORT FUNCOES
// ---------------------------------------------------------------------------------------------


    import * as funcao_campos_obrigatorios from '../funcoes/f_campos_obrigatorios.js';

    import * as funcao_apresentar_imagem from '../funcoes/f_imagem.js';

    import * as funcao_alerta from '../funcoes/f_alerta_campo.js';


// ---------------------------------------------------------------------------------------------
// IMPORT FIREBASE
// ---------------------------------------------------------------------------------------------

    import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";

    import { getFirestore,doc,setDoc } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-firestore.js";



    const firebaseConfig = {
        apiKey: "AIzaSyDBDHzIkLUVHJ3zvWyfEvEVXxXt3lUBSCI",
        authDomain: "controleestoque-480d1.firebaseapp.com",
        projectId: "controleestoque-480d1",
        storageBucket: "controleestoque-480d1.appspot.com",
        messagingSenderId: "1051780975078",
        appId: "1:1051780975078:web:89fc4a2a3404a50b996e27"
      };
      
      
      
    const app = initializeApp(firebaseConfig);

    const db = getFirestore(app);




// ---------------------------------------------------------------------------------------------
// VARIAVEIS DO DOCUMENTO
// ---------------------------------------------------------------------------------------------


    const formCadastrarProduto = document.getElementById('formCadastrarProduto');       // Formulario

    const imgInput = document.getElementById('imgInput');                               // Imagem do produto

    const fotoProduto = document.getElementById('fotoProduto');                         // Input Imagem do produto

    const inputNomeProduto = document.getElementById('inputNomeProduto');               // Nome do produto

    const inputCategoriaProduto = document.getElementById('inputCategoriaProduto');     // Categoria do produto

    const inputPrecoProduto = document.getElementById('inputPrecoProduto');             // Preco do produto

    const inputCustoProduto = document.getElementById('inputCustoProduto');             // Custo do produto

    const inputDescricaoProduto = document.getElementById('inputDescricaoProduto');     // Descricao do produto

    const btnSalvarProduto = document.getElementById('btnSalvarProduto');               // Botao de salvar




// ---------------------------------------------------------------------------------------------
// FUNCOES
// ---------------------------------------------------------------------------------------------

    function verificarCampoNumerico(campo){

        let resultado = false;

        const inputValue = campo.value;

        const numericRegex = /^[0-9]+(\.[0-9]+)?$/;

        if (!numericRegex.test(inputValue)) {

            funcao_alerta.alerta_campo("Atenção","Esse campo deve ter um valor numérico","bg-red-200",campo)

        } else { resultado = true; }

        return resultado;

    };


    // ------------------


    function resetForm(form) {
      
       
        form.querySelectorAll("input").forEach(function (input) {
         
          input.value = ""; 
          
        });

      };
      
      // ------------------

      function generateUID() {
        // Gere um timestamp único (milissegundos desde 1 de janeiro de 1970)
        const timestamp = new Date().getTime();
      
        // Gere um número aleatório entre 1 e 1000000
        const randomNum = Math.floor(Math.random() * 1000000) + 1;
      
        // Concatene o timestamp e o número aleatório para criar o UID
        const uid = `${timestamp}-${randomNum}`;
      
        return uid;
      }
      

      // ------------------

      async function adicionarProduto(vfoto,vnome,vcategoria,vpreco,vcusto,vdescricao){

            const uid = generateUID();

            await setDoc(doc(db, "Produtos", uid), {

            foto:vfoto,
            nome:vnome,
            categoria:vcategoria,
            preco:parseFloat(vpreco),
            custo:parseFloat(vcusto),
            descricao:vdescricao

            });

            funcao_alerta.alerta_campo("Produto Cadastrado com sucesso",vnome + " foi cadastrado com sucesso","bg-green-200",undefined)
          
            setTimeout(function() {
                window.location.reload();
              }, 3000);

      }

      // ------------------


      
      



// ---------------------------------------------------------------------------------------------
// EVENTOS
// ---------------------------------------------------------------------------------------------

    btnSalvarProduto.addEventListener('click',()=>{                                          // Adicionar no evento click 

        let resultado = false;

        resultado = funcao_campos_obrigatorios.verificarCamposVazios(formCadastrarProduto);  // funcao para verificar campos obrigatorios

        if(resultado){ resultado = verificarCampoNumerico(inputPrecoProduto) }

        if(resultado){ resultado = verificarCampoNumerico(inputCustoProduto) }


        if(resultado){ adicionarProduto("",inputNomeProduto.value,inputCategoriaProduto.value,inputPrecoProduto.value,inputCustoProduto.value,inputDescricaoProduto.value) }

        
        

    });


// ---------------------------------------------------------------------------------------------
// RODAR AO INICIAR A PAGINA
// ---------------------------------------------------------------------------------------------


    if(fotoProduto){funcao_apresentar_imagem.abrirImagem(fotoProduto,imgInput);}