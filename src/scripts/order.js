let shoppingCart = JSON.parse(localStorage.getItem("Products"));
const cartContainer = document.querySelector("#shoppingCartContent");

cartContainer.innerHTML = "";
const element = document.createElement("h2");
element.innerHTML = `Varukorg`;
cartContainer.appendChild(element);

if (shoppingCart) {
  shoppingCart.forEach((product) => {
    const element = document.createElement("div");
    element.className = "shopping-cart-item";
    element.innerHTML = `
    <div class="shopping-cart-item-info">
        <div>${product.title}</div>
        <div>${product.price.toFixed(2)} kr</div>
    </div> 
    `;
    cartContainer.appendChild(element);
  });

  let totOrderPrice = 0;
  shoppingCart.forEach((product) => {
    totOrderPrice += product.price;
  });
  const element = document.createElement("div");
  element.className = "shopping-cart-item";
  element.innerHTML = `
    <div class="shopping-cart-item-info-tot-price">
        <div>Totalt order pris:</div>
        <div>${totOrderPrice.toFixed(2)} kr</div>
    </div> 
    `;
  cartContainer.appendChild(element);
}
