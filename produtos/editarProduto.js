
//---------------------------------------------------------------

// ELEMENTOS FORMULARIO

//---------------------------------------------------------------    



    const EditImagem = document.getElementById('imgInput');

    const EditNome = document.getElementById('inputNomeProduto');

    const EditPreco =  document.getElementById('inputPrecoProduto');

    const EditCategoria = document.getElementById('inputCategoriaProduto');

    const EditCusto =  document.getElementById('inputCustoProduto');

    const EditDescricao = document.getElementById('inputDescricaoProduto');

    




//---------------------------------------------------------------

// Transferir informacoes

//--------------------------------------------------------------- 


const urlParams = new URLSearchParams(window.location.search);

const IdProduto         = urlParams.get("vIdProduto");
const NomeProduto       = urlParams.get("vNomeProduto");
const FotoProduto       = urlParams.get("vFotoProduto");
const PrecoProduto      = urlParams.get("vPrecoProduto");
const DescricaoProduto  = urlParams.get("vDescricaoProduto");
const CategoriaProduto  = urlParams.get("vCategoriaProduto");
const CustoProduto      = urlParams.get("vCustoProduto");


EditImagem.src          = FotoProduto;
EditNome.value          = NomeProduto
EditPreco.value         = PrecoProduto.replace("R$ ", "")
EditCategoria.value     = CategoriaProduto
EditCusto.value         = CustoProduto.replace("R$ ", "")
EditDescricao.value     = DescricaoProduto



