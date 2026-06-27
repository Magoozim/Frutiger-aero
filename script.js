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
const InputMensagem = document.getElementById("input-mensagem");
const InputNumero = document.getElementById("input-numero");
const InputNome = document.getElementById("input-nome");
const ListaContatos = document.getElementById("lista-contatos");
const add = document.getElementById("add");
const ChatContatos = document.getElementById("chat-contatos")
const NomeContato = document.getElementById("nome-contato");
const ContainerMensagem = document.getElementById("container-mensagem");
const InputMensagemChat = document.getElementById("input");
const enviar = document.getElementById("enviar");
const InputFoto = document.getElementById("input-foto");
const BtnConfirmar = document.getElementById("btn-confirmar");
const BtnMesagemRapida = document.getElementById("mensagem-rapida");
const InputPesquisar = document.getElementById("input-pesquisar");

const Windows7 = document.getElementById("windows-7");
const enchendo = document.getElementById("enchendo");
const agua = document.getElementById("agua");
const bolhas = document.getElementById("bolhas");
const golfinho = document.getElementById("golfinho");
const WindowsXP = document.getElementById("windows-XP");

let ContatoAtual = null;
const contatos = []

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
    const dia = String(hoje.getDate()).padStart(2, "0");
    const mes = String(hoje.getMonth() + 1).padStart(2, "0");
    const ano = String(hoje.getFullYear()).padStart(2, "0");
    data.textContent = `${dia}/${mes}/${ano}`;
}

function EasterEggsNotas(valor, nota, link, ContainerNota) {
    if (valor === "magoozim") {
        nota.style.display = "none"
        link.style.display = "block"
    }

    if (valor === "whats evil aero?") {
        ContainerNota.remove();
        body.style.display = "none"
        setTimeout(() => {
            body.classList.add("EasterEgg-Evilaero");
            body.style.display = "block"
        }, 2000)
    }

    if (valor === "restore aero") {
        body.classList.remove("EasterEgg-Evilaero", "EasterEgg-aero", "EasterEgg-null", "EasterEgg-frutiger", "EasterEgg-WindowsXP", "EasterEgg-WindowsVista");
    }

    if (valor === "windows7") {
        Windows7.play();
        setTimeout(() => {
            Windows7.pause();
        }, 6000);
    }

    if (valor === "windowsXP") {
        WindowsXP.play();
        WindowsXP.volume = 0.6
        setTimeout(() => {
            WindowsXP.pause();
        }, 5000)
    }

    if (valor === "aero") {
        body.classList.add("EasterEgg-aero")
    }

    if (valor === "dolphin") {
        body.classList.add("EasterEgg-AquaBody", "EasterEgg-agua")
        FadeIn(enchendo)
        setTimeout(() => {
            FadeIn(agua)
            FadeIn(bolhas)
            FadeOut(enchendo)
        }, 1000)
        setTimeout(() => {
            body.classList.toggle("EasterEgg-golfinho")
            FadeIn(golfinho)
        }, 2000)
        setTimeout(() => {
            FadeOut(agua)
            FadeOut(bolhas)
            body.classList.remove("EasterEgg-AquaBody", "EasterEgg-agua")
        }, 6000)

        function FadeOut(audio, velocidade = 0.02) {
            const fade = setInterval(() => {
                if (audio.volume > velocidade) {
                    audio.volume -= velocidade;
                } else {
                    audio.volume = 0;
                    audio.pause();
                    audio.currentTime = 0;
                    clearInterval(fade);
                }
            }, 50);
        }

        function FadeIn(audio, volumeFinal = 0.3, velocidade = 0.02) {
            audio.currentTime = 0;
            audio.volume = 0;
            audio.play();

            const fade = setInterval(() => {
                if (audio.volume < volumeFinal) {
                    audio.volume += velocidade;
                } else {
                    audio.volume = volumeFinal;
                    clearInterval(fade);
                }
            }, 50);
        }
    }

    if (valor === "root") {
        nota.textContent = "Você não deveria estar aqui"
    }

    if (valor === "null") {
        body.classList.add("EasterEgg-null")
    }

    if (valor === "404") {
        document.querySelectorAll("p, span, button, h1, h2, h4, label").forEach((textos) => {
            textos.dataset.TextosOriginais
            textos.textContent = "ERROR"

            if (valor === "restore aero") {
                textos.textContent = textos.dataset.TextosOriginais
            }
        })
    }

    if (valor === "frutiger") {
        body.classList.add("EasterEgg-frutiger")
    }

    if (valor === "WindowsXP Wallpaper") {
        body.classList.add("EasterEgg-WindowsXP")
    }

    if (valor === "WindowsVista Wallpaper") {
        body.classList.add("EasterEgg-WindowsVista")
    }

    if (ContainerNotas.querySelectorAll(".container-notas").length === 7) {
        nota.textContent = valor + "Você gosta de criar notas né?"
    }
}

function NovaNota() {
    ContainerNotas.classList.add("Layout")

    const valor = InputNota.value.trim();

    const nota = document.createElement("p")
    const ContainerNota = document.createElement("div")
    const texto = document.createElement("span")
    const link = document.createElement("a")
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
    link.href = "https://youtube.com/@Magoozim_games"
    link.textContent = valor

    ContainerNotas.appendChild(ContainerNota)
    ContainerNota.appendChild(nota)
    ContainerNota.appendChild(link)
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

    link.style.display = "none"

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

    EasterEggsNotas(valor, nota, link, ContainerNota)

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

    console.log(ContatoAtual)

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
    ContatoAtual.mensagens.forEach(texto => {

        const Balao = document.createElement("div");
        const p = document.createElement("p");

        p.textContent = texto;

        Balao.classList.add("balao");

        Balao.appendChild(p);

        ContainerMensagem.appendChild(Balao);
    });
}

function CriarContato() {
    let nome = InputNome.value.trim()
    const numero = InputNumero.value.trim()
    let foto = InputFoto.value

    const contato = document.createElement("div")
    const titulo = document.createElement("h4")
    const FotoPerfil = document.createElement("img")

    const PlaceholderOriginal = InputPesquisar.placeholder

    if (nome === "") {
        nome = numero
    }

    if (numero === "") {
        body.classList.remove("inputcontato")
        return
    }

    if (foto === "") {
        FotoPerfil.src = "Imagens/Icon1.webp"
    }

    titulo.dataset.NomeCompleto = nome
    titulo.dataset.NumeroCompleto = numero

    if (numero.length > 13) {
        titulo.textContent = numero.slice(0, 12) + "..."
    }
    else if (nome.length > 12) {
        titulo.textContent = nome.slice(0, 12) + "..."
    }
    else {
        titulo.textContent = nome
    }

    if (contato.length === 13) {
        InputPesquisar.placeholder = "Você conhece bastante gente"
    }
    else {
        InputPesquisar.placeholder = PlaceholderOriginal
    }

    ChatContatos.appendChild(contato)
    contato.appendChild(titulo)
    contato.append(FotoPerfil);

    contato.classList.add("contato")

    const NovoContato = {
        nome: nome,
        numero: numero,
        mensagens: []
    }

    contato.addEventListener("click", () => {
        ContatoAtual = NovoContato
        NomeContato.textContent = NovoContato.nome;
        RenderizarMensagens()
    });

    contatos.push(NovoContato)

    InputNome.value = ""
    InputNumero.value = ""
    body.classList.remove("inputcontato")
}

// Código

BtnView.addEventListener("click", () => {
    body.classList.toggle("visualizar");
    if (body.classList.contains("visualizar")) {
        body.appendChild(BtnView)
    }
    else {
        setTimeout(() => {
            HeaderBody.appendChild(BtnView)
        }, 400)
    }
});

BtnConfirmar.addEventListener("click", () => {
    if (body.classList.contains("inputnota")) {
        NovaNota();
    }
    else if (body.classList.contains("inputcontato")) {
        CriarContato();
    }
    else if (body.classList.contains("inputmensagemrapida")) {
        Mensagem();
    }
    else {
        return;
    }
})

OpenSidebar.addEventListener("click", () => {
    body.classList.toggle("sidebar");
    if (body.classList.contains("sidebar")) {
        return
    }
    else {
        body.classList.remove("inputnota", "inputcontato", "inputmensagemrapida")
    }
});

[BtnMensagem, BtnMenu].forEach((ButtonHeader) => {
    ButtonHeader.addEventListener("click", () => {
        if (ButtonHeader === BtnMensagem) {
            NavBtn.classList.add("btn-deslizante")
            body.classList.add("chat")
            body.classList.remove("calendario", "nota", "inputnota", "inputnota", "inputmensagemrapida")
            InputMensagemChat.focus()
        }
        else if (ButtonHeader === BtnMenu) {
            NavBtn.classList.remove("btn-deslizante")
            body.classList.remove("chat", "calendarioChat", "notaChat", "inputcontato")
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
            if (body.classList.contains("chat")) {
                body.classList.add("calendarioChat")
                body.classList.remove("notaChat")
            }
            else {
                body.classList.add("calendario")
                body.classList.remove("nota")
            }
        }
        else if (ButtonWidget === BtnRelogio) {
            if (body.classList.contains("chat")) {
                body.classList.remove("calendarioChat", "notaChat")
            }
            else {
                body.classList.remove("calendario", "nota")
            }
        }
        else if (ButtonWidget === BtnNota) {
            if (body.classList.contains("chat")) {
                body.classList.add("notaChat")
                body.classList.remove("calendarioChat")
            }
            else {
                body.classList.add("nota")
                body.classList.remove("calendario")
            }
        }
        else {
            body.classList.remove("calendario", "nota", "calendarioChat", "notaChat")
        }
    })
});

BtnNovaNota.addEventListener("click", () => {
    body.classList.add("inputnota");
    InputNota.focus();
});


add.addEventListener("click", () => {
    body.classList.add("inputcontato")
    InputNumero.focus();
});

[InputNome, InputNumero].forEach((InputsContato) => {
    InputsContato.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            CriarContato();
        }
    })
});

[InputMensagemChat, enviar, InputNota].forEach((TextareaEnviar) => {
    if (TextareaEnviar === InputMensagemChat) {
        InputMensagemChat.addEventListener("keydown", (e) => {
            if (e.key === "Enter" && !e.ctrlKey && !e.metaKey && !e.shiftKey) {
                Mensagem();
                InputMensagemChat.value = ""
            }
        })
    }
    else if (TextareaEnviar === enviar) {
        enviar.addEventListener("click", () => {
            Mensagem();
            InputMensagemChat.value = ""
            InputMensagemChat.focus()
        })
    }
    else if (TextareaEnviar === InputNota) {
        InputNota.addEventListener("keydown", (e) => {
            if (e.key === "Enter" && !e.ctrlKey && !e.metaKey && !e.shiftKey) {
                e.preventDefault();
                NovaNota();
                body.classList.add("nota")
            }
        })
    }
});

BtnMesagemRapida.addEventListener("click", () => {
    body.classList.add("inputmensagemrapida")
    ListaContatos.innerHTML = ""
    contatos.forEach(contato => {
        const item = document.createElement("div");
        item.classList.add("item")
        item.textContent = contato.nome;
        item.addEventListener("click", () => {
            ContatoAtual = contato;
            body.classList.add("SelecionarContato")
        });
        ListaContatos.appendChild(item)
    })
    InputMensagem.focus();
    ListaContatos.appendChild(contatos)
});

InputMensagem.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        Mensagem();
        InputMensagem.value = ""
    }
    else if (e.key === "Escape") {
        body.classList.remove("inputmensagemrapida")
    }
})

InputPesquisar.addEventListener("input", (e) => {
    const termo = e.target.value.toLowerCase();
    document.querySelectorAll(".contato").forEach(contato => {
        const nome = contato.querySelector("h4").textContent.toLowerCase();
        contato.style.display = nome.includes(termo)
            ? "flex"
            : "none";
    });
});

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        ContatoAtual = null
        NomeContato.textContent = ""
        ContainerMensagem.innerHTML = ""
    }
})

// easter eggs

// função

HorarioAtual();
setInterval(HorarioAtual, 1000);

DataAtual();
setInterval(DataAtual, 1000);

BordaNotas();