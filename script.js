function init(){
    renderMenu();
    showBasket();
}
function renderMenu() {
    const menuContainer = document.getElementById("menu");
    let menuHTML = createHeader();

    for (let i = 0; i < burgerMenu.length; i++) {
        menuHTML += createBurgerTemplate(burgerMenu[i], i);
    }

    menuHTML += createBasketButton();
    menuContainer.innerHTML = menuHTML;
}