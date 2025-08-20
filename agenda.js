function salvarTabela() {
  const tabela = document.getElementById("tabela-consultas");
  const linhas = tabela.querySelectorAll("tbody tr");
  const dados = [];

  linhas.forEach(linha => {
    const celulas = linha.querySelectorAll("td");
    const linhaDados = [];
    celulas.forEach(celula => {
      linhaDados.push(celula.textContent.trim());
    });
    dados.push(linhaDados);
  });

  localStorage.setItem("agendaConsultas", JSON.stringify(dados));

  const mensagem = document.getElementById("mensagem-sucesso");
  mensagem.style.display = "block";
  setTimeout(() => {
    mensagem.style.display = "none";
  }, 3000);
}

window.onload = function () {
  const dadosSalvos = JSON.parse(localStorage.getItem("agendaConsultas"));
  if (dadosSalvos) {
    const tabela = document.getElementById("tabela-consultas");
    const linhas = tabela.querySelectorAll("tbody tr");
    dadosSalvos.forEach((linhaDados, i) => {
      const celulas = linhas[i].querySelectorAll("td");
      linhaDados.forEach((valor, j) => {
        celulas[j].textContent = valor;
      });
    });
  }
};

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("form-agendamento");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value;
    const telefone = document.getElementById("telefone").value;
    const dia = document.getElementById("dia").value;

    const mensagem = `Olá! Gostaria de agendar uma consulta.\n\nNome: ${nome}\nTelefone: ${telefone}\nDia: ${dia}`;
    const numero = "558899962081"; // Substitua pelo número desejado
    const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;

    window.open(url, "_blank");
  });
});


