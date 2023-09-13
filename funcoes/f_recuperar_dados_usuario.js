

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";

import { 

    getAuth, 
    onAuthStateChanged,
    
} from "https://www.gstatic.com/firebasejs/10.3.1/firebase-auth.js";



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



export function retornarDadosUsuario() {
    return new Promise((resolve, reject) => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          const displayName = user.displayName || '';
          const email = user.email || '';
          const photoURL = user.photoURL || '';
          const emailVerified = user.emailVerified || false;
          
          const usuario = {
            Nome: displayName,
            Email: email,
            Foto: photoURL,
            Verificado: emailVerified
          };
          
          resolve(usuario);
        } else {
          console.log('Não foi possível recuperar dados do usuário na função retornarDadosUsuario');
          reject('Não foi possível recuperar dados do usuário');
        }
      });
    });
  }



  
