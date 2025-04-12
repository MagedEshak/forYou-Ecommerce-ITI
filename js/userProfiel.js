import { getCurrentUserId, getUserProfile } from "./auth.js";
import { getDocById } from "./main.js";
let userName = document.getElementById("username_id");
let userEmail = document.getElementById("userEmail_id");
let userAddres = document.getElementById("userAddres_id");
let lastOrder = document.getElementById("lastOrder_id");
let allOrdersContainer = document.getElementById("allOrders_id");
let welcomeHead = document.getElementById("welcomeHead_id");
let orderaddres = document.getElementById("orderaddres_id");
let orderUserName = document.getElementById("orderUserName_id");
let orderPhone = document.getElementById("orderPhone_id");
window.onload = () => {
  getCurrentUserId().then((uId) => {
    getUserProfile(uId).then((userData) => {
      userName.innerHTML = userData.Username;
      welcomeHead.innerHTML = `Hello, ${userData.Username}`;
      userEmail.innerHTML = userData.email;
      userAddres.innerHTML = `Country:${userData.address[0]}<br> Governorate: ${userData.address[1]}`;
      for (let index in userData.shoppingCart) {
        let order = userData.shoppingCart[index];
        let productPromise = getDocById("products", order.product_id);

        productPromise.then((product) => {
          let Quantity = order.quantaty;
          let Status = order.isPending;

          creatLastOrder(product, Quantity, Status, allOrdersContainer);

          if (Status === 1) {
            ShowOrderdDelivered(product, Quantity);
          }
          if (Status === 0) {
            creatLastOrder(product, Quantity, Status, lastOrder);
          }
        });
      }

      orderaddres.innerHTML = `Country:${userData.address[0]}<br> Governorate: ${userData.address[1]}`;
      orderUserName.innerHTML = userData.Username;
      orderPhone.innerHTML = userData.phone;
      updateDeliveredTotalDisplay(userData.shoppingCart);
    });
  });
};

function creatLastOrder(product, quantaty, status = "", containerElement) {
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
  let productStutas = document.createElement("td");

  productName.innerHTML = product.name;
  productPrice.innerHTML = product.price;
  productQuantity.innerHTML = quantaty;
  producttotal.innerHTML = quantaty * product.price;
  trProduct.classList.add("row");
  productImageTd.classList.add("col-2");
  productName.classList.add("col-2");
  productPrice.classList.add("col-2");
  productQuantity.classList.add("col-2");
  producttotal.classList.add("col-2");

  trProduct.appendChild(productImageTd);
  trProduct.appendChild(productName);
  trProduct.appendChild(productPrice);
  trProduct.appendChild(productQuantity);
  trProduct.appendChild(producttotal);
  if (status !== "") {
    if (status == 1) {
      productStutas.innerHTML = `Delivered`;
      productStutas.classList.add("text-success");
    } else if (status == 2) {
      productStutas.innerHTML = `Declined`;
      productStutas.classList.add("text-danger");
    } else {
      productStutas.innerHTML = `Pending`;
      productStutas.classList.add("text-info");
    }
    productStutas.classList.add("col-2");
    trProduct.appendChild(productStutas);
  }

  containerElement.appendChild(trProduct);
}

function calculateDeliveredTotal(shoppingCart) {
  let total = 0;
  let promises = shoppingCart.map((order) => {
    if (order.isPending == 1) {
      return getDocById("products", order.product_id).then((product) => {
        if (product && product.price != null) {
          total += Number(product.price) * Number(order.quantaty);
        } else {
          console.warn("Product not found or missing price:", order.product_id);
        }
      });
    }
  });

  return Promise.all(promises).then(() => total);
}

function updateDeliveredTotalDisplay(shoppingCart) {
  calculateDeliveredTotal(shoppingCart).then((total) => {
    let totalElement = document.getElementById("deliveredTotal_id");
    console.log("Total delivered:", total);
    if (total === 0) {
      totalElement.innerText = "No delivered products yet.";
    } else {
      totalElement.innerText = `Total Delivered Price: ${total} EGP`;
    }
  });
}

function ShowOrderdDelivered(product, quantaty) {
  let section = document.getElementById("yourOrdered_id");

  let colImg = document.createElement("div");
  colImg.classList.add("col-lg-3", "col-md-12", "mb-3");

  let image = document.createElement("img");
  image.src = product.imageUrl;
  image.alt = product.name;
  image.classList.add("w-50");
  image.id = "imageOrder_id";

  colImg.appendChild(image);

  let colDetails = document.createElement("div");
  colDetails.classList.add("col-lg-3", "col-md-12", "align-self-center");

  let title = document.createElement("h4");
  title.textContent = product.name;

  let description = document.createElement("p");
  description.textContent = product.description;

  let quantityText = document.createElement("p");
  quantityText.textContent = `Quantity: ${quantaty}`;

  colDetails.appendChild(title);
  colDetails.appendChild(description);
  colDetails.appendChild(quantityText);

  section.appendChild(colImg);
  section.appendChild(colDetails);
}
