
import * as funcaoalerta from './f_alerta_campo.js';

import * as variaveis_login from '../variaveis/v_login.js';


// visibilidade campo senha

export function visibilidadeSenhaaberto(iconolhoaberto,iconolhofechado,camposenha){


            iconolhofechado.style.display="flex";
        
            iconolhoaberto.style.display="none";
        
            camposenha.type="password";
    

};

export function visibilidadeSenhafechado(iconolhoaberto,iconolhofechado,camposenha){


    iconolhofechado.style.display="none";

    iconolhoaberto.style.display="flex";

    camposenha.type="text";


};






// verificar campo email


export function validarEmail(campoEmail){

        let v_result = true

        if( !variaveis_login.emailRegex.test(campoEmail.value) ){

            funcaoalerta.alerta_campo("Atenção","Preencha o campo de email com um email válido","bg-red-200",campoEmail);

            v_result = false

        }

        return v_result;


}


// verificar campo senha


export function validarSenha(campoSenha){

    let v_result = true

        if( !variaveis_login.senhaRegex.test(campoSenha.value) ){

            v_result = false;

            funcaoalerta.alerta_campo("Atenção","Sua senha deve conter no minimo 6 caracteres com letras e numeros","bg-red-200",campoSenha);

        

        }

    
        return v_result;

}

// Senha igual a confirmada

export function validarSenhaConfirmada(campoSenha,campoConfirmada){

    let v_result = true

        if( campoSenha.value !== campoConfirmada.value ){

            v_result = false;

            funcaoalerta.alerta_campo("Atenção","A senha confirmada está diferente da senha","bg-red-200",campoConfirmada);

        

        }

    
        return v_result;

}







