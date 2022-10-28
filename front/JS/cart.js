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
      let productMatch = product.find(
        (product) => product._id === cartLocalStorage._id
      );
      console.log(productMatch);
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
    }
  }
}
displayCart();
