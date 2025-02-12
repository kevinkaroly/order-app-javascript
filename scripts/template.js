function createHeader() {
  return `
            <div id="headerContainer">
                <img
                    class="foodImg"
                    src="assets/img/burger-4369973_1280.jpg"
                    alt="Burger Bild"
                />
                <h1>Smash & Serve</h1>
                <div class="restaurantRating">Bewertung (⭐⭐⭐⭐✨ 4.2 von 5 Sternen)</div>
            </div>
    `;
}

function createBurgerTemplate(burger, index) {
  return `
        <div class="burgerItem">
            <h3>${burger.name}</h3>
            <p>${burger.description}</p>
            <div class="burgerFooter">
                <span class="price">${burger.price.toFixed(2)} €</span>
                <button class="btn" onclick="addToCart(${index})">+</button>
            </div>
        </div>
    `;
}
function createBasketButton() {
  return `
      <button id="basketButton" class="basketButton" onclick="toggleBasket()">Warenkorb schließen</button>
    `;
}

function createBasketTemplate(basket, subtotal, deliveryCost, totalPrice) {
  return `
        <h3>Warenkorb (${getTotalItems(basket)} Artikel)</h3><br>
        ${createBasketItems(basket)}
        <br>
        <p><b>Zwischensumme:</b> ${subtotal.toFixed(2)} €</p>
        <p><b>Lieferkosten:</b> ${deliveryCost.toFixed(2)} €</p>
        <p><b>Gesamtpreis:</b> ${totalPrice.toFixed(2)} €</p>

        <button class="btn orderBtn" onclick="orderBasket(); window.location.href='order.html';">Bestellen</button>
    `;
}

function createBasketItems(basket) {
  let basketItems = "";
  for (let i = 0; i < basket.length; i++) {
    basketItems += `
            <div class="burgerInBasket">
                <p>${basket[i].name} - ${basket[i].price.toFixed(2)} €</p>
                <div class="burgerControls">
                    <button class="decrease" onclick="changeQuantity(${i}, -1)">-</button>
                    <span class="quantityDisplay">${basket[i].quantity}</span>
                    <button class="increase" onclick="changeQuantity(${i}, 1)">+</button>
                    <button class="remove" onclick="removeFromBasket(${i})">🗑️</button>
                </div>
            </div>
        `;
  }
  return basketItems;
}

