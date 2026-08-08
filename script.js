// variáveis

const body = document.body;
const BtnView = document.getElementById("view");
const HeaderBody = document.getElementById("header-body");
const BtnMenu = document.getElementById("btn-menu");
const BtnMensagem = document.getElementById("btn-mensagens");
const NavBtn = document.getElementById("nav-btn");
const BtnRelogio = document.getElementById("btn-relogio");
const BtnCalendario = document.getElementById("btn-calendario");
const BtnNota = document.getElementById("btn-nota");
const BtnMusica = document.getElementById("btn-musica");
const BtnFechar = document.getElementById("btn-fechar");
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
const InputTitulo = document.getElementById("input-titulo");
const ListaContatos = document.getElementById("lista-contatos");
const add = document.getElementById("add");
const ChatContatos = document.getElementById("chat-contatos")
const NomeContato = document.getElementById("nome-contato");
const ContainerMensagem = document.getElementById("container-mensagem");
const InputMensagemChat = document.getElementById("input");
const enviar = document.getElementById("enviar");
const InputFoto = document.getElementById("input-foto");
const BtnConfirmar = document.getElementById("btn-confirmar");
const BtnCancelar = document.getElementById("btn-cancelar");
const BtnMesagemRapida = document.getElementById("mensagem-rapida");
const InputPesquisar = document.getElementById("input-pesquisar");
const ContainerRelogio = document.getElementById("container-relogio");
const SpanRelogio = document.getElementById("span-relogio");

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

    if (window.innerWidth >= 768) {
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
    }
    else {
        return
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
    const valor = InputNota.value.trim();
    const valortitulo = InputTitulo.value.trim();

    const nota = document.createElement("span")
    const titulo = document.createElement("h2")
    const ContainerNota = document.createElement("div")
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
    titulo.textContent = valortitulo
    nota.textContent = valor
    nota.dataset.TextoCompleto = valor
    link.href = "https://youtube.com/@Magoozim_games"
    link.textContent = valor

    ContainerNotas.appendChild(ContainerNota)
    ContainerNota.appendChild(titulo)
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

    if (valortitulo === "") {
        titulo.textContent = "Sem Título"
    }

    if (valor.length > 30) {
        nota.textContent = valor.slice(0, 30) + "..."
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
            nota.textContent = nota.dataset.TextoCompleto.slice(0, 30) + "..."
            BtnMais.textContent = "Mais ⬇︎"
            expandido = false
        }
    })


    [BtnExcluir, BtnEditar].forEach((BtnNotas) => {
        BtnNotas.addEventListener("click", () => {
            if (BtnNotas === BtnExcluir) {
                ContainerNota.remove();
            }
            else if (BtnNotas === BtnEditar) {
                ContainerNota.remove();
                body.classList.add("sidebar", "inputnota");
                body.classList.remove("widget")
                InputNota.value = nota.dataset.TextoCompleto;
                InputNota.focus();
            }
        })
    })

    EasterEggsNotas(valor, nota, link, ContainerNota)

    InputNota.value = ""
    body.classList.remove("inputnota")
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

    AtualizarTituloContato(titulo)

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
        body.classList.remove("sidebar")
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

[BtnConfirmar, BtnCancelar].forEach((ButtonAction) => {
    if (ButtonAction === BtnConfirmar) {
        BtnConfirmar.addEventListener("click", () => {
            if (body.classList.contains("inputnota")) {
                NovaNota();
                InputTitulo.value = ""
                body.classList.remove("sidebar")
            }
            else if (body.classList.contains("inputcontato")) {
                CriarContato();
            }
            else if (body.classList.contains("inputmensagemrapida")) {
                Mensagem();
                body.classList.remove("inputmensagemrapida", "sidebar")
            }
            else {
                return;
            }
        })
    }
    else if (ButtonAction === BtnCancelar) {
        BtnCancelar.addEventListener("click", () => {
            if (body.classList.contains("inputnota")) {
                body.classList.remove("inputnota")
                InputNota.value = ""
                InputTitulo.value = ""
                return
            }
            else if (body.classList.contains("inputcontato")) {
                body.classList.remove("inputcontato")
                return
            }
            else if (body.classList.contains("inputmensagemrapida")) {
                body.classList.remove("inputmensagemrapida")
                return
            }
            else {
                return
            }
        })
    }
});

document.querySelectorAll(".open-sidebar").forEach((BTNSsidebar) => {
    BTNSsidebar.addEventListener("click", () => {
        body.classList.toggle("sidebar");
        if (body.classList.contains("sidebar")) {
            if (body.classList.contains("widget")) {
                body.classList.remove("widget")
                setTimeout(() => {
                    body.classList.remove("calendario", "nota", "musica")
                }, 500)
            }
        }
        else {
            body.classList.remove("inputnota", "inputcontato", "inputmensagemrapida")
        }
    });
});

[BtnMensagem, BtnMenu].forEach((ButtonHeader) => {
    ButtonHeader.addEventListener("click", () => {
        if (ButtonHeader === BtnMensagem) {
            NavBtn.classList.add("btn-deslizante")
            body.classList.add("chat")
            body.classList.remove("calendario", "nota", "inputnota", "inputnota", "inputmensagemrapida")
            if (window.innerWidth >= 769) {
                InputMensagemChat.focus()
                body.classList.add("chatTempo")
            }
        }
        else if (ButtonHeader === BtnMenu) {
            NavBtn.classList.remove("btn-deslizante")
            body.classList.remove("chat", "calendarioChat", "notaChat", "inputcontato")
            setTimeout(() => {
                body.classList.remove("chatTempo")
            }, 300)
        }
        else {
            NavBtn.classList.remove("btn-deslizante")
            body.classList.remove("chat", "chatTempo")
        }
    })
});

[BtnCalendario, BtnRelogio, BtnNota, BtnMusica, BtnFechar].forEach((ButtonWidget) => {
    ButtonWidget.addEventListener("click", () => {
        const EstavaFechado = !body.classList.contains("widget")
        body.classList.add("widget")
        if (window.innerWidth < 769 && body.classList.contains("sidebar")) {
            body.classList.remove("sidebar")
        }

        if (ButtonWidget === BtnCalendario) {
            if (body.classList.contains("chat") && window.innerWidth >= 769) {
                body.classList.add("calendarioChat")
                body.classList.remove("notaChat")
            }

            else if (EstavaFechado) {
                setTimeout(() => {
                    body.classList.add("calendario")
                    body.classList.remove("nota")
                }, 500)
            }
            else {
                body.classList.add("calendario")
                body.classList.remove("nota", "musica")
            }
        }
        else if (ButtonWidget === BtnRelogio) {
            if (body.classList.contains("chat") && window.innerWidth >= 769) {
                body.classList.remove("calendarioChat", "notaChat")
            }
            else {
                body.classList.remove("calendario", "nota", "musica")
            }
        }
        else if (ButtonWidget === BtnFechar) {
            body.classList.remove("widget")
            setTimeout(() => {
                body.classList.remove("calendario", "nota", "musica");
            }, 500)
        }
        else if (ButtonWidget === BtnNota) {
            if (body.classList.contains("chat") && window.innerWidth >= 769) {
                body.classList.add("notaChat")
                body.classList.remove("calendarioChat")
            }
            else if (EstavaFechado) {
                setTimeout(() => {
                    body.classList.add("nota")
                    body.classList.remove("calendario")
                }, 500)
            }
            else {
                body.classList.add("nota")
                body.classList.remove("calendario", "musica")
            }
        }
        else if (ButtonWidget === BtnMusica) {
            if (EstavaFechado) {
                setTimeout(() => {
                    body.classList.add("musica")
                    body.classList.remove("calendario", "nota")
                }, 500)
            }
            else {
                body.classList.add("musica")
                body.classList.remove("calendario", "nota")
            }
        }
        else {
            body.classList.remove("calendario", "nota", "calendarioChat", "notaChat", "musica")
        }
    })
});

BtnNovaNota.addEventListener("click", () => {
    body.classList.add("inputnota");
    InputTitulo.focus();
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
                InputTitulo.value = ""
                body.classList.remove("sidebar")
                if (window.innerWidth <= 768) {
                    body.classList.add("widget")
                }
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
        body.classList.remove("sidebar")
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
});

InputTitulo.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        InputNota.focus(NovaNota);
    }
});

let contador = 0

ContainerRelogio.addEventListener("click", () => {
    contador++
    console.log(contador)
    if (contador === 25) {
        body.classList.add("EasterEgg-span")
        setTimeout(() => {
            body.classList.remove("EasterEgg-span")
        }, 3000)
    }
    else if (contador === 50) {
        body.classList.add("EasterEgg-span")
        setTimeout(() => {
            body.classList.remove("EasterEgg-span")
        }, 3000)
        SpanRelogio.textContent = "CHEGA!!!"
    }
    else if (contador === 100) {
        body.classList.add("EasterEgg-span")
        setTimeout(() => {
            body.classList.remove("EasterEgg-span")
        }, 3000)
        SpanRelogio.textContent = "Por favor, PARA!"
    }
})

// easter eggs

// função

HorarioAtual();
setInterval(HorarioAtual, 1000);

DataAtual();
setInterval(DataAtual, 1000);

// mobile

function AtualizarTituloContato(titulo) {
    const nome = titulo.dataset.NomeCompleto
    const numero = titulo.dataset.NumeroCompleto

    if (window.innerWidth < 769) {
        if (numero.length > 8) {
            titulo.textContent = numero.slice(0, 8) + "..."
        }
        else if (nome.length > 9) {
            titulo.textContent = nome.slice(0, 9) + "..."
        }
        else {
            titulo.textContent = nome
        }
    }
    else {
        if (numero.length > 13) {
            titulo.textContent = numero.slice(0, 13) + "..."
        }
        else if (nome.length > 12) {
            titulo.textContent = nome.slice(0, 12) + "..."
        }
        else {
            titulo.textContent = nome
        }
    }
}

window.addEventListener("resize", () => {
    document.querySelectorAll(".contato h4").forEach(AtualizarTituloContato)
})