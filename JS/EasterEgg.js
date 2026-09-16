import { body, Notas } from "./main.js";

const Windows7 = document.getElementById("windows-7");
const enchendo = document.getElementById("enchendo");
const agua = document.getElementById("agua");
const bolhas = document.getElementById("bolhas");
const golfinho = document.getElementById("golfinho");
const WindowsXP = document.getElementById("windows-XP");

const ContainerRelogio = document.getElementById("container-relogio");
const SpanRelogio = document.getElementById("span-relogio");

export function EasterEggsNotas(valor, nota, ContainerNota) {
    if (valor === "what's evil aero?") {
        ContainerNota.remove();
        body.style.display = "none"
        setTimeout(() => {
            body.classList.add("EasterEgg-Evilaero");
            body.style.display = "block"
        }, 2000)
    }

    if (valor === "restore aero") {
        body.classList.remove("EasterEgg-Evilaero", "EasterEgg-aero", "EasterEgg-null", "EasterEgg-frutiger", "EasterEgg-WindowsXP", "EasterEgg-WindowsVista");

        document.querySelectorAll("[data-texto-original]").forEach((texto) => {
            texto.textContent = texto.dataset.textoOriginal;
        });
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

    if (valor === "dolphin" && window.innerWidth >= 768) {
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
    }

    if (valor === "root") {
        nota.textContent = "Você não deveria estar aqui"
    }

    if (valor === "null") {
        body.classList.add("EasterEgg-null")
    }

    if (valor === "404") {
        document.querySelectorAll("p, span, button, h1, h2, h4, label").forEach((texto) => {
            if (!texto.dataset.textoOriginal) {
                texto.dataset.textoOriginal = texto.textContent;
            }
            texto.textContent = "ERROR";
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
}

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

let contador = 0

ContainerRelogio.addEventListener("click", () => {
    contador++
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