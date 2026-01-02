/* =================================================
   ISI – ORDER HANDLER
   Checkout → Order Save → My Orders → Merchant/Admin
================================================= */

/* ---------- PLACE ORDER ---------- */
function placeOrder(){

  const cart = getData("cart");
  if(cart.length === 0){
    alert("Cart is empty");
    return;
  }

  const addresses = getData("addresses");
  const primary = addresses.find(a => a.primary);

  if(!primary){
    alert("Please select a primary address");
    return;
  }

  const paymentType =
    document.querySelector(".method.active")?.id || "cod";

  const total = getCartTotal();

  const order = {
    id: Date.now(),
    items: cart,
    total: total,
    payment: paymentType,
    address: primary,
    status: "Placed",
    date: new Date().toLocaleString()
  };

  const orders = getData("orders");
  orders.push(order);
  setData("orders", orders);

  clearCart();
  showSuccessPopup();
}

/* ---------- SUCCESS POPUP ---------- */
function showSuccessPopup(){

  let box = document.getElementById("successBox");
  if(!box){
    console.warn("Success box not found");
    return;
  }

  box.style.display = "flex";
  confettiRain();
}

/* ---------- CONFETTI ANIMATION ---------- */
function confettiRain(){

  for(let i=0; i<40; i++){

    const confetti = document.createElement("div");
    confetti.className = "confetti";

    confetti.style.left = Math.random()*100 + "%";
    confetti.style.top = "-10px";
    confetti.style.width = "8px";
    confetti.style.height = "14px";
    confetti.style.position = "fixed";
    confetti.style.background =
      ["#2563eb","#22c55e","#eab308","#ec4899"]
      [Math.floor(Math.random()*4)];

    confetti.style.animation =
      `fall ${2 + Math.random()*2}s linear forwards`;

    document.body.appendChild(confetti);

    setTimeout(()=>confetti.remove(),4000);
  }
}

/* ---------- CONFETTI KEYFRAMES ---------- */
(function addConfettiStyle(){

  const style = document.createElement("style");
  style.innerHTML = `
    @keyframes fall{
      to{
        transform: translateY(110vh) rotate(360deg);
        opacity:0;
      }
    }
  `;
  document.head.appendChild(style);

})();

/* ---------- REDIRECT HELPERS ---------- */
function goMyOrders(){
  location.href = "my-orders.html";
}

function goHome(){
  location.href = "index.html";
}
