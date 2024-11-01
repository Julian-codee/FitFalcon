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


