import { getDocumentByField, getProductById } from "./main.js";

let params = new URLSearchParams(window.location.search);
let dicrabtion = document.getElementById("disc_id");
let productName = document.getElementById("name_id");
let price = document.getElementById("price_id");
let image = document.getElementById("productImage_id");
async function productDetails(id) {
  let res = await getProductById("bmJ4rmyTUJWADxBwIMvh");
  showProductdetails(res);
}

productDetails(parseInt(params.get("product_id")));

function showProductdetails(details) {
  console.log(details);
  console.log(image);
  dicrabtion.innerText = details.description;
  productName.innerHTML = details.name;
  price.innerHTML = details.price;

  image.src = details.imageUrl;
  image.alt = details.name || "Product Image";
}
