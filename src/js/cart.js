// Contador y arreglo para guardar productos
let cartCount = 0;
let cartItems = [];

// Agregar producto al carrito
function addToCart(name, price, img) {
    let product = cartItems.find(item => item.name === name);
    if (product) {
        product.quantity++;
    } else {
        cartItems.push({ name, price, img, quantity: 1 });
    }

    // Actualizar contador total y visual
    cartCount++;
    document.getElementById("cart-count").textContent = cartCount;

    // Actualizar contenido visual del carrito
    updateCartDropdown();
}

// Calcular total de los productos
function calculateTotal() {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
}

// Actualizar el contenido desplegable del carrito
function updateCartDropdown() {
    const cartDropdown = document.getElementById("cart-dropdown");
    cartDropdown.innerHTML = ''; 

    // Crear elementos de cada producto
    cartItems.forEach((item, index) => {
        let itemElement = document.createElement("div");
        itemElement.classList.add("cart-item");
        itemElement.innerHTML = `
            <img src="${item.img}" alt="${item.name}">
            <div class="cart-item-info">
                <div class="cart-item-title">${item.name}</div>
                <div>$${item.price.toFixed(2)} x ${item.quantity}</div>
            </div>
            <button id="removeItem-${index}" class="btn btn-sm btn-danger">Eliminar</button>
        `;
        cartDropdown.appendChild(itemElement);

        // Evento para eliminar un solo artículo
        document.getElementById(`removeItem-${index}`).addEventListener("click", function() {
            removeSingleItem(index);
        });
    });

    // Crear elemento para mostrar el total del carrito
    let totalElement = document.createElement("div");
    totalElement.classList.add("cart-total");
    totalElement.innerHTML = `<strong>Total: $${calculateTotal().toFixed(2)}</strong>`;
    cartDropdown.appendChild(totalElement);

    // Crear botones de vaciar carrito y comprar
    let actionsElement = document.createElement("div");
    actionsElement.classList.add("cart-actions");
    actionsElement.innerHTML = `
        <button id="clearCart" class="btn btn-outline-danger">Vaciar Carrito</button>
        <button id="simulatePurchase" class="btn btn-outline-success">Comprar</button>
    `;
    cartDropdown.appendChild(actionsElement);

    // Eventos para vaciar el carrito y simular la compra
    document.getElementById("clearCart").addEventListener("click", clearCart);
    document.getElementById("simulatePurchase").addEventListener("click", simulatePurchase);
}

// Quitar un solo artículo o reducir su cantidad
function removeSingleItem(index) {
    if (cartItems[index].quantity > 1) {
        cartItems[index].quantity--;
    } else {
        cartItems.splice(index, 1);
    }

    // Disminuir el contador total y actualizar el contador visual
    cartCount--;
    document.getElementById("cart-count").textContent = cartCount;

    // Actualizar el contenido visual del carrito
    updateCartDropdown();
}

// Vaciar todo el carrito
function clearCart() {
    cartItems = [];     
    cartCount = 0; 
    document.getElementById("cart-count").textContent = cartCount;
    updateCartDropdown();     
}

// Muestra/oculta el carrito cuando se hace clic en el botón del carrito
document.getElementById("cart-btn").addEventListener("click", function () {
    const cartDropdown = document.getElementById("cart-dropdown");
    cartDropdown.style.display = cartDropdown.style.display === "none" || cartDropdown.style.display === "" ? "block" : "none";
});


//simular Compra vacia
function simulatePurchase() {
    if (cartItems.length === 0) {
        alert("Tu carrito está vacío. Agrega algunos productos antes de comprar.");
        return;
    }
    document.getElementById("paymentModal").style.display = "block";
}

//Simular Pago

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
        }, 1000);
    } else {
        alert("Por favor, completa todos los campos del formulario de pago.");
    }
}

//Cierra el formulario
document.querySelector(".close").addEventListener("click", function() {
    document.getElementById("paymentModal").style.display = "none";
});

//Procesa el pago
document.getElementById("paymentForm").addEventListener("submit", processPayment);
