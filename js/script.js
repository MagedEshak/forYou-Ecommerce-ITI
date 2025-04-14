import {getAllDocuments, getDocumentByField, getDocById , updateDocById} from "../../js/main.js";
import { getCookie, setCookie } from "./auth.js";
import {initializeCart , initWishlist} from "./cartAndWishList.js";


let categoriesTemp = await getAllDocuments("Categories");
let productsTemp = [];

/*************************************** */
// code to handel cart buttons and cookies
const userId = getCookie("userId");
let {myUser , myCart} = await initializeCart();
/******************************************************************************************************** */
/******************************************************************************************************** */
// code to handel wishlist
debugger
let myWishList = await initWishlist(myUser);
/******************************************************************************************************** */
/* this code handels our crusoal and its background images */
function controlCrusoal (){
    /* my background images */
    let backgroundImagesUrls = [
    '../Images/CustomerImages/carusoal_images/1.jpg' , 
    '../Images/CustomerImages/carusoal_images/2.jpg',
    '../Images/CustomerImages/carusoal_images/3.jpeg'
    ]

    let MyCarousel = document.getElementById('MyCarousel_id'); // crausoal div 
    let controlPrevBtn = document.getElementById('controlPrevBtn_id'); // previous btn
    let controlNextBtn = document.getElementById('controlNextBtn_id'); // next btn

    let counter = 0; // counter to track my background images
    controlPrevBtn.addEventListener('click' , ()=>{getPrevImage();})
    controlNextBtn.addEventListener('click' , ()=>{getNextImage();})

    function getPrevImage(){
        if(counter <= 0)
            counter = backgroundImagesUrls.length - 1;
        else
            counter--;
        
        MyCarousel.style.backgroundImage = `url(${backgroundImagesUrls[counter]})` ;
    }
    function getNextImage(){
        if(counter >= backgroundImagesUrls.length - 1)
            counter = 0;
        else
            counter++;
        
        MyCarousel.style.backgroundImage = `url(${backgroundImagesUrls[counter]})` ;
    }

}

/**************************************************************************************************** */

/* this code handels our add to cart btn */
/* when the button clicked , it must display none ,
and the productCountAndBin must appear */



/***************************************************************************************************** */

async function initialzePage(){
    
    controlCrusoal();
    displayCategoryInHtml();

    await fillProductsInHtml(categoriesTemp);
}

initialzePage();

/******************************************************/
/* creating categories in html */
async function displayCategoryInHtml() {
    // categoriesTemp = await getAllDocuments("Categories");
    let categoriesContainer = document.getElementById('categoriesContainer_id');
    categoriesTemp.forEach( (category , index) => {
    createCategoryInHtml(categoriesContainer , category , index);
})
}

/* display categories */
/* it displays my category as an image in the home */
function createCategoryInHtml(categoriesContainer , category , index){
   
    // this is the category container
    let categoryContainer = document.createElement('div');
    categoryContainer.className = "category col-6 col-md-4 col-lg-3 d-flex p-1";

    // this is a link that contains category contents
    let categoryAncorContainer = document.createElement('a');
    categoryAncorContainer.className = "bg-warning-subtle w-100 d-flex flex-column align-items-center justify-content-between";
    categoryAncorContainer.id = `cat_id_${category.id}`;
    categoryAncorContainer.href = `CustomersPages/shopByCategory.html?cat_id=${category.id}`;
    if(index % 2 == 0){
        categoryAncorContainer.classList.add("bg-success-subtle") ;
        categoryAncorContainer.classList.remove("bg-warning-subtle") ;
    } 

    let categoryHeader = document.createElement('p');
    categoryHeader.innerText = category.cat_name ;
    
    let categoryImage = document.createElement('img');
    categoryImage.referrerPolicy = "no-referrer";
    categoryImage.className = "w-75 catImg";
    categoryImage.src = category.img ;
    categoryImage.referrerpolicy = "no-referrer";
    
 
    categoryAncorContainer.appendChild(categoryHeader);
    categoryAncorContainer.appendChild(categoryImage);

    categoryContainer.appendChild(categoryAncorContainer);
    categoriesContainer.appendChild(categoryContainer);
}


// this function fill products section randomly from all cats
async function fillProductsInHtml(){
   
    // this is the container of products
    let productsContainer = document.createElement('div');
    productsContainer.className = "products row justify-content-center bg-primary-subtle py-2 px-md-3 px-lg-4";
    //productsContainer.id = `${catName}Products_id`;

    for(let category of categoriesTemp){
       
        productsTemp = []; // removing all elements from temp
        let products = await getDocumentByField("Products" , "cat_id" , category.id);
        // we want to generate random indexes to fitch random products
        let index = 0;
        for(let i = 0 ; i < products?.length ; i++){ // this 1 must be changed
            index = Math.round(Math.random() * (products.length) ) ;
            productsTemp.push(products[i]);
        }
        createProductsInHtml(productsContainer, productsTemp , category.cat_name);
    }
    
}



async function createProductsInHtml(productsContainer , products , catName) {

    // this is the div that contains the category header and products container
    let parentContainer = document.getElementById('parentContainer_id');

    products.forEach( product => {
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
                    // heartIcon.style.webkitTextStroke = '1px black'
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
        let productImage = document.createElement('img');
        productImage.src = product.img;
        productImage.referrerpolicy = "no-referrer";
        productImage.id = `cookerProdImage_id_${product.id}`;
        
        productImage.src = product.img;
        productImage.alt = "product image";
        
        /* productImage.innerHTML = `
            <img src="${product.img}" alt="${product.name}" 
                 referrerpolicy="no-referrer">` */
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
    
        // // Counter & Bin div (Initially Hidden) , contains + sign , trash icon , and - sign all as buttons (initially hidden)
        // let countAndBinDiv = document.createElement("div");
        // countAndBinDiv.id = `${catName}ProdCountAndBinDiv_id_${product.id}`;
        // countAndBinDiv.className = "productCountAndBin w-75 d-flex justify-content-center align-items-center px-3 py-2 d-none";
    
        // // remove Button that contains trash icon
        // let removeBtn = document.createElement("button");
        // removeBtn.id = `${catName}ProdRemoveFromCartBtn_id_${product.id}`;
        // removeBtn.className = "bin";
        // // creating trash icon
        // let trashIcon = document.createElement('i');
        // trashIcon.className = "fa fa-trash-o";
        // // appending the trah icon to remove btn
        // removeBtn.appendChild(trashIcon);
    
        // // Decrease Button
        // let decrBtn = document.createElement("button");
        // decrBtn.id = `${catName}ProdDecrCountBtn_id_${product.id}`;
        // decrBtn.className = "minus d-none";
        // // creating minus icon
        // let minusIcon = document.createElement('i');
        // minusIcon.className = "fa fa-minus";
        // // appending the minus icon to decrement btn
        // decrBtn.appendChild(minusIcon);
    
        // // Count Span
        // let countSpan = document.createElement("span");
        // countSpan.id = `${catName}ProdCountSpan_id_${product.id}`;
        // countSpan.className = "col-auto";
        // countSpan.innerText = "0";
    
        // // Increase Button
        // let incrBtn = document.createElement("button");
        // incrBtn.id = `${catName}ProdIncrCountBtn_id_${product.id}`;
        // incrBtn.className = "plus";
        // // creating plus icon
        // let plusIcon = document.createElement('i');
        // plusIcon.className = "fa fa-plus";
        // // appending the plus icon to decrement btn
        // incrBtn.appendChild(plusIcon);
    
        // Append elements to counter div
        // countAndBinDiv.appendChild(removeBtn);
        // countAndBinDiv.appendChild(decrBtn);
        // countAndBinDiv.appendChild(countSpan);
        // countAndBinDiv.appendChild(incrBtn);
    
        // Append addToCart button & counter div
        cartBtnDiv.appendChild(addToCartBtn);
        // cartBtnDiv.appendChild(countAndBinDiv);
    
        // we finished all content of the product inner container , append them to this contianer
        productInnerContainer.appendChild(productHeader);
        productInnerContainer.appendChild(productDetailsLink);
        productInnerContainer.appendChild(cartBtnDiv);
    
        // append inner container to the prod container
        productContainer.appendChild(productInnerContainer)
    
        // append the product container to the products container
        productsContainer.appendChild(productContainer);
    })

    parentContainer.appendChild(productsContainer);
}
