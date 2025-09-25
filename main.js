// "Banco de dados" dos restaurantes
const restaurantes = [
    "bar do filha",
    "churras do ligeiro", 
    "lanche do lucas",
    "pizzaria do follmann"
];

const itensPorRestaurante = {
    "bar do filha": [
        { nome: "Cerveja gelada", preco: 8.00 },
        { nome: "Porção de calabresa", preco: 18.00 }
    ],
    "churras do ligeiro": [
        { nome: "Espetinho de carne", preco: 10.00 },
        { nome: "Refrigerante", preco: 5.00 }
    ],
    "lanche do lucas": [
        { nome: "X-Tudo", preco: 20.00 },
        { nome: "Suco de laranja", preco: 6.00 }
    ],
    "pizzaria do follmann": [
        { nome: "Pizza de frango com catupiry", preco: 30.00 },
        { nome: "Pizza de calabresa", preco: 28.00 }
    ]
};

let carrinhoItens = [];
let total = 0;

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
        const itens = itensPorRestaurante[nomeRestaurante.toLowerCase()];
        
        if (!itens) {
            alert("Este restaurante ainda não tem itens cadastrados.");
            return;
        }

        const listaItens = document.getElementById('lista-itens');
        listaItens.innerHTML = ''; // limpa antes de mostrar

        itens.forEach(item => {
            const div = document.createElement('div');
            div.className = 'restaurante-card';
            div.innerHTML = `
                <h3>${item.nome}</h3>
                <p>Preço: R$ ${item.preco.toFixed(2)}</p>
                <button class="btn-selecionar" onclick="adicionarAoCarrinho('${item.nome}', ${item.preco})">Adicionar ao carrinho</button>
            `;
            listaItens.appendChild(div);
        });

        document.getElementById('itens-restaurante').style.display = 'block';
        document.getElementById('carrinho').style.display = 'block';
    });
});

function adicionarAoCarrinho(nome, preco) {
    carrinhoItens.push({ nome, preco });
    total += preco;

    const li = document.createElement('li');
    li.textContent = `${nome} - R$ ${preco.toFixed(2)}`;
    document.getElementById('lista-carrinho').appendChild(li);

    document.getElementById('total-carrinho').textContent = total.toFixed(2);
}

//funcionalidade do botão de finalizar compra
document.addEventListener('DOMContentLoaded', function() {
    const btnFinalizar = document.getElementById('btn-finalizar');

    btnFinalizar.addEventListener('click', function() {
        if (carrinhoItens.length === 0) {
            alert("Seu carrinho está vazio!");
            return;
        }

        alert("Compra realizada com sucesso! Obrigado por usar o EasyFood 🍽️");

        // Limpa carrinho
        carrinhoItens = [];
        total = 0;
        document.getElementById('lista-carrinho').innerHTML = '';
        document.getElementById('total-carrinho').textContent = '0.00';
    });
});