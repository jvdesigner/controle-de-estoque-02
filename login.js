

import * as funcao_login from './funcoes/f_login.js';

import * as variaveis_login from './variaveis/v_login.js';

import * as funcao_alerta_campo from './funcoes/f_alerta_campo.js';


const olhoaberto = document.getElementById('olhoaberto');

const olhofechado = document.getElementById('olhofechado');

const campoSenha = document.getElementById('txt-senha-login');

const campoEmail = document.getElementById('txt-email-login');

const btnEntrar = document.getElementById('btnEntrar');



olhoaberto.addEventListener('click',()=>{ funcao_login.visibilidadeSenhaaberto(olhoaberto,olhofechado,campoSenha) })

olhofechado.addEventListener('click',()=>{ funcao_login.visibilidadeSenhafechado(olhoaberto,olhofechado,campoSenha) })


btnEntrar.addEventListener('click',()=>{

    let v_result = funcao_login.validarEmail(campoEmail);

    if(v_result){funcao_login.validarSenha(campoSenha);}
    
    

})