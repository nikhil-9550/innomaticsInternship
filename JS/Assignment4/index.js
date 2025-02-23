let cart = JSON.parse(localStorage.getItem('cart')) || [];

function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const totalPrice = document.getElementById('total-price');
    const cartCount = document.getElementById('cart-count');
    cartItems.innerHTML = '';
    let total = 0;
    
    cart.forEach((item, index) => {
        total += item.price * item.quantity;
        const li = document.createElement('li');
        li.innerHTML = `${item.name} - $${item.price} x ${item.quantity} 
            <button onclick="removeFromCart(${index})">Remove</button>`;
        cartItems.appendChild(li);
    });

    totalPrice.textContent = total;
    cartCount.textContent = cart.reduce((acc, item) => acc + item.quantity, 0);
    localStorage.setItem('cart', JSON.stringify(cart));
}

function addToCart(event) {
    const product = event.target.closest('.product');
    const id = parseInt(product.getAttribute('data-id')); 
    const name = product.getAttribute('data-name');
    const price = parseFloat(product.getAttribute('data-price'));

    const existingItem = cart.find(item => item.id === id);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ id, name, price, quantity: 1 });
    }
    updateCart();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', addToCart);
});

document.getElementById('clear-cart').addEventListener('click', () => {
    cart = [];
    updateCart();
});

function toggleCart() {
    updateCart(); 
    document.getElementById('cart-container').classList.toggle('show');
}
document.getElementById('close-cart').addEventListener('click', () => {
    document.getElementById('cart-container').classList.remove('show');
});


document.getElementById('cart-icon').addEventListener('click', toggleCart);
document.getElementById('cart-count').addEventListener('click', toggleCart);

updateCart();
