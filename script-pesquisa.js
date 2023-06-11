document.addEventListener('DOMContentLoaded', function () {
  let productsContainer = document.querySelector('.products');
  let btnVoltar = document.getElementById('btn-voltar');
  let produtos = JSON.parse(localStorage.getItem('pesquisa'));

  function renderizarProdutos(produtos) {
    productsContainer.innerHTML = '';

    produtos.forEach(function (produto) {
      let description = produto.description;

      let card = document.createElement('div');
      card.classList.add('card', 'col-md-3', 'mb-4');
      card.innerHTML = `
        <div class="card" style="width: 18rem;">
          <img src="${produto.image}" class="product-image" alt="...">
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

  renderizarProdutos(produtos);

  document.addEventListener('click', function (event) {
    if (event.target.matches('.btn-primary')) {
      event.preventDefault();
      let productId = event.target.getAttribute('href').split('=')[1];
      exibirDetalhesProduto(productId);
    }
  });

  function exibirDetalhesProduto(productId) {
    let produto = produtos.find(function (produto) {
      return produto.id === parseInt(productId);
    });

    if (produto) {
      window.location.href = `detalhes.html?id=${produto.id}`;
    } else {
      console.log('Produto não encontrado');
    }
  }

  btnVoltar.addEventListener('click', function () {
    window.location.href = 'index.html';
  });
});
