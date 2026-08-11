// variáveis gerais

const DivWidgets = document.getElementById("widget-visualizações");
const body = document.body;
const OpenSidebar = document.getElementById("OpenSidebar");

// funções

function EhMobile() {
    window.innerWidth < 769;
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

// rodar funções

EhMobile();

relogio();
setInterval(relogio, 1000);

data();
setInterval(data, 1000);

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