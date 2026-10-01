function calcularEtanol() {
    // Captura dos valores digitados
    const gasolinaInicial = parseFloat(document.getElementById('gasolinaInicial').value);
    const aguaInicial = parseFloat(document.getElementById('aguaInicial').value);
    const camadaAguaFinal = parseFloat(document.getElementById('camadaAgua').value);
    
    // Elementos de exibição da tela
    const resultadoDiv = document.getElementById('resultado');
    const porcentagemTxt = document.getElementById('porcentagemTxt');
    const statusTxt = document.getElementById('statusTxt');

    // Validação simples para evitar erros de digitação
    if (isNaN(camadaAguaFinal) || camadaAguaFinal <= aguaInicial) {
        alert("Por favor, insira um valor válido para a camada final de água (deve ser maior que 50ml).");
        return;
    }
 
    // Cálculo da quantidade de etanol extraído
    const etanolExtraido = camadaAguaFinal - aguaInicial;
    
    // Cálculo do percentual em relação aos 50ml de gasolina iniciais
    const percentualEtanol = (etanolExtraido / gasolinaInicial) * 100;

    // Exibe o bloco de resultados limpando classes antigas
    resultadoDiv.classList.remove('hidden');
    resultadoDiv.classList.remove('valido', 'invalido');

    // Formata o texto final com uma casa decimal
    porcentagemTxt.innerText = `${percentualEtanol.toFixed(1)}% de Etanol`;

    // Regra da ANP (Gasolina comum e aditivada deve ter 27% de etanol. Margem de erro aceita: 26% a 28%)
    const limiteMinimo = 26;
    const limiteMaximo = 28;

    if (percentualEtanol >= limiteMinimo && percentualEtanol <= limiteMaximo) {
        resultadoDiv.classList.add('valido');
        statusTxt.innerText = "Dentro dos padrões da ANP (Gasolina Adequada).";
    } else {
        resultadoDiv.classList.add('invalido');
        statusTxt.innerText = "Fora dos padrões regulamentados! Risco de adulteração.";
    }
}
