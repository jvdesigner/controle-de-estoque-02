
import * as autenticacao from './funcoes/f_autenticacao.js';

import * as firebase from './variaveis/v_firebase.js'


//AcceptConditions

const AcceptConditions = document.getElementById('AcceptConditions');
const light = document.getElementById('divlight');
const dark = document.getElementById('divdark');

const fotoMenuUsuairo = document.getElementById('fotoMenuUsuairo');
const fotoMenuUsuairo2 = document.getElementById('fotoMenuUsuairo2');
const fotoMenuUsuairo3 = document.getElementById('fotoMenuUsuairo3');
const nomeMenuUsuairo = document.getElementById('nomeMenuUsuairo');
const nomeMenuUsuairo3 = document.getElementById('nomeMenuUsuairo3');
const emailMenuUsuairo = document.getElementById('emailMenuUsuairo');
const emailMenuUsuairo3 = document.getElementById('emailMenuUsuairo3');

const modalperfil = document.getElementById('modalperfil');


const btnSairConta = document.getElementById('btnSairConta');


if(fotoMenuUsuairo2){

    fotoMenuUsuairo2.addEventListener('click',()=>{

        if(modalperfil){

            if(modalperfil.style.display=="flex"){modalperfil.style.display="none"}
            else{modalperfil.style.display="flex"}


        }

    })


}


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

            
            if(fotoMenuUsuairo3&&photoURL){fotoMenuUsuairo3.src = photoURL}
            if(displayName&&nomeMenuUsuairo3){nomeMenuUsuairo3.innerHTML=displayName};
            if(email&&emailMenuUsuairo3){emailMenuUsuairo3.innerHTML=email};
            
          
  
    };
  
  
  });
