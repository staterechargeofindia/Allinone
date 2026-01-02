/* =================================================
   ISI – GLOBAL DATA HANDLER
   All localStorage operations handled from here
================================================= */

/* ---------- GET DATA ---------- */
function getData(key){
  try{
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  }catch(e){
    console.error("Error reading data for key:", key);
    return [];
  }
}

/* ---------- SET DATA ---------- */
function setData(key, value){
  try{
    localStorage.setItem(key, JSON.stringify(value));
  }catch(e){
    console.error("Error saving data for key:", key);
  }
}

/* ---------- INIT DEFAULT STRUCTURE ---------- */
(function initStorage(){

  if(!localStorage.getItem("products")){
    setData("products", []);
  }

  if(!localStorage.getItem("cart")){
    setData("cart", []);
  }

  if(!localStorage.getItem("orders")){
    setData("orders", []);
  }

  if(!localStorage.getItem("addresses")){
    setData("addresses", []);
  }

  /*
    Demo merchants
    Admin panel se baad me add/remove ho sakta hai
  */
  if(!localStorage.getItem("merchants")){
    setData("merchants", [
      {
        id: "M001",
        password: "1234",
        shopName: "ISI Demo Store"
      }
    ]);
  }

})();
