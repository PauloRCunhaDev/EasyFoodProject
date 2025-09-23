// "Banco de dados" dos restaurantes
const restaurantes = [
    "bar do filha",
    "churras do ligeiro", 
    "lanche do lucas",
    "pizzaria do follmann"
];

// Função para buscar restaurante
function buscarRestaurante() {
    const input = document.querySelector('.search-input');
    const resultadoContainer = document.getElementById('resultado-busca');
    const nomeRestauranteElement = document.getElementById('nome-restaurante');
    const nomeDigitado = input.value.trim().toLowerCase();
    
    // Esconde o resultado anterior
    resultadoContainer.style.display = 'none';
    
    // Verifica se o campo não está vazio
    if (nomeDigitado === '') {
        alert('Por favor, digite o nome de um restaurante!');
        return;
    }
    
    // Busca o restaurante no array
    const restauranteEncontrado = restaurantes.find(restaurante => 
        restaurante.toLowerCase() === nomeDigitado
    );
    
    if (restauranteEncontrado) {
        // Mostra o restaurante encontrado
        nomeRestauranteElement.textContent = restauranteEncontrado;
        resultadoContainer.style.display = 'block';
        input.value = ''; // Limpa o campo após busca bem-sucedida
    } else {
        alert('Nome digitado incorreto ou restaurante indisponível!');
    }
}

// Adiciona eventos quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
    const searchButton = document.querySelector('.search-button');
    const searchInput = document.querySelector('.search-input');
    const btnSelecionar = document.querySelector('.btn-selecionar');
    
    // Buscar ao clicar no botão
    searchButton.addEventListener('click', buscarRestaurante);
    
    // Buscar ao pressionar Enter
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            buscarRestaurante();
        }
    });
    
    // Funcionalidade do botão selecionar (temporária)
    btnSelecionar.addEventListener('click', function() {
        const nomeRestaurante = document.getElementById('nome-restaurante').textContent;
        alert(`Você selecionou: ${nomeRestaurante}\n(Funcionalidade será implementada futuramente)`);
    });
});
