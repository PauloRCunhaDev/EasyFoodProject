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

// lista de itens pendentes para adicionar ao menu (por restaurante)
let itensPendentes = {};

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
document.addEventListener('DOMContentLoaded', function () {
    const searchButton = document.querySelector('.search-button');
    const searchInput = document.querySelector('.search-input');
    const btnSelecionar = document.querySelector('.btn-selecionar');

    // Buscar ao clicar no botão
    searchButton.addEventListener('click', buscarRestaurante);

    // Buscar ao pressionar Enter
    searchInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            buscarRestaurante();
        }
    });

    // Funcionalidade do botão selecionar (temporária)
    btnSelecionar.addEventListener('click', function () {
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
document.addEventListener('DOMContentLoaded', function () {
    const btnFinalizar = document.getElementById('btn-finalizar');

    btnFinalizar.addEventListener('click', function () {
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
        
        // Verificar exibição do chat após novo pedido
        verificarExibicaoChat();
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
document.addEventListener('DOMContentLoaded', function () {
    exibirPedidosCliente();
    exibirPedidosRestaurante();
    exibirPedidosEntregador();
});

// Exibi as informações de cada aba
function showTab(tabId) {
    // Verifica se o chat pode ser exibido antes de mostrar a aba
    if ((tabId === 'chat' || tabId === 'chat-restaurante' || tabId === 'chat-entregador') && !temPedidosEmAndamento()) {
        alert('É necessário ter pedidos em andamento para acessar o chat!');
        return;
    }
    
    // Garante que apenas uma aba seja visivel
    document.querySelectorAll('.tab').forEach(tab => {
        tab.classList.remove('active');
    });
    document.getElementById(tabId).classList.add('active');

    // Esconde elementos extras da aba de busca
    if (tabId !== 'buscar') {
        const resultadoBusca = document.getElementById('resultado-busca');
        const itensRestaurante = document.getElementById('itens-restaurante');
        const carrinho = document.getElementById('carrinho');
        if (resultadoBusca) resultadoBusca.style.display = 'none';
        if (itensRestaurante) itensRestaurante.style.display = 'none';
        if (carrinho) carrinho.style.display = 'none';
    }

    // Atualiza os pedidos se a aba "pedidos" for ativada
    if (tabId === 'pedidos') {
        exibirPedidosCliente();
    }

    // Atualiza os pedidos do restaurante se a aba "entregas" for ativada
    if (tabId === 'entregas') {
        exibirPedidosRestaurante();
    }

    // Atualiza os pedidos do entregador se a aba "entregas-entregador" for ativada
    if (tabId === 'entregas-entregador') {
        exibirPedidosEntregador();
    }

    // Atualiza as mensagens do chat quando as abas de chat forem ativadas
    if (tabId === 'chat') {
        exibirMensagensCliente();
    }
    if (tabId === 'chat-restaurante') {
        exibirMensagensRestaurante();
    }
    if (tabId === 'chat-entregador') {
        exibirMensagensEntregador();
    }
    
    // Verificar exibição do chat após qualquer mudança de aba
    verificarExibicaoChat();
}

function atualizarStatus(index) {
    const pedidosSalvos = localStorage.getItem('pedidos');
    if (!pedidosSalvos) return;

    const pedidos = JSON.parse(pedidosSalvos);
    if (pedidos[index].status === "Preparando") {
        pedidos[index].status = "Aguardando retirada";
        localStorage.setItem('pedidos', '');
        localStorage.setItem('pedidos', JSON.stringify(pedidos));
        exibirPedidosRestaurante(); // atualiza a tela
    } else if (pedidos[index].status === "Aguardando retirada") {
        pedidos[index].status = "Saiu para entrega";
        localStorage.setItem('pedidos', '');
        localStorage.setItem('pedidos', JSON.stringify(pedidos));
        exibirPedidosEntregador(); // atualiza a tela
    }
    
    // Verificar se ainda há pedidos em andamento após a atualização
    verificarExibicaoChat();
}

document.addEventListener('DOMContentLoaded', exibirPedidosRestaurante);

document.addEventListener('DOMContentLoaded', function () {
    const searchButton = document.getElementById('search-button-gerente');
    const searchInput = document.getElementById('search-input-gerente');
    const resultadoContainer = document.getElementById('resultado-busca-gerente');
    const nomeRestauranteElement = document.getElementById('nome-restaurante-gerente');
    const btnSelecionar = document.getElementById('btn-selecionar-gerente');
    const formAdicionar = document.getElementById('form-adicionar-item');

    searchButton.addEventListener('click', function () {
        const nomeDigitado = searchInput.value.trim().toLowerCase();
        resultadoContainer.style.display = 'none';
        formAdicionar.style.display = 'none';

        if (nomeDigitado === '') {
            alert('Digite o nome de um restaurante!');
            return;
        }

        const restauranteEncontrado = restaurantes.find(r => r.toLowerCase() === nomeDigitado);

        if (restauranteEncontrado) {
            nomeRestauranteElement.textContent = restauranteEncontrado;
            resultadoContainer.style.display = 'block';
            searchInput.value = '';
        } else {
            alert('Restaurante não encontrado!');
        }
    });

    btnSelecionar.addEventListener('click', function () {
        formAdicionar.style.display = 'block';

        const btnSalvar = document.getElementById('btn-adicionar-item');
        btnSalvar.onclick = function () {
            const nomeRestaurante = nomeRestauranteElement.textContent.toLowerCase();
            const nomeItem = document.getElementById('novo-nome-item').value.trim();
            const precoItem = parseFloat(document.getElementById('novo-preco-item').value);

            if (!nomeItem || isNaN(precoItem) || precoItem <= 0) {
                alert("Preencha corretamente o nome e o preço.");
                return;
            }

            // Verifica se o item já existe no menu principal
            const itensExistentes = itensPorRestaurante[nomeRestaurante] || [];
            const itemDuplicadoMenu = itensExistentes.find(item => item.nome.trim().toLowerCase() === nomeItem.toLowerCase());

            if (itemDuplicadoMenu) {
                alert(`O item "${itemDuplicadoMenu.nome}" já está no menu deste restaurante.`);
                return;
            }

            // Verifica se o item já existe na lista pendente
            if (!itensPendentes[nomeRestaurante]) {
                itensPendentes[nomeRestaurante] = [];
            }
            
            const itemDuplicadoPendente = itensPendentes[nomeRestaurante].find(item => item.nome.trim().toLowerCase() === nomeItem.toLowerCase());

            if (itemDuplicadoPendente) {
                alert(`O item "${itemDuplicadoPendente.nome}" já está na lista para adicionar ao menu.`);
                return;
            }

            const novoItem = { nome: nomeItem, preco: precoItem, esgotado: false };
            itensPendentes[nomeRestaurante].push(novoItem);

            alert(`Item "${nomeItem}" adicionado à lista para adicionar ao menu!`);
            document.getElementById('novo-nome-item').value = '';
            document.getElementById('novo-preco-item').value = '';
        };
    });
});

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
document.addEventListener('DOMContentLoaded', function () {
    exibirPedidosCliente();
    exibirPedidosRestaurante();
    exibirPedidosEntregador();
    
    const btnBuscarCardapio = document.getElementById('search-button-cardapio');
    const inputCardapio = document.getElementById('search-input-cardapio');
    const resultadoCardapio = document.getElementById('resultado-cardapio');
    const nomeRestauranteCardapio = document.getElementById('nome-restaurante-cardapio');
    const listaCardapio = document.getElementById('lista-cardapio');

    if (btnBuscarCardapio) {
        btnBuscarCardapio.addEventListener('click', function () {
            const nomeDigitado = inputCardapio.value.trim().toLowerCase();
            resultadoCardapio.style.display = 'none';
            listaCardapio.innerHTML = '';

            if (nomeDigitado === '') {
                alert('Digite o nome de um restaurante!');
                return;
            }

            const restauranteEncontrado = restaurantes.find(r => r.toLowerCase() === nomeDigitado);

            if (!restauranteEncontrado) {
                alert('Restaurante não encontrado!');
                return;
            }

            nomeRestauranteCardapio.textContent = `Menu: ${restauranteEncontrado}`;
            resultadoCardapio.style.display = 'block';

            // Exibe itens do menu atual
            const itens = itensPorRestaurante[nomeDigitado];
            if (!itens || itens.length === 0) {
                listaCardapio.innerHTML = '<p>Este restaurante não possui itens cadastrados.</p>';
            } else {
                itens.forEach(item => {
                    const div = document.createElement('div');
                    div.className = item.esgotado ? 'restaurante-card item-esgotado' : 'restaurante-card';
                    div.innerHTML = `
                        <h3>${item.nome} ${item.esgotado ? '<span style="color: red; font-size: 14px;">(ESGOTADO)</span>' : ''}</h3>
                        <p>Preço: R$ ${item.preco.toFixed(2)}</p>
                    `;
                    listaCardapio.appendChild(div);
                });
            }

            // Exibe seção de itens pendentes para adicionar ao menu
            const itensPendentesRestaurante = itensPendentes[nomeDigitado];
            if (itensPendentesRestaurante && itensPendentesRestaurante.length > 0) {
                const divSecaoPendentes = document.createElement('div');
                divSecaoPendentes.className = 'secao-pendentes';
                divSecaoPendentes.style.marginTop = '30px';
                
                const tituloPendentes = document.createElement('h3');
                tituloPendentes.textContent = 'Lista de itens para adicionar ao menu';
                tituloPendentes.style.color = '#ea1d2c';
                tituloPendentes.style.marginBottom = '15px';
                divSecaoPendentes.appendChild(tituloPendentes);

                // Container com scroll para os itens pendentes
                const containerItens = document.createElement('div');
                containerItens.className = 'lista-itens-pendentes';

                itensPendentesRestaurante.forEach(item => {
                    const div = document.createElement('div');
                    div.className = 'restaurante-card';
                    div.style.backgroundColor = '#fff3cd';
                    div.style.borderColor = '#ffeaa7';
                    div.innerHTML = `
                        <h3>${item.nome}</h3>
                        <p>Preço: R$ ${item.preco.toFixed(2)}</p>
                    `;
                    containerItens.appendChild(div);
                });

                divSecaoPendentes.appendChild(containerItens);

                // Botão para adicionar todos os itens ao menu
                const btnAdicionarAoMenu = document.createElement('button');
                btnAdicionarAoMenu.textContent = 'Adicionar ao Menu';
                btnAdicionarAoMenu.className = 'btn-selecionar';
                btnAdicionarAoMenu.style.float = 'right';
                btnAdicionarAoMenu.style.marginTop = '15px';
                
                btnAdicionarAoMenu.addEventListener('click', function() {
                    adicionarItensAoMenu(nomeDigitado);
                });

                divSecaoPendentes.appendChild(btnAdicionarAoMenu);
                listaCardapio.appendChild(divSecaoPendentes);
            }

            inputCardapio.value = '';
        });
    }
});

// Sistema de Chat
let mensagensChat = JSON.parse(localStorage.getItem('chatMessages')) || [];

// Função para verificar se existem pedidos em andamento
function temPedidosEmAndamento() {
    const pedidosSalvos = localStorage.getItem('pedidos');
    if (!pedidosSalvos) return false;
    
    const pedidos = JSON.parse(pedidosSalvos);
    return pedidos.some(pedido => 
        pedido.status === 'Preparando' || 
        pedido.status === 'Aguardando retirada' || 
        pedido.status === 'Saiu para entrega'
    );
}

// Função para verificar e exibir/ocultar botão de chat
function verificarExibicaoChat() {
    const botaoChatCliente = document.querySelector('.tab-buttons button[onclick="showTab(\'chat\')"]');
    const botaoChatRestaurante = document.querySelector('.tab-buttons button[onclick="showTab(\'chat-restaurante\')"]');
    const botaoChatEntregador = document.querySelector('.tab-buttons button[onclick="showTab(\'chat-entregador\')"]');
    
    const temPedidos = temPedidosEmAndamento();
    
    if (botaoChatCliente) {
        botaoChatCliente.style.display = temPedidos ? 'inline-block' : 'none';
    }
    if (botaoChatRestaurante) {
        botaoChatRestaurante.style.display = temPedidos ? 'inline-block' : 'none';
    }
    if (botaoChatEntregador) {
        botaoChatEntregador.style.display = temPedidos ? 'inline-block' : 'none';
    }
}

// Função para enviar mensagem (Cliente)
function enviarMensagemCliente() {
    if (!temPedidosEmAndamento()) {
        alert('Você precisa ter um pedido em andamento para usar o chat!');
        return;
    }

    const input = document.getElementById('chat-input');
    const destinatario = document.getElementById('chat-destinatario').value;
    const mensagem = input.value.trim();

    if (!mensagem) {
        alert('Digite uma mensagem!');
        return;
    }

    if (!destinatario) {
        alert('Selecione um destinatário!');
        return;
    }

    const novaMensagem = {
        id: Date.now(),
        remetente: 'cliente',
        destinatario: destinatario,
        conteudo: mensagem,
        timestamp: new Date().toLocaleString('pt-BR')
    };

    mensagensChat.push(novaMensagem);
    localStorage.setItem('chatMessages', JSON.stringify(mensagensChat));
    
    input.value = '';
    exibirMensagensCliente();
}

// Função para enviar mensagem (Restaurante)
function enviarMensagemRestaurante() {
    if (!temPedidosEmAndamento()) {
        alert('Não há pedidos em andamento para responder!');
        return;
    }

    const input = document.getElementById('chat-input-restaurante');
    const mensagem = input.value.trim();

    if (!mensagem) {
        alert('Digite uma mensagem!');
        return;
    }

    const novaMensagem = {
        id: Date.now(),
        remetente: 'restaurante',
        destinatario: 'cliente',
        conteudo: mensagem,
        timestamp: new Date().toLocaleString('pt-BR')
    };

    mensagensChat.push(novaMensagem);
    localStorage.setItem('chatMessages', JSON.stringify(mensagensChat));
    
    input.value = '';
    exibirMensagensRestaurante();
}

// Função para enviar mensagem (Entregador)
function enviarMensagemEntregador() {
    if (!temPedidosEmAndamento()) {
        alert('Não há pedidos em andamento para responder!');
        return;
    }

    const input = document.getElementById('chat-input-entregador');
    const mensagem = input.value.trim();

    if (!mensagem) {
        alert('Digite uma mensagem!');
        return;
    }

    const novaMensagem = {
        id: Date.now(),
        remetente: 'entregador',
        destinatario: 'cliente',
        conteudo: mensagem,
        timestamp: new Date().toLocaleString('pt-BR')
    };

    mensagensChat.push(novaMensagem);
    localStorage.setItem('chatMessages', JSON.stringify(mensagensChat));
    
    input.value = '';
    exibirMensagensEntregador();
}

// Função para exibir mensagens (Cliente)
function exibirMensagensCliente() {
    const container = document.getElementById('chat-messages');
    if (!container) return;

    mensagensChat = JSON.parse(localStorage.getItem('chatMessages')) || [];
    container.innerHTML = '';

    if (!temPedidosEmAndamento()) {
        container.innerHTML = '<div class="chat-empty">Você precisa ter um pedido em andamento para usar o chat!</div>';
        return;
    }

    if (mensagensChat.length === 0) {
        container.innerHTML = '<div class="chat-empty">Nenhuma mensagem ainda. Inicie uma conversa!</div>';
        return;
    }

    mensagensChat.forEach(msg => {
        const div = document.createElement('div');
        div.className = `chat-message ${msg.remetente}`;
        div.innerHTML = `
            <div class="chat-message-header">${msg.remetente.toUpperCase()} - ${msg.timestamp}</div>
            <div class="chat-message-content">${msg.conteudo}</div>
        `;
        container.appendChild(div);
    });

    container.scrollTop = container.scrollHeight;
}

// Função para exibir mensagens (Restaurante)
function exibirMensagensRestaurante() {
    const container = document.getElementById('chat-messages-restaurante');
    if (!container) return;

    mensagensChat = JSON.parse(localStorage.getItem('chatMessages')) || [];
    container.innerHTML = '';

    if (!temPedidosEmAndamento()) {
        container.innerHTML = '<div class="chat-empty">Não há pedidos em andamento para responder!</div>';
        return;
    }

    const mensagensFiltradas = mensagensChat.filter(msg => 
        msg.remetente === 'cliente' && msg.destinatario === 'restaurante' || 
        msg.remetente === 'restaurante'
    );

    if (mensagensFiltradas.length === 0) {
        container.innerHTML = '<div class="chat-empty">Nenhuma mensagem de clientes ainda.</div>';
        return;
    }

    mensagensFiltradas.forEach(msg => {
        const div = document.createElement('div');
        div.className = `chat-message ${msg.remetente}`;
        div.innerHTML = `
            <div class="chat-message-header">${msg.remetente.toUpperCase()} - ${msg.timestamp}</div>
            <div class="chat-message-content">${msg.conteudo}</div>
        `;
        container.appendChild(div);
    });

    container.scrollTop = container.scrollHeight;
}

// Função para exibir mensagens (Entregador)
function exibirMensagensEntregador() {
    const container = document.getElementById('chat-messages-entregador');
    if (!container) return;

    mensagensChat = JSON.parse(localStorage.getItem('chatMessages')) || [];
    container.innerHTML = '';

    if (!temPedidosEmAndamento()) {
        container.innerHTML = '<div class="chat-empty">Não há pedidos em andamento para responder!</div>';
        return;
    }

    const mensagensFiltradas = mensagensChat.filter(msg => 
        msg.remetente === 'cliente' && msg.destinatario === 'entregador' || 
        msg.remetente === 'entregador'
    );

    if (mensagensFiltradas.length === 0) {
        container.innerHTML = '<div class="chat-empty">Nenhuma mensagem de clientes ainda.</div>';
        return;
    }

    mensagensFiltradas.forEach(msg => {
        const div = document.createElement('div');
        div.className = `chat-message ${msg.remetente}`;
        div.innerHTML = `
            <div class="chat-message-header">${msg.remetente.toUpperCase()} - ${msg.timestamp}</div>
            <div class="chat-message-content">${msg.conteudo}</div>
        `;
        container.appendChild(div);
    });

    container.scrollTop = container.scrollHeight;
}

// Event listeners para o chat
document.addEventListener('DOMContentLoaded', function () {
    // Verificar exibição do chat quando a página carregar
    verificarExibicaoChat();
    
    // Cliente
    const chatSendBtn = document.getElementById('chat-send');
    const chatInput = document.getElementById('chat-input');
    if (chatSendBtn) {
        chatSendBtn.addEventListener('click', enviarMensagemCliente);
    }
    if (chatInput) {
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                enviarMensagemCliente();
            }
        });
    }

    // Restaurante
    const chatSendBtnRestaurante = document.getElementById('chat-send-restaurante');
    const chatInputRestaurante = document.getElementById('chat-input-restaurante');
    if (chatSendBtnRestaurante) {
        chatSendBtnRestaurante.addEventListener('click', enviarMensagemRestaurante);
    }
    if (chatInputRestaurante) {
        chatInputRestaurante.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                enviarMensagemRestaurante();
            }
        });
    }

    // Entregador
    const chatSendBtnEntregador = document.getElementById('chat-send-entregador');
    const chatInputEntregador = document.getElementById('chat-input-entregador');
    if (chatSendBtnEntregador) {
        chatSendBtnEntregador.addEventListener('click', enviarMensagemEntregador);
    }
    if (chatInputEntregador) {
        chatInputEntregador.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                enviarMensagemEntregador();
            }
        });
    }

    // Exibir mensagens quando a página carregar
    exibirMensagensCliente();
    exibirMensagensRestaurante();
    exibirMensagensEntregador();
});

// Função para adicionar itens pendentes ao menu principal
function adicionarItensAoMenu(nomeRestaurante) {
    const itensPendentesRestaurante = itensPendentes[nomeRestaurante];
    
    if (!itensPendentesRestaurante || itensPendentesRestaurante.length === 0) {
        alert('Não há itens pendentes para adicionar ao menu.');
        return;
    }

    // Verifica se algum item pendente já existe no menu
    const itensExistentes = itensPorRestaurante[nomeRestaurante] || [];
    const itensJaExistem = [];
    
    itensPendentesRestaurante.forEach(itemPendente => {
        const itemDuplicado = itensExistentes.find(item => 
            item.nome.trim().toLowerCase() === itemPendente.nome.trim().toLowerCase()
        );
        if (itemDuplicado) {
            itensJaExistem.push(itemPendente.nome);
        }
    });

    if (itensJaExistem.length > 0) {
        alert(`Os seguintes itens já estão no menu: ${itensJaExistem.join(', ')}`);
        // Remove itens duplicados da lista pendente
        itensPendentes[nomeRestaurante] = itensPendentesRestaurante.filter(itemPendente => 
            !itensJaExistem.includes(itemPendente.nome)
        );
        return;
    }

    // Adiciona todos os itens pendentes ao menu
    if (!itensPorRestaurante[nomeRestaurante]) {
        itensPorRestaurante[nomeRestaurante] = [];
    }
    
    itensPorRestaurante[nomeRestaurante].push(...itensPendentesRestaurante);
    
    // Limpa a lista de pendentes
    itensPendentes[nomeRestaurante] = [];
    
    alert(`${itensPendentesRestaurante.length} item(ns) adicionado(s) ao menu com sucesso!`);
    
    // Recarrega a visualização do cardápio
    const btnBuscarCardapio = document.getElementById('search-button-cardapio');
    if (btnBuscarCardapio) {
        btnBuscarCardapio.click();
    }
}