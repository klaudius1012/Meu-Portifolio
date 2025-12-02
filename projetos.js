document.addEventListener('DOMContentLoaded', () => {
    const tituloCategoriaEl = document.getElementById('titulo-categoria');
    const containerProjetosEl = document.querySelector('.projetos-container');

    try {
        // Pega os parâmetros da URL para descobrir qual categoria mostrar
        const urlParams = new URLSearchParams(window.location.search);
        const categoria = urlParams.get('categoria');

        if (!categoria) {
            throw new Error("Nenhuma categoria especificada.");
        }

            // Mapeia a categoria da URL para um título e um nome de arquivo JSON
            const categoriasInfo = {
                JavaScript: {
                    titulo: "Projetos Alura / Pessoais com JavaScript",
                    arquivo: "javascript.json"
                },
                powerbi: {
                    titulo: "Dashboards com Power BI",
                    // arquivo: "powerbi.json"
                },
                python: {
                    titulo: "Projetos Python",
                   // arquivo: "python.json"
                },
                frontend: {
                    titulo: "Projetos Front-End",
                   arquivo: "frontend.json"
                }
    
            };

            const info = categoriasInfo[categoria];

            if (info) {
            // Define o título na página
            tituloCategoriaEl.textContent = info.titulo;
            // Carrega os projetos do arquivo JSON correspondente
            carregarProjetos(info.arquivo);
            } else {
                throw new Error("Categoria não encontrada.");
            }
    } catch (error) {
        tituloCategoriaEl.textContent = "Erro";
        containerProjetosEl.innerHTML = `<p>Ocorreu um problema: ${error.message}</p><p>Por favor, volte para a página inicial e tente novamente.</p>`;
        console.error(error);
        }
});

async function carregarProjetos(arquivoJson) {
    const container = document.querySelector('.projetos-container');
    try {
        const response = await fetch(arquivoJson);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const projetos = await response.json();

        let projetosHTML = ''; // Acumula o HTML dos projetos

        projetos.forEach(projeto => {
            // Cria o card para cada projeto individual
            projetosHTML += `
                <a href="${projeto.link}" target="_blank" class="categoria-link">
                    <article class="projeto-card">
                        <img src="${projeto.imagem}" alt="Imagem do projeto ${projeto.titulo}" class="projeto-imagem">
                        <div class="projeto-info">
                            <h3>${projeto.titulo}</h3>
                            <p>${projeto.descricao}</p>
                        </div>
                    </article>
                </a>
            `;
        });

        container.innerHTML = projetosHTML; // Insere todo o HTML de uma vez
    } catch (error) {
        console.error("Não foi possível carregar os projetos:", error);
        container.innerHTML = "<p>Categoria sem projetos atualmente!</p>";
    }

}


