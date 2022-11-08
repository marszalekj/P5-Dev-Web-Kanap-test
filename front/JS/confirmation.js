//Chercher orderId
let orderId = new URL(window.location.href).searchParams.get("orderid");

// Inserer l'orderId dans le HTML
document.getElementById("orderId").textContent = `${orderId}`;
