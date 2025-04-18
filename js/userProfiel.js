import {
  getCurrentUserId,
  getUserProfile,
  getCookie,
  setCookie,
} from "./auth.js";
import { getDocById, updateDocById } from "./main.js";
import { initializeCart } from "./cartAndWishList.js";

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
  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  wishlist.forEach((product) => createWishlistItem(product));

  getCurrentUserId().then((uId) => {
    getUserProfile(uId).then((userData) => {
      userName.innerHTML = userData.userName;
      welcomeHead.innerHTML = `Hello, ${userData.userName}`;
      userEmail.innerHTML = userData.email;

      userAddres.innerHTML = `Country:${userData.address.country}<br> Governorate: ${userData.address.city}`;

      for (let index in userData.shoppingCart) {
        let order = userData.shoppingCart[index];
        let productPromise = getDocById("Products", order.product_id);

        productPromise.then((product) => {
          let Quantity = order.quantaty;
          let Status = order.isPending;
          console.log(product);
          creatLastOrder(product, Quantity, Status, allOrdersContainer);

          if (Status === 1) {
            ShowOrderdDelivered(product, Quantity);
          }
          if (Status === 0) {
            creatLastOrder(product, Quantity, Status, lastOrder);
          }
        });
      }
      updateDeliveredTotalDisplay(userData.shoppingCart);
      orderaddres.innerHTML = `Country: ${userData.address.country}<br> Governorate: ${userData.address.city}`;
      orderUserName.innerHTML = userData.userName;
      orderPhone.innerHTML = userData.phone;
    });
  });
};

function creatLastOrder(product, quantaty, status = "", containerElement) {
  let trProduct = document.createElement("tr");

  let productImageTd = document.createElement("td");
  let productImage = document.createElement("img");
  productImage.src = product.img;
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
    } else if (status == -1) {
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

async function calculateDeliveredTotal(shoppingCart) {
  let total = 0;
  let promises = shoppingCart.map((order) => {
    if (order.isPending == 1) {
      return getDocById("Products", order.product_id).then((product) => {
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
  image.src = product.img;
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
function removeFromWishlist(productId, elementToRemove) {
  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  wishlist = wishlist.filter((item) => item.prod_id !== productId);
  localStorage.setItem("wishlist", JSON.stringify(wishlist));

  if (elementToRemove) {
    elementToRemove.remove();
  }
}
async function createWishlistItem(productData) {
  // let userId = getCookie("userId");
  console.log("ahmed");
  let { myUser, myCart } = await initializeCart();
  console.log("aliali");

  let { name, disc, price, img, id } = productData.prod_details;
  let productCol = document.createElement("div");
  productCol.className = "col-sm-12 col-md-6 col-lg-4";

  let cardSection = document.createElement("section");
  cardSection.className = "text-center card shadow p-4";

  let heartBtn = document.createElement("button");
  heartBtn.className = "btn float-start w-25 border-0";
  heartBtn.innerHTML = '<i class="fa-regular fa-heart"></i>';

  heartBtn.addEventListener("click", () => {
    removeFromWishlist(id, productCol);
  });

  let imgElement = document.createElement("img");
  imgElement.src = img;
  imgElement.alt = name;
  imgElement.className = "col-12";

  let infoDiv = document.createElement("div");
  infoDiv.className = "d-flex flex-column gap-3";

  let title = document.createElement("h3");
  title.textContent = name;

  let description = document.createElement("p");
  description.className = "text-start";
  description.textContent = disc;

  let priceWrapper = document.createElement("p");
  priceWrapper.className = "d-flex justify-content-start gap-4";
  priceWrapper.innerHTML = `Price: <span class="fw-bold">${price} EGP</span>`;

  let addToCartBtn = document.createElement("button");
  addToCartBtn.className = "btn badge p-3 btn-color-fa";
  addToCartBtn.textContent = "Add to cart";
  addToCartBtn.id = `addToCartBtn_id_${id}`;

  addToCartBtn.onclick = () => {
    if (myUser) {
      // put prod id and details in JSON
      let myProdJson = {
        prod_id: id,
        prod_details: productData.prod_details,
      };

      myCart = JSON.parse(getCookie("cart"));
      myCart.push(myProdJson);
      setCookie(`cart`, JSON.stringify(myCart), 100);

      let userCartJson = {
        cat_id: id, // this is wrong
        isPending: 0,
        product_id: id,
        quantaty: 1,
      };
      myUser.shoppingCart.push(userCartJson);
      updateDocById("Users", myUser.id, myUser);

      addToCartBtn.innerHTML = "Added";
    } else {
      window.location.href = "../CustomersPages/signin.html";
    }
  };
  /************************************************************* */

  infoDiv.appendChild(title);
  infoDiv.appendChild(description);
  infoDiv.appendChild(priceWrapper);
  infoDiv.appendChild(addToCartBtn);

  cardSection.appendChild(heartBtn);
  cardSection.appendChild(imgElement);
  cardSection.appendChild(infoDiv);

  productCol.appendChild(cardSection);

  document.getElementById("wishlist").appendChild(productCol);
}
