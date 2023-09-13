



import * as funcao_login from './funcoes/f_login.js';

import * as funcaoalerta from './funcoes/f_alerta_campo.js';

import * as autenticacao from './funcoes/f_autenticacao.js'

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";

import { getAuth, updatePassword,deleteUser } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyDBDHzIkLUVHJ3zvWyfEvEVXxXt3lUBSCI",
    authDomain: "controleestoque-480d1.firebaseapp.com",
    projectId: "controleestoque-480d1",
    storageBucket: "controleestoque-480d1.appspot.com",
    messagingSenderId: "1051780975078",
    appId: "1:1051780975078:web:89fc4a2a3404a50b996e27"
  };
  
  
  
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);



const olhoaberto = document.getElementById('olhoaberto');

const olhoaberto2 = document.getElementById('olhoaberto2');

const olhofechado = document.getElementById('olhofechado');

const olhofechado2 = document.getElementById('olhofechado2');

const campoSenha = document.getElementById('txt-senha-login');

const campoSenha2 = document.getElementById('txt-senha-login2');


const btnsalvarsenha = document.getElementById('btnsalvarsenha');

const btnexcluirconta = document.getElementById('btnexcluirconta');

const modalExcluirConta = document.getElementById('modalExcluirConta');

const btnSimExcluir = document.getElementById('btnSimExcluir');

const btnNaoExcluir = document.getElementById('btnNaoExcluir');


btnexcluirconta.addEventListener('click',()=>{

    modalExcluirConta.style.display="flex"

})

btnNaoExcluir.addEventListener('click',()=>{

    modalExcluirConta.style.display="none"

})

btnSimExcluir.addEventListener('click',()=>{

    

    deleteUser(auth.currentUser).then(() => {

        funcaoalerta.alerta_campo("Sua conta foi excluida","Você sairá do sistema automaticamente","bg-green-200",undefined);

        setTimeout(function () {
            window.location.href="login.html"
          }, 3000);

        
    

    }).catch((error) => {

        if(error.message=="Firebase: Error (auth/requires-recent-login)."){

            funcaoalerta.alerta_campo("Tempo expirado","Entre na sua conta e tente novamente","bg-red-200",undefined);

            setTimeout(()=>autenticacao.sairConta(),3000)


        }

        console.log(error.message)
    

    });




})



function alterarSenha(){

    updatePassword(auth.currentUser, campoSenha.value).then(() => {

        funcaoalerta.alerta_campo("Senha alterada com sucesso","Sua senha foi alterada com sucesso","bg-green-200",undefined);

        setTimeout(function () {
            location.reload();
          }, 2000);

    }).catch((error) => {

        if(error.message=="Firebase: Error (auth/requires-recent-login)."){

            funcaoalerta.alerta_campo("Tempo expirado","Entre na sua conta e tente novamente","bg-red-200",undefined);

            setTimeout(()=>autenticacao.sairConta(),3000)


        }

        console.log(error.message)

    });



}








if(olhoaberto){olhoaberto.addEventListener('click',()=>{ funcao_login.visibilidadeSenhaaberto(olhoaberto,olhofechado,campoSenha) })};

if(olhofechado){olhofechado.addEventListener('click',()=>{ funcao_login.visibilidadeSenhafechado(olhoaberto,olhofechado,campoSenha) })}

if( olhoaberto2 ){ olhoaberto2.addEventListener('click',()=>{ funcao_login.visibilidadeSenhaaberto(olhoaberto2,olhofechado2,campoSenha2) }) }

if( olhofechado2 ){ olhofechado2.addEventListener('click',()=>{ funcao_login.visibilidadeSenhafechado(olhoaberto2,olhofechado2,campoSenha2) }) }






if(btnsalvarsenha){

    btnsalvarsenha.addEventListener('click',()=>{

        let v_result = false;
    
        v_result = funcao_login.validarSenha(campoSenha)

        if(v_result){v_result = funcao_login.validarSenha(campoSenha2);}

        if(v_result){v_result = funcao_login.validarSenhaConfirmada(campoSenha,campoSenha2) ;}

        if(v_result){ alterarSenha() }
        
    
    })

}



