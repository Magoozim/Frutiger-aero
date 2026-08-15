// variáveis gerais

const DivWidgets = document.getElementById("widget-visualizações");
const body = document.body;
const OpenSidebar = document.getElementById("OpenSidebar")
const TemplateNota = document.getElementById("TemplateNota");
const ModalNota = document.getElementById("ModalNota");
const Notas = document.getElementById("notas");
const InputTitulo = document.getElementById("input-titulo");
const InputNota = document.getElementById("input-nota");
const FormNota = document.getElementById("FormNota");

// funções

function EhMobile() {
    window.innerWidth < 769;
    return;
}

function relogio() {
    const agora = new Date();
    const hora = String(agora.getHours()).padStart(2, "0");
    const minutos = String(agora.getMinutes()).padStart(2, "0");
    const segundo = String(agora.getSeconds()).padStart(2, "0");
    document.getElementById("horario").textContent = `${hora}:${minutos}:${segundo}`;
}

function data(agora) {
    agora = new Date();
    const dia = String(agora.getDate()).padStart(2, "0");
    const mes = String(agora.getMonth() + 1).padStart(2, "0");
    const ano = String(agora.getFullYear()).padStart(2, "0");
    document.getElementById("data").textContent = `${dia}/${mes}/${ano}`;
}

function NovaNota() {
    const valor = InputNota.value.trim();
    const valortitulo = InputTitulo.value.trim();

    const clone = TemplateNota.content.cloneNode(true);

    const containerNota = clone.querySelector(".container-notas");
    const titulo = clone.querySelector("h2");
    const notaTexto = clone.querySelector(".nota-texto");
    const btnMais = clone.querySelector(".btn-mais");
    const btnEditar = clone.querySelector(".btn-editar");
    const btnExcluir = clone.querySelector(".btn-excluir");

    titulo.textContent = valortitulo || "Sem Título";
    notaTexto.textContent = valor;

    btnMais.addEventListener("click", () => {
        notaTexto.classList.toggle("expandida");
        btnMais.textContent = notaTexto.classList.contains("expandida") ? "Menos ⬆︎" : "Mais ⬇︎";
    });

    btnExcluir.addEventListener("click", () => {
        containerNota.remove();
    });

    btnEditar.addEventListener("click", () => {
        InputTitulo.value = titulo.textContent === "Sem Título" ? "" : titulo.textContent;
        InputNota.value = notaTexto.textContent;
        containerNota.remove();
        ModalNota.showModal();
    });

    Notas.appendChild(clone);
}

// rodar funções

EhMobile();

relogio();
setInterval(relogio, 1000);

data();
setInterval(data, 1000);

FormNota.addEventListener("submit", () => {
    NovaNota();
    ModalNota.close();
    FormNota.reset();
    DivWidgets.dataset.widget = "nota"
})

InputNota.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.ctrlKey && !e.metaKey && !e.shiftKey) {
        e.preventDefault();
        NovaNota();
        ModalNota.close();
        DivWidgets.dataset.widget = "nota"
    }
});

// código

document.querySelectorAll(".header-widget button").forEach((BtnWidget) => {
    BtnWidget.addEventListener("click", () => {

        if (BtnWidget.classList.contains("btn-relogio")) {
            DivWidgets.dataset.widget = "relogio"
        }
        else if (BtnWidget.classList.contains("btn-calendario")) {
            DivWidgets.dataset.widget = "calendario"
        }
        else if (BtnWidget.classList.contains("btn-nota")) {
            DivWidgets.dataset.widget = "nota"
        }
    })
});

document.querySelectorAll(".nav-btn button").forEach((BtnNav) => {
    BtnNav.addEventListener("click", () => {
        if (BtnNav.classList.contains("btn-mensagens")) {
            body.classList.add("chat")
        }
        else if (BtnNav.classList.contains("btn-menu")) {
            body.classList.remove("chat")
        }
    })
});

OpenSidebar.addEventListener("click", () => {
    body.classList.toggle("sidebar")
});