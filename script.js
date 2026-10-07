```javascript
let pontos = 50;

const simbolos = ["🐞", "🍀", "⭐", "🔔", "🧲"];

function atualizarPontos() {
  document.getElementById("pontos").innerText = pontos;
}

function jogar() {
  // Verifica se possui pontos suficientes
  if (pontos < 10) {
    document.getElementById("msg").innerText = "Pontos insuficientes!";
    return;
  }

  // Custa 10 pontos para jogar
  pontos -= 10;
  atualizarPontos();

  document.getElementById("msg").innerText = "";

  // Sorteia os 5 símbolos
  let lista = [];

  for (let i = 0; i < 5; i++) {
    const aleatorio =
      simbolos[Math.floor(Math.random() * simbolos.length)];

    lista.push(aleatorio);
  }

  // Limpa a raspadinha anterior
  const area = document.getElementById("area");
  area.innerHTML = "";

  let revelados = 0;

  // Cria os 5 espaços da raspadinha
  lista.forEach((s) => {
    const div = document.createElement("div");

    div.className = "simbolo";
    div.innerText = "?";

    div.onclick = function () {

      // Impede clicar novamente no mesmo símbolo
      if (this.innerText !== "?") return;

      this.innerText = s;
      this.classList.add("revelado");

      revelados++;

      // Quando todos os símbolos forem revelados
      if (revelados === 5) {
        verificar(lista);
      }
    };

    area.appendChild(div);
  });
}

function verificar(lista) {

  // Conta quantas vezes cada símbolo apareceu
  const contagem = {};

  lista.forEach((s) => {
    contagem[s] = (contagem[s] || 0) + 1;
  });

  // Descobre a maior quantidade de símbolos iguais
  let maiorQuantidade = 0;

  for (let s in contagem) {
    if (contagem[s] > maiorQuantidade) {
      maiorQuantidade = contagem[s];
    }
  }

  // Define o prêmio
  let premio = 0;

  if (maiorQuantidade === 5) {

    // 5 iguais
    premio = 100;

  } else if (maiorQuantidade === 4) {

    // 4 iguais
    premio = 50;

  } else if (maiorQuantidade === 3) {

    // 3 iguais
    premio = 20;
  }

  // Se ganhou
  if (premio > 0) {

    pontos += premio;
    atualizarPontos();

    document.getElementById("msg").innerText =
      `🎉 Você ganhou ${premio} pontos!`;

  } else {

    // Se não ganhou
    document.getElementById("msg").innerText =
      "😢 Não foi dessa vez... Tente novamente!";
  }
}

// Atualiza os pontos quando a página carrega
atualizarPontos();
```

