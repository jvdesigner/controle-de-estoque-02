
import * as autenticacao from './funcoes/f_autenticacao.js';

import * as firebase from './variaveis/v_firebase.js'


//AcceptConditions

const AcceptConditions = document.getElementById('AcceptConditions');
const light = document.getElementById('divlight');
const dark = document.getElementById('divdark');

const fotoMenuUsuairo = document.getElementById('fotoMenuUsuairo');
const fotoMenuUsuairo2 = document.getElementById('fotoMenuUsuairo2');
const nomeMenuUsuairo = document.getElementById('nomeMenuUsuairo');
const emailMenuUsuairo = document.getElementById('emailMenuUsuairo');




const btnSairConta = document.getElementById('btnSairConta');


light.addEventListener('click',()=>{
   
    light.style.display="none";
    dark.style.display="flex";

})

dark.addEventListener('click',()=>{
   
    light.style.display="flex";
    dark.style.display="none";

})



if(btnSairConta){

    btnSairConta.addEventListener('click',()=>{

        autenticacao.sairConta();


    })



}

firebase.onAuthState(firebase.auth, (user) => {

    if (user) {
  
        
            const displayName = user.displayName;
            const email = user.email;
            const photoURL = user.photoURL;
            const emailVerified = user.emailVerified;
  
            if(photoURL){fotoMenuUsuairo.src = photoURL;fotoMenuUsuairo2.src = photoURL};
            if(displayName){nomeMenuUsuairo.innerHTML=displayName};
            if(email){emailMenuUsuairo.innerHTML=email};
          
  
    };
  
  
  });
