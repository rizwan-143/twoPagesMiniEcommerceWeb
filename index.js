


const logout = document.querySelectorAll('#logout');
let loginSignup = document.getElementById('login-signup');
let myProfile = document.getElementById('my-profile');
let myCart = document.querySelectorAll('.my-cart');
let loginUser = JSON.parse(localStorage.getItem('currentUser'));
// const currentUser = JSON.parse(localStorage.getItem('currentUser'));
const myProducts = document.getElementById('my-products');
const humberger = document.getElementById('humberger');
const menu  = document.getElementById('menu');

if (loginSignup && myProfile) {
  if (loginUser) {
    loginSignup.classList.add('hidden');
    myProfile.classList.remove('hidden'); // ✅ Show profile
  } else {
    loginSignup.classList.remove('hidden'); // ✅ Show login/signup
    myProfile.classList.add('hidden');
  }
};

logout.forEach((logout) =>{
  if(loginUser){
    logout.innerText = 'logout';
  }else{
    logout.innerText = 'login'
    
  }
})

loginSignup.addEventListener('click' , function(){
  window.location.href = './htmlPages/form.html';
})

logout.forEach((logOut) =>{
  logOut.addEventListener('click' , function(){
    if(logOut.innerText.toLowerCase() === 'login'){
      window.location.href = './htmlPages/form.html'
    }else{
 localStorage.removeItem('currentUser');
  location.reload();
    }
 
})
})


  myCart.forEach((cartEl) => {
  cartEl.addEventListener('click', function () {
    if(loginUser){
    window.location.href = './htmlPages/addToCart.html';
    }
    else{
    alert('login your account to show cart')
    }
  });
});


myProducts.addEventListener('click' , function(){
  window.location.href = './htmlPages/products.html'
})

humberger.addEventListener('click', function () {
  if (window.innerWidth < 1024) {
    menu.classList.toggle('opacity-0');
    menu.classList.toggle('pointer-events-none');
    menu.classList.toggle('-translate-x-96');
    menu.classList.toggle('translate-x-0');
  }
});








import { itemsForHomePage } from "./assests/data/data.js";
const itemCard = document.getElementById('item-card');


window.addToCart = addToCart;

function addToCart(event) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if(!currentUser){
      alert('login first');
      return;
    }
    
    const index = event.currentTarget.dataset.index;
    
    const selectedItem = { ...itemsForHomePage[index], currentUserEmail: currentUser.userEmail };
    
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
       const matchItem = cartItems.find((item) =>{
      return  item.name === selectedItem.name && 
        item.currentUserEmail === currentUser.userEmail
       });

       if(matchItem){
        alert('item already exists !')
        return;
       }

        // Cart logic
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        cart.push(selectedItem);
        localStorage.setItem("cart", JSON.stringify(cart));
        
        alert(`${selectedItem.name} added to cart!`);
    }
    


itemsForHomePage.forEach((item , index) => {
  itemCard.innerHTML += `
    <div class="card border w-[300px] p-1 m-4 rounded-md cursor-pointer overflow-hidden relative group">
      <div class="card-header p-0">
        <img src="./assests/data/download (3).png" alt="${item.name}" class="w-full h-40 object-cover rounded-md group-hover:scale-110 transition-all duration-1000 ease-in-out">
      </div>
      <div class="card-body mt-2">
        <div class="name">
          <h3 class="text-red-300 text-lg font-semibold hover:text-red-600 transition-all duration-500 ease-in-out">${item.name}</h3>
        </div>
        <div class="price">
          <h4 class="text-black text-sm hover:text-gray-400 transition-all duration-500 ease-in-out">Price: $${item.price}</h4>
        </div>
        <div class="addToCart-btn w-fit mt-2 text-xl text-gray-400 hover:scale-125 hover:text-gray-600 transition-all duration-700  cursor-pointer" data-index="${index}" onclick='addToCart(event)'>
          <i class="fa-solid fa-cart-shopping"></i>
        </div>
      </div>
    </div>
  `;
});

