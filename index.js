



 // Importando funcoes

 
import * as funcoes from "./funcoes/f_darkmode.js";



// ------------------------------------------------------------------------


// importando variaveis


import * as elementos from "./variaveis/v_elementos.js";



// ------------------------------------------------------------------------


// Efeito DarkMode



elementos.toggle.addEventListener('change',()=>funcoes.efeitoDarkmode());

if (localStorage.getItem('darkMode') === 'true') {

    elementos.toggle.checked  = true;

} else {

    document.querySelector('html').classList.remove('dark');

    elementos.toggle.checked  = false;
}

// ------------------------------------------------------------------------

// Mostrar elementos na tela

document.querySelector('html').style.display="block";

// ------------------------------------------------------------------------

// Efeitos de animacao

AOS.init();

// ------------------------------------------------------------------------







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



export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);


  onAuthStateChanged(auth, (user) => {

    

    if (user) {
  
  
    } else {
  
        if (

            !window.location.href.includes("index.html") &&

            !window.location.href.includes("login.html") &&

            !window.location.href.includes("cadastrarConta.html") 
            
            ) {
            
                window.history.back();

          }
  
    };
  
  
  });
  
























