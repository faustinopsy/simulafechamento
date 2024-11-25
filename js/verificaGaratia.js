export default function verificarGarantia(sorteio, combinaOnze, minAcertos) {
    const resultados = [];
    combinaOnze.forEach((combinacao, index) => {
      const acertos = combinacao.filter((numero) => sorteio.includes(numero)).length;
      if (acertos >= minAcertos) {
        resultados.push({ jogo: index + 1, acertos, combinacao });
      }
    });
  
    return resultados;
  };