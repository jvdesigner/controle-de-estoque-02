
// ---------------------------------------------------------------------------------------------
// IMPORT FUNCOES
// ---------------------------------------------------------------------------------------------


    import * as funcao_campos_obrigatorios from '../funcoes/f_campos_obrigatorios.js';  // Funcao para verificar campos obrigatorios

    import * as funcao_apresentar_imagem from '../funcoes/f_imagem.js';                 // funcao para apresentar imagem no formulario

    import * as funcao_alerta from '../funcoes/f_alerta_campo.js';                      // funcao para emitir alertas para o usuario


// ---------------------------------------------------------------------------------------------
// IMPORT FIREBASE
// ---------------------------------------------------------------------------------------------

    import { initializeApp } 
    from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";                   // importar o app

    import { getFirestore,doc,setDoc,updateDoc } 
    from "https://www.gstatic.com/firebasejs/10.3.1/firebase-firestore.js";             // importar firestore

    import { getStorage, ref, uploadBytesResumable, getDownloadURL }                    // importar storage
    from "https://www.gstatic.com/firebasejs/10.3.1/firebase-storage.js";

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

    const storage = getStorage();

    const auth = getAuth(app);

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

    const btnEditarProduto = document.getElementById('btnEditarProduto');               // Editar




// ---------------------------------------------------------------------------------------------
// FUNCOES
// ---------------------------------------------------------------------------------------------

    // Funcao para verificar se o campo contem valor numerico

    function verificarCampoNumerico(campo){

        let resultado = false;

        const inputValue = campo.value;

        const numericRegex = /^[0-9]+(\.[0-9]+)?$/;

        if (!numericRegex.test(inputValue)) {

            funcao_alerta.alerta_campo("Atenção","Esse campo deve ter um valor numérico, use . para decimal","bg-red-200",campo)

        } else { resultado = true; }

        return resultado;

    };


    // ------------------


    // funcao para resetar um formulario
    
    function resetForm(form) {
      
       
        form.querySelectorAll("input").forEach(function (input) {
         
          input.value = ""; 
          
        });

      };
      
      // ------------------

      // funcao para gerar um ID
      
      function generateUID() {
        
        const timestamp = new Date().getTime();
        const randomNum = Math.floor(Math.random() * 1000000) + 1;
    
        const uid = `${timestamp}-${randomNum}`;
      
        return uid;
      }
      

      // ------------------

      // funcao para adicionar um produto
      
      async function adicionarProduto(vfoto,vnome,vcategoria,vpreco,vcusto,vdescricao){

                 
            if (vfoto instanceof Promise) {
               
                vfoto.then(valor => {
                  
                    if (valor === undefined) {
                        vfoto = ""; 
                    }
                }).catch(erro => {
                    console.error('Erro na promessa:', erro);
                });
            } else {
               
            };

            if(!vfoto){vfoto=""};

        

            const uid = generateUID();

            

            try{

                await setDoc(doc(db, "Produtos", uid), {

                foto:vfoto,
                nome:vnome,
                categoria:vcategoria,
                preco:parseFloat(vpreco),
                custo:parseFloat(vcusto),
                estoque:0,
                descricao:vdescricao,
                idUsuario:vidUsuario

                });

                funcao_alerta.alerta_campo("Produto Cadastrado com sucesso",vnome + " foi cadastrado com sucesso","bg-green-200",undefined)
            
                setTimeout(function() {
                    window.location.href="pesquisarProdutos.html";
                }, 3000);

            }

            catch(error){ 
                
                funcao_alerta.alerta_campo("Falha ao cadastrar o produto",error.message,"bg-red-200",undefined) ;

                console.log(error.message);

                setTimeout( function() { window.location.reload() } , 3000) ;
            
            }

      };

      
      // ------------------


      // funcao para adicionar um produto
      
      async function editarProduto(vfoto,vnome,vcategoria,vpreco,vcusto,vdescricao){

                 
        if (vfoto instanceof Promise) {
           
            vfoto.then(valor => {
              
                if (valor === undefined) {
                    vfoto = ""; 
                }
            }).catch(erro => {
                console.error('Erro na promessa:', erro);
            });
        } else {
           
        };

        if(!vfoto){vfoto=""};

        const urlParams = new URLSearchParams(window.location.search);

        const uid = urlParams.get("vIdProduto");;

        try{

            await updateDoc(doc(db, "Produtos", uid), {

            foto:vfoto,
            nome:vnome,
            categoria:vcategoria,
            preco:parseFloat(vpreco),
            custo:parseFloat(vcusto),
            descricao:vdescricao

            });

            funcao_alerta.alerta_campo("Produto Editado com sucesso",vnome + " foi editado com sucesso","bg-green-200",undefined)
        
            setTimeout(function() {
                window.location.href="pesquisarProdutos.html";
            }, 3000);

        }

        catch(error){ 
            
            funcao_alerta.alerta_campo("Falha ao editar o produto",error.message,"bg-red-200",undefined) ;

            console.log(error.message);

            setTimeout( function() { window.location.reload() } , 3000) ;
        
        }

  };

  
  // ------------------




      // funcao para fazer upload de imagem

      export async function uploadImg(file) {

        if(!file){return};

        const nomearquivo = file.name;

        const storageRef = ref(storage, nomearquivo);
    
        try {

            await uploadBytesResumable(storageRef, file);

            const downloadURL = await getDownloadURL(storageRef);

            return downloadURL;

        } catch (error) {

            funcao_alerta.alerta_campo("Falha ao fazer upload da imagem",error.message,"bg-red-200",undefined) ;
           
            console.error('Erro ao fazer o upload:', error);

            throw error; 
        }
    }
    



// ---------------------------------------------------------------------------------------------
// EVENTOS
// ---------------------------------------------------------------------------------------------

    // adicionar a funcao para cadastrar produtos ao botao de salvar do formulario

    if(btnSalvarProduto){

        btnSalvarProduto.addEventListener('click',async ()=>{                                          

            let resultado = false;

            resultado = funcao_campos_obrigatorios.verificarCamposVazios(formCadastrarProduto); 

            if(resultado){ resultado = verificarCampoNumerico(inputPrecoProduto) }

            if(resultado){ resultado = verificarCampoNumerico(inputCustoProduto) }

            if(resultado){ 

                if( parseFloat(inputCustoProduto.value) > parseFloat(inputPrecoProduto.value) ){

                    funcao_alerta.alerta_campo("O preço deve ser maior que o custo","Verifique o valor no campo do preço","bg-red-200",inputPrecoProduto) ;

                    resultado = false

                }

            };



            if(resultado){ 

                document.getElementById('loading').style.display="flex";


                const imagemProduto = fotoProduto.files[0] ;

                const fotoimg = await uploadImg(imagemProduto);

            
                await adicionarProduto(fotoimg,inputNomeProduto.value,inputCategoriaProduto.value,inputPrecoProduto.value,inputCustoProduto.value,inputDescricaoProduto.value) 

                document.getElementById('loading').style.display="none";
            
            }

            
            

        }); 

    };


    //-----------------------------------------------------------------------------------


        // adicionar a funcao para editar produtos ao botao de salvar do formulario

        if(btnEditarProduto){

            btnEditarProduto.addEventListener('click',async ()=>{                                          
    
                let resultado = false;
    
                resultado = funcao_campos_obrigatorios.verificarCamposVazios(formCadastrarProduto); 
    
                if(resultado){ resultado = verificarCampoNumerico(inputPrecoProduto) }
    
                if(resultado){ resultado = verificarCampoNumerico(inputCustoProduto) }
    
                if(resultado){ 
    
                    if( parseFloat(inputCustoProduto.value) > parseFloat(inputPrecoProduto.value) ){
    
                        funcao_alerta.alerta_campo("O preço deve ser maior que o custo","Verifique o valor no campo do preço","bg-red-200",inputPrecoProduto) ;
    
                        resultado = false
    
                    }
    
                };
    
    
    
                if(resultado){ 
    
                    document.getElementById('loading').style.display="flex";
    
    
                    const imagemProduto = fotoProduto.files[0] ;
    
                    let fotoimg = await uploadImg(imagemProduto);

                    if(!imagemProduto){fotoimg=imgInput.src}
    
                    await editarProduto(fotoimg,inputNomeProduto.value,inputCategoriaProduto.value,inputPrecoProduto.value,inputCustoProduto.value,inputDescricaoProduto.value) 
    
                    document.getElementById('loading').style.display="none";
                
                }
    
                
                
    
            }); 
    
        };
    
    
        //-----------------------------------------------------------------------------------


// ---------------------------------------------------------------------------------------------
// RODAR AO INICIAR A PAGINA
// ---------------------------------------------------------------------------------------------


    // adicionar a funcao de apresentar imagem no formulario ao input do tipo file

    if(fotoProduto){funcao_apresentar_imagem.abrirImagem(fotoProduto,imgInput);}

    await retornarIDUsuario()
        .then((result) => {
            vidUsuario = result;
        });

    

    


  

    

    

