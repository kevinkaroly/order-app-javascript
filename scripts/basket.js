let basket = [];

function addToCart(index) {
  const burger = burgerMenu[index];
  const burgerWithID = {
    name: burger.name,
    description: burger.description,
    price: burger.price,
    id: index,
    quantity: 1,
  };

  let existingBurger = null;
  for (let i = 0; i < basket.length; i++) {
    if (basket[i].id === burgerWithID.id) {
      existingBurger = basket[i];
      break;
    }
  }

  if (existingBurger) {
    existingBurger.quantity++;
  } else {
    basket.push(burgerWithID);
  }
  showBasket();
}

function changeQuantity(index, amount) {
  const burger = basket[index];
  if (burger) {
    burger.quantity += amount;
    if (burger.quantity <= 0) {
      removeFromBasket(index);
    }
  }
  showBasket();
}

function removeFromBasket(index) {
  basket.splice(index, 1);
  showBasket();
}

function showBasket() {
  const basketContainer = document.getElementById("basket");
  const mobileBasketContainer = document.getElementById("mobileBasket");

  let basketToHTML = `<h3>Warenkorb (${basket.reduce(
    (sum, burger) => sum + burger.quantity,
    0
  )} Artikel)</h3><br>`;

  let subtotal = 0;
  let deliveryCost = 5;

  if (basket.length === 0) {
    deliveryCost = 0;
  }

  // Durchlaufe alle Burger im Warenkorb und erstelle HTML
  basket.forEach((burger, index) => {
    let burgerTotal = burger.price * burger.quantity;
    subtotal += burgerTotal;

    basketToHTML += `
        <div class="burgerInBasket">
          <p>${burger.name} - ${burgerTotal.toFixed(2)} €</p>
          <div class="burgerControls">
            <button class="decrease" onclick="changeQuantity(${index}, -1)">-</button>
            <span class="quantityDisplay">${burger.quantity}</span>
            <button class="increase" onclick="changeQuantity(${index}, 1)">+</button>
            <button class="remove" onclick="removeFromBasket(${index})">🗑️</button>
          </div>
        </div>
      `;
  });

  let totalPrice = subtotal + deliveryCost;

  basketToHTML += `
      <br>
      <p><b>Zwischensumme:</b> ${subtotal.toFixed(2)} €</p>
      <p><b>Lieferkosten:</b> ${deliveryCost.toFixed(2)} €</p>
      <p><b>Gesamtpreis:</b> ${totalPrice.toFixed(2)} €</p>
    `;

  // Aktualisiere den Warenkorb im Desktop-Container
  basketContainer.innerHTML = basketToHTML;

  // Aktualisiere den Warenkorb im mobilen Container
  mobileBasketContainer.innerHTML = basketToHTML;

  // Überprüfen ob das Overlay sichtbar ist und ggf. anzeigen
  const overlay = document.getElementById("overlay");
  if (overlay) {
    overlay.style.display = "block"; // Oder andere Methode, das Overlay anzuzeigen
  }
}

function openBasket() {
  document.getElementById("mobileBasket").innerHTML =
    document.getElementById("basket").innerHTML;
  document.getElementById("basketOverlay").style.display = "flex";
}

function closeBasket() {
  document.getElementById("basketOverlay").style.display = "none";
}
