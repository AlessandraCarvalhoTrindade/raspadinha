let pontos = 50;
const simbolos = ["🐞", "🍀", "⭐", "🔔", "🧲"];

function atualizarPontos() {
  document.getElementById("pontos").innerText = pontos;
}

function jogar() {
  if (pontos < 10) {
    document.getElementById("msg").innerText = "Pontos insuficientes!";
    return;
  }

  pontos -= 10;
  atualizarPontos();
  document.getElementById("msg").innerText = "";

  // Gera 5 símbolos totalmente aleatórios (sorte real)
  let lista = [];
  for (let i = 0; i < 5; i++) {
    const aleatorio = simbolos[Math.floor(Math.random() * simbolos.length)];
    lista.push(aleatorio);
  }

  const area = document.getElementById("area");
  area.innerHTML = "";

  let revelados = 0;

  lista.forEach((s) => {
    const div = document.createElement("div");
    div.className = "simbolo";
    div.innerText = "?";
    div.onclick = function () {
      if (this.innerText !== "?") return;
      this.innerText = s;
      this.classList.add("revelado");
      revelados++;

      if (revelados === 5) {
        verificar(lista);
      }
    };
    area.appendChild(div);
  });
}

function verificar(lista) {
  const contagem = {};
  lista.forEach(s => contagem[s] = (contagem[s] || 0) + 1);

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
    document.getElementById("msg").innerText = "🎉 Você ganhou 30 pontos!";
  } else {
    document.getElementById("msg").innerText = "Não foi dessa vez... Tente outra!";
  }
}

atualizarPontos();
jogar();
