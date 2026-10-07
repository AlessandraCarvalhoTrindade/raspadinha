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

  let lista = [];
  const principal = simbolos[Math.floor(Math.random() * simbolos.length)];
  lista.push(principal, principal, principal);

  while (lista.length < 5) {
    lista.push(simbolos[Math.floor(Math.random() * simbolos.length)]);
  }

  lista = lista.sort(() => Math.random() - 0.5);

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
    if (contagem[s] >= 3) ganhou = true;
  }

  if (ganhou) {
    pontos += 30;
    atualizarPontos();
    document.getElementById("msg").innerText = "🎉 Você ganhou 30 pontos!";
  } else {
    document.getElementById("msg").innerText = "Não foi dessa vez...";
  }
}

atualizarPontos();
jogar();
