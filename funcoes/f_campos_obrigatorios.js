

import * as funcaoalerta from './f_alerta_campo.js';

// Verificar campos obrigatorios

export function verificarCamposVazios(formulario) {

    let resultado = true;

    const campos = formulario.querySelectorAll('input[type="text"], input[type="number"]');
    
    campos.forEach(function(campo) {

      if (campo.value.trim() === '') {

        funcaoalerta.alerta_campo("Atenção","Campos obrigatórios","bg-red-200",campo);

        resultado = false;

        return; 
      }

    });

    return resultado

  }