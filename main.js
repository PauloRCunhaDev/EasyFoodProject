// "Banco de dados" dos restaurantes
const restaurantes = [
    "bar do filha",
    "churras do ligeiro", 
    "lanche do lucas",
    "pizzaria do follmann"
];

// lista de itens do restaurante
const itensPorRestaurante = {
    "bar do filha": [
        { nome: "Cerveja gelada", preco: 8.00, esgotado: false },
        { nome: "Porção de calabresa", preco: 18.00, esgotado: false },
        { nome: "Batata frita", preco: 12.00, esgotado: true }
    ],
    "churras do ligeiro": [
        { nome: "Espetinho de carne", preco: 10.00, esgotado: false },
        { nome: "Refrigerante", preco: 5.00, esgotado: false },
        { nome: "Espetinho de frango", preco: 9.00, esgotado: true }
    ],
    "lanche do lucas": [
        { nome: "X-Tudo", preco: 20.00, esgotado: false },
        { nome: "Suco de laranja", preco: 6.00, esgotado: false },
        { nome: "X-Salada", preco: 15.00, esgotado: true }
    ],
    "pizzaria do follmann": [
        { nome: "Pizza de frango com catupiry", preco: 30.00, esgotado: false },
        { nome: "Pizza de calabresa", preco: 28.00, esgotado: false },
        { nome: "Pizza de margherita", preco: 25.00, esgotado: true }
    ]
};

// lista dos pedidos, carrinho e valor total
let pedidos = [];
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
        listaItens.innerHTML = ''; // Limpa antes de mostrar

        // Identificar se um item está esgotado
        itens.forEach(item => {
            const div = document.createElement('div');
            div.className = item.esgotado ? 'restaurante-card item-esgotado' : 'restaurante-card';
            
            if (item.esgotado) {
                div.innerHTML = `
                    <h3>${item.nome} <span style="color: red; font-size: 14px;">(ESGOTADO)</span></h3>
                    <p>Preço: R$ ${item.preco.toFixed(2)}</p>
                    <button class="btn-selecionar btn-esgotado" onclick="itemEsgotado('${item.nome}')">Não disponível</button>
                `;
            } else {
                div.innerHTML = `
                    <h3>${item.nome}</h3>
                    <p>Preço: R$ ${item.preco.toFixed(2)}</p>
                    <button class="btn-selecionar" onclick="adicionarAoCarrinho('${item.nome}', ${item.preco})">Adicionar ao carrinho</button>
                `;
            }
            listaItens.appendChild(div);
        });

        document.getElementById('itens-restaurante').style.display = 'block';
        document.getElementById('carrinho').style.display = 'block';
    });
});

// Funcionalidade para adicionar ao carrinho
function adicionarAoCarrinho(nome, preco) {
    // Adiciona o item a lista do pedido e soma o preço
    carrinhoItens.push({ nome, preco });
    total += preco;

    const li = document.createElement('li');
    li.textContent = `${nome} - R$ ${preco.toFixed(2)}`;
    document.getElementById('lista-carrinho').appendChild(li);

    document.getElementById('total-carrinho').textContent = total.toFixed(2);
}

// alerta sobre o item esgotado
function itemEsgotado(nome) {
    alert(`Desculpe! O item "${nome}" está esgotado e não pode ser adicionado ao carrinho.`);
}

//funcionalidade do botão de finalizar compra
document.addEventListener('DOMContentLoaded', function() {
    const btnFinalizar = document.getElementById('btn-finalizar');

    btnFinalizar.addEventListener('click', function() {
        // Identifica se o carrinho está vazio
        if (carrinhoItens.length === 0) {
            alert("Seu carrinho está vazio!");
            return;
        }
        
        const nomeRestaurante = document.getElementById('nome-restaurante').textContent;

        // Cria um objeto com as informações do restaurante e do pedido
        const novoPedido = {
            restaurante: nomeRestaurante,
            status: "Preparando",
            itens: carrinhoItens.map(item => ({ nome: item.nome, preco: item.preco }))
        };

        // Adicionado o pedido a lista
        pedidos.push(novoPedido);
        localStorage.setItem('pedidos', JSON.stringify(pedidos));

        alert("Compra realizada com sucesso! Obrigado por usar o EasyFood 🍽️");

        // Limpa carrinho
        carrinhoItens = [];
        total = 0;
        document.getElementById('lista-carrinho').innerHTML = '';
        document.getElementById('total-carrinho').textContent = '0.00';
    });

});

// Função para exibir o pedido do Cliente
function exibirPedidosCliente() {
    const container = document.getElementById('pedidos-cliente');
    if (!container) return;

    container.innerHTML = ''; // limpa a area dos pedidos para não repetir

    // Busca os pedidos e tranforma em objeto
    const pedidosSalvos = localStorage.getItem('pedidos');
    if (pedidosSalvos) {
        pedidos = JSON.parse(pedidosSalvos);
    }

    if (pedidos.length === 0) {
        container.innerHTML = '<p>Você ainda não realizou nenhum pedido.</p>';
        return;
    }

    // Display de exibição de cada pedido
    pedidos.forEach((pedido, index) => {
        const div = document.createElement('div');
        div.className = 'restaurante-card';
        div.innerHTML = `
            <h3>Pedido #${index + 1}</h3>
            <p><strong>Restaurante:</strong> ${pedido.restaurante}</p>
            <p><strong>Status:</strong> ${pedido.status}</p>
            <ul>
                ${pedido.itens.map(item => `<li>${item.nome} - R$ ${item.preco.toFixed(2)}</li>`).join('')}
            </ul>`
        container.appendChild(div);
    });
}

// Função para exibir pedidos no restaurante
function exibirPedidosRestaurante() {
    const container = document.getElementById('pedidos-restaurante');
    if (!container) return;
    
    container.innerHTML = '';

    // Busca os pedidos e tranforma em objeto
    const pedidosSalvos = localStorage.getItem('pedidos');
    if (pedidosSalvos) {
        pedidos = JSON.parse(pedidosSalvos);
    }

    if (pedidos.length === 0) {
        container.innerHTML = '<p>Nenhum pedido recebido ainda.</p>';
        return;
    }

    // Display de exibição de cada pedido
    pedidos.forEach((pedido, index) => {
        const div = document.createElement('div');
        div.className = 'restaurante-card';
        div.innerHTML = `
            <h3>Pedido #${index + 1}</h3>
            <p><strong>Restaurante:</strong> ${pedido.restaurante}</p>
            <p><strong>Status:</strong> ${pedido.status}</p>
            <ul>
                ${pedido.itens.map(item => `<li>${item.nome} - R$ ${item.preco.toFixed(2)}</li>`).join('')}
            </ul>
            ${pedido.status === 'Preparando' ? `<button onclick="atualizarStatus(${index})" class="btn-selecionar">Marcar como Aguardando Retirada</button>` : ''}`;
        container.appendChild(div);
    });
}

// Função para exibir pedidos no entregador
function exibirPedidosEntregador() {
    const container = document.getElementById('pedidos-entregador');
    if (!container) return;

    container.innerHTML = '';

    // Busca os pedidos e tranforma em objeto
    const pedidosSalvos = localStorage.getItem('pedidos');
    if (pedidosSalvos) {
        pedidos = JSON.parse(pedidosSalvos);
    }

    if (pedidos.length === 0) {
        container.innerHTML = '<p>Nenhum pedido disponível para entrega.</p>';
        return;
    }

    // Display de exibição de cada pedido
    pedidos.forEach((pedido, index) => {
        const div = document.createElement('div');
        div.className = 'restaurante-card';
        div.innerHTML = `
            <h3>Pedido #${index + 1}</h3>
            <p><strong>Restaurante:</strong> ${pedido.restaurante}</p>
            <p><strong>Status:</strong> ${pedido.status}</p>
            <ul>
                ${pedido.itens.map(item => `<li>${item.nome} - R$ ${item.preco.toFixed(2)}</li>`).join('')}
            </ul>
            ${pedido.status === 'Aguardando retirada' ? `<button onclick="atualizarStatus(${index})" class="btn-selecionar">Marcar como Saiu para entrega</button>` : ''}`;
        container.appendChild(div);
    });
}

// Executa a função correta dependendo da página
document.addEventListener('DOMContentLoaded', function() {
    exibirPedidosCliente();
    exibirPedidosRestaurante();
    exibirPedidosEntregador();
});

// Exibi as informações de cada aba
function showTab(tabId) {
    // Garante que apenas uma aba seja visivel
    document.querySelectorAll('.tab').forEach(tab => {
        tab.classList.remove('active');
    });
    document.getElementById(tabId).classList.add('active');

    // Esconde elementos extras da aba de busca
    if (tabId !== 'buscar') {
        document.getElementById('resultado-busca').style.display = 'none';
        document.getElementById('itens-restaurante').style.display = 'none';
        document.getElementById('carrinho').style.display = 'none';
    }

    // Atualiza os pedidos se a aba "pedidos" for ativada
    if (tabId === 'pedidos') {
        exibirPedidosCliente();
    }
}

function atualizarStatus(index) {
    const pedidosSalvos = localStorage.getItem('pedidos');
    if (!pedidosSalvos) return;

    const pedidos = JSON.parse(pedidosSalvos);
    if(pedidos[index].status === "Preparando") {
        pedidos[index].status = "Aguardando retirada";
        localStorage.setItem('pedidos','');
        localStorage.setItem('pedidos', JSON.stringify(pedidos));
        exibirPedidosRestaurante(); // atualiza a tela
    } else if(pedidos[index].status === "Aguardando retirada"){
        pedidos[index].status = "Saiu para entrega";
        localStorage.setItem('pedidos', '');
        localStorage.setItem('pedidos', JSON.stringify(pedidos));
        exibirPedidosEntregador(); // atualiza a tela
    }
}

document.addEventListener('DOMContentLoaded', exibirPedidosRestaurante);