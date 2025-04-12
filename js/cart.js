import { getCookie, deleteCookie, setCookie } from "./auth.js";
import {getDocById} from "../../js/main.js";

const userId = getCookie("userId");
console.log("from cart userId = " + userId);





let myCart = [];


// check if cookie exist ?
let usrCart = JSON.parse(getCookie(`cart`));

if(usrCart){
    var price = 0
    for(var product of usrCart){
        var pDetail = product.prod_details
        price += pDetail.price
        // Create the main container div
        const productContainer = document.createElement("div");
        productContainer.className = "col-md-9 align-content-center text-center";

        // Create the flex container
        const flexDiv = document.createElement("div");
        flexDiv.className = "d-flex";

        // Create the image element
        const productImage = document.createElement("img");
        productImage.className = "figure-img";
        productImage.style.width = "124px";
        productImage.src = pDetail.img;

        // Create the text container
        const textContainer = document.createElement("div");
        textContainer.className = "container d-flex flex-column";
        textContainer.style.wordBreak = "break-all";

        // Create the product name span
        const productName = document.createElement("span");
        productName.className = "text-start mt-3";
        productName.innerHTML = `${pDetail.name} <br> ${pDetail.disc}`
        

        // Create the input field
        const quantityInput = document.createElement("input");
        quantityInput.type = "number";
        quantityInput.name = "nOfItem";
        quantityInput.value = "1";
        quantityInput.className = "text-center ms-3 mt-2";
        quantityInput.style.height = "30px";
        quantityInput.style.width = "10%";

        // Append elements to their respective parents
        textContainer.appendChild(productName);
        textContainer.appendChild(quantityInput);
        flexDiv.appendChild(productImage);
        flexDiv.appendChild(textContainer);
        productContainer.appendChild(flexDiv);

        // Create the icons container
        const iconsContainer = document.createElement("div");
        iconsContainer.className = "col-md-3";
        iconsContainer.style.boxSizing = "border-box";

        // Create action buttons container
        const actionsDiv = document.createElement("div");
        actionsDiv.className = "d-inline-block mt-4 container text-md-end";

        // Create the favorite and trash icons
        const heartIcon = document.createElement("a");
        heartIcon.href = "#";
        heartIcon.className ="me-3"
        heartIcon.innerHTML = '<i class="fa fa-heart" style="color: green; font-size: 20px;"></i>';

        const trashIcon = document.createElement("a");
        trashIcon.className ="me-2"
        trashIcon.href = "#";

        trashIcon.innerHTML = '<i class="fa fa-trash" style="color: red; font-size: 20px;"></i>';

        // Append icons
        actionsDiv.appendChild(heartIcon);
        actionsDiv.appendChild(trashIcon);

        // Create the price container
        const priceDiv = document.createElement("div");
        priceDiv.className = "container text-end fs-2";
        priceDiv.innerHTML = pDetail.price;

        // Append all elements
        iconsContainer.appendChild(actionsDiv);
        iconsContainer.appendChild(priceDiv);

        // Append to the body or your specific container
        document.getElementById("products").appendChild(productContainer);
        document.getElementById("products").appendChild(iconsContainer);
    }
    document.getElementById("price_text").innerText = price
}
console.log(usrCart)




