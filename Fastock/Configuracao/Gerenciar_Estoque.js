let estoque = [];
let indiceEditando = null;

// Preview da imagem
document.getElementById('imagem').addEventListener('change', (e) => {
    let preview = document.getElementById('preview');
    let arquivo = e.target.files[0];

    if (arquivo) {
        preview.src = URL.createObjectURL(arquivo);
    } else {
        preview.src = "";
    }
});

// Adicionar ou editar produto
function adicionarProduto() {
    let nome = document.getElementById('NomeProduto').value.trim();
    let unidade = document.getElementById('unidadeProduto').value.trim();
    let descricao = document.getElementById('descricaoProduto').value.trim();
    let categoria = document.getElementById('categoriaProduto').value;
    let quantidade = parseInt(document.getElementById('quantidadeProduto').value);
    let precoVenda = parseFloat(document.getElementById('valorVenda').value);
    let precoCompra = parseFloat(document.getElementById('valorCompra').value);
    let fornecedor = document.getElementById('fornecedorProduto').value.trim();
    let codigoBarras = document.getElementById('codigoBarras').value.trim();
    let imagemUrl = document.getElementById('preview').src;

    if (!nome || !descricao || !categoria || isNaN(quantidade) || isNaN(precoVenda) || isNaN(precoCompra)) {
        alert("Preencha todos os campos obrigatórios!");
        return;
    }

    let produto = { nome, imagem: imagemUrl, unidade, descricao, categoria, quantidade, precoVenda, precoCompra, fornecedor, codigoBarras };

    if (indiceEditando === null) {
        estoque.push(produto);
    } else {
        estoque[indiceEditando] = produto;
        indiceEditando = null;
        document.getElementById('btnAdicionar').textContent = "Adicionar";
    }

    atualizarTabela();
    limparCampos();
}

// Remover produto
function removerProduto(index) {
    estoque.splice(index, 1);
    atualizarTabela();
}

// Atualizar tabela
function atualizarTabela() {
    let corpo = document.getElementById('corpoTabela');
    corpo.innerHTML = '';

    estoque.forEach((produto, index) => {
        corpo.innerHTML += `
        <tr>
            <td><img src="${produto.imagem}" width="100"></td>
            <td>${produto.nome}</td>
            <td>${produto.codigoBarras}</td>
            <td>${produto.descricao}</td>
            <td>${produto.categoria}</td>
            <td>${produto.unidade}</td>
            <td>${produto.quantidade}</td>
            <td>${produto.precoCompra}</td>
            <td>${produto.precoVenda}</td>
            <td>${produto.fornecedor}</td>
            <td>
                <button onclick="editarProduto(${index})">Editar</button>
                <button onclick="removerProduto(${index})">Remover</button>
            </td>
        </tr>`;
    });
}

// Editar produto
function editarProduto(index) {
    let produto = estoque[index];

    document.getElementById('NomeProduto').value = produto.nome;
    document.getElementById('unidadeProduto').value = produto.unidade;
    document.getElementById('descricaoProduto').value = produto.descricao;
    document.getElementById('categoriaProduto').value = produto.categoria;
    document.getElementById('quantidadeProduto').value = produto.quantidade;
    document.getElementById('valorVenda').value = produto.precoVenda;
    document.getElementById('valorCompra').value = produto.precoCompra;
    document.getElementById('codigoBarras').value = produto.codigoBarras;
    document.getElementById('fornecedorProduto').value = produto.fornecedor;
    document.getElementById('preview').src = produto.imagem;

    indiceEditando = index;
    document.getElementById('btnAdicionar').textContent = "Salvar Edição";
}

// Limpar campos
function limparCampos() {
    document.getElementById('NomeProduto').value = "";
    document.getElementById('imagem').value = "";
    document.getElementById('preview').src = "";
    document.getElementById('descricaoProduto').value = "";
    document.getElementById('unidadeProduto').value = "";
    document.getElementById('valorCompra').value = "";
    document.getElementById('codigoBarras').value = "";
    document.getElementById('categoriaProduto').value = "";
    document.getElementById('quantidadeProduto').value = "";
    document.getElementById('valorVenda').value = "";
    document.getElementById('fornecedorProduto').value = "";
}
