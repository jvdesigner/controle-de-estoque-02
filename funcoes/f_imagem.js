

export function abrirImagem(inputFile,imagemExibida){

    inputFile.addEventListener('change', () => {
        const file = inputFile.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                imagemExibida.src = e.target.result;
                imagemExibida.style.display = 'block';
            };
            reader.readAsDataURL(file);
        }
    });



}