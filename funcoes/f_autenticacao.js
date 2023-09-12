

import * as autenticacao from '../variaveis/v_firebase.js';
import { emailRegex } from '../variaveis/v_login.js';

import * as alerta from './f_alerta_campo.js';


export function validarEntradaSistema(email,password){

 

    autenticacao.signIn(autenticacao.auth, email.value, password.value)

    .then((userCredential) => {

        //alerta.alerta_campo("Dados válidos","Usuário encontrado","bg-green-200",undefined);

        

        autenticacao.onAuthState(autenticacao.auth, (user) => {
            if (user) {
             
                const displayName = user.displayName;
                const email = user.email;
                const photoURL = user.photoURL;
                const emailVerified = user.emailVerified;
    
                console.log('Nome:'+displayName);
                console.log('Email:'+email);
                console.log('Foto:'+photoURL);
                console.log('Verificado:'+emailVerified);

                if(!emailVerified){
                    
                    autenticacao.sendEmail(user).then(() => {
                        window.location.href = "verificarEmail.html";
                        
                      });;
                };
              
            }
          });
        
        
    })

    .catch((error) => {

        const errorCode = error.code;

        const errorMessage = error.message;

        switch (errorMessage) {

            case 'Firebase: Error (auth/user-not-found).':

                alerta.alerta_campo("Usuário não encontrado","Verifique o email preenchido","bg-red-200",email);

                break;
          
            case 'Firebase: Error (auth/wrong-password).':

                alerta.alerta_campo("Senha incorreta","Verifique a senha preenchida","bg-red-200",password);
              
                break;
          
            default:

                alerta.alerta_campo("Erro de autenticação",errorMessage,"bg-red-200",undefined);
              
          }
          

    });

}
;



export function validarGoogle(){

    
   autenticacao.signInPopup(autenticacao.auth, autenticacao.provider)
  .then((result) => {


    //alerta.alerta_campo("Dados válidos","Usuário encontrado","bg-green-200",undefined);

    autenticacao.onAuthState(autenticacao.auth, (user) => {
        if (user) {
         
            const displayName = user.displayName;
            const email = user.email;
            const photoURL = user.photoURL;
            const emailVerified = user.emailVerified;

            console.log('Nome:'+displayName);
            console.log('Email:'+email);
            console.log('Foto:'+photoURL);
            console.log('Verificado:'+emailVerified);
          
        }
      });



  }).catch((error) => {

    const errorCode = error.code;
    const errorMessage = error.message;

    if(errorMessage!=="Firebase: Error (auth/popup-closed-by-user)."){

        alerta.alerta_campo("Erro de autenticação",errorMessage,"bg-red-200",undefined);

        console.log(errorMessage)

    }

  });




};



export function CriarConta(email,password){

    autenticacao.createUser(autenticacao.auth, email.value, password.value)

    .then((userCredential) => {

        alerta.alerta_campo("Conta Criada","Conta criada com sucesso","bg-green-200",undefined);

        autenticacao.onAuthState(autenticacao.auth, (user) => {
            if (user) {
             
                const displayName = user.displayName;
                const email = user.email;
                const photoURL = user.photoURL;
                const emailVerified = user.emailVerified;
    
                console.log('Nome:'+displayName);
                console.log('Email:'+email);
                console.log('Foto:'+photoURL);
                console.log('Verificado:'+emailVerified);

                if(!emailVerified){
                    
                    autenticacao.sendEmail(user).then(() => {
                        window.location.href = "verificarEmail.html";
                      });;
                };
              
            }
          });
        
    })

    .catch((error) => {

        const errorCode = error.code;

        const errorMessage = error.message;

        switch (errorMessage) {

            case 'Firebase: Error (auth/email-already-in-use).':

                alerta.alerta_campo("Esse usuário já existe","Verifique o email preenchido","bg-red-200",email);

                break;
          
            
          
            default:

                alerta.alerta_campo("Erro de autenticação",errorMessage,"bg-red-200",undefined);

                console.log(errorMessage)
              
          }
          

    });


}
;


export function enviarrecuperacaosenha(email){

    autenticacao.sendEmailPassword(autenticacao.auth, email.value)
  .then(() => {

    alerta.alerta_campo("Verifique seu email","Um link foi enviado para seu email para redefinir sua senha","bg-green-200",undefined);

    setTimeout(()=>window.location.href = "login.html",3000);
    
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;

    switch (errorMessage) {

        case 'Firebase: Error (auth/user-not-found).':

            alerta.alerta_campo("Email não cadastrado","Verifique o email preenchido","bg-red-200",email);

            break;
      
        
      
        default:

            alerta.alerta_campo("Erro de autenticação",errorMessage,"bg-red-200",undefined);

            console.log(errorMessage)
          
      }

    console.log(errorMessage);
    
  });




};


export function sairConta(){

    autenticacao.sairConta(autenticacao.auth).then(() => {

        window.location.href = "login.html";

        
      }).catch((error) => {

        alerta.alerta_campo("Erro","Falha ao sair da conta","bg-red-200",undefined);
        
        console.log(error.message)

      });





};



