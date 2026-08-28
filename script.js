
// variáveis gerais

const DivWidgets = document.getElementById("widget-visualizações");
const body = document.body;
const OpenSidebar = document.getElementById("OpenSidebar")
const TemplateNota = document.getElementById("TemplateNota");
const TemplateContato = document.getElementById("TemplateContato");
const ModalNota = document.getElementById("ModalNota");
const Notas = document.getElementById("notas");
const InputTitulo = document.getElementById("input-titulo");
const InputNota = document.getElementById("input-nota");

const FormNota = document.getElementById("FormNota");
const FormContato = document.getElementById("FormContato");
const FormMensagemRapida = document.getElementById("FormMensagemRapida");

const InputNumero = document.getElementById("input-numero");
const InputNome = document.getElementById("input-nome");
const AddContato = document.getElementById("add");

const ChatContato = document.getElementById("chat-contatos");

const ContainerMensagem = document.getElementById("container-mensagem")

const InputMensagem = document.getElementById("InputMensagemRapida");
const InputMensagemChat = document.getElementById("input");
const enviar = document.getElementById("enviar");

const NomeContato = document.getElementById("nome-contato");
const FotoPerfilContato = document.getElementById("foto-perfil-contato");

const ContatosMensagemRapida = document.getElementById("ContatosMensagemRapida");
const TemplateContatoRapido = document.getElementById("TemplateContatoRapido");

// Arrays

const contatos = []
let ContatoAtual = null;

let ContatoSelecionado = null;

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

function CriarContato() {
    let nome = InputNome.value.trim();
    const numero = InputNumero.value.trim();

    const contato = { nome, numero, mensagens: [] };
    contatos.push(contato);

    const clone = TemplateContato.content.cloneNode(true);

    const Titulo = clone.querySelector("h4");
    const item = clone.querySelector(".contato");

    Titulo.textContent = nome || numero;

    item.addEventListener("click", () => {
        ContatoAtual = contato;
        NomeContato.textContent = contato.nome || contato.numero;
        FotoPerfilContato.src = "Imagens/Icon1.webp"
        RenderizarMensagens();
        body.classList.add("chat");
    });

    ChatContato.appendChild(clone);
}

function CriarBalao(texto) {
    const Balao = document.createElement("div");
    const p = document.createElement("p");

    p.textContent = texto;

    Balao.classList.add("balao");

    Balao.appendChild(p);
    ContainerMensagem.appendChild(Balao);
}

function Mensagem() {
    const MensagemTexto = InputMensagemChat.value.trim();
    const MensagemRapida = InputMensagem.value.trim();

    const texto = MensagemTexto || MensagemRapida;

    if (texto === "") return;

    if (!ContatoAtual) {
        alert("Não é possivel enviar mensagem sem contato. Clique em um dos contatos criados ou crie um")
        return;
    }

    ContatoAtual.mensagens.push(texto);

    CriarBalao(texto);
}

function RenderizarMensagens() {
    ContainerMensagem.innerHTML = "";
    ContatoAtual.mensagens.forEach(texto => CriarBalao(texto));
}

function MensagemRapida() {
    const texto = InputMensagem.value.trim();

    ContatoSelecionado.mensagens.push(texto);

    if (ContatoSelecionado === ContatoAtual) {
        CriarBalao(texto);
    }
}

// rodar funções

EhMobile();

relogio();
setInterval(relogio, 1000);

data();
setInterval(data, 1000);

[FormNota, FormContato, FormMensagemRapida].forEach((FormModal) => {
    FormModal.addEventListener("submit", () => {
        if (FormModal === FormNota) {
            NovaNota();
            ModalNota.close();
            FormNota.reset();
            DivWidgets.dataset.widget = "nota"
        }
        else if (FormModal === FormContato) {
            CriarContato();
            FormContato.reset();
        }
        else if (FormModal === FormMensagemRapida) {
            MensagemRapida();
            FormMensagemRapida.reset();
        }
    });
});

InputNota.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.ctrlKey && !e.metaKey && !e.shiftKey) {
        NovaNota();
        ModalNota.close();
        FormNota.reset();
        DivWidgets.dataset.widget = "nota"
    }
});

enviar.addEventListener("click", () => {
    Mensagem();
    InputMensagemChat.value = "";
});

InputMensagemChat.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.ctrlKey && !e.metaKey && !e.shiftKey) {
        e.preventDefault();
        Mensagem();
        InputMensagemChat.value = "";
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

document.getElementById("mensagem-rapida").addEventListener("click", () => {
    ContatosMensagemRapida.innerHTML = "";

    contatos.forEach(contato => {
        const clone = TemplateContatoRapido.content.cloneNode(true);
        const radio = clone.querySelector("input");
        const nome = clone.querySelector("span");

        nome.textContent = contato.nome || contato.numero;

        radio.addEventListener("change", () => {
            ContatoSelecionado = contato;
        });

        ContatosMensagemRapida.appendChild(clone);
    });
});