const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const premioEl = document.getElementById("premio");
const pontosEl = document.getElementById("pontos");

let isDrawing = false;
let pontos = Number(localStorage.getItem("pontosRaspadinha")) || 0;
let temaAtual = "classico";
let raspadinhaCompleta = false;

const premios = [
    "1 milhão em felicidade ✨",
    "Um dia de folga imaginário 🛋️",
    "Café infinito por 1 semana ☕",
    "Sorte no Pix 💸",
    "Direito de não responder mensagens por 24h 📵",
    "Abraço virtual apertado 🤗",
    "Uma pizza grátis no mundo da imaginação 🍕",
    "Passe livre para ser preguiçosa hoje 😌",
    "3 desejos (válidos só na fantasia) 🧞",
    "Uma viagem dos sonhos (mentais) ✈️"
];

const coresTema = {
    classico: "#a16207",
    praia: "#0ea5e9",
    natal: "#dc2626",
    flores: "#db2777"
};

// Atualiza pontos na tela e desbloqueios
function atualizarPontos() {
    pontosEl.innerText = pontos;
    localStorage.setItem("pontosRaspadinha", pontos);

    if (pontos >= 50) document.getElementById("btn-praia").disabled = false;
    if (pontos >= 100) document.getElementById("btn-natal").disabled = false;
    if (pontos >= 150) document.getElementById("btn-flores").disabled = false;
}

function escolherTema(tema) {
    temaAtual = tema;
    document.querySelectorAll(".tema-btn").forEach(btn => btn.classList.remove("ativo"));
    event.target.classList.add("ativo");
    novaRaspadinha();
}

function novaRaspadinha() {
    raspadinhaCompleta = false;
    const premio = premios[Math.floor(Math.random() * premios.length)];
    premioEl.innerText = premio;

    // Preenche o canvas com a cor do tema (camada de raspar)
    ctx.globalCompositeOperation = "source-over";
    ctx.fillStyle = coresTema[temaAtual];
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Texto "RASPE AQUI"
    ctx.fillStyle = "rgba(255,255,255,0.7)";
    ctx.font = "bold 22px Arial";
    ctx.textAlign = "center";
    ctx.fillText("RASPE AQUI", canvas.width / 2, canvas.height / 2);
}

function getPosicao(e) {
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return {
        x: clientX - rect.left,
        y: clientY - rect.top
    };
}

function startDrawing(e) {
    isDrawing = true;
    draw(e);
}

function stopDrawing() {
    isDrawing = false;

    // Verifica se raspou o suficiente
    if (!raspadinhaCompleta) {
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        let transparent = 0;
        for (let i = 3; i < imageData.data.length; i += 4) {
            if (imageData.data[i] === 0) transparent++;
        }
        const percentual = transparent / (canvas.width * canvas.height);

        if (percentual > 0.45) {
            raspadinhaCompleta = true;
            pontos += 10;
            atualizarPontos();
            // Limpa o resto do canvas para revelar tudo
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    }
}

function draw(e) {
    if (!isDrawing) return;
    e.preventDefault();

    const pos = getPosicao(e);
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, 18, 0, Math.PI * 2);
    ctx.fill();
}

// Eventos mouse
canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("mouseup", stopDrawing);
canvas.addEventListener("mousemove", draw);

// Eventos touch (celular)
canvas.addEventListener("touchstart", startDrawing);
canvas.addEventListener("touchend", stopDrawing);
canvas.addEventListener("touchmove", draw);

// Inicia
atualizarPontos();
novaRaspadinha();
