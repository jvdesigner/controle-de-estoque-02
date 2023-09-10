
// colocar o efeito darkmode na pagina


export function efeitoDarkmode() {

    const html = document.querySelector('html');

    const varDarkmode = html.classList.contains('dark'); // Obtém o estado atual do dark mode

    if (varDarkmode) {

        html.classList.remove('dark'); // Desativa o dark mode

        localStorage.setItem('darkMode', 'false'); // Atualiza o estado no localStorage
        
    } else {

        html.classList.add('dark'); // Ativa o dark mode

        localStorage.setItem('darkMode', 'true'); // Atualiza o estado no localStorage
    }
}

;


    if (localStorage.getItem('darkMode') === 'true') {

        document.querySelector('html').classList.add('dark');


    } else {

        document.querySelector('html').classList.remove('dark');

    }


;




// ------------------------------------------------------------------------










