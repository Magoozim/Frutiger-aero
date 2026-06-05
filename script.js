// variáveis

const body = document.body;
const BtnView = document.getElementById("view");
const HeaderBody = document.getElementById("header-body");
const BtnMenu = document.getElementById("btn-menu");
const BtnMensagem = document.getElementById("btn-mensagens");
const NavBtn = document.getElementById("nav-btn");
const OpenSidebar = document.getElementById("open-sidebar");
const BtnRelogio = document.getElementById("btn-relogio");
const BtnCalendario = document.getElementById("btn-calendario");
const BtnNota = document.getElementById("btn-nota");
const horario = document.getElementById("horario")
const data = document.getElementById("data");
const InputArea = document.getElementById("input-area")
const ContainerNotas = document.querySelector(".notas");
const InputNota = document.getElementById("input-nota");
const BtnNovaNota = document.getElementById("nova-nota");
const BtnPause = document.getElementById("pause");
const SemNotas = document.getElementById("sem-notas");

// funções

function HorarioAtual() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");
    horario.textContent = `${hours}:${minutes}:${seconds}`;
}

function DataAtual() {
    const hoje = new Date();
    const dia = String(hoje.getDay()).padStart(2, "0");
    const mes = String(hoje.getMonth()+1).padStart(2, "0");
    const ano = String(hoje.getFullYear()).padStart(2, "0");
    data.textContent = `${dia}/${mes}/${ano}`;
}

function NovaNota() {
    ContainerNotas.classList.add("Layout")

    const valor = InputNota.value.trim();

    const nota = document.createElement("p")
    const ContainerNota = document.createElement("div")
    const texto = document.createElement("span")
    const ContainerInferior = document.createElement("div")
    const ContainerBtns = document.createElement("div")
    const ContainerBtnMais = document.createElement("div")
    const BtnEditar = document.createElement("button")
    const BtnExcluir = document.createElement("button")
    const BtnMais = document.createElement("button")

    BtnEditar.textContent = "Editar"
    BtnExcluir.textContent = "Excluir"
    BtnMais.textContent = "Mais ⬇︎"
    nota.textContent = valor
    nota.dataset.TextoCompleto = valor

    ContainerNotas.appendChild(ContainerNota)
    ContainerNota.appendChild(nota)
    ContainerNota.appendChild(ContainerInferior)
    ContainerInferior.appendChild(ContainerBtns)
    ContainerInferior.appendChild(ContainerBtnMais)
    ContainerBtns.appendChild(BtnEditar)
    ContainerBtns.appendChild(BtnExcluir)
    ContainerBtnMais.appendChild(BtnMais)

    ContainerNota.classList.add("container-notas")
    ContainerInferior.classList.add("container-inferior")
    ContainerBtns.classList.add("container-btns")
    ContainerBtnMais.classList.add("container-btnmais")
    BtnEditar.classList.add("btn-editar")
    BtnExcluir.classList.add("btn-excluir")
    BtnMais.classList.add("btn-mais")

    if (valor === "") {
        body.classList.remove("inputnota")
        ContainerNota.remove();
        return;
    }

    if (valor.length > 20) {
        nota.textContent = valor.slice(0, 20) + "..."
    }
    else {
        nota.textContent = nota.dataset.TextoCompleto
    }


    let expandido = false

    BtnMais.addEventListener("click", () => {
        if (!expandido) {
            nota.textContent = nota.dataset.TextoCompleto
            BtnMais.textContent = "Menos ⬆︎"
            expandido = true
        }
        else {
            nota.textContent = nota.dataset.TextoCompleto.slice(0, 20) + "..."
            BtnMais.textContent = "Mais ⬇︎"
            expandido = false
        }
    })

    if (ContainerNotas.children.length > 0) {
        SemNotas.style.display = "none"
    }
    else if (ContainerNotas.children.length === 0) {
        SemNotas.style.display = "block"
    }

    [BtnExcluir, BtnEditar].forEach((BtnNotas) => {
    BtnNotas.addEventListener("click", () => {
        if (BtnNotas === BtnExcluir) {
            ContainerNota.remove();
        }
        else if (BtnNotas === BtnEditar) {
            ContainerNota.remove();
            body.classList.add("sidebar", "inputnota");
            InputNota.value = nota.dataset.TextoCompleto;
            InputNota.focus();
        }
    })
})

    InputNota.value = ""
    body.classList.remove("inputnota")
}

function BordaNotas() {
    const notas = document.querySelectorAll(".container-notas");
    notas.forEach(nota => {
        nota.classList.remove("primeira", "ultima")
    });
    if (notas.length > 1) {
        notas[0].classList.add("primeira");
        notas[notas.length - 1].classList.add("ultima");
    }
}

// Código

BtnView.addEventListener("click", () => {
    body.classList.toggle("visualizar");
    if (body.classList.contains("visualizar")) {
        body.appendChild(BtnView)
    }
    else {
        HeaderBody.appendChild(BtnView)
    }
});


OpenSidebar.addEventListener("click", () => {
    body.classList.toggle("sidebar");
});

[BtnMensagem, BtnMenu].forEach((ButtonHeader) => {
    ButtonHeader.addEventListener("click", () => {
        if (ButtonHeader === BtnMensagem) {
            NavBtn.classList.add("btn-deslizante")
            body.classList.add("chat")
        }
        else if (ButtonHeader === BtnMenu) {
            NavBtn.classList.remove("btn-deslizante")
            body.classList.remove("chat")
        }
        else {
            NavBtn.classList.remove("btn-deslizante")
            body.classList.remove("chat")
        }
    })
});

[BtnCalendario, BtnRelogio, BtnNota].forEach((ButtonWidget) => {
    ButtonWidget.addEventListener("click", () => {
        if (ButtonWidget === BtnCalendario) {
            body.classList.add("calendario")
            body.classList.remove("nota")
        }
        else if (ButtonWidget === BtnRelogio) {
            body.classList.remove("calendario", "nota")
        }
        else if (ButtonWidget === BtnNota) {
            body.classList.add("nota")
            body.classList.remove("calendario")
        }
        else {
            body.classList.remove("calendario", "nota")
        }
    })
});

BtnNovaNota.addEventListener("click", () => {
    body.classList.add("inputnota");
    InputNota.focus();
});

InputNota.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        NovaNota();
    }
});

BtnPause.addEventListener("click", () => {
    const foto = document.createElement("img")
    foto.src = "477.png"
});

// data

HorarioAtual();
setInterval(HorarioAtual, 1000);

DataAtual();
setInterval(DataAtual, 1000);