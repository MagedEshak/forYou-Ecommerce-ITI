import { getCurrentUserId, getUserProfile } from "./auth.js";
import { getDocById } from "./main.js";
let userName = document.getElementById("userName_id");
let userEmail = document.getElementById("userEmail_id");
let userAddres = document.getElementById("userAddres_id");
let lastOrder = document.getElementById("lastOrder_id");
let welcomeHead = document.getElementById("welcomeHead_id");
window.onload = () => {
  getCurrentUserId().then((uId) => {
    getUserProfile(uId).then((userData) => {
      welcomeHead.innerHTML = `Hello, ${userData.Username}`;
      userName.innerHTML = userData.Username;
      userEmail.innerHTML = userData.email;
      userAddres.innerHTML = `Country:${userData.address[0]}<br> Governorate: ${userData.address[1]}`;
      for (let index in userData.shoppingCart) {
        if (!userData.shoppingCart[index].isPending) {
          let lastOrderProduct = getDocById(
            "products",
            userData.shoppingCart[index].product_id
          );
          lastOrderProduct.then((product) => {
            let Quantity = userData.shoppingCart[index].quantaty;
            creatLastOrder(product, Quantity);
          });
        }
      }
    });
  });
};

function creatLastOrder(product, quantaty) {
  let trProduct = document.createElement("tr");

  let productImageTd = document.createElement("td");
  let productImage = document.createElement("img");
  productImage.src = product.imageUrl;
  productImage.alt = product.name;
  productImage.style.width = "80px";
  productImageTd.appendChild(productImage);

  let productName = document.createElement("td");
  let productPrice = document.createElement("td");
  let productQuantity = document.createElement("td");
  let producttotal = document.createElement("td");

  productName.innerHTML = product.name;
  productPrice.innerHTML = product.price;
  productQuantity.innerHTML = quantaty;
  producttotal.innerHTML = quantaty * product.price;
  trProduct.classList.add("row");
  productImageTd.classList.add("col-3");
  productName.classList.add("col-2");
  productPrice.classList.add("col-2");
  productQuantity.classList.add("col-2");
  producttotal.classList.add("col-3");

  trProduct.appendChild(productImageTd);
  trProduct.appendChild(productName);
  trProduct.appendChild(productPrice);
  trProduct.appendChild(productQuantity);
  trProduct.appendChild(producttotal);

  lastOrder.appendChild(trProduct);
}
