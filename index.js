

 // Importando funcoes

 
import * as funcoes from "./funcoes/f_darkmode.js";


// ------------------------------------------------------------------------


// importando variaveis


import * as elementos from "./variaveis/elementos.js";



// ------------------------------------------------------------------------


// Efeito DarkMode


elementos.toggle.addEventListener('change',()=>funcoes.efeitoDarkmode());

if (localStorage.getItem('darkMode') === 'true') {

    elementos.toggle.checked  = true;

} else {

    document.querySelector('html').classList.remove('dark');

    elementos.toggle.checked  = false;
}

document.querySelector('html').style.display="block";

AOS.init();

// ------------------------------------------------------------------------













