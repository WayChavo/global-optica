const tabela = document.getElementById("tabela-consultas").querySelector("tbody");

// Dados iniciais ou carregados do localStorage
let agendaConsultas = JSON.parse(localStorage.getItem("agendaConsultas")) || [
  ["Quinta-feira", "08h às 12h", "Dr. Francisco"],
  ["Sexta-feira", "08h às 17h", "Dr. Francisco"]
];

function renderizarTabela() {
  tabela.innerHTML = "";
  agendaConsultas.forEach((linha, i) => {
    const tr = document.createElement("tr");

    linha.forEach((valor, j) => {
      const td = document.createElement("td");
      td.textContent = valor;
      td.contentEditable = true;
      td.addEventListener("blur", () => {
        agendaConsultas[i][j] = td.textContent.trim();
        salvarTabela(); // Salva automaticamente ao editar
      });
      tr.appendChild(td);
    });

    const tdRemover = document.createElement("td");
    tdRemover.innerHTML = `<button onclick="removerLinha(${i})">🗑</button>`;
    tr.appendChild(tdRemover);

    tabela.appendChild(tr);
  });
}

function adicionarLinha() {
  agendaConsultas.push(["", "", ""]);
  salvarTabela();
  renderizarTabela();
}

function removerLinha(index) {
  agendaConsultas.splice(index, 1);
  salvarTabela();
  renderizarTabela();
}

function salvarTabela() {
  localStorage.setItem("agendaConsultas", JSON.stringify(agendaConsultas));

  const mensagem = document.getElementById("mensagem-sucesso");
  if (mensagem) {
    mensagem.style.display = "block";
    setTimeout(() => {
      mensagem.style.display = "none";
    }, 3000);
  }
}

window.onload = function () {
  renderizarTabela();
};

// WhatsApp agendamento
document.getElementById("botao-direto").addEventListener("click", function () {
  const nome = document.getElementById("nome").value;
  const telefone = document.getElementById("telefone").value;
  const dia = document.getElementById("dia").value;
  const numero = document.getElementById("numero").value;

  if (!nome || !telefone || !dia || !numero) {
    alert("Por favor, preencha todos os campos antes de enviar.");
    return;
  }

  const mensagem = `Olá! Gostaria de agendar uma consulta.\n\nNome: ${nome}\nTelefone: ${telefone}\nDia: ${dia}`;
  const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;
  window.open(url, "_blank");
});
