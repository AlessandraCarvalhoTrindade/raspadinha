const areaSimbolos = document.getElementById("area-simbolos");
const pontosEl = document.getElementById("pontos");
const mensagemEl = document.getElementById("mensagem");

let pontos = Number(localStorage.getItem("pontosRaspadinha")) || 50;
let temaAtual = "classico";
let simbolosAtuais = [];
let raspados = 0;

const simbolosPossiveis = ["🐞", "🍀", "🧲", "⭐", "🔔"];

function atualizarPontos() {
    pontosEl.innerText = pontos;
    localStorage.setItem("pontosRaspadinha", pontos);

    const btnPraia = document.getElementById("btn-praia");
    const btnNatal = document.getElementById("btn-natal");

    if (btnPraia) btnPraia.disabled = pontos < 80;
    if (btnNatal) btnNatal.disabled = pontos < 150;
}

function escolherTema(tema) {
    const botao = event.target;
    if (botao.disabled) return;

    temaAtual = tema;
    document.querySelectorAll(".tema-btn").forEach(btn => btn.classList.remove("ativo"));
    botao.classList.add("ativo");
    novaRaspadinha(true);
}

function gerarSimbolos() {
    const base = simbolosPossiveis[Math.floor(Math.random() * simbolosPossiveis.length)];
    let lista = [base, base, base];

    while (lista.length < 5) {
        const s = simbolosPossiveis[Math.floor(Math.random() * simbolosPossiveis.length)];
        lista.push(s);
    }

    // Embaralha
    for (let i = lista.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [lista[i], lista[j]] = [lista[j], lista[i]];
    }
    return lista;
}

function novaRaspadinha(gratis = false) {
    if (!gratis) {
        if (pontos < 10) {
            mensagemEl.innerText = "Pontos insuficientes!";
            mensagemEl.style.color = "#b91c1c";
            return;
        }
        pontos -= 10;
        atualizarPontos();
    }

    areaSimbolos.innerHTML = "";
    simbolosAtuais = gerarSimbolos();
    raspados = 0;
    mensagemEl.innerText = "";

    simbolosAtuais.forEach((simbolo, index) => {
        const div = document.createElement("div");
        div.className = "simbolo";
        div.innerHTML = `<span>${simbolo}</span>`;
        div.onclick = function() {
            raspar(this);
        };
        areaSimbolos.appendChild(div);
    });
}

function raspar(elemento) {
    if (elemento.classList.contains("raspado")) return;

    elemento.classList.add("raspado");
    raspados++;

    if (raspados === 5) {
        verificarPremio();
    }
}

function verificarPremio() {
    const contagem = {};
    simbolosAtuais.forEach(s => {
        contagem[s] = (contagem[s] || 0) + 1;
    });

    let ganhou = false;
    for (let s in contagem) {
        if (contagem[s] >= 3) {
            ganhou = true;
            break;
        }
    }

    if (ganhou) {
        pontos += 30;
        atualizarPontos();
        mensagemEl.innerText = "🎉 Parabéns! 3 iguais! Você ganhou 30 pontos!";
        mensagemEl.style.color = "#166534";
    } else {
        mensagemEl.innerText = "Não foi dessa vez... Tente outra!";
        mensagemEl.style.color = "#b91c1c";
    }
}

// Inicia o jogo
atualizarPontos();
novaRaspadinha(true);
