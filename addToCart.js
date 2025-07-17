const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
const currentUser = JSON.parse(localStorage.getItem('currentUser')) || {};
const currentItems = cartItems.filter((item) => item.currentUserEmail === currentUser.userEmail);
const cart = document.getElementById("cart");
const cartLength = document.getElementById('cart-length');
const selectProducts = document.getElementById('select-products');
const clearCart = document.getElementById('clear-cart');
const totalPrice = document.getElementById('total-price');
const backToHome = document.getElementById('home');

// Go back to home
backToHome.addEventListener('click', () => {
  window.location.href = '../index.html';
});

// Clear Cart
clearCart.addEventListener('click', function () {
  const updatedCart = cartItems.filter(item => item.currentUserEmail !== currentUser.userEmail);
  localStorage.setItem('cart', JSON.stringify(updatedCart));
  location.reload();
});

// Cart Empty Check
if (currentItems.length < 1) {
  cartLength.classList.add('block');
} else {
  cartLength.classList.add('hidden');
}

// Go to Products
selectProducts.addEventListener('click', () => {
  window.location.href = './products.html';
});

// Add quantity = 1 to each item
const updatedItems = currentItems.map(item => ({ ...item, quantity: 1 }));

// Update Subtotal Function
function updateTotal() {
  const subtotal = updatedItems.reduce((acc, item) => acc + (Number(item.price) * item.quantity), 0);
  totalPrice.innerText = `$${subtotal}.00`;
}

// Clear old cart HTML
cart.innerHTML = '';

// Render each cart item
updatedItems.forEach((item, index) => {
  cart.innerHTML += `
    <div class="cart-item flex flex-col lg:flex-row items-center gap-1 justify-between border p-1 my-3 rounded shadow-md" data-index="${index}">
      <img src="../assests/data/download (3).png" alt="${item.name}" class="w-[80px] object-cover rounded mb-2">
      <p class="font-semibold text-[10px]">Product: ${item.name}</p>
      
        <p class="text-gray-700">Price: $${item.price}</p>
        
        <div class="flex gap-3 items-center">
        <p class="text-gray-700 text-sm">Total: $<span class="item-total">${item.price}</span></p>
       <div class="quantity flex items-center gap-1">
          <button class="decrease p-1 bg-gray-300 rounded-full">-</button>
          <span class="quantity-value rounded-sm p-1">${item.quantity}</span>
          <button class="increase p-1 bg-gray-300 rounded-full">+</button>
        </div>
        </div>
      <button class="text-red-700 delete-btn" data-index="${index}"><i class="fa-solid fa-trash"></i></button>
    </div>
  `;
});

// Quantity + Delete logic after render
const cartItemsDiv = document.querySelectorAll(".cart-item");

cartItemsDiv.forEach((cartItem, index) => {
  const increaseBtn = cartItem.querySelector('.increase');
  const decreaseBtn = cartItem.querySelector('.decrease');
  const quantityValue = cartItem.querySelector('.quantity-value');
  const itemTotal = cartItem.querySelector('.item-total');
  const deleteBtn = cartItem.querySelector('.delete-btn');

  increaseBtn.addEventListener('click', () => {
    updatedItems[index].quantity++;
    quantityValue.innerText = updatedItems[index].quantity;
    itemTotal.innerText = Number(updatedItems[index].price) * updatedItems[index].quantity;
    updateTotal();
  });

  decreaseBtn.addEventListener('click', () => {
    if (updatedItems[index].quantity > 1) {
      updatedItems[index].quantity--;
      quantityValue.innerText = updatedItems[index].quantity;
      itemTotal.innerText = Number(updatedItems[index].price) * updatedItems[index].quantity;
      updateTotal();
    }
  });

  deleteBtn.addEventListener('click', () => {
    // Remove from original cartItems array
    const globalIndex = cartItems.findIndex(
      item => item.currentUserEmail === currentUser.userEmail && item.name === updatedItems[index].name
    );
    if (globalIndex !== -1) {
      cartItems.splice(globalIndex, 1);
      localStorage.setItem('cart', JSON.stringify(cartItems));
      location.reload();
    }
  });
});

updateTotal();
