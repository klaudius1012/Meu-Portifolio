const campoBusca = document.getElementById("campoBusca");
// Seleciona todos os cards de projeto
const cards = document.querySelectorAll(".project-card");
const mensagemSemProjetos = document.getElementById("mensagem-sem-projetos");
const toggleTema = document.getElementById("toggleTema");

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

// --- Lógica do Dark Mode ---
toggleTema.addEventListener("change", () => {
  document.body.classList.toggle("dark-mode");
});
