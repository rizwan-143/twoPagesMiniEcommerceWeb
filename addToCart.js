const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
const currentUser = JSON.parse(localStorage.getItem('currentUser')) || [];
const currentItems = cartItems.filter((item) => item.currentUserEmail === currentUser.userEmail);
const cart = document.getElementById("cart");
const cartLength = document.getElementById('cart-length');
const selectProducts = document.getElementById('select-products');
const clearCart = document.getElementById('clear-cart');
const totalPrice = document.getElementById('total-price');
const backToHome = document.getElementById('home');

backToHome.addEventListener('click' , function(){
  window.location.href = '../index.html'
})






clearCart.addEventListener('click', function () {
  const updatedCart = cartItems.filter(
    item => item.currentUserEmail !== currentUser.userEmail
  );
  localStorage.setItem('cart', JSON.stringify(updatedCart));
  location.reload(); // Or re-render cart without reloading
});

// check cart length
if(currentItems.length < 1){
  cartLength.classList.add('block');
}else{
  
  cartLength.classList.add('hidden');
}

selectProducts.addEventListener('click' , function(){
  window.location.href = './products.html'
})
// Clear the cart container first
cart.innerHTML = '';

currentItems.forEach((item , index) => {
  cart.innerHTML += `
    <div class=" flex items-center gap-1 justify-between   border p-1 my-3 rounded shadow-md max-w-sm">
      <img src="${item.image}" alt="${item.name}" class="w-[80px] object-cover rounded mb-2">
      <p class="font-semibold text-[10px]">Product: ${item.name}</p>
      <p class="text-gray-700">Price: $${item.price}</p>
      <button class="text-red-700 delete-btn" id = 'deleteBtn' data-index = '${index}'><i class="fa-solid fa-trash"></i></button>
    </div>
  `;
});

const deleteBtn = document.querySelectorAll(".delete-btn");
deleteBtn.forEach((btn) =>{
  btn.addEventListener('click' , function(){
    const index = this.getAttribute('data-index');
        cartItems.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(cartItems));
      location.reload();
  })
})



let total = 0;

currentItems.forEach((item) => {
  total += Number(item.price);
});

  totalPrice.innerText = ` $${total}.00`;
