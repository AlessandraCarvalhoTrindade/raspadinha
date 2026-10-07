const areaSimbolos = document.getElementById("area-simbolos");
const pontosEl = document.getElementById("pontos");
const mensagemEl = document.getElementById("mensagem");

let pontos = Number(localStorage.getItem("pontosRaspadinha")) || 50; // começa com 50 pontos
let temaAtual = "classico";
let simbolosAtuais = [];
let raspados = 0;

const simbolosPossiveis = ["🐞", "🍀", "🧲", "⭐", "🔔"];

function atualizarPontos() {
    pontosEl.innerText = pontos;
    localStorage.setItem("pontosRaspadinha", pontos);

    if (pontos >= 80) document.getElementById("btn-praia").disabled = false;
    if (pontos >= 150) document.getElementById("btn-natal").disabled = false;
}

function escolherTema(tema) {
    if (event.target.disabled) return;
    temaAtual = tema;
    document.querySelectorAll(".tema-btn").forEach(btn => btn.classList.remove("ativo"));
    event.target.classList.add("ativo");
    novaRaspadinha(true); // true = não gasta pontos
}

function gerarSimbolos() {
    // Garante que tenha chance de ter 3 iguais
    const base = simbolosPossiveis[Math.floor(Math.random() * simbolosPossiveis.length)];
    let lista = [base, base, base];

    // Completa com 2 símbolos aleatórios
    while (lista.length < 5) {
        const s = simbolosPossiveis[Math.floor(Math.random() * simbolosPossiveis.length)];
        lista.push(s);
    }

    // Embaralha
    lista = lista.sort(() => Math.random() - 0.5);
    return lista;
}

function novaRaspadinha(gratis = false) {
    if (!gratis) {
        if (pontos < 10) {
            mensagemEl.innerText = "Pontos insuficientes! Continue jogando para acumular.";
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
        div.classList.add("simbolo");
        div.innerHTML = `<span>${simbolo}</span>`;
        div.onclick = () => raspar(div, index);
        areaSimbolos.appendChild(div);
    });
}

function raspar(elemento, index) {
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
        mensagemEl.innerText = "🎉 Parabéns! Você encontrou 3 iguais e ganhou 30 pontos!";
        mensagemEl.style.color = "#166534";
    } else {
        mensagemEl.innerText = "Não foi dessa vez... Tente outra raspadinha!";
        mensagemEl.style.color = "#b91c1c";
    }
}

// Inicia o jogo
atualizarPontos();
novaRaspadinha(true);
