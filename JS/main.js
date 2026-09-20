import { EasterEggsNotas } from "./EasterEgg.js";

// variáveis gerais

const DivWidgets = document.getElementById("widget-visualizações");
export const body = document.body;
const OpenSidebar = document.querySelectorAll(".open-sidebar")
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

const ChatContato = document.getElementById("chat-contatos");

const ContainerMensagem = document.getElementById("container-mensagem")

const InputMensagem = document.getElementById("InputMensagemRapida");
const InputMensagemChat = document.getElementById("input");
const enviar = document.getElementById("enviar");

const NomeContato = document.getElementById("nome-contato");
const FotoPerfilContato = document.getElementById("foto-perfil-contato");

const ContatosMensagemRapida = document.getElementById("ContatosMensagemRapida");
const TemplateContatoRapido = document.getElementById("TemplateContatoRapido");

const View = document.getElementById("view");

const FormGrupo = document.getElementById("FormGrupo");
const InputNomeGrupo = document.getElementById("input-grupo");
const ContatosGrupo = document.getElementById("ContatosGrupo");
const TemplateGrupo = document.getElementById("TemplateGrupo");
const BtnCriarGrupo = document.getElementById("BtnCriarGrupo");

const InputPesquisar = document.getElementById("input-pesquisar");

// Arrays

const contatos = []
let ContatoAtual = null;

let ContatoSelecionado = null;

let membrosSelecionados = [];

const posicaoWidget = { relogio: 0, calendario: 1, nota: 2, musica: 3 };

// funções

function EhMobile() {
    return window.innerWidth < 769;
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
    const link = clone.querySelector(".link-magoozim");
    const btnMais = clone.querySelector(".btn-mais");
    const btnEditar = clone.querySelector(".btn-editar");
    const btnExcluir = clone.querySelector(".btn-excluir");
    const containerNota = clone.querySelector(".container-notas");


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

    EasterEggsNotas(valor, notaTexto, link, containerNota);

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
    const Foto = clone.querySelector("#FotoDePerfil");

    Titulo.textContent = nome || numero;
    Foto.src = "Imagens/Icon1.webp";

    item.addEventListener("click", () => {
        ContatoAtual = contato;
        NomeContato.textContent = contato.nome || contato.numero;
        FotoPerfilContato.src = "Imagens/Icon1.webp"
        FotoPerfilContato.style.display = "block";
        document.querySelector(".chat-apresentacao").style.display = "none";
        document.querySelector(".comeco-conversa").style.display = "flex";
        if (EhMobile()) {
            body.classList.remove("sidebar");
        }
        RenderizarMensagens();
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

function AtualizarValidadeGrupo() {
    const checkboxes = FormGrupo.querySelectorAll('input[type="checkbox"]');
    if (checkboxes.length === 0) return;

    const algumMarcado = membrosSelecionados.length > 0;
    checkboxes[0].setCustomValidity(algumMarcado ? "" : "Selecione pelo menos um contato");
}

function CriarGrupo() {
    const nome = InputNomeGrupo.value.trim();

    const grupo = { nome, membros: [...membrosSelecionados], mensagens: [] };
    contatos.push(grupo);

    const clone = TemplateContato.content.cloneNode(true);
    const titulo = clone.querySelector("h4");
    const Foto = clone.querySelector("#FotoDePerfil");
    const item = clone.querySelector(".contato");

    titulo.textContent = grupo.nome;
    Foto.src = "Windows 7 Icons/397.png";
    item.classList.add("grupo");

    item.addEventListener("click", () => {
        ContatoAtual = grupo;
        NomeContato.textContent = grupo.nome;
        FotoPerfilContato.src = "Windows 7 Icons/397.png";
        FotoPerfilContato.style.display = "block";
        document.querySelector(".chat-apresentacao").style.display = "none";
        document.querySelector(".comeco-conversa").style.display = "flex";
        RenderizarMensagens();
    });

    ChatContato.appendChild(clone);
}

// rodar funções

relogio();
setInterval(relogio, 1000);

data();
setInterval(data, 1000);

[FormNota, FormContato, FormMensagemRapida, FormGrupo].forEach((FormModal) => {
    FormModal.addEventListener("submit", () => {
        if (FormModal === FormNota) {
            NovaNota();
            ModalNota.close();
            FormNota.reset();
            DivWidgets.dataset.widget = "nota"
            DivWidgets.style.setProperty("--eixo-x", posicaoWidget.nota);
        }
        else if (FormModal === FormContato) {
            CriarContato();
            FormContato.reset();
        }
        else if (FormModal === FormMensagemRapida) {
            MensagemRapida();
            FormMensagemRapida.reset();
        }
        else if (FormModal === FormGrupo) {
            CriarGrupo();
            FormGrupo.reset();
        }
    });
});

InputNota.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.ctrlKey && !e.metaKey && !e.shiftKey) {
        NovaNota();
        ModalNota.close();
        FormNota.reset();
        DivWidgets.dataset.widget = "nota"
        DivWidgets.style.setProperty("--eixo-x", posicaoWidget.nota);
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

// Trocar de widgets

document.querySelectorAll(".header-widget button").forEach((BtnWidget) => {
    BtnWidget.addEventListener("click", () => {
        let widget = null;

        if (BtnWidget.classList.contains("btn-relogio")) widget = "relogio";
        else if (BtnWidget.classList.contains("btn-calendario")) widget = "calendario";
        else if (BtnWidget.classList.contains("btn-nota")) widget = "nota";
        else if (BtnWidget.classList.contains("btn-musica")) widget = "musica";
        else if (BtnWidget.classList.contains("btn-fechar")) {
            body.classList.remove("widget");
            return;
        }

        if (widget) {
            DivWidgets.dataset.widget = widget;
            DivWidgets.style.setProperty("--eixo-x", posicaoWidget[widget]);
            body.classList.add("widget");

            if (EhMobile() && body.classList.contains("sidebar")) {
                body.classList.remove("sidebar");
            }
        }
    })
});

// Botões das abas

document.querySelectorAll(".nav-btn button").forEach((BtnNav) => {
    BtnNav.addEventListener("click", () => {
        if (BtnNav.classList.contains("btn-mensagens")) {
            body.classList.add("chat")
            DivWidgets.style.setProperty("--modo-chat", 1);
        }
        else if (BtnNav.classList.contains("btn-menu")) {
            body.classList.remove("chat")
            DivWidgets.style.setProperty("--modo-chat", 0);
        }
    })
});

// Abrir sidebar

OpenSidebar.forEach((BtnSidebar) => {
    BtnSidebar.addEventListener("click", () => {
        body.classList.toggle("sidebar")

        if (EhMobile() && body.classList.contains("sidebar")) {
            body.classList.remove("widget");
        }
    });
})

// Mensagem rápida

document.getElementById("mensagem-rapida").addEventListener("click", () => {
    ContatosMensagemRapida.querySelectorAll(".contato-rapido").forEach(el => el.remove());

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

// Visualizar wallpaper

View.addEventListener("click", () => {
    body.classList.toggle("visualizar");
    if (body.classList.contains("visualizar")) {
        body.appendChild(View);
    }
    else {
        setTimeout(() => {
            document.querySelector(".header-body").appendChild(View);
        }, 400);
    }
});

// Bãlão de erro personalizado

document.addEventListener("invalid", (e) => {
    e.preventDefault();

    const campo = e.target;
    campo.classList.add("campo-invalido");

    let aviso = campo.nextElementSibling;
    if (!aviso || !aviso.classList.contains("aviso-erro")) {
        aviso = document.createElement("span");
        aviso.className = "aviso-erro";
        campo.after(aviso);
    }
    aviso.textContent = campo.validationMessage;
}, true);

document.addEventListener("input", (e) => {
    e.target.classList.remove("campo-invalido");
    const aviso = e.target.nextElementSibling;
    if (aviso && aviso.classList.contains("aviso-erro")) {
        aviso.remove();
    }
}, true);

InputNota.addEventListener("invalid", () => {
    InputNota.setCustomValidity("Preencha este campo");
});

InputNota.addEventListener("input", () => {
    InputNota.setCustomValidity("");
});

// Criar grupo

BtnCriarGrupo.addEventListener("click", () => {
    ContatosGrupo.querySelectorAll(".contato-grupo").forEach(el => el.remove());
    membrosSelecionados = [];

    contatos.forEach(contato => {
        if (contato.membros) return;

        const clone = TemplateGrupo.content.cloneNode(true);
        const checkbox = clone.querySelector("input");
        const nome = clone.querySelector("span");

        nome.textContent = contato.nome || contato.numero;

        checkbox.addEventListener("change", () => {
            if (checkbox.checked) {
                membrosSelecionados.push(contato);
            } else {
                membrosSelecionados = membrosSelecionados.filter(c => c !== contato);
            }
            AtualizarValidadeGrupo();
        });

        ContatosGrupo.appendChild(clone);
    });

    AtualizarValidadeGrupo();
});

// sair do contato

function SairDoChat() {
    ContatoAtual = null;
    NomeContato.textContent = "";
    ContainerMensagem.innerHTML = "";
    FotoPerfilContato.style.display = "none";
    document.querySelector(".chat-apresentacao").style.display = "flex";
    document.querySelector(".comeco-conversa").style.display = "none";
}

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") SairDoChat();
});

document.getElementById("ContatoSair").addEventListener("click", SairDoChat);

// Filtrar pesquisa

InputPesquisar.addEventListener("input", (e) => {
    const termo = e.target.value.toLowerCase();
    document.querySelectorAll(".contato").forEach(contato => {
        const nome = contato.querySelector("h4").textContent.toLowerCase();
        contato.style.display = nome.includes(termo)
            ? "flex"
            : "none";
    });
});

// Aviso de música

document.querySelectorAll(".container-musica button").forEach((BtnMusica) => {
    BtnMusica.addEventListener("click", () => {
        body.classList.toggle("SpanMusica");
    });
});