const productGrid = document.querySelector('.product-grid');

function buildCardHTML(product) {

    return `
    
    <article class="product-card">

        <img src="${product.image}" alt="{product.title}">

        <h3 class="card-title">${product.title}</h3>

        <p class="card-price">₹${product.price}</p>

        <p>⭐ ${product.rating}</p>

        <button class="btn btn--cart" data-id="${product.id}">
            Add to Cart
        </button>

    </article>
    
    `;
}

function renderProducts(products) {

    if (!productGrid) {
        console.log("Product grid not found");
        return;
    }

    productGrid.innerHTML = products
        .map(buildCardHTML)
        .join('');
}

renderProducts(PRODUCTS);