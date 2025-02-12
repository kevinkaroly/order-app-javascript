let basket = [];

function displayBasketButton() {
  const btnDiv = document.getElementById('btnDiv');
  btnDiv.innerHTML = createBasketButton();
}

function addToCart(index) {
  const burger = getBurgerByIndex(index);
  const existingBurger = findBurgerInBasket(index);

  if (existingBurger) {
    increaseQuantity(existingBurger);
  } else {
    addNewBurgerToBasket(burger, index);
  }
  showBasket();
}

function getBurgerByIndex(index) {
  return burgerMenu[index];
}

function findBurgerInBasket(index) {
  for (let i = 0; i < basket.length; i++) {
    if (basket[i].id === index) {
      return basket[i];
    }
  }
}

function increaseQuantity(burger) {
  burger.quantity++;
}

function addNewBurgerToBasket(burger, index) {
  let burgerWithID = {
    name: burger.name,
    description: burger.description,
    price: burger.price,
    id: index,
    quantity: 1,
  };
  basket.push(burgerWithID);
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
  for (let i = index; i < basket.length - 1; i++) {
    basket[i] = basket[i + 1];
  }
  basket.pop();
  showBasket();
}

function showBasket() {
  const basketContainer = document.getElementById("basket");
  const mobileBasketContainer = document.getElementById("mobileBasket");

  const subtotal = calculateSubtotal();
  const deliveryCost = calculateDeliveryCost();
  const totalPrice = subtotal + deliveryCost;

  const basketHTML = createBasketTemplate(
    basket,
    subtotal,
    deliveryCost,
    totalPrice
  );

  updateBasketUI(basketContainer, mobileBasketContainer, basketHTML);
  toggleOverlay(true);
}

function calculateSubtotal() {
  let subtotal = 0;
  for (let i = 0; i < basket.length; i++) {
    subtotal += basket[i].price * basket[i].quantity;
  }
  return subtotal;
}

function calculateDeliveryCost() {
  if (basket.length === 0) {
    return 0;
  }
  return 5;
}

function updateBasketUI(basketContainer, mobileBasketContainer, basketHTML) {
  basketContainer.innerHTML = basketHTML;
  mobileBasketContainer.innerHTML = basketHTML;
}

function toggleOverlay(show) {
  const overlay = document.getElementById("overlay");
  if (overlay) {
    if (show) {
      overlay.classList.add("visible");
    } else {
      overlay.classList.remove("visible");
    }
  }
}


function getTotalItems() {
  let totalItems = 0;
  for (let i = 0; i < basket.length; i++) {
    totalItems += basket[i].quantity;
  }
  return totalItems;
}

function openBasket() {
  copyBasketContentToMobile();
  showBasketOverlay();
  toggleBodyScroll();
}

function closeBasket() {
  hideBasketOverlay();
  toggleBodyScroll();
}

function copyBasketContentToMobile() {
  const basketElement = document.getElementById("basket");
  const mobileBasketElement = document.getElementById("mobileBasket");
  mobileBasketElement.innerHTML = basketElement.innerHTML;
}

let isBasketOpen = false;

function toggleBasket() {
  const basketOverlay = document.getElementById("basketOverlay");
  const basketButton = document.querySelector(".basketButton");

  if (isBasketOpen) {
    basketOverlay.classList.remove("visible");
    basketButton.innerHTML = "Warenkorb öffnen";
    basketButton.classList.remove("fixed");
    basketButton.classList.add("sticky");
  } else {
    basketOverlay.classList.add("visible");
    basketButton.innerHTML = "Warenkorb schließen";
    basketButton.classList.remove("sticky");
    basketButton.classList.add("fixed");
  }
  isBasketOpen = !isBasketOpen;
  toggleBodyScroll();
}

function toggleBodyScroll() {
  const basketOverlay = document.getElementById("basketOverlay");

  if (isBasketOpen) {
    document.body.classList.add("no-scroll");
    basketOverlay.classList.add("scrollable");
  } else {
    document.body.classList.remove("no-scroll");
    basketOverlay.classList.remove("scrollable");
  }
}

function orderBasket() {
  basket = [];
  showBasket();
}
