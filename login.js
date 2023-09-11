

import * as funcao_login from './funcoes/f_login.js';

import * as variaveis_login from './variaveis/v_login.js';

import * as funcao_alerta_campo from './funcoes/f_alerta_campo.js';

import * as funcao_autenticacao from './funcoes/f_autenticacao.js';


const olhoaberto = document.getElementById('olhoaberto');

const olhoaberto2 = document.getElementById('olhoaberto2');

const olhofechado = document.getElementById('olhofechado');

const olhofechado2 = document.getElementById('olhofechado2');

const campoSenha = document.getElementById('txt-senha-login');

const campoSenha2 = document.getElementById('txt-senha-login2');

const campoEmail = document.getElementById('txt-email-login');

const btnEntrar = document.getElementById('btnEntrar');

const btncadastrar = document.getElementById('btncadastrar');

const btngoogle = document.getElementById('btngoogle');




olhoaberto.addEventListener('click',()=>{ funcao_login.visibilidadeSenhaaberto(olhoaberto,olhofechado,campoSenha) })

olhofechado.addEventListener('click',()=>{ funcao_login.visibilidadeSenhafechado(olhoaberto,olhofechado,campoSenha) })

if( olhoaberto2 ){ olhoaberto2.addEventListener('click',()=>{ funcao_login.visibilidadeSenhaaberto(olhoaberto2,olhofechado2,campoSenha2) }) }

if( olhofechado2 ){ olhofechado2.addEventListener('click',()=>{ funcao_login.visibilidadeSenhafechado(olhoaberto2,olhofechado2,campoSenha2) }) }



if(btncadastrar){

    btncadastrar.addEventListener('click',()=>{

        let v_result = false;
    
        v_result = funcao_login.validarEmail(campoEmail);
    
        if(v_result){v_result = funcao_login.validarSenha(campoSenha);}

        if(v_result){v_result = funcao_login.validarSenha(campoSenha2);}

        if(v_result){v_result = funcao_login.validarSenhaConfirmada(campoSenha,campoSenha2) ;}

        if(v_result){v_result = funcao_autenticacao.CriarConta(campoEmail,campoSenha) ;}
        
    
    })

}


if(btnEntrar){

    btnEntrar.addEventListener('click',()=>{

        let v_result = false;
    
        v_result = funcao_login.validarEmail(campoEmail);
    
        if(v_result){v_result = funcao_login.validarSenha(campoSenha);}
    
        if(v_result){ funcao_autenticacao.validarEntradaSistema( campoEmail ,campoSenha) }
    
        
    
    })

}

if(btngoogle){

    btngoogle.addEventListener('click',()=>{

        funcao_autenticacao.validarGoogle();
        
    
    })

}

