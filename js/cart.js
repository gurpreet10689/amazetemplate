let cartItems = [];

/* ADD TO CART */

function addToCart(productId) {

    console.log("Adding Product:", productId);

    const product = PRODUCTS.find(
        p => p.id === productId
    );

    if (!product) {
        console.log("Product not found");
        return;
    }

    const existingItem = cartItems.find(
        item => item.product.id === productId
    );

    if (existingItem) {

        existingItem.quantity += 1;

    } else {

        cartItems.push({
            product: product,
            quantity: 1
        });
    }

    updateCartBadge();

    renderCart();

    console.log(cartItems);
}


/* UPDATE BADGE */

function updateCartBadge() {

    const badge = document.querySelector('.cart-badge');

    if (!badge) return;

    const totalItems = cartItems.reduce((sum, item) => {
        return sum + item.quantity;
    }, 0);

    badge.textContent = totalItems;
}


/* RENDER CART */

function renderCart() {

    const tbody = document.querySelector('#cart-body');

    if (!tbody) return;

    tbody.innerHTML = cartItems.map(item => `

        <tr>

            <td>${item.product.title}</td>

            <td>₹${item.product.price}</td>

            <td>${item.quantity}</td>

            <td>
                ₹${item.product.price * item.quantity}
            </td>

            <td>
                <button onclick="removeFromCart(${item.product.id})">
                    Remove
                </button>
            </td>

        </tr>

    `).join('');

    document.querySelector('#cart-total').textContent =
        calculateTotal();
}


/* TOTAL */

function calculateTotal() {

    return cartItems.reduce((sum, item) => {
        return sum + item.product.price * item.quantity;
    }, 0);
}


/* REMOVE */

function removeFromCart(productId) {

    cartItems = cartItems.filter(
        item => item.product.id !== productId
    );

    renderCart();

    updateCartBadge();
}


/* EVENT DELEGATION */

document.addEventListener('click', function(e) {

    if (e.target.classList.contains('btn--cart')) {

        const productId = Number(
            e.target.dataset.id
        );

        addToCart(productId);
    }
});