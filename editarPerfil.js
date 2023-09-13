
import * as funcaoImg from './funcoes/f_imagem.js'; 

const btnirparaeditarperfil = document.getElementById('btnirparaeditarperfil');

const fotousuario = document.getElementById('fotousuario');

const imgInput = document.getElementById('imgInput');


if(btnirparaeditarperfil){

    btnirparaeditarperfil.addEventListener('click',()=>{

        window.location.href="editarPerfil.html";

    })

}

funcaoImg.abrirImagem(fotousuario,imgInput);

