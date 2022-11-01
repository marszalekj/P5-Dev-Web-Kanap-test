// Recuperer l'ID depuis URL
function getProductId() {
  return new URL(window.location.href).searchParams.get("id");
}
const productId = getProductId();
console.log(productId);

// Recuperer le produit via l'ID

function getProduct() {
  fetch(`http://localhost:3000/api/products/${productId}`)
    .then((res) => res.json())
    .then(async function (product) {
      console.log(product);
      addElement(product);
      addCart(product);
    })
    .catch(function (err) {
      console.log(err);
    });
}
getProduct();

// Ajouter le produit sur la page

function addElement(product) {
  document.querySelector(
    ".item__img"
  ).innerHTML += `<img src="${product.imageUrl}" alt="${product.altTxt}">`;
  document.getElementById("title").textContent += product.name;
  document.getElementById("price").textContent += product.price;
  document.getElementById("description").textContent += product.description;
  for (let color of product.colors) {
    document.getElementById(
      "colors"
    ).innerHTML += `<option value="${color}">${color}</option>`;
  }
}

// Ajouter au panier

function addCart(product) {
  const btnCart = document.getElementById("addToCart");

  btnCart.addEventListener("click", function (e) {
    const color = document.getElementById("colors").value;
    const quantity = Number(document.getElementById("quantity").value);
    const name = product.name;
    const price = product.price;
    const img = product.imageUrl;
    const altImg = product.altTxt;
    e.preventDefault();
    // Alertes
    if (color == false) {
      confirm("SVP choisissez une couleur");
    } else if (quantity == 0) {
      confirm("SVP choisissez un nombre d'articles");
    } else {
      alert("Article(s) ajouté(s) au panier");
    }

    // Ajout des informations du produit selectionne
    let selection = { productId, color, quantity, name, price, img, altImg };
    console.log(selection);

    // Creation Local Storage
    let cartLocalStorage = JSON.parse(localStorage.getItem("product"));
    console.log(cartLocalStorage);

    if (cartLocalStorage != null) {
      let content = cartLocalStorage.find(
        (p) => p.productId == productId && p.color == color
      );
      console.log(content);

      if (content !== undefined) {
        content.quantity = content.quantity + quantity;
        localStorage.setItem("product", JSON.stringify(cartLocalStorage));
      } else {
        cartLocalStorage.push(selection);
        localStorage.setItem("product", JSON.stringify(cartLocalStorage));
      }
    } else {
      cartLocalStorage = [];
      cartLocalStorage.push(selection);
      localStorage.setItem("product", JSON.stringify(cartLocalStorage));
    }
  });
}
