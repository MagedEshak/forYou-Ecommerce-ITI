import { getDocById } from "./main.js";

let params = new URLSearchParams(window.location.search);
let dicrabtion = document.getElementById("disc_id");
let productName = document.getElementById("name_id");
let price = document.getElementById("price_id");
let image = document.getElementById("productImage_id");
async function productDetails(id) {
  let res = await getDocById("Products", id);
  showProductdetails(res);
  console.log(id);
}

productDetails(params.get("product_id"));

function showProductdetails(details) {
  dicrabtion.innerText = details.disc;
  productName.innerHTML = details.name;
  price.innerHTML = `Price : ${details.price} EG`;

  image.src = details.img;
  image.alt = details.name || "Product Image";
}
