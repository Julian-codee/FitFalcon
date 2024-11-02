// Contador y arreglo para guardar productos
let cartCount = 0;
let cartItems = [];

// Agregar producto al carrito
function addToCart(name, price, img) {
    let product = cartItems.find(item => item.name === name);
    product ? product.quantity++ : cartItems.push({ name, price, img, quantity: 1 });

    cartCount++;
    document.getElementById('cart-count').textContent = cartCount;
    updateCartDropdown();
}

// Calcular total de los productos
function calculateTotal() {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
}

// Actualizar el contenido desplegable del carrito
function updateCartDropdown() {
    const cartDropdown = document.getElementById('cart-dropdown');
    cartDropdown.innerHTML = '';

    cartItems.forEach((item, index) => {
        const itemElement = document.createElement("div");
        itemElement.classList.add("cart-item");
        itemElement.innerHTML = `
            <img src="${item.img}" alt="${item.name}">
            <div class="cart-item-info">
                <div class="cart-item-title">${item.name}</div>
                <div>$${item.price.toFixed(2)} x ${item.quantity}</div>
            </div>
            <button onclick="removeSingleItem(${index})" class="btn btn-sm btn-danger">Eliminar</button>
        `;
        cartDropdown.appendChild(itemElement);
    });

    const totalElement = document.createElement("div");
    totalElement.classList.add("cart-total");
    totalElement.innerHTML = `<strong>Total: $${calculateTotal().toFixed(2)}</strong>`;
    cartDropdown.appendChild(totalElement);

    const actionsElement = document.createElement("div");
    actionsElement.classList.add("cart-actions");
    actionsElement.innerHTML = `
        <button onclick="clearCart()" class="btn btn-outline-danger">Vaciar Carrito</button>
        <button onclick="simulatePurchase()" class="btn btn-outline-success">Comprar</button>
    `;
    cartDropdown.appendChild(actionsElement);
}

// Quitar un solo artículo o reducir su cantidad
function removeSingleItem(index) {
    cartItems[index].quantity > 1 ? cartItems[index].quantity-- : cartItems.splice(index, 1);
    cartCount--;
    document.getElementById('cart-count').textContent = cartCount;
    updateCartDropdown();
}

// Vaciar todo el carrito
function clearCart() {
    cartItems = [];
    cartCount = 0;
    document.getElementById('cart-count').textContent = cartCount;
    updateCartDropdown();
}

// Muestra/oculta el carrito al hacer clic en el botón del carrito
document.getElementById('cart-btn').addEventListener("click", function () {
    const cartDropdown = document.getElementById('cart-dropdown');
    cartDropdown.style.display = cartDropdown.style.display === "block" ? "none" : "block";
});


// Simular compra
function simulatePurchase() {
    if (cartItems.length === 0) {
        alert("Tu carrito está vacío. Agrega algunos productos antes de comprar.");
    } else {
        document.getElementById("paymentModal").style.display = "block";
    }
}

// Procesar pago simulado
function processPayment(event) {
    event.preventDefault();
    const cardNumber = document.getElementById("cardNumber").value;
    const expiryDate = document.getElementById("expiryDate").value;
    const cvv = document.getElementById("cvv").value;

    if (cardNumber && expiryDate && cvv) {
        setTimeout(() => {
            alert("¡Pago procesado con éxito! Gracias por tu compra.");
            document.getElementById("paymentModal").style.display = "none";
            clearCart();
        }, 2000);
    } else {
        alert("Por favor, completa todos los campos del formulario de pago.");
    }
}

// Cerrar modal con botón de cerrar
document.getElementById("closeModal").addEventListener("click", function() {
    document.getElementById("paymentModal").style.display = "none";
});

// Cerrar modal al hacer clic fuera de él
window.addEventListener("click", function(event) {
    if (event.target == document.getElementById("paymentModal")) {
        document.getElementById("paymentModal").style.display = "none";
    }
});

// Enviar formulario de pago
document.getElementById("paymentForm").addEventListener("submit", processPayment);
