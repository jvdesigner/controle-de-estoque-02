

import * as funcaoImg from './funcoes/f_imagem.js'; 

import * as funcaologin from './funcoes/f_login.js';

import * as funcaoObrigatorio from './funcoes/f_campos_obrigatorios.js';

import * as funcaoRecuperarDados from './funcoes/f_recuperar_dados_usuario.js';

import * as funcaostorage from './funcoes/f_storage.js';

import * as funcao_autenticacao from './funcoes/f_autenticacao.js';




const btnirparaeditarperfil = document.getElementById('btnirparaeditarperfil');

const fotousuario = document.getElementById('fotousuario');

const imgInput = document.getElementById('imgInput');

const inputPerfilEmail = document.getElementById('inputPerfilEmail');
const inputPerfilNome = document.getElementById('inputPerfilNome');

const btnSalvarPerfil = document.getElementById('btnSalvarPerfil');

const formEditarPerfil = document.getElementById('formEditarPerfil');

const loading = document.getElementById('loading');




if(window.location.href.includes("editarPerfil.html")){

    funcaoRecuperarDados.retornarDadosUsuario()
  .then((usuario) => {
    
    inputPerfilNome.value = usuario.Nome

    inputPerfilEmail.value = usuario.Email

    if(usuario.Foto){imgInput.src = usuario.Foto}



  })
  .catch((error) => {
    console.error(error);
  });

}



if(btnirparaeditarperfil){

    btnirparaeditarperfil.addEventListener('click',()=>{

        window.location.href="editarPerfil.html";

    })

}


if(fotousuario){funcaoImg.abrirImagem(fotousuario,imgInput);}


if(btnSalvarPerfil){

    btnSalvarPerfil.addEventListener('click', async ()=>{

        let resultado = true;
     
        resultado = funcaologin.validarEmail(inputPerfilEmail);

        if(resultado){ resultado = funcaoObrigatorio.verificarCamposVazios(formEditarPerfil) }


        // Salvar informacoes

        if(resultado){

            let foto;
            let nomefoto;
            let urlfoto;

            if(fotousuario.files[0]){
                foto = fotousuario.files[0],
                nomefoto = foto.name
            }else{
                foto = null
                urlfoto = imgInput.src
            };

            loading.style.display="flex"

            if(foto){

               
                
                funcaostorage.uploadImg(foto, nomefoto, inputPerfilNome.value,inputPerfilEmail.value)

                
                
            }

            else{

                

                funcaostorage.AlterarEmailNome(urlfoto,inputPerfilNome.value,inputPerfilEmail.value)

                

            }

            





        }
         
        
     });

}





