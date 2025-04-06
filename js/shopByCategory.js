import {getDocById ,getDocumentByField,getAllDocuments} from "../../js/main.js";

let productsTemp = [];
let categoriesTemp = [];
let catName = undefined;

/* this code handels the side nav bar  */

function controlSideNavBer(){
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
}

/* this function displays my side bar , by positioning it in my screen */
function displaySideNavBar(navBar){
    navBar.style.left = "0px";
}
/* this function removes my side bar , by positioning it out of my screen */
function disappearSideNavBar(navBar) {
    navBar.style.left = "-75%"; // Hide sidebar off-screen
}

/******************************************************************************************************** */

/* function to add products dynamically : */
// we supposed to loop on specific category to display its products : 
// get all sent parameters
const urlParams = new URLSearchParams(window.location.search);
// Get cat_id parameter by name
let catId = urlParams.get("cat_id") ;

// Get cateogry name by its id from fireBase
async function getCategoryname(id) {
    debugger;
    let myCategory = await getDocById("aliCategories" ,id);
    console.log(myCategory.cat_name);
    return myCategory.cat_name;
}


async function getProductsByCatId(catId){
    debugger;
    productsTemp = await getDocumentByField("aliProducts" , "cat_id" , catId);
    console.log(productsTemp);
    //productsTemp = await getAllDocuments("aliProducts");
}


async function createProductsInHtml() {
    await getProductsByCatId(catId);

    // this is category name
    catName = await getCategoryname(catId);

    // this is the div that contains the category header and products container
    let parentContainer = document.getElementById('parentContainer_id');

    // this is the header of our category
    let categoryheader = document.createElement('h2');
    categoryheader.className = "p-4 text-center";
    categoryheader.id = `${catName}Section_id`;
    categoryheader.innerText = `Shop ${catName}`;

    // this is the container of products
    let productsContainer = document.createElement('div');
    productsContainer.className = "products row justify-content-center bg-primary-subtle py-2 px-md-3 px-lg-4";
    productsContainer.id = `${catName}Products_id`;

    productsTemp.forEach( product => {
        // this is the div that contains my product elements
        let productContainer = document.createElement('div');
        productContainer.id = `${catName}Product_id_${product.id}`; /* categoryName_id_prodID  : cookerProd_id_1 */
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
        discountPercentage.id = `${catName}ProdDiscount_id_${product.id}`; 
        discountPercentage.innerText = `OFF ${product.discount}% cash`;

        if(product.discount == 0){
            discountPercentage.style.visibility = "hidden";
        }
    
    
        let addToWishListBtn = document.createElement('button');// add to wish list button , this contains heart icon
        addToWishListBtn.className = " addToWishListBtn_class col-2";
        addToWishListBtn.id = `${catName}ProdAddToWishListBtn_id_${product.id}`;
    
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
        productDetailsLink.href = `../CustomersPages/detailes.html?cat_id=${product.cat_id}&product_id=${product.id}`
        /*****************************************************************/
        // this contains the product image  : must be appended in a
        let productImage = document.createElement('img');
        productImage.id = `cookerProdImage_id_${product.id}`;
        productImage.src = `${product.img}`;
        productImage.alt = "product image";
    
        /*****************************************************************/
        // this div contains the product description : must be appended in a
        let productDescriptionContainer = document.createElement('div');
        productDescriptionContainer.id = `${catName}ProdDesc_id_${product.id}`;
        productDescriptionContainer.className = "productDesc px-2 align-self-start";
    
        let productDescriptionText = document.createElement('p'); // my product description
        productDescriptionText.innerText = `${product.disc}`;
    
        productDescriptionContainer.appendChild(productDescriptionText);// appending the text to the container
    
        /*****************************************************************/
        // this div contains the product Price : must be appended in a
        let prodductPriceContainer = document.createElement('div');
        prodductPriceContainer.id = `${catName}ProdPrice_id_${product.id}`;
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

        if(product.discount == 0)
            oldPriceSpan.classList.add('d-none');
    
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
        addToCartBtn.id = `${catName}ProdAddToCartBtn_id_${product.id}`;
        addToCartBtn.className = "w-75 addToCartBtn_class";
        addToCartBtn.innerText = "Add to cart";
    
        // Counter & Bin div (Initially Hidden) , contains + sign , trash icon , and - sign all as buttons (initially hidden)
        let countAndBinDiv = document.createElement("div");
        countAndBinDiv.id = `${catName}ProdCountAndBinDiv_id_${product.id}`;
        countAndBinDiv.className = "productCountAndBin w-75 d-flex justify-content-between align-items-center px-3 py-2 d-none";
    
        // remove Button that contains trash icon
        let removeBtn = document.createElement("button");
        removeBtn.id = `${catName}ProdRemoveFromCartBtn_id_${product.id}`;
        removeBtn.className = "bin";
        // creating trash icon
        let trashIcon = document.createElement('i');
        trashIcon.className = "fa fa-trash-o";
        // appending the trah icon to remove btn
        removeBtn.appendChild(trashIcon);
    
        // Decrease Button
        let decrBtn = document.createElement("button");
        decrBtn.id = `${catName}ProdDecrCountBtn_id_${product.id}`;
        decrBtn.className = "minus d-none";
        // creating minus icon
        let minusIcon = document.createElement('i');
        minusIcon.className = "fa fa-minus";
        // appending the minus icon to decrement btn
        decrBtn.appendChild(minusIcon);
    
        // Count Span
        let countSpan = document.createElement("span");
        countSpan.id = `${catName}ProdCountSpan_id_${product.id}`;
        countSpan.className = "col-auto";
        countSpan.innerText = "0";
    
        // Increase Button
        let incrBtn = document.createElement("button");
        incrBtn.id = `${catName}ProdIncrCountBtn_id_${product.id}`;
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
    })

    parentContainer.appendChild(categoryheader);
    parentContainer.appendChild(productsContainer);
}


/************************************************************************************** */


/* this code handels our add to cart btn */
/* when the button clicked , it must display none ,
and the productCountAndBin must appear */

function addEventsToAllCartBtns (){
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
}

/* function to remove element with display none , param : your element */
function displayNone(element){
    element.classList.add("d-none");
}

/* function to dispaly element with removing display none , param : your element */
function display(element){
    element.classList.remove("d-none");
}

/************************************************************* */
/* filteration process */


function FilterByPrice(){
    debugger;
    let minRange = document.getElementById('minRange');
    let maxRange = document.getElementById('maxRange');
    let rangeText = document.getElementById('rangeValuestxt');
    let sliderRange = document.getElementById('sliderRange');

    minRange.addEventListener('input' , () =>
         {updateMySliderAndFilterProducts(minRange, maxRange , rangeText ,sliderRange);}
                            )
    maxRange.addEventListener('input' , () => 
        {updateMySliderAndFilterProducts(minRange, maxRange , rangeText ,sliderRange);}
                            )

    updateMySliderAndFilterProducts(minRange, maxRange , rangeText ,sliderRange);
}



function updateMySliderAndFilterProducts(minValue , maxValue ,rangeText ,sliderRange){

    minValue = parseInt(minRange.value);
    maxValue = parseInt(maxRange.value);

    if(minValue > maxValue){
        [minValue , maxValue] = [maxValue , minValue]
    }

    const percent1 = (minValue / 50000) * 100;
    const percent2 = (maxValue / 50000) * 100;

    sliderRange.style.left = percent1 + "%";
    sliderRange.style.width = (percent2 - percent1) + "%";

    rangeText.innerHTML = `Filter range from ${minValue}   To   ${maxValue}`;

    displayProductsDependsOnPriceValue(minValue , maxValue);
}

function displayProductsDependsOnPriceValue(minimumValue , maximumValue){

    let parentContainer = document.getElementById('parentContainer_id');
    let myFooter = document.getElementById('footer_id');
    let flag = 0 ;

    productsTemp.forEach( product => {
        let currentPrice = product.price - (product.discount / 100) * product.price;
        if(currentPrice >= minimumValue && currentPrice <= maximumValue)
        {
            let myProdContainer = document.getElementById(`${catName}Product_id_${product.id}`);
            display(myProdContainer);
            flag = 1;
        }
        else
        {
            let myProdContainer = document.getElementById(`${catName}Product_id_${product.id}`);
            displayNone(myProdContainer);
        }
    })
    if(flag == 0){
        let message = document.getElementById('filterationMessage_id');
        display(message);
        displayNone(parentContainer);
        myFooter.classList.add("position-absolute");
        myFooter.classList.add("bottom-0"); 
        }
    else
    {
        let message = document.getElementById('filterationMessage_id');
        displayNone(message);
        display(parentContainer);
        myFooter.classList.remove("position-absolute");
    }
}


/*************************************************************** */
/* this function displays cat links in the nav bar */
async function displayCategoriesinNavBar() {
    categoriesTemp = await getAllDocuments("aliCategories");

    let cateLinksContainer = document.getElementById('navCategoriesLinks_id');
    categoriesTemp.forEach( category => {
        let catLink = document.createElement('a');
        catLink.className = "col-auto px-5";
        catLink.href = `shopByCategory.html?cat_id=${category.id}`;
        catLink.innerText = category.cat_name;

        cateLinksContainer.appendChild(catLink);
    })
}

/* just called when the width of screen is small */
async function displayCategoriesinSideNavBar() {
    categoriesTemp = await getAllDocuments("aliCategories");
    
    let cateLinksContainer = document.getElementById('sideNavCategoriesLinks_id');
    let whatsappLink = document.getElementById('whatsappLink_id');
    categoriesTemp.forEach( category => {
        
        let catLinkDiv = document.createElement('div');
        catLinkDiv.className = "w-100";

        let catLink = document.createElement('a');
        catLink.className = "w-100";
        // put the link to go to category you need
        catLink.href = `shopByCategory.html?cat_id=${category.id}`;
        catLink.innerText = category.cat_name;
        
        catLinkDiv.appendChild(catLink)
        cateLinksContainer.insertBefore(catLinkDiv , whatsappLink);
        
    })

    
}


async function initializePage(){
    controlSideNavBer();
    if(window.innerWidth <= 992){
        displayCategoriesinSideNavBar();
    }
    else{
        displayCategoriesinNavBar();
    }
    await createProductsInHtml();
    addEventsToAllCartBtns ();
    FilterByPrice();
}


initializePage();
