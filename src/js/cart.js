//contador y arreglo para guardar productos
let cartCount = 0;
let cartItems = [];

// agregar producto al carrito
function addToCart(name, price, img) {

    let product = cartItems.find(item => item.name === name);
    if (product) {
        product.quantity++;
    } else {
        cartItems.push({ name, price, img, quantity: 1 });
    }

    //contador total y contador visual
    cartCount++;
    document.getElementById("cart-count").textContent = cartCount;
    
    // contenido visual del carrito
    updateCartDropdown();
}

// Función para actualizar el contenido del carrito desplegable
function updateCartDropdown() {
    const cartDropdown = document.getElementById("cart-dropdown");
    cartDropdown.innerHTML = ''; // Limpiamos el contenido actual
    
    // Creamos los elementos de cada producto en el carrito
    cartItems.forEach((item, index) => {
        let itemElement = document.createElement("div");
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

    // Botón para vaciar todo el carrito
    let actionsElement = document.createElement("div");
    actionsElement.classList.add("cart-actions");
    actionsElement.innerHTML = `
        <button onclick="clearCart()" class="btn btn-outline-danger">Vaciar Carrito</button>
    `;
    cartDropdown.appendChild(actionsElement);
}

// Función para quitar un solo artículo o reducir su cantidad
function removeSingleItem(index) {
    // Si la cantidad es mayor a 1, solo restamos uno
    if (cartItems[index].quantity > 1) {
        cartItems[index].quantity--;
    } else {
        // Si solo queda uno, lo quitamos completamente del carrito
        cartItems.splice(index, 1);
    }

    // Disminuimos el contador total y actualizamos el contador visual
    cartCount--;
    document.getElementById("cart-count").textContent = cartCount;
    
    // Actualizamos el contenido visual del carrito
    updateCartDropdown();
}

// Función para vaciar todo el carrito
function clearCart() {
    cartItems = []; // Borramos todos los elementos
    cartCount = 0; // Reiniciamos el contador
    document.getElementById("cart-count").textContent = cartCount;
    updateCartDropdown(); // Actualizamos el carrito visual
}

// Muestra/oculta el carrito cuando se hace clic en el botón del carrito
document.getElementById("cart-btn").addEventListener("click", function () {
    const cartDropdown = document.getElementById("cart-dropdown");
    cartDropdown.style.display = cartDropdown.style.display === "none" || cartDropdown.style.display === "" ? "block" : "none";
});
