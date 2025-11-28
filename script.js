// Adiciona um "ouvinte de evento" ao documento. O evento é 'DOMContentLoaded',
// que é disparado quando todo o HTML da página foi completamente carregado e analisado.
// A função de seta '() => { ... }' só será executada depois que isso acontecer.
document.addEventListener('DOMContentLoaded', () => {
    // Busca no documento HTML o primeiro elemento que tenha a classe CSS 'projetos-container'
    // e armazena uma referência a ele na constante 'projetosContainer'.
    const projetosContainer = document.querySelector('.projetos-container');
    const campoBusca = document.getElementById('campoBusca');
    const botaoBusca = document.getElementById('botaoBusca');
    let todosProjetos = []; // Variável para armazenar todos os projetos

    // Define uma função assíncrona chamada 'carregarProjetos'. 'async' permite o uso de 'await' dentro dela.
    async function carregarProjetos() {
        // Inicia um bloco 'try...catch' para lidar com possíveis erros durante a busca do arquivo.
        try {
            // Faz uma requisição de rede para buscar o arquivo 'data.json'.
            // 'await' pausa a execução da função até que a promessa do 'fetch' seja resolvida (a resposta chegue).
            const response = await fetch('data.json');
            // Verifica se a requisição foi bem-sucedida (ex: status 200). Se não for 'ok' (ex: erro 404),
            if (!response.ok) {
                // lança um novo erro, que será capturado pelo bloco 'catch'.
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            // Converte o corpo da resposta (que é um fluxo de dados) para o formato JSON.
            // 'await' pausa a execução até que a conversão seja concluída.
            todosProjetos = await response.json();
            // Chama a função 'renderizarProjetos', passando o array completo de projetos para a renderização inicial.
            renderizarProjetos(todosProjetos);
        // Se qualquer erro ocorrer no bloco 'try', o código dentro do 'catch' será executado.
        } catch (error) {
            // Exibe uma mensagem de erro detalhada no console do desenvolvedor do navegador.
            console.error("Não foi possível carregar os projetos:", error);
            // Insere uma mensagem de erro diretamente na página para o usuário ver.
            projetosContainer.innerHTML = "<p>Ocorreu um erro ao carregar os projetos.</p>";
        }
    }

    // Define uma função chamada 'renderizarProjetos' que aceita um array de 'projetos' como parâmetro.
    function renderizarProjetos(projetos) {
        // Limpa todo o conteúdo HTML de dentro do 'projetosContainer' para evitar duplicatas.
        let projetosHTML = '';
        // Itera sobre cada item (chamado de 'projeto') dentro do array 'projetos'.
        projetos.forEach(projeto => {
            // Cria uma string de HTML (usando template literals `...`) para um card de projeto.
            // Os valores de cada projeto (link, titulo, descricao) são inseridos dinamicamente.
            // Adicionei os campos de título e descrição ao card para que o usuário veja o conteúdo.
            projetosHTML += `
                <a href="${projeto.link}" class="categoria-link">
                    <article class="categoria-projeto">
                        <img src="${projeto.imagem}" alt="Ícone para ${projeto.titulo}" class="projeto-imagem">
                        <div class="projeto-info">
                            <h3>${projeto.titulo}</h3>
                            <p>${projeto.descricao}</p>
                        </div>
                    </article>
                </a>
            `;
        });

        if (projetos.length === 0) {
            projetosContainer.innerHTML = "<p>Nenhum projeto encontrado com o termo buscado.</p>";
        }

        projetosContainer.innerHTML = projetosHTML;
    }

    // Função para lidar com a busca
    function efetuarBusca() {
        const termoBusca = campoBusca.value.toLowerCase();
        const projetosFiltrados = todosProjetos.filter(projeto => 
            projeto.titulo.toLowerCase().includes(termoBusca) || 
            projeto.descricao.toLowerCase().includes(termoBusca)
        );
        renderizarProjetos(projetosFiltrados);
    }

    // Adiciona o evento de clique ao botão de busca, se ele existir
    if (botaoBusca) {
        botaoBusca.addEventListener('click', efetuarBusca);
    }

    // Adiciona o evento de 'input' para busca em tempo real, se o campo de busca existir
    if (campoBusca) {
        campoBusca.addEventListener('input', efetuarBusca);
    }

    // Chama a função 'carregarProjetos' para iniciar todo o processo.
    carregarProjetos();
});