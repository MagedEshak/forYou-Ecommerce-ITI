/* this code handels the side nav bar  */
/* when menu bar btn clicked the side bar must appear from left side */
let menuBarBtn = document.getElementById('menuBarBtn_id');
let sideNavBar = document.getElementById('sideNavBar_id');

// this event handels appearance of side bar 
// when you click on the menu bar btn , we display the side nav
// then when you click on any part of the document , we remove the side nav
document.addEventListener('click' , (e)=>{
    // in case menu bar btn clicked , display the side bar , and 
    if(menuBarBtn.contains(e.target))
        displaySideNavBar(sideNavBar);
    else
        disappearSideNavBar(sideNavBar);  
})

/* this function displays my side bar , by positioning it in my screen */
function displaySideNavBar(navBar){
    navBar.style.left = "0px";
}
/* this function removes my side bar , by positioning it out of my screen */
function disappearSideNavBar(navBar) {
    navBar.style.left = "-75%"; // Hide sidebar off-screen
}
/*************************************************************************************************************** */



/******************************************************************************************************** */

/* function to add products dynamically : */
// we supposed to loop on specific category to display its products : 
let products = [
    {
        "id": 1 ,
        "name": "oven" , 
        "img": "../Images/CustomerImages/Product_imges/cookers/oven.jpg",
        "disc": "Fresh Cooker Hood 90 cm - Classic Black Stainless - FHS90SB40ML" ,
        "cat_id": 1 ,
        "inStock": 20,
        "price": 7120,
        "discount":20,
        "rate": 0,
        "feedback":""
    },
    {
        "id": 2 ,
        "name": "oven" , 
        "img": "../Images/CustomerImages/Product_imges/cookers/oven2.jpg",
        "disc": "Fresh Cooker Hood 90 cm - Classic Black Stainless - FHS90SB40ML" ,
        "cat_id": 1 ,
        "inStock": 20,
        "price": 9500,
        "discount":25,
        "rate": 0,
        "feedback":""
    },
    {
        "id": 3 ,
        "name": "oven" , 
        "img": "../Images/CustomerImages/Product_imges/cookers/oven.jpg",
        "disc": "Fresh Cooker Hood 90 cm - Classic Black Stainless - FHS90SB40ML" ,
        "cat_id": 1 ,
        "inStock": 20,
        "price": 6000,
        "discount":15,
        "rate": 0,
        "feedback":""
    }
    
]

localStorage.setItem('products' , JSON.stringify(products));

// get all sent parameters
const urlParams = new URLSearchParams(window.location.search);
// Get cat_id parameter by name
let catID = urlParams.get("cat_id");

let myProducts = JSON.parse(localStorage.getItem('products'));

// remove all products from the page
document.querySelectorAll(".product").forEach(element => {
    element.remove();
});

// we should loop on products and display product that has the above cat_id only
let productsContainer = document.getElementById('cookerProducts_id');// this is the div that contains all products

for(let product of myProducts){
    if(product.cat_id == catID){
        // this is the div that contains my product elements
        let productContainer = document.createElement('div');
        productContainer.id = `cookerProduct_id_${product.id}`; /* categoryName_id_prodID  : cookerProd_id_1 */
        productContainer.className = "product col-10 col-md-4 col-lg-3 justify-content-center align-items-center";

        // this is inner container of my product to handel good view
        let productInnerContainer = document.createElement('div'); 
        productInnerContainer.className = "h-100 productInnercontainer d-flex flex-column justify-content-between align-items-center";

        /*****************************************************************/
        // this header div contains the discount percentage , and the add to wishlist button
        /*****************************************************************/
        let productHeader = document.createElement('div');
        productHeader.className = "productHeader w-100 d-flex justify-content-between align-items-center p-2";

        let discountPercentage = document.createElement('p');// paragraph contains discount percentage
        discountPercentage.className = "prodDiscount_class col-auto";
        discountPercentage.id = `cookerProdDiscount_id_${product.id}`; 
        discountPercentage.innerText = `OFF ${product.discount}% cash`;


        let addToWishListBtn = document.createElement('button');// add to wish list button , this contains heart icon
        addToWishListBtn.className = " addToWishListBtn_class col-2";
        addToWishListBtn.id = `cookerProdAddToWishListBtn_id_${product.id}`;

        let heartIcon = document.createElement("i");
        heartIcon.className = "fa fa-heart";

        addToWishListBtn.appendChild(heartIcon); // putting heart icon inside add to wish list btn

        // here we put our discount percent and add to wish list btn in the product header
        productHeader.appendChild(discountPercentage);
        productHeader.appendChild(addToWishListBtn);
        
        /*****************************************************************/
        // this ancor contains the product image, product description and product price
        /*****************************************************************/
        let productDetailsLink = document.createElement('a');
        productDetailsLink.className = "d-flex flex-column align-items-center justify-content-center";
        productDetailsLink.href = `CustomersPages/detailes.html?cat_id=${product.cat_id}&product_id=${product.id}`
        /*****************************************************************/
        // this contains the product image  : must be appended in a
        let productImage = document.createElement('img');
        productImage.id = `cookerProdImage_id_${product.id}`;
        productImage.src = `${product.img}`;
        productImage.alt = "product image";

        /*****************************************************************/
        // this div contains the product description : must be appended in a
        let productDescriptionContainer = document.createElement('div');
        productDescriptionContainer.id = `cookerProdDesc_id_${product.id}`;
        productDescriptionContainer.className = "productDesc px-2 align-self-start";

        let productDescriptionText = document.createElement('p'); // my product description
        productDescriptionText.innerText = `${product.disc}`;

        productDescriptionContainer.appendChild(productDescriptionText);// appending the text to the container

        /*****************************************************************/
        // this div contains the product Price : must be appended in a
        let prodductPriceContainer = document.createElement('div');
        prodductPriceContainer.id = `cookerProdPrice_id_${product.id}`;
        prodductPriceContainer.className = "productPrice d-flex align-items-center p-2 ";

        let currentPriceSpan = document.createElement('span');// span that contains the price span and EGP word
        currentPriceSpan.className = "EGP";

        let currentPriceChildSpan = document.createElement('span');// span that contains the price text
        currentPriceChildSpan.className = "productPrice_class";
        currentPriceChildSpan.innerText = `${product.price - (product.price * product.discount)/100}`;

        // Add " EGP" as a text node after the price
        let EGPText = document.createTextNode(" EGP");

        // appending the price text first , and then EGP word
        currentPriceSpan.appendChild(currentPriceChildSpan);
        currentPriceSpan.appendChild(EGPText);

        let oldPriceSpan = document.createElement('span');// this is old price span
        oldPriceSpan.className = "oldPrice_class";
        oldPriceSpan.innerText = `${product.price}`;

        // appending current price span and then the old price
        prodductPriceContainer.appendChild(currentPriceSpan);
        prodductPriceContainer.appendChild(oldPriceSpan);

        // appending the image , description and price in the ancor tag
        productDetailsLink.appendChild(productImage); 
        productDetailsLink.appendChild(productDescriptionContainer);
        productDetailsLink.appendChild(prodductPriceContainer);

        /*****************************************************************/
        // this div contains the add to cart btn , and count and bin btn
        /*****************************************************************/
        let cartBtnDiv = document.createElement("div"); // this div contains the add to cart btn , count and remove div
        cartBtnDiv.className = "cartBtn w-75 py-3 d-flex justify-content-center";

        // this is the add to cart btn
        let addToCartBtn = document.createElement("button");
        addToCartBtn.id = `cookerProdAddToCartBtn_id_${product.id}`;
        addToCartBtn.className = "w-75 addToCartBtn_class";
        addToCartBtn.innerText = "Add to cart";

        // Counter & Bin div (Initially Hidden) , contains + sign , trash icon , and - sign all as buttons (initially hidden)
        let countAndBinDiv = document.createElement("div");
        countAndBinDiv.id = `cookerProdCountAndBinDiv_id_${product.id}`;
        countAndBinDiv.className = "productCountAndBin w-75 d-flex justify-content-between align-items-center px-3 py-2 d-none";

        // remove Button that contains trash icon
        let removeBtn = document.createElement("button");
        removeBtn.id = `cookerProdRemoveFromCartBtn_id_${product.id}`;
        removeBtn.className = "bin";
        // creating trash icon
        let trashIcon = document.createElement('i');
        trashIcon.className = "fa fa-trash-o";
        // appending the trah icon to remove btn
        removeBtn.appendChild(trashIcon);

        // Decrease Button
        let decrBtn = document.createElement("button");
        decrBtn.id = `cookerProdDecrCountBtn_id_${product.id}`;
        decrBtn.className = "minus d-none";
        // creating minus icon
        let minusIcon = document.createElement('i');
        minusIcon.className = "fa fa-minus";
        // appending the minus icon to decrement btn
        decrBtn.appendChild(minusIcon);

        // Count Span
        let countSpan = document.createElement("span");
        countSpan.id = `cookerProdCountSpan_id_${product.id}`;
        countSpan.className = "col-auto";
        countSpan.innerText = "0";

        // Increase Button
        let incrBtn = document.createElement("button");
        incrBtn.id = `cookerProdIncrCountBtn_id_${product.id}`;
        incrBtn.className = "plus";
        // creating plus icon
        let plusIcon = document.createElement('i');
        plusIcon.className = "fa fa-plus";
        // appending the plus icon to decrement btn
        incrBtn.appendChild(plusIcon);

        // Append elements to counter div
        countAndBinDiv.appendChild(removeBtn);
        countAndBinDiv.appendChild(decrBtn);
        countAndBinDiv.appendChild(countSpan);
        countAndBinDiv.appendChild(incrBtn);

        // Append addToCart button & counter div
        cartBtnDiv.appendChild(addToCartBtn);
        cartBtnDiv.appendChild(countAndBinDiv);

        // we finished all content of the product inner container , append them to this contianer
        productInnerContainer.appendChild(productHeader);
        productInnerContainer.appendChild(productDetailsLink);
        productInnerContainer.appendChild(cartBtnDiv);

        // append inner container to the prod container
        productContainer.appendChild(productInnerContainer)

        // append the product container to the products container
        productsContainer.appendChild(productContainer);
    }
}




/************************************************************************************** */


/* this code handels our add to cart btn */
/* when the button clicked , it must display none ,
and the productCountAndBin must appear */

    
/* function to remove element with display none , param : your element */
function displayNone(element){
    element.classList.add("d-none");
}

/* function to dispaly element with removing display none , param : your element */
function display(element){
    element.classList.remove("d-none");
}


/* handel all add to cart btn */
let addToCartBtns = document.getElementsByClassName('addToCartBtn_class');/* hold all add to cart btns in this variable */
let productCountAndBin = document.getElementsByClassName('productCountAndBin');/* hold all product count and bin divs */
let productCountSpans = document.querySelectorAll('.productCountAndBin span'); /* hold all spans that holds product count */
let incrProdCountBtns = document.querySelectorAll('.productCountAndBin .plus');/* hold all increment product count btn */
let removeProductCartBtns = document.querySelectorAll('.productCountAndBin .bin');/* hold all bin btn to remove product from cart */
let decrProdCountBtns = document.querySelectorAll('.productCountAndBin .minus');/* hold all increment product count btn */

/* handeling when add to cart btn pressed */
for(let index = 0 ; index < addToCartBtns.length ; index++){
    addToCartBtns[index].addEventListener('click' , ()=>{
        displayNone(addToCartBtns[index]); // remove add to cart button from the page
        display(productCountAndBin[index]); // add the div of count and bin instead
        ++productCountSpans[index].innerHTML;// when the button clicked , count of product = 1
    })
}


/* handeling when + sign pressed */
for(let index = 0 ; index < incrProdCountBtns.length ; index++){
    incrProdCountBtns[index].addEventListener('click', (e)=>{
        ++productCountSpans[index].innerHTML;// increment product count by 1
        displayNone(removeProductCartBtns[index]);//remove my bin from the div
        display(decrProdCountBtns[index]);//display - sign in the div
    })
}

/* handeling when bin btn pressed */
/* the  productCountAndBin div will disappear , and instead the addTOCart btn will be displayed*/
for(let index = 0 ; index < removeProductCartBtns.length ; index++){
    removeProductCartBtns[index].addEventListener('click', (e)=>{
        --productCountSpans[index].innerHTML;// when the button clicked , count of product = 0
        display(addToCartBtns[index]); // remove add to cart button from the page
        displayNone(productCountAndBin[index]); // add the div of count and bin instead
    })
}

/* handeling when - sign pressed */
for(let index = 0 ; index < decrProdCountBtns.length; index++){
    decrProdCountBtns[index].addEventListener('click', ()=>{
        if(productCountSpans[index].innerHTML == 2){
            productCountSpans[index].innerHTML--;//decrement number of products by 1
            displayNone(decrProdCountBtns[index]);//remove my - sign from the div
            display(removeProductCartBtns[index]);//dispaly bin btn  instead
        }
        else
            productCountSpans[index].innerHTML--;
    })
}
