

import * as autenticacao from '../variaveis/v_firebase.js';

import * as alerta from './f_alerta_campo.js';


export function validarEntradaSistema(email,password){

    autenticacao.signIn(autenticacao.auth, email.value, password.value)

    .then((userCredential) => {

        alerta.alerta_campo("Dados válidos","Usuário encontrado","bg-green-200",undefined);

        //const user = userCredential.user;
        
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