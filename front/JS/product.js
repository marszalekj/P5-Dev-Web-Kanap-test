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
    .then(function (product) {
      console.log(product);
      addElement(product);
    })
    .catch(function (err) {
      console.log(err);
    });
}
console.log(getProduct());

// Ajouter le produit sur la page

function addElement(product) {
  document.querySelector(
    ".item__img"
  ).innerHTML += `<img src="${product.imageUrl}" alt="${product.altTxt}">`;
  document.getElementById("title").textContent += product.name;
  document.getElementById("price").textContent += product.price;
  document.getElementById("description").textContent += product.description;
  for (color of product.colors) {
    document.getElementById(
      "colors"
    ).innerHTML += `<option value="${color}">${color}</option>`;
  }
}

// Ajouter au panier

function addCart() {
  let color = document.getElementById("colors").index;
  // let color = colors.options[colors.selectedIndex].value;
  //  console.log(colors);
  //  console.log(color);
  let quantity = document.getElementById("quantity").value;
  //  console.log(quantity);
  const btnCart = document.getElementById("addToCart");
  btnCart.addEventListener("click", function (e) {
    //   e.preventDefault();
    // Alertes
    if (document.getElementById("colors").value == false) {
      alert("SVP choisissez une couleur");
    } else if (document.getElementById("quantity").value == 0) {
      alert("SVP choisissez un nombre d'articles");
    } else {
      alert("Article(s) ajouté(s) au panier");
    }
    let cart = [{ productId, color, quantity }];
    console.log(cart);
  });
}

addCart();
