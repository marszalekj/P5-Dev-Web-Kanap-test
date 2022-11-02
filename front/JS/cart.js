// Recuperation du Local Storage
const cartLocalStorage = JSON.parse(localStorage.getItem("product"));
console.table(cartLocalStorage);

console.log(cartLocalStorage);

// Affichage panier
function displayCart() {
  // Si le panier est vide
  if (cartLocalStorage === null || cartLocalStorage.length == 0) {
    document.querySelector("#cartAndFormContainer > h1").textContent +=
      " est vide";
  } else {
    for (let product in cartLocalStorage) {
      // Insertion de "article"
      let articleProduct = document.createElement("article");
      document.getElementById("cart__items").appendChild(articleProduct);
      articleProduct.className = "cart__item";
      articleProduct.setAttribute(
        "data-id",
        cartLocalStorage[product].productId
      );
      articleProduct.setAttribute(
        "data-color",
        cartLocalStorage[product].color
      );
      // Insertion de "div img"
      let divImgProduct = document.createElement("div");
      articleProduct.appendChild(divImgProduct);
      divImgProduct.className = "cart__item__img";
      // Insertion de l'image
      let imgProduct = document.createElement("img");
      divImgProduct.appendChild(imgProduct);
      imgProduct.src = cartLocalStorage[product].img;
      imgProduct.alt = cartLocalStorage[product].altImg;
      // Insertion de "div item content"
      let itemContentProduct = document.createElement("div");
      articleProduct.appendChild(itemContentProduct);
      itemContentProduct.className = "cart__item__content";
      // Insertion de "div item content description"
      let itemContentDescriptionProduct = document.createElement("div");
      itemContentProduct.appendChild(itemContentDescriptionProduct);
      itemContentDescriptionProduct.className =
        "cart__item__content__description";
      // Insertion h2
      let titleProduct = document.createElement("h2");
      itemContentDescriptionProduct.appendChild(titleProduct);
      titleProduct.innerText = cartLocalStorage[product].name;

      // Insertion couleur
      let colorProduct = document.createElement("p");
      itemContentDescriptionProduct.appendChild(colorProduct);
      colorProduct.innerText = cartLocalStorage[product].color;
      //colorProduct.style.fontSize = "20px";

      // Insertion prix
      let priceProduct = document.createElement("p");
      itemContentDescriptionProduct.appendChild(priceProduct);
      priceProduct.innerText = cartLocalStorage[product].price + " €";

      // Insertion de "div item content settings"
      let itemContentSettingsProduct = document.createElement("div");
      itemContentProduct.appendChild(itemContentSettingsProduct);
      itemContentSettingsProduct.className = "cart__item__content__settings";

      // Insertion de "div item content settings quantity"
      let itemContentSettingsQuantityProduct = document.createElement("div");
      itemContentSettingsProduct.appendChild(
        itemContentSettingsQuantityProduct
      );
      itemContentSettingsQuantityProduct.className =
        "cart__item__content__settings_quantity";

      // Insertion quantite
      let quantityProduct = document.createElement("p");
      itemContentSettingsQuantityProduct.appendChild(quantityProduct);
      quantityProduct.innerText =
        "Quantité : " + cartLocalStorage[product].quantity;
      let quantityInputProduct = document.createElement("input");
      quantityProduct.appendChild(quantityInputProduct);
      quantityInputProduct.setAttribute("type", "number");
      quantityInputProduct.className = "itemQuantity";
      quantityInputProduct.setAttribute("name", "itemQuantity");
      quantityInputProduct.setAttribute("min", "1");
      quantityInputProduct.setAttribute("max", "100");
      quantityInputProduct.value = cartLocalStorage[product].quantity;

      // Insertion de "div item content settings delete"
      let itemContentSettingsDeleteProduct = document.createElement("div");
      itemContentSettingsProduct.appendChild(itemContentSettingsDeleteProduct);
      itemContentSettingsDeleteProduct.className =
        "cart__item__content__settings_delete";
      let deleteProduct = document.createElement("p");
      itemContentSettingsDeleteProduct.appendChild(deleteProduct);
      deleteProduct.className = "deleteItem";
      deleteProduct.innerText = "Supprimer";
    }
  }
}
displayCart();

function deleteArticle() {
  let deleteItem = document.querySelectorAll(".deleteItem");

  for (let i = 0; i < deleteItem.length; i++) {
    deleteItem[i].addEventListener("click", (e) => {
      let deleteId = cartLocalStorage[i].id;
      let deleteColor = cartLocalStorage[i].color;
      e.preventDefault();
      newCart = cartLocalStorage.filter(
        (element) => element.id !== deleteId || element.color !== deleteColor
      );
      localStorage.setItem("product", JSON.stringify(newCart));
      location.reload();
    });
  }
}
deleteArticle();

function changeQuantity() {
  let changeQnt = document.querySelectorAll(".itemQuantity");
  for (let i = 0; i < changeQnt.length; i++) {
    changeQnt[i].addEventListener("change", (e) => {
      e.preventDefault();
      let productQnt = cartLocalStorage[i].quantity;
      let newValue = changeQnt[i].valueAsNumber;

      const result = cartLocalStorage.filter(
        (element) => element.newValue !== productQnt
      );
      cartLocalStorage[i].quantity = newValue;

      localStorage.setItem("product", JSON.stringify(cartLocalStorage));

      location.reload();
    });
  }
}
changeQuantity();

function total() {
  // On récupère la quantité totale
  let quantity = document.getElementsByClassName("itemQuantity");
  let productLength = quantity.length;
  totalQuantity = 0;
  //(expression initiale, condition, incrémentation)
  for (let i = 0; i < productLength; i++) {
    totalQuantity += quantity[i].valueAsNumber;
  }

  let productTotalQuantity = document.getElementById("totalQuantity");
  productTotalQuantity.textContent = totalQuantity;

  // On récupère le prix total

  totalPrice = 0;
  for (let i = 0; i < productLength; i++) {
    let price = cartLocalStorage[i].price;
    console.log(price);
    totalPrice += quantity[i].valueAsNumber * price;
  }

  let productTotalPrice = document.getElementById("totalPrice");
  productTotalPrice.textContent = totalPrice;
}
total();
