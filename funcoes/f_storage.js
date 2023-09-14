

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";

import { getAuth, updateProfile,updateEmail } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-auth.js";


import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-storage.js";

import * as funcao_alerta_campo from './f_alerta_campo.js';

import * as autenticacao from './f_autenticacao.js'



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

const storage = getStorage();

let resultado;

export async function uploadImg(file,nomearquivo,displayname,email){


   await updateEmail(auth.currentUser, email).then(() => {
        
        resultado = true

        console.log('email alterado com sucesso')

    

      }).catch((error) => {

        const mensagem = error.message;

        switch (mensagem) {

            case 'Firebase: Error (auth/email-already-in-use).':

            document.getElementById('loading').style.display="none"
    
                funcao_alerta_campo.alerta_campo("Esse email já existe em outra conta","Verifique o email preenchido","bg-red-200",email);
    
                break;
            
            
          
            default:

                document.getElementById('loading').style.display="none"
    
                funcao_alerta_campo.alerta_campo("Tempo expirado","Entre na sua conta e tente novamente","bg-red-200",undefined);

                setTimeout(()=>autenticacao.sairConta(),3000)

    
                console.log(mensagem)
              
          }
    
        
       
        resultado = false

        

      });

      console.log(resultado)

      if(!resultado){return}

      


    const storageRef = ref(storage, nomearquivo);


    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed', 

    (snapshot) => {

        

        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        console.log('Upload is ' + progress + '% done');

        switch (snapshot.state) {

        case 'paused':

            console.log('Upload is paused');

            break;

        case 'running':

            console.log('Upload is running');

            break;
        }
    }, 
    (error) => {

        console.log(error.message)
        document.getElementById('loading').style.display="none"
    
    }, 
    () => {
    
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {

        console.log('File available at', downloadURL);

        updateProfile(auth.currentUser, {
            displayName: displayname, photoURL: downloadURL
        }).then(() => {

            document.getElementById('loading').style.display="none"

            funcao_alerta_campo.alerta_campo("Perfil Atualizado com sucesso","Suas informações foram salvas com sucesso","bg-green-200",undefined)

            window.location.href="verPerfil.html";
            

        }).catch((error) => {

            document.getElementById('loading').style.display="none"
            
            funcao_alerta_campo.alerta_campo("Erro",error.message,"bg-red-200",undefined)

            console.log(error.message)
        });


        });

    }

    );




}


export async function AlterarEmailNome(url,displayname,email){


    await updateEmail(auth.currentUser, email).then(() => {
        
        resultado = true

      }).catch((error) => {

        const mensagem = error.message;

        switch (mensagem) {

            case 'Firebase: Error (auth/email-already-in-use).':

                document.getElementById('loading').style.display="none"

                console.log(mensagem)
    
                funcao_alerta_campo.alerta_campo("Erro","Esse email já existe em outra conta","bg-red-200",undefined)
    
                break;
            
            
          
            default:

                document.getElementById('loading').style.display="none"
    
                funcao_alerta_campo.alerta_campo("Tempo expirado","Entre na sua conta e tente novamente","bg-red-200",undefined);

                setTimeout(()=>autenticacao.sairConta(),3000)
                

    
                console.log(mensagem)
              
          }
    
        
       
        resultado = false

      });

      
      if(!resultado){return}


        updateProfile(auth.currentUser, {
            displayName: displayname, photoURL: url
        }).then(() => {

            document.getElementById('loading').style.display="none"

            funcao_alerta_campo.alerta_campo("Perfil Atualizado com sucesso","Suas informações foram salvas com sucesso","bg-green-200",undefined)

            window.location.href="verPerfil.html";
            

        }).catch((error) => {

            document.getElementById('loading').style.display="none"
            
            funcao_alerta_campo.alerta_campo("Erro",error.message,"bg-red-200",undefined)

            console.log(error.message)
        });


};














