

// Mostrar alerta e sinalizar campos

export function alerta_campo(v_titulo,v_mensagem,v_cor,obj_campo){

    const objalert = document.getElementById('objalert');

    const tituloalerta = document.getElementById('titulo-alerta');

    const mensagemalerta = document.getElementById('mensagem-alerta');

    const iconalert = document.getElementById('icon-alert');

    const iconsucess = document.getElementById('icon-success');


    objalert.classList.remove('bg-green-200');
    objalert.classList.remove('bg-red-200');

    iconalert.classList.add('hidden');
    iconsucess.classList.add('hidden');

    objalert.classList.add(v_cor);

    tituloalerta.innerHTML = v_titulo;

    mensagemalerta.innerHTML = v_mensagem;

    if(v_cor=="bg-red-200"){

        tituloalerta.classList.add('text-red-500');

        iconsucess.classList.add('hidden');
        iconalert.classList.remove('hidden');

        iconalert.classList.add('text-red-500');

        obj_campo.classList.add('outline-none');
        obj_campo.classList.add('outline-red-200');

        obj_campo.addEventListener('click',()=>{obj_campo.classList.remove('outline-red-200');})

    

    }else{ 

        iconalert.classList.add('hidden');
        
        iconsucess.classList.remove('hidden');
        
    };

    objalert.classList.remove('hidden');

    setTimeout(()=>objalert.classList.add('hidden'),3000);



}

