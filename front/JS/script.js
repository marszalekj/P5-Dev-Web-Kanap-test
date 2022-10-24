// Recuperer tous les produits de l'API

function getAllProducts() {
  fetch("http://localhost:3000/api/products")
    .then((res) => res.json())
    .then(function (res) {
      for (product of res) {
        displayProduct(product);
        addElement(product);
      }
    })
    .catch(function (err) {
      console.log(err);
    });
}
getAllProducts();

function displayProduct(product) {
  console.log(product);
}

// Afficher les produits sur la page d'accueil

function addElement(product) {
  content = `<a href="./product.html?id=${product._id}">
  <article>
    <img src=${product.imageUrl} alt=${product.altTxt}>
    <h3 class="productName">${product.name}</h3>
    <p class="productDescription">${product.description}</p>
  </article>
</a>`;
  document.getElementById("items").innerHTML += content;
}
