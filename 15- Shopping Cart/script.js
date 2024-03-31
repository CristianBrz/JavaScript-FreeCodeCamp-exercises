// Seleccionar elementos del DOM
const cartContainer = document.getElementById("cart-container"); // Contenedor del carrito
const productsContainer = document.getElementById("products-container"); // Contenedor de productos
const dessertCards = document.getElementById("dessert-card-container"); // Contenedor de tarjetas de postres
const cartBtn = document.getElementById("cart-btn"); // Botón para mostrar/ocultar el carrito
const clearCartBtn = document.getElementById("clear-cart-btn"); // Botón para vaciar el carrito
const totalNumberOfItems = document.getElementById("total-items"); // Elemento que muestra el total de elementos en el carrito
const cartSubTotal = document.getElementById("subtotal"); // Elemento que muestra el subtotal del carrito
const cartTaxes = document.getElementById("taxes"); // Elemento que muestra los impuestos del carrito
const cartTotal = document.getElementById("total"); // Elemento que muestra el total del carrito
const showHideCartSpan = document.getElementById("show-hide-cart"); // Elemento que muestra "Mostrar" o "Ocultar" el carrito
let isCartShowing = false; // Variable que indica si el carrito está mostrándose o no

// Array de productos

const products = [
  {
    id: 1,
    name: "Vanilla Cupcakes (6 Pack)",
    price: 12.99,
    category: "Cupcake",
  },
  {
    id: 2,
    name: "French Macaron",
    price: 3.99,
    category: "Macaron",
  },
  {
    id: 3,
    name: "Pumpkin Cupcake",
    price: 3.99,
    category: "Cupcake",
  },
  {
    id: 4,
    name: "Chocolate Cupcake",
    price: 5.99,
    category: "Cupcake",
  },
  {
    id: 5,
    name: "Chocolate Pretzels (4 Pack)",
    price: 10.99,
    category: "Pretzel",
  },
  {
    id: 6,
    name: "Strawberry Ice Cream",
    price: 2.99,
    category: "Ice Cream",
  },
  {
    id: 7,
    name: "Chocolate Macarons (4 Pack)",
    price: 9.99,
    category: "Macaron",
  },
  {
    id: 8,
    name: "Strawberry Pretzel",
    price: 4.99,
    category: "Pretzel",
  },
  {
    id: 9,
    name: "Butter Pecan Ice Cream",
    price: 2.99,
    category: "Ice Cream",
  },
  {
    id: 10,
    name: "Rocky Road Ice Cream",
    price: 2.99,
    category: "Ice Cream",
  },
  {
    id: 11,
    name: "Vanilla Macarons (5 Pack)",
    price: 11.99,
    category: "Macaron",
  },
  {
    id: 12,
    name: "Lemon Cupcakes (4 Pack)",
    price: 12.99,
    category: "Cupcake",
  },
];

// Crear tarjetas de productos en el contenedor de tarjetas de postres
products.forEach(({ name, id, price, category }) => {
  dessertCards.innerHTML += `
      <div class="dessert-card">
        <h2>${name}</h2>
        <p class="dessert-price">$${price}</p>
        <p class="product-category">Category: ${category}</p>
        <button 
          id="${id}" 
          class="btn add-to-cart-btn">Add to cart
        </button>
      </div>
    `;
});

// Clase ShoppingCart para manejar el carrito de compras
class ShoppingCart {
  constructor() {
    this.items = []; // Array de items en el carrito
    this.total = 0; // Total del carrito
    this.taxRate = 8.25; // Tasa de impuestos
  }

  // Método para agregar un item al carrito
  addItem(id, products) {
    // Buscar el producto por su id
    const product = products.find((item) => item.id === id);
    const { name, price } = product;
    this.items.push(product); // Agregar el producto al carrito

    // Contar la cantidad de cada producto en el carrito
    const totalCountPerProduct = {};
    this.items.forEach((dessert) => {
      totalCountPerProduct[dessert.id] =
        (totalCountPerProduct[dessert.id] || 0) + 1;
    });

    // Mostrar el producto en el contenedor de productos del carrito
    const currentProductCount = totalCountPerProduct[product.id];
    const currentProductCountSpan = document.getElementById(
      `product-count-for-id${id}`
    );

    // Verificar si ya existe el producto en el carrito
    currentProductCount > 1
      ? (currentProductCountSpan.textContent = `${currentProductCount}x`)
      : (productsContainer.innerHTML += `
      <div id=dessert${id} class="product">
        <p>
          <span class="product-count" id=product-count-for-id${id}></span>${name}
        </p>
        <p>${price}</p>
      </div>
      `);
  }

  // Método para obtener el número de items en el carrito
  getCounts() {
    return this.items.length;
  }

  // Método para vaciar el carrito
  clearCart() {
    if (!this.items.length) {
      alert("Your shopping cart is already empty"); // Mostrar mensaje si el carrito ya está vacío
      return;
    }

    // Confirmar la eliminación de todos los items del carrito
    const isCartCleared = confirm(
      "Are you sure you want to clear all items from your shopping cart?"
    );

    if (isCartCleared) {
      // Vaciar el carrito
      this.items = [];
      this.total = 0;
      productsContainer.innerHTML = "";
      totalNumberOfItems.textContent = 0;
      cartSubTotal.textContent = 0;
      cartTaxes.textContent = 0;
      cartTotal.textContent = 0;
    }
  }

  // Método para calcular los impuestos
  calculateTaxes(amount) {
    return parseFloat(((this.taxRate / 100) * amount).toFixed(2));
  }

  // Método para calcular el total del carrito
  calculateTotal() {
    const subTotal = this.items.reduce((total, item) => total + item.price, 0); // Calcular subtotal sumando los precios de todos los productos
    const tax = this.calculateTaxes(subTotal); // Calcular impuestos
    this.total = subTotal + tax; // Calcular total sumando el subtotal y los impuestos
    cartSubTotal.textContent = `$${subTotal.toFixed(2)}`; // Actualizar subtotal en el DOM
    cartTaxes.textContent = `$${tax.toFixed(2)}`; // Actualizar impuestos en el DOM
    cartTotal.textContent = `$${this.total.toFixed(2)}`; // Actualizar total en el DOM
    return this.total;
  }
}

// Crear instancia de ShoppingCart
const cart = new ShoppingCart();
const addToCartBtns = document.getElementsByClassName("add-to-cart-btn");

// Agregar evento click a cada botón "Add to cart"
[...addToCartBtns].forEach((btn) => {
  btn.addEventListener("click", (event) => {
    cart.addItem(Number(event.target.id), products); // Añadir producto al carrito
    totalNumberOfItems.textContent = cart.getCounts(); // Actualizar el total de items en el carrito
    cart.calculateTotal(); // Calcular el total del carrito
  });
});

// Mostrar u ocultar el carrito al hacer clic en el botón "Cart"
cartBtn.addEventListener("click", () => {
  isCartShowing = !isCartShowing;
  showHideCartSpan.textContent = isCartShowing ? "Hide" : "Show"; // Actualizar el texto del botón
  cartContainer.style.display = isCartShowing ? "block" : "none"; // Mostrar u ocultar el carrito
});

// Vaciar el carrito al hacer clic en el botón "Clear Cart"
clearCartBtn.addEventListener("click", cart.clearCart.bind(cart));
