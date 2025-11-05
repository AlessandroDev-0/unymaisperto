// Configurações
const calendario = document.getElementById("dias");
const mensagem = document.getElementById("mensagem");
const form = document.getElementById("form-agendamento");

// Define o mês e ano desejado
const ano = 2025;
const mes = 10; // Novembro (0 = Janeiro, 10 = Novembro)
const nomeMes = "Novembro";
const diasNoMes = new Date(ano, mes + 1, 0).getDate();

// Exemplo de status
const diasLotados = [5, 10, 18];
const diasParciais = [7, 12, 25];
const feriados = [15, 20]; // Exemplo: 15 (Proclamação da República), 20 (Consciência Negra)

// Gera os dias do calendário
for (let d = 1; d <= diasNoMes; d++) {
    const data = new Date(ano, mes, d);
    const diaSemana = data.getDay(); // 0 = domingo, 6 = sábado

    const div = document.createElement("div");
    div.classList.add("dia");
    div.textContent = d;

    if (diaSemana === 0 || diaSemana === 6 || feriados.includes(d)) {
        div.classList.add("cinza");
    } else if (diasLotados.includes(d)) {
        div.classList.add("vermelho");
    } else if (diasParciais.includes(d)) {
        div.classList.add("amarelo");
    } else {
        div.classList.add("verde");
    }

    calendario.appendChild(div);
}

// Função de agendamento
form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const tipo = document.getElementById("tipo").value;
    const dataInput = document.getElementById("data").value;
    const hora = document.getElementById("hora").value;

    if (!nome || !tipo || !dataInput || !hora) {
        mensagem.textContent = "Por favor, preencha todos os campos.";
        mensagem.style.color = "red";
        return;
    }

    const [anoSel, mesSel, diaSel] = dataInput.split("-").map(Number);
    const dataSelecionada = new Date(anoSel, mesSel - 1, diaSel);
    const mesSelecionado = dataSelecionada.getMonth();
    const diaSelecionado = dataSelecionada.getDate();

    if (mesSelecionado !== mes) {
        mensagem.textContent = "Selecione uma data dentro de Novembro de 2025.";
        mensagem.style.color = "red";
        return;
    }

    const divDia = calendario.children[diaSelecionado - 1];

    if (divDia.classList.contains("vermelho") || divDia.classList.contains("cinza")) {
        mensagem.textContent = "Não é possível agendar para este dia.";
        mensagem.style.color = "red";
        return;
    }

    // Marca o dia como azul (agendado)
    divDia.className = "dia azul";

    mensagem.textContent = `✅ Agendamento realizado com sucesso para ${diaSelecionado}/11/${ano} às ${hora}.`;
    mensagem.style.color = "green";

    form.reset();
});
