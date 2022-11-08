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
// Suppression article
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
// Modification de la quantite
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
// Calcul de la quantite totale
function total() {
  let quantity = document.getElementsByClassName("itemQuantity");
  let productLength = quantity.length;
  totalQuantity = 0;

  for (let i = 0; i < productLength; i++) {
    totalQuantity += quantity[i].valueAsNumber;
  }

  let productTotalQuantity = document.getElementById("totalQuantity");
  productTotalQuantity.textContent = totalQuantity;

  // Calcul du prix total
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

// Formulaire

const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const address = document.getElementById("address");
const email = document.getElementById("email");
const city = document.getElementById("city");

let btnOrder = document.getElementById("order");

// Creation des Regex
let textRegExp = new RegExp(/^([A-Za-z]{3,20}-{0,1})?([A-Za-z]{3,20})$/);
let addressRegExp = new RegExp(/^[a-zA-Z0-9.,-_ ]{5,50}[ ]{0,2}$/);
let emailRegExp = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);

function checkInput(input, regex) {
  let testInput = regex.test(input.value);
  let p = input.nextElementSibling;
  // Si les donnees sont ok
  if (testInput) {
    p.textContent = "Champ valide";
    p.style.color = "#006400";
    p.style.color.remove = "#BDB0C7";
    return true;
    // Si les donnees ne sont pas ok
  } else {
    p.textContent = "Champ non valide";
    p.style.color = "#BDB0C7";
    p.style.color.remove = "#006400";
    return false;
  }
}
// validation prenom
let inputFirstName = firstName.addEventListener("change", function () {
  checkInput(firstName, textRegExp);
});

// validation nom
let inputLastName = lastName.addEventListener("change", function () {
  checkInput(lastName, textRegExp);
});

// validation adresse
let inputAddress = address.addEventListener("change", function () {
  checkInput(address, addressRegExp);
});
// validation ville
let inputCity = city.addEventListener("change", function () {
  checkInput(city, textRegExp);
});

// validation email
let inputEmail = email.addEventListener("change", function () {
  checkInput(email, emailRegExp);
});

// On ecoute le clic sur le bouton commander
btnOrder.addEventListener("click", function (e) {
  e.preventDefault();
  // Si tout est ok on peut passer commande
  if (
    checkInput(firstName, textRegExp) &&
    checkInput(lastName, textRegExp) &&
    checkInput(address, addressRegExp) &&
    checkInput(city, textRegExp) &&
    checkInput(email, emailRegExp) &&
    cartLocalStorage.length > 0
  ) {
    alert("Merci pour votre commande !");
    // Creation du contact
    const contact = {
      firstName: firstName.value,
      lastName: lastName.value,
      address: address.value,
      city: city.value,
      email: email.value,
    };
    // Creation de l'array contenant les ID des produits
    const products = [];
    for (let i = 0; i < cartLocalStorage.length; i++) {
      products.push(cartLocalStorage[i].productId);
    }
    console.log(contact);
    console.log(products);
    let orderId;
    sendData();
    // Creation fonction envoyant les donnees au Back
    async function sendData() {
      fetch(`http://localhost:3000/api/products/order`, {
        method: "POST",
        body: JSON.stringify({ contact, products }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        // Récupération de la réponse de l'API
        .then((res) => res.json())
        .then((server) => {
          let orderId = server.orderId;
          console.log(server);
          console.log(orderId);
          // Si orderId récupéré, renvoie vers la page  Confirmation
          window.location.href = `./confirmation.html?orderid=${orderId}`;
          localStorage.clear();
        });
    }
    // Si champs incorrects on previent le client
  } else if (
    checkInput(firstName, textRegExp) ||
    checkInput(lastName, textRegExp) ||
    checkInput(address, addressRegExp) ||
    checkInput(city, textRegExp) ||
    checkInput(email, emailRegExp) ||
    cartLocalStorage.length < 1
  ) {
    alert(
      "Veuillez remplir tous les champs ou ajouter un article dans votre panier"
    );
  }
});
