const campoBusca = document.getElementById("campoBusca");
// Seleciona todos os cards de projeto
const cards = document.querySelectorAll(".project-card");
const mensagemSemProjetos = document.getElementById("mensagem-sem-projetos");

function filtrarProjetos() {
  const textoBusca = campoBusca.value.toLowerCase();
  let temResultados = false;

  cards.forEach((card) => {
    // Pega todo o texto dentro do card (título, descrição, tecnologias)
    const conteudoCard = card.textContent.toLowerCase();

    // Verifica se o texto da busca está contido no card
    if (conteudoCard.includes(textoBusca)) {
      card.style.display = "flex";
      // Pequeno delay para garantir que a transição de opacidade ocorra
      setTimeout(() => {
        card.classList.remove("invisivel");
      }, 50);
      temResultados = true;
    } else {
      card.classList.add("invisivel");
      // Espera a animação do CSS (0.3s) terminar antes de tirar do layout
      setTimeout(() => {
        if (card.classList.contains("invisivel")) {
          card.style.display = "none";
        }
      }, 300);
    }
  });

  if (temResultados) {
    mensagemSemProjetos.style.display = "none";
  } else {
    mensagemSemProjetos.style.display = "block";
  }
}

// Adiciona o evento de 'input' para filtrar em tempo real enquanto o usuário digita.
// Este evento é acionado a cada letra digitada ou removida.
campoBusca.addEventListener("input", filtrarProjetos);

// --- Efeitos Visuais (Adaptado de page.html) ---

// 1. Efeito de Scroll no Header
const header = document.querySelector("header");
window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 50);
});

// 2. Canvas Animation (Partículas Conectadas)
const canvas = document.getElementById("bgCanvas");
if (canvas) {
  const ctx = canvas.getContext("2d");
  let particlesArray;

  const resizeCanvas = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };
  window.addEventListener("resize", () => {
    resizeCanvas();
    initParticles();
  });
  resizeCanvas();

  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.directionX = Math.random() * 1 - 0.5;
      this.directionY = Math.random() * 1 - 0.5;
      this.size = Math.random() * 2 + 1;
    }
    update() {
      if (this.x > canvas.width || this.x < 0) this.directionX *= -1;
      if (this.y > canvas.height || this.y < 0) this.directionY *= -1;
      this.x += this.directionX;
      this.y += this.directionY;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = "#00f2ff"; // Cor Neon
      ctx.fill();
    }
  }

  function initParticles() {
    particlesArray = [];
    const numberOfParticles = (canvas.height * canvas.width) / 10000;
    for (let i = 0; i < numberOfParticles; i++) {
      particlesArray.push(new Particle());
    }
  }

  function animateParticles() {
    requestAnimationFrame(animateParticles);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < particlesArray.length; i++) {
      particlesArray[i].update();
      particlesArray[i].draw();

      for (let j = i; j < particlesArray.length; j++) {
        const dx = particlesArray[i].x - particlesArray[j].x;
        const dy = particlesArray[i].y - particlesArray[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 100) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(0, 242, 255, ${1 - distance / 100})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
          ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
          ctx.stroke();
        }
      }
    }
  }

  initParticles();
  animateParticles();
}

// 3. Efeito de Digitação (Typewriter)
const tituloPrincipal = document.querySelector("header h1");

function typeWriter(elemento) {
  const textoArray = elemento.innerHTML.split("");
  elemento.innerHTML = "";

  // Carrega o som (Você precisa adicionar o arquivo 'teclado.mp3' na pasta assets)
  const audio = new Audio("assets/teclado.mp3");

  textoArray.forEach((letra, i) => {
    setTimeout(() => {
      elemento.innerHTML += letra;
      // Clona o áudio para permitir sons sobrepostos (digitação rápida) e define volume baixo
      const som = audio.cloneNode();
      som.volume = 0.2;
      som.play().catch(() => {}); // Evita erros se o navegador bloquear o som automático
    }, 100 * i);
  });
}

if (tituloPrincipal) typeWriter(tituloPrincipal);
