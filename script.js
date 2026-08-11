// variáveis gerais

const DivWidgets = document.getElementById("widget-visualizações");
const body = document.body;
const OpenSidebar = document.getElementById("OpenSidebar");

// funções

function EhMobile() {
    window.innerWidth < 769;
}

// rodar funções

EhMobile();

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