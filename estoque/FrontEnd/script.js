let estoque = [];
let indiceEditando = null;

document.getElementById('imagem').addEventListener('change', (e) => {
    let preview = document.getElementById('preview');
    let arquivo = e.target.files[0];

    if (arquivo) {
        preview.src = URL.createObjectURL(arquivo);
    } else {
        preview.src = "";
    }
});

// -- Adiciona ou Edita --
function adicionarProduto() {
    let nome = document.getElementById('NomeProduto').value.trim();
    let descricao = document.getElementById('descricaoProduto').value;
    let categoria = document.getElementById('categoriaProduto').value;
    let quantidade = parseInt(document.getElementById('quantidadeProduto').value);
    let precoVenda = parseFloat(document.getElementById('valorVenda').value);
    let precoCompra = parseFloat(document.getElementById('valorCompra').value);
    let imagemUrl = document.getElementById('preview').src;

    if (!nome || !descricao || !categoria || isNaN(quantidade) || isNaN(precoVenda) || isNaN(precoCompra)) {
        alert("Preencha corretamente os dados!");
        return;
    }

    if (indiceEditando === null) {
        estoque.push({ nome, imagem: imagemUrl, descricao, categoria, quantidade, precoVenda, precoCompra });
    } else {
        estoque[indiceEditando] = { nome, imagem: imagemUrl, descricao, categoria, quantidade, precoVenda, precoCompra };
        indiceEditando = null;
        document.getElementById('btnAdicionar').textContent = "Adicionar";
    }

    atualizarTabela();
    limparCampos();
}

// -- Remove --
function removerProduto(index) {
    estoque.splice(index, 1);
    atualizarTabela();
}

// -- Atualiza Tabela --
function atualizarTabela() {
    let corpo = document.getElementById('corpoTabela');
    corpo.innerHTML = '';

    estoque.forEach((produto, index) => {
        let linha = `
        <tr>
            <td>${produto.nome}</td>
            <td><img src="${produto.imagem}" width="100"></td>
            <td>${produto.descricao}</td>
            <td>${produto.categoria}</td>
            <td>${produto.quantidade}</td>
            <td>${produto.precoVenda}</td>
            <td>${produto.precoCompra}</td>
            <td><button onclick="editarProduto(${index})">Editar</button></td>
            <td><button onclick="removerProduto(${index})">Remover</button></td>
        </tr>
        `;
        corpo.innerHTML += linha;
    });
}

// -- Editar --
function editarProduto(index) {
    let produto = estoque[index];

    document.getElementById('NomeProduto').value = produto.nome;
    document.getElementById('descricaoProduto').value = produto.descricao;
    document.getElementById('categoriaProduto').value = produto.categoria;
    document.getElementById('quantidadeProduto').value = produto.quantidade;
    document.getElementById('valorVenda').value = produto.precoVenda;
    document.getElementById('valorCompra').value = produto.precoCompra;
    document.getElementById('preview').src = produto.imagem;

    indiceEditando = index;
    document.getElementById('btnAdicionar').textContent = "Salvar Edição";
}

// -- Limpar Campos --
function limparCampos() {
    document.getElementById('NomeProduto').value = "";
    document.getElementById('imagem').value = "";
    document.getElementById('preview').src = "";
    document.getElementById('descricaoProduto').value = "";
    document.getElementById('categoriaProduto').value = "";
    document.getElementById('quantidadeProduto').value = "";
    document.getElementById('valorVenda').value = "";
    document.getElementById('valorCompra').value = "";
}
