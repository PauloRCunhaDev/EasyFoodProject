// "Banco de dados" dos restaurantes
const restaurantes = [
    "bar do filha",
    "churras do ligeiro", 
    "lanche do lucas",
    "pizzaria do follmann"
];

// Cardápios dos restaurantes
const menus = {
    "bar do filha": {
        "Petiscos": [
            { nome: "Pastel de Carne", descricao: "Pastel crocante recheado com carne moída temperada", preco: "R$ 8,00" },
            { nome: "Coxinha", descricao: "Coxinha tradicional de frango desfiado", preco: "R$ 6,00" },
            { nome: "Bolinho de Bacalhau", descricao: "Bolinho cremoso de bacalhau com batata", preco: "R$ 12,00" },
            { nome: "Torrada Alho", descricao: "Pão torrado com alho e ervas", preco: "R$ 5,00" }
        ],
        "Bebidas": [
            { nome: "Cerveja Gelada", descricao: "Cerveja pilsen bem gelada", preco: "R$ 5,00" },
            { nome: "Caipirinha", descricao: "Cachaça com limão e açúcar", preco: "R$ 12,00" },
            { nome: "Refrigerante", descricao: "Coca-Cola, Guaraná ou Fanta", preco: "R$ 4,00" },
            { nome: "Água", descricao: "Água mineral sem gás", preco: "R$ 3,00" }
        ]
    },
    "churras do ligeiro": {
        "Carnes": [
            { nome: "Picanha", descricao: "Picanha grelhada na brasa com sal grosso", preco: "R$ 35,00" },
            { nome: "Costela", descricao: "Costela bovina assada lentamente", preco: "R$ 28,00" },
            { nome: "Linguiça", descricao: "Linguiça artesanal grelhada", preco: "R$ 15,00" },
            { nome: "Frango", descricao: "Coxa e sobrecoxa temperadas", preco: "R$ 18,00" }
        ],
        "Acompanhamentos": [
            { nome: "Farofa", descricao: "Farofa de mandioca com bacon", preco: "R$ 8,00" },
            { nome: "Arroz Branco", descricao: "Arroz soltinho tradicional", preco: "R$ 6,00" },
            { nome: "Salada Verde", descricao: "Mix de folhas com tomate", preco: "R$ 10,00" },
            { nome: "Vinagrete", descricao: "Molho de tomate, cebola e pimentão", preco: "R$ 5,00" }
        ],
        "Bebidas": [
            { nome: "Cerveja", descricao: "Cerveja gelada long neck", preco: "R$ 6,00" },
            { nome: "Caipirinha", descricao: "Caipirinha de cachaça", preco: "R$ 15,00" },
            { nome: "Refrigerante", descricao: "Refrigerante 350ml", preco: "R$ 5,00" }
        ]
    },
    "lanche do lucas": {
        "Lanches": [
            { nome: "X-Burguer", descricao: "Hambúrguer, queijo, alface, tomate e maionese", preco: "R$ 18,00" },
            { nome: "X-Salada", descricao: "Hambúrguer, queijo, alface, tomate, cebola e maionese", preco: "R$ 20,00" },
            { nome: "X-Bacon", descricao: "Hambúrguer, queijo, bacon, alface e tomate", preco: "R$ 22,00" },
            { nome: "X-Tudo", descricao: "Hambúrguer, queijo, bacon, ovo, alface, tomate e maionese", preco: "R$ 25,00" }
        ],
        "Porções": [
            { nome: "Batata Frita", descricao: "Porção de batata frita crocante", preco: "R$ 12,00" },
            { nome: "Onion Rings", descricao: "Anéis de cebola empanados", preco: "R$ 15,00" },
            { nome: "Nuggets", descricao: "10 nuggets de frango", preco: "R$ 18,00" }
        ],
        "Bebidas": [
            { nome: "Refrigerante", descricao: "Lata 350ml gelada", preco: "R$ 4,00" },
            { nome: "Suco Natural", descricao: "Laranja, limão ou maracujá", preco: "R$ 8,00" },
            { nome: "Milkshake", descricao: "Chocolate, morango ou baunilha", preco: "R$ 12,00" }
        ]
    },
    "pizzaria do follmann": {
        "Pizzas Salgadas": [
            { nome: "Margherita", descricao: "Molho de tomate, mussarela, tomate e manjericão", preco: "R$ 32,00" },
            { nome: "Calabresa", descricao: "Molho de tomate, mussarela, calabresa e cebola", preco: "R$ 35,00" },
            { nome: "Portuguesa", descricao: "Presunto, mussarela, ovo, cebola, azeitona e orégano", preco: "R$ 38,00" },
            { nome: "4 Queijos", descricao: "Mussarela, provolone, parmesão e catupiry", preco: "R$ 40,00" }
        ],
        "Pizzas Doces": [
            { nome: "Chocolate", descricao: "Chocolate ao leite com granulado", preco: "R$ 30,00" },
            { nome: "Romeu e Julieta", descricao: "Goiabada com queijo", preco: "R$ 32,00" },
            { nome: "Brigadeiro", descricao: "Brigadeiro com granulado", preco: "R$ 35,00" }
        ],
        "Bebidas": [
            { nome: "Refrigerante 2L", descricao: "Coca-Cola, Guaraná ou Fanta", preco: "R$ 8,00" },
            { nome: "Suco 1L", descricao: "Laranja, limão ou uva", preco: "R$ 12,00" },
            { nome: "Cerveja", descricao: "Long neck gelada", preco: "R$ 6,00" },
            { nome: "Água do mal", descricao: "Água do mal", preco: "R$ 6,66" }
        ]
    }
};

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

// Função para mostrar o menu do restaurante
function mostrarMenu(nomeRestaurante) {
    const menuContainer = document.getElementById('menu-container');
    const menuTitulo = document.getElementById('menu-titulo');
    const menuCategorias = document.getElementById('menu-categorias');
    const resultadoBusca = document.getElementById('resultado-busca');
    
    // Esconde o resultado da busca e mostra o menu
    resultadoBusca.style.display = 'none';
    menuContainer.style.display = 'block';
    
    // Define o título do menu
    menuTitulo.textContent = `Cardápio - ${nomeRestaurante}`;
    
    // Limpa o conteúdo anterior
    menuCategorias.innerHTML = '';
    
    // Busca o menu do restaurante
    const menu = menus[nomeRestaurante.toLowerCase()];
    
    if (menu) {
        // Cria as categorias e itens do menu
        Object.keys(menu).forEach(categoria => {
            const categoriaDiv = document.createElement('div');
            categoriaDiv.className = 'categoria';
            
            const categoriaTitle = document.createElement('h3');
            categoriaTitle.textContent = categoria;
            categoriaDiv.appendChild(categoriaTitle);
            
            menu[categoria].forEach(item => {
                const itemDiv = document.createElement('div');
                itemDiv.className = 'item-menu';
                
                const itemInfo = document.createElement('div');
                itemInfo.className = 'item-info';
                
                const itemNome = document.createElement('h4');
                itemNome.textContent = item.nome;
                itemInfo.appendChild(itemNome);
                
                const itemDescricao = document.createElement('p');
                itemDescricao.textContent = item.descricao;
                itemInfo.appendChild(itemDescricao);
                
                const itemPreco = document.createElement('div');
                itemPreco.className = 'item-preco';
                itemPreco.textContent = item.preco;
                
                itemDiv.appendChild(itemInfo);
                itemDiv.appendChild(itemPreco);
                categoriaDiv.appendChild(itemDiv);
            });
            
            menuCategorias.appendChild(categoriaDiv);
        });
    } else {
        menuCategorias.innerHTML = '<p>Menu não encontrado para este restaurante.</p>';
    }
}

// Função para voltar à busca
function voltarParaBusca() {
    const menuContainer = document.getElementById('menu-container');
    menuContainer.style.display = 'none';
}

// Adiciona eventos quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
    const searchButton = document.querySelector('.search-button');
    const searchInput = document.querySelector('.search-input');
    const btnSelecionar = document.querySelector('.btn-selecionar');
    const btnVoltar = document.querySelector('.btn-voltar');
    
    // Buscar ao clicar no botão
    searchButton.addEventListener('click', buscarRestaurante);
    
    // Buscar ao pressionar Enter
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            buscarRestaurante();
        }
    });
    
    // Funcionalidade do botão selecionar - agora mostra o menu
    btnSelecionar.addEventListener('click', function() {
        const nomeRestaurante = document.getElementById('nome-restaurante').textContent;
        mostrarMenu(nomeRestaurante);
    });
    
    // Funcionalidade do botão voltar
    btnVoltar.addEventListener('click', voltarParaBusca);
});
