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
            <span class="price">${burger.price.toFixed(2)} €</span>
            <button class="btn" onclick="addToCart(${index})">+</button>
        </div>
    `;
}

function renderMenu() {
    const menuContainer = document.getElementById("menu");
    
    menuContainer.innerHTML = createHeader() + burgerMenu.map((burger, index) => createBurgerTemplate(burger, index)).join("");
}

