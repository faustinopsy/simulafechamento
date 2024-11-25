import combinacoes from './combinacoes.js'
import gerarSorteioAleatorio from './sorteioAleatorio.js'
import verificarGarantia from './verificaGaratia.js'

const combinaOnze = combinacoes();

const executarSimulacao = (numeroDeTestes, minAcertos) => {
  let garantidos = 0;
  const detalhesPorSimulacao = [];
  const startTime = performance.now();

  for (let i = 0; i < numeroDeTestes; i++) {
    const sorteio = gerarSorteioAleatorio();
    const resultados = verificarGarantia(sorteio, combinaOnze, minAcertos);

    if (resultados.length > 0) garantidos++;

    detalhesPorSimulacao.push({
      sorteio,
      resultados,
    });
  }

  const endTime = performance.now();
  const executionTime = endTime - startTime;

  const memoryUsage = performance.memory
    ? performance.memory.usedJSHeapSize / (1024 * 1024)
    : 'Não suportado';

  const app = document.getElementById('app');
  app.innerHTML = `Número de testes: ${numeroDeTestes} <br>
                   Garantidos: ${garantidos} <br>
                   Percentual de sucesso: ${(garantidos / numeroDeTestes) * 100}% <br>
                   Tempo de execução: ${executionTime.toFixed(2)} ms <br>
                   Uso de memória: ${memoryUsage !== 'Não suportado' ? `${memoryUsage.toFixed(2)} MB` : memoryUsage} <br>`;

  detalhesPorSimulacao.forEach(({ sorteio, resultados }, i) => {
    if (resultados.length > 0) {
      app.innerHTML += `Simulação ${i + 1} <br>
                        Núm do Sorteio: ${sorteio.join(", ")} <br>`;
      resultados.forEach(({ jogo, acertos, combinacao }) => {
        app.innerHTML += `Jogo ${jogo}:<br> Acertos = ${acertos},<br>A Combinação : ${combinacao.join(", ")}`;
      });
      app.innerHTML += "<br>------------------------------";
    }
  });
};

document.getElementById('form').addEventListener('submit', (e) => {
  e.preventDefault();
  const quantidade = Number(e.target[0].value);
  const minimo = Number(e.target[1].value);
  executarSimulacao(quantidade, minimo);
});

const tabs = document.querySelectorAll(".tab");
const tabContents = document.querySelectorAll(".tab-content");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((t) => t.classList.remove("active"));
    tabContents.forEach((content) => content.classList.remove("active"));

    tab.classList.add("active");
    document
      .getElementById(`tab-${tab.dataset.tab}`)
      .classList.add("active");
  });
});

document.getElementById("combinacoes").textContent = combinaOnze
          .map((jogo, index) => `Jogo ${index + 1}: ${jogo.join(", ")}`)
          .join("\n");
      