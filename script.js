// script.js

let bugs = JSON.parse(localStorage.getItem('bugs')) || [];

const bugForm = document.getElementById('bugForm');
const listaBugs = document.getElementById('listaBugs');
const filtroStatus = document.getElementById('filtroStatus');

bugForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const titulo = document.getElementById('titulo').value;
  const descricao = document.getElementById('descricao').value;
  const prioridade = document.getElementById('prioridade').value;
  const status = document.getElementById('status').value;

  const novoBug = {
    id: Date.now(),
    titulo,
    descricao,
    prioridade,
    status
  };

  bugs.push(novoBug);
  salvarBugs();
  renderizarBugs();
  bugForm.reset();
});

filtroStatus.addEventListener('change', renderizarBugs);

function salvarBugs() {
  localStorage.setItem('bugs', JSON.stringify(bugs));
}

function atualizarStatus(id, novoStatus) {
  bugs = bugs.map(bug => bug.id === id ? { ...bug, status: novoStatus } : bug);
  salvarBugs();
  renderizarBugs();
}

function excluirBug(id) {
  bugs = bugs.filter(bug => bug.id !== id);
  salvarBugs();
  renderizarBugs();
}

function renderizarBugs() {
  const statusSelecionado = filtroStatus.value;
  listaBugs.innerHTML = '';

  bugs.filter(bug => {
    return statusSelecionado === 'Todos' || bug.status === statusSelecionado;
  }).forEach(bug => {
    const tr = document.createElement('tr');

    tr.innerHTML = `
      <td>${bug.titulo}</td>
      <td>${bug.descricao}</td>
      <td>${bug.prioridade}</td>
      <td>${bug.status}</td>
      <td>
        <button onclick="atualizarStatus(${bug.id}, 'Em análise')">Em análise</button>
        <button onclick="atualizarStatus(${bug.id}, 'Resolvido')">Resolvido</button>
        <button onclick="excluirBug(${bug.id})">Excluir</button>
      </td>
    `;

    listaBugs.appendChild(tr);
  });
}

// Inicializar
renderizarBugs();
