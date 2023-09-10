

 // Importando funcoes

 
import * as funcoes from "./funcoes/f_darkmode.js";
import * as f_alerta from "./funcoes/f_alerta_campo.js";


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

// ------------------------------------------------------------------------

// Mostrar elementos na tela

document.querySelector('html').style.display="block";

// ------------------------------------------------------------------------

// Efeitos de animacao

AOS.init();

// ------------------------------------------------------------------------


//f_alerta.alerta_campo("Login Efetuado com sucesso","Os dados estao certos","bg-green-200",undefined)












