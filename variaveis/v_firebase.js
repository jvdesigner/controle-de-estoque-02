


import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";

import { 

    getAuth, 
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    createUserWithEmailAndPassword ,
    onAuthStateChanged,
    sendEmailVerification,
    sendPasswordResetEmail,
    signOut

} from "https://www.gstatic.com/firebasejs/10.3.1/firebase-auth.js";


import * as autenticacao from '../funcoes/f_autenticacao.js'



const firebaseConfig = {
  apiKey: "AIzaSyDBDHzIkLUVHJ3zvWyfEvEVXxXt3lUBSCI",
  authDomain: "controleestoque-480d1.firebaseapp.com",
  projectId: "controleestoque-480d1",
  storageBucket: "controleestoque-480d1.appspot.com",
  messagingSenderId: "1051780975078",
  appId: "1:1051780975078:web:89fc4a2a3404a50b996e27"
};



export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const signIn = signInWithEmailAndPassword;

export const provider = new GoogleAuthProvider();

export const signInPopup = signInWithPopup;

export const createUser =  createUserWithEmailAndPassword; 

export const onAuthState =  onAuthStateChanged; 

export const sendEmail =  sendEmailVerification;

export const sendEmailPassword =  sendPasswordResetEmail;

export const sairConta =  signOut;






  onAuthStateChanged(auth, (user) => {

    

    if (user) {
  
            //alert('usuario conectado')
        
            const displayName = user.displayName;
            const email = user.email;
            const photoURL = user.photoURL;
            const emailVerified = user.emailVerified;
  
            console.log('Nome:'+displayName);
            console.log('Email:'+email);
            console.log('Foto:'+photoURL);
            console.log('Verificado:'+emailVerified);

            const pathname = window.location.pathname;
            const parts = pathname.split('/'); // Divide o caminho em partes separadas por "/"
            const nomeDoArquivo = parts[parts.length - 1]; // Obtém a última parte, que é o nome do arquivo
  
            if (nomeDoArquivo == 'login.html') {
           
              if(emailVerified){window.location.href = "home.html"}
              else{
                sendEmailVerification(user).then(() => {
                  window.location.href = "verificarEmail.html";
                  
                });;
              }
          }
          



  
    } else {
  
        
  
    };
  
  
  });
  











