

import * as funcoes from '../funcoes/f_darkmode.js'


// DarkMode

const btndarkmode = document.getElementById('AcceptConditions');
const objdark = document.getElementById('divdark');
const objlight = document.getElementById('divlight');

btndarkmode.addEventListener('change',()=>{funcoes.efeitoDarkmode();

    

    if(objdark.style.display=="flex"){
        objlight.style.display="flex";
        objdark.style.display="none"
    }
    else{
        objlight.style.display="none";
        objdark.style.display="flex"
    }

});

if (localStorage.getItem('darkMode') === 'true') {

    btndarkmode.checked  = true;

    objlight.style.display="none";
    objdark.style.display="flex"


} else {

    document.querySelector('html').classList.remove('dark');

    btndarkmode.checked  = false;

    objlight.style.display="flex";
    objdark.style.display="none"

}