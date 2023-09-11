


import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";

import { 

    getAuth, 
    signInWithEmailAndPassword 

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

export const signIn = signInWithEmailAndPassword;