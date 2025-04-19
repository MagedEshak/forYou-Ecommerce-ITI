import {getDocById ,getDocumentByField,updateDocById} from "../../js/main.js";
import { getCookie, setCookie } from "./auth.js";
import {initializeCart, initWishlist} from "./cartAndWishList.js";



let productsTemp = [];
let catName = undefined;

/*************************************** */
// code to handel cart buttons and cookies
const userId = getCookie("userId");
let {myUser , myCart} = await initializeCart();

/******************************************************************************************************** */
/******************************************************************************************************** */
// code to handel wishlist
let myWishList = await initWishlist();
/******************************************************************************************************** */




/* function to add products dynamically : */
// we supposed to loop on specific category to display its products : 
// get all sent parameters
const urlParams = new URLSearchParams(window.location.search);
// Get cat_id parameter by name
let catId = urlParams.get("cat_id") ;

// Get cateogry name by its id from fireBase
async function getCategoryname(id) {
    let myCategory = await getDocById("Categories" ,id);
    console.log(myCategory.cat_name);
    return myCategory.cat_name;
}


async function getProductsByCatId(catId){
    productsTemp = await getDocumentByField("Products" , "cat_id" , catId);
    console.log(productsTemp);
    //productsTemp = await getAllDocuments("Products");
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
    productsContainer.className = "products row justify-content-center py-2 px-md-3 px-lg-4";
    productsContainer.id = `${catName}Products_id`;

    productsTemp.forEach( product => {
        // this is the div that contains my product elements
        let productContainer = document.createElement('div');
        productContainer.id = `${catName}Product_id_${product.id}`; /* categoryName_id_prodID  : cookerProd_id_1 */
        productContainer.className = "product col-10 col-md-4 col-lg-3 justify-content-center align-items-center p-1";
    
        // this is inner container of my product to handel good view
        let productInnerContainer = document.createElement('div'); 
        productInnerContainer.className = "h-100 productInnercontainer d-flex flex-column justify-content-between align-items-center border border-dark";
    
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

        // check if the product in wishList or not
        if(myUser){
            for(let item of myWishList){
                if(item.prod_id == product.id)
                {
                    heartIcon.style.webkitTextStroke = '1px red'
                    heartIcon.style.color = 'red';
                    break;
                }
            }
        }

        addToWishListBtn.onclick = ()=>{
            if(myUser){
                myWishList = JSON.parse(localStorage.getItem('wishlist'));

                if(heartIcon.style.color != 'red'){
                    // put prod id and details in JSON
                    let myProdJson = {
                        prod_id : product.id,
                        prod_details : product
                    }

                    myWishList.push(myProdJson);
                    localStorage.setItem(`wishlist`,JSON.stringify(myWishList));

                    let userWishListJson = {
                        cat_id : product.cat_id,
                        product_id : product.id,
                    }
                    myUser.wishlist.push(userWishListJson);
                    updateDocById("Users" , myUser.id, myUser);

                    alert('added to wishlist');
                    heartIcon.style.webkitTextStroke = '1px black'
                    heartIcon.style.color = 'red';
                }
                else{

                    for(let index = 0 ;  index < myWishList.length ; index++){
                        if(myWishList[index].prod_id == product.id)
                        {
                            myWishList.splice(index,1);
                            break;
                        }
                    }
                    myUser.wishlist = myWishList;
                    localStorage.setItem(`wishlist`,JSON.stringify(myWishList));

                    // heartIcon.style.webkitTextStroke = '1px black'
                    heartIcon.style.color = 'white';

                    updateDocById('Users', userId , myUser);

                }
                
            }
            else{
                window.location.href = "../CustomersPages/signin.html";
            }
        }
    

    
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
        // this contains the product image  : must be appended in a
        let productImage = document.createElement('div');

        productImage.className = "text-center imageClass d-flex align-items-center justify-content-center";
        productImage.innerHTML = `
            <img id="cookerProdImage_id_${product.id}" src="${product.img}" alt="${product.name}" 
                 referrerpolicy="no-referrer">`;
    
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

        addToCartBtn.onclick = ()=>{
            if(myUser){
                // put prod id and details in JSON
                let myProdJson = {
                    prod_id : product.id,
                    prod_details : product
                }

                myCart = JSON.parse(getCookie('cart'));
                myCart.push(myProdJson);
                setCookie(`cart`,JSON.stringify(myCart),100);

                let userCartJson = {
                    cat_id : product.cat_id,
                    isPending : 0,
                    product_id : product.id,
                    quantaty : 1,
                }
                myUser.shoppingCart.push(userCartJson);
                updateDocById("Users" , myUser.id, myUser);

                addToCartBtn.innerHTML = "Added";
            }
            else{
                window.location.href = "../CustomersPages/signin.html";
            }
        }
    
        // Counter & Bin div (Initially Hidden) , contains + sign , trash icon , and - sign all as buttons (initially hidden)
        let countAndBinDiv = document.createElement("div");
        countAndBinDiv.id = `${catName}ProdCountAndBinDiv_id_${product.id}`;
        countAndBinDiv.className = "productCountAndBin w-75 d-flex justify-content-center align-items-center px-3 py-2 d-none";
    
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



/************************************************************* */
/* filteration process */


let filterOfferCheckBox = document.getElementById('checkIndeterminate2'); // offer checkbox
let pricesFlag = 1;
let offersFlag = 0;

let minRange = document.getElementById('minRange');
let maxRange = document.getElementById('maxRange');
let rangeText = document.getElementById('rangeValuestxt');
let sliderRange = document.getElementById('sliderRange');



let mySliderEventFunc =  function (){
    displayAllProducts();
    if(filterOfferCheckBox.checked)
        displayProductsDependsOnOffers();
    updateMySliderAndFilterProducts(minRange , maxRange ,rangeText ,sliderRange);
    actionAfterFiltering();
} 


filterOfferCheckBox.addEventListener('change' , ()=>{
    // in case two filters works
    if(filterOfferCheckBox.checked){
        offersFlag = displayProductsDependsOnOffers();
    }
    else
    {
        displayAllProducts();
        updateMySliderAndFilterProducts(minRange , maxRange ,rangeText ,sliderRange);
    }
    actionAfterFiltering();
})


function actionAfterFiltering(){
    // now we check if there are products passed from filter or not

    let parentContainer = document.getElementById('parentContainer_id');
    let myFooter = document.getElementById('footer_id');
    let message = document.getElementById('filterationMessage_id');
    
    if(pricesFlag == 1){
        
        let message = document.getElementById('filterationMessage_id');
        displayNone(message);
        parentContainer.style.visibility = "visible";
        myFooter.classList.remove("position-absolute"); 
    }
    else 
    {
        display(message);
        parentContainer.style.visibility = "hidden";
        myFooter.classList.add("position-absolute");
        myFooter.classList.add("bottom-0");
    }

}

function updateMySliderAndFilterProducts(minRange , maxRange ,rangeText ,sliderRange){
    let minValue = parseInt(minRange.value);
    let maxValue = parseInt(maxRange.value);

    if(minValue > maxValue){
        [minValue , maxValue] = [maxValue , minValue]
    }

    const percent1 = (minValue / 50000) * 100;
    const percent2 = (maxValue / 50000) * 100;

    sliderRange.style.left = percent1 + "%";
    sliderRange.style.width = (percent2 - percent1) + "%";

    rangeText.innerHTML = `from ${minValue}   To   ${maxValue}`;

    pricesFlag =  displayProductsDependsOnPriceValue(minValue , maxValue);
}

function displayProductsDependsOnPriceValue(minimumValue , maximumValue){
    let flag = 0 ;

    productsTemp.forEach( product => {
        let currentPrice = product.price - (product.discount / 100) * product.price;
        if(currentPrice >= minimumValue && currentPrice <= maximumValue)
        {
            // in case product passed from the filter so leave it as it is displayed default
            // but it is not displayed so leave it as it is
            // let myProdContainer = document.getElementById(`${catName}Product_id_${product.id}`);
            // display(myProdContainer);
            flag = 1;
        }
        else
        {
            //in case product doesnt pass from the filter
            // so remove it
            let myProdContainer = document.getElementById(`${catName}Product_id_${product.id}`);
            displayNone(myProdContainer);
        }
    })
    // in case of one product at least passed from the filter return 1
    // else return 0
    return flag;
}



function displayProductsDependsOnOffers(){

    let flag = 0 ;

    productsTemp.forEach( product => {
        if(product.discount != 0)
        {
            // in case product passed from the filter so leave it as it is displayed default
            // but it is not displayed so leave it as it is
            flag = 1;
        }
        else
        {
            //in case product doesnt pass from the filter
            // so remove it
            let myProdContainer = document.getElementById(`${catName}Product_id_${product.id}`);
            displayNone(myProdContainer);
        }
    })
    // in case of one product at least passed from the filter return 1
    // else return 0
    return flag;
}





function displayAllProducts(){
    productsTemp.forEach( product => {
        let myProdContainer = document.getElementById(`${catName}Product_id_${product.id}`);
        display(myProdContainer);
    })
}


function display(element){
    element.classList.remove('d-none');
}
function displayNone(element){
    element.classList.add('d-none');
}




/*************************************************************** */
/* this function displays cat links in the nav bar */

async function initializePage(){
    if(window.innerWidth <= 992){
        displayAndRemoveFilterationSection();
    }
    
    await createProductsInHtml();

    minRange.addEventListener('input' , mySliderEventFunc);
    maxRange.addEventListener('input' , mySliderEventFunc);
}


initializePage();


function displayAndRemoveFilterationSection(){
    let filterationBtn = document.getElementById('filterProductsDisplayBtn');

    filterationBtn.addEventListener('click', (e)=> {
        console.log('event added')
        let filterationSection = document.getElementById('filterationSection_id');
        if(filterationSection.style.maxHeight == '0px' || filterationSection.style.maxHeight == "")
        {
            filterationSection.style.maxHeight = '200px';
            filterationSection.style.overflow = 'auto';
            e.target.className = "fa fa-angle-double-up";
        }   
        else{
            filterationSection.style.maxHeight = '0px';
            filterationSection.style.overflow = 'hidden';
            e.target.className = "fa fa-angle-double-down";
        }
    })

}

