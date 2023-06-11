document.addEventListener('DOMContentLoaded', function () {
  let productsContainer = document.querySelector('.products');
  let produtos = [];

  async function fetchProducts() {
    try {
      let response = await fetch('https://fakestoreapi.com/products');
      produtos = await response.json();
      localStorage.setItem('products', JSON.stringify(produtos));
      renderizarProdutos(produtos);
      atualizarFiltroCategorias(obterCategorias(produtos));
    } catch (error) {
      console.log('Erro ao buscar os produtos:', error);
    }
  }

  function renderizarProdutos(produtos) {
    productsContainer.innerHTML = ''; 
  
    produtos.forEach(function (produto) {
      let description = produto.description;
  
      let card = document.createElement('div');
      card.classList.add('card', 'col-md-3', 'mb-4', 'h-100');
      card.innerHTML = `
        <div class="card" style="width: 100%;height:100%;margin: 10px;">
          <img src="${produto.image}" class="product-image" alt="..." style="width:200px">
          <div class="card-body">
            <h2 class="product-title">${produto.title}</h2>
            <h4 class="product-category">${produto.category}</h4>
            <p class="product-description">${description.length > 80 ? description.substring(0, 80).concat('...more') : description}</p>
            <h6 class="product-price">$${produto.price}</h6>
            <a href="detalhes.html?id=${produto.id}" class="btn btn-primary">Detalhes</a>
          </div>
        </div>
      `;
  
      productsContainer.appendChild(card);
    });
  }
  

  fetchProducts();

  let filtro = document.getElementById('filtro');
  let inputPesquisa = document.getElementById('pesquisa');
  let btnFiltrar = document.getElementById('btn-filtrar');
  let btnPesquisar = document.getElementById('btn-pesquisar');

  btnFiltrar.addEventListener('click', function () {
    let categoriaSelecionada = filtro.value;
    filtrarProdutos(categoriaSelecionada);
  });

  btnPesquisar.addEventListener('click', function () {
    let categoriaPesquisada = inputPesquisa.value.trim().toLowerCase();
    filtrarProdutos(categoriaPesquisada);
  });

  function filtrarProdutos(categoria) {
    let produtosFiltrados = [];

    if (categoria === 'todos') {
      produtosFiltrados = produtos;
    } else {
      produtosFiltrados = produtos.filter(function (produto) {
        return produto.category.toLowerCase() === categoria.toLowerCase();
      });
    }

    localStorage.setItem('pesquisa', JSON.stringify(produtosFiltrados));
    window.location.href = 'pesquisa.html';
  }

  function atualizarFiltroCategorias(categorias) {
    filtro.innerHTML = ''; 

    let optionTodos = document.createElement('option');
    optionTodos.value = 'todos';
    optionTodos.text = 'Todos';
    filtro.appendChild(optionTodos);

    categorias.forEach(function (categoria) {
      let option = document.createElement('option');
      option.value = categoria;
      option.text = categoria;
      filtro.appendChild(option);
    });
  }

  function obterCategorias(produtos) {
    let categorias = [];

    produtos.forEach(function (produto) {
      if (!categorias.includes(produto.category)) {
        categorias.push(produto.category);
      }
    });

    return categorias;
  }
});

document.addEventListener('DOMContentLoaded', function () {
  let productImage = document.getElementById('productImage');
  let productTitle = document.getElementById('productTitle');
  let productPrice = document.getElementById('productPrice');
  let productDescription = document.getElementById('productDescription');
  let btnVoltar = document.getElementById('btnVoltar');

  let urlParams = new URLSearchParams(window.location.search);
  let productId = urlParams.get('id');
  let produtos = JSON.parse(localStorage.getItem('products'));

  let produto = produtos.find(function (produto) {
    return produto.id === parseInt(productId);
  });

  if (produto) {
    productImage.src = produto.image;
    productTitle.textContent = produto.title;
    productPrice.textContent = produto.price;
    productDescription.textContent = produto.description;
  } else {
    productTitle.textContent = 'Produto não encontrado.';
  }

  btnVoltar.addEventListener('click', function () {
    window.location.href = 'index.html';
  });
});

