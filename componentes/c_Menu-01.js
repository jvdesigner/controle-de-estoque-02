

// importando funcao

import * as funcoes from "../funcoes/f_darkmode.js";

// const html = document.getElementsByTagName('html');

// const objToggle = componentes.menu01.shadowRoot.querySelector('#toggle')

// funcoes.objDarkMode(objToggle,html);


class menu01 extends HTMLElement {

    constructor() {

        super();
  
        this.attachShadow({ mode: 'open' });

        //const txtbtn = this.getAttribute('text') || 'Entrar';
  
        this.shadowRoot.innerHTML = `
  
            <link href="./output.css" rel="stylesheet">
            
            <!-- HEADER -->

    
            <header class="  bg-white dark:bg-dark px-4 py-6 drop-shadow-md flex justify-between z-20 relative">
            
                <a class="flex gap-4 " href="#">
            
                  <img class="w-6 sm:w-8" src="https://ouch-cdn2.icons8.com/YjPrj9uG0t5rlAYH87OZhatg56bfDk2HYabBvJcfRWA/rs:fit:368:383/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9wbmcvMTky/L2I2YjBlM2U3LTk2/MDktNGI3Ny05M2Y3/LWE1OWMxMzcwNjJl/OC5wbmc.png" alt="">
            
                  <h1 class="text-xl text-gray-500 sm:text-2xl hover:text-indigo-600 dark:text-gray-200">Estoque Fácil</h1>
            
                </a>
            
                <label for="AcceptConditions" class="relative h-6 w-12 cursor-pointer">
            
                  <input type="checkbox" id="AcceptConditions" class="peer sr-only" />
            
                  <span
                    class="absolute inset-0 rounded-full bg-white/90 outline outline-gray-100 outline-2 transition peer-checked:bg-dark"
                  ></span>
            
                  <span
                    class="absolute inset-y-0 start-0 m-1 h-4 w-4 rounded-full dark:bg-primary bg-primary/40  transition-all peer-checked:start-6"
                  ></span>
            
                </label>
            
            </header>
            
            <!--------------------------------------------------->
          
  
        `;

      const objToggle = this.shadowRoot.querySelector('#AcceptConditions');
      
      objToggle.addEventListener('change',()=>funcoes.efeitoDarkmode());
      
      



    }
  }
  

  customElements.define('menu-01', menu01);

  
  
  