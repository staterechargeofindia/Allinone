/* =================================================
   ISI – CART HANDLER
   Used by index.html, cart.html, checkout.html
================================================= */

/* ---------- ADD TO CART ---------- */
function addToCart(productId){

  const products = getData("products");
  const cart = getData("cart");

  const product = products.find(p => p.id === productId);
  if(!product){
    alert("Product not found");
    return;
  }

  const existing = cart.find(item => item.id === productId);

  if(existing){
    existing.qty = (existing.qty || 1) + 1;
  }else{
    cart.push({
      ...product,
      qty: 1
    });
  }

  setData("cart", cart);
  updateCartCount();
  alert("Product added to cart");
}

/* ---------- UPDATE CART COUNT ---------- */
function updateCartCount(){
  const cart = getData("cart");
  const count = cart.reduce((sum,i)=> sum + (i.qty || 1), 0);

  const el = document.getElementById("cartCount");
  if(el){
    el.innerText = count;
  }
}

/* ---------- GET CART TOTAL ---------- */
function getCartTotal(){
  const cart = getData("cart");
  let total = 0;

  cart.forEach(item=>{
    total += Number(item.price) * (item.qty || 1);
  });

  return total;
}

/* ---------- REMOVE ITEM ---------- */
function removeCartItem(productId){

  let cart = getData("cart");
  cart = cart.filter(item => item.id !== productId);

  setData("cart", cart);
  updateCartCount();
}

/* ---------- CHANGE QUANTITY ---------- */
function changeCartQty(productId, delta){

  const cart = getData("cart");
  const item = cart.find(i => i.id === productId);

  if(!item) return;

  item.qty = (item.qty || 1) + delta;
  if(item.qty < 1) item.qty = 1;

  setData("cart", cart);
  updateCartCount();
}

/* ---------- CLEAR CART ---------- */
function clearCart(){
  setData("cart", []);
  updateCartCount();
}

/* ---------- INIT ---------- */
document.addEventListener("DOMContentLoaded", updateCartCount);
