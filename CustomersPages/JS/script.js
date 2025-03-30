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





/* this code handels our crusoal and its background images */
let backgroundImagesUrls = [
    '../../Images/CustomerImages/carusoal_images/1.jpg' , 
    '../../Images/CustomerImages/carusoal_images/2.jpg',
    '../../Images/CustomerImages/carusoal_images/3.jpeg'
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








/* this code handels our add to cart btn */
/* when the button clicked , it must display none ,
and the productCountAndBin must appear */

let addToCartBtn = document.getElementById('addToCartBtn_id_1'); // cart button
let productCountAndBinDiv = document.getElementById('productCountAndBin_id_1'); // container of product count and bin
let productCountSpan = document.getElementById('productCount_id_1');// the span that dispalys product count
let incrementProductCountBtn = document.getElementById('incrementProductCountBtn_id_1');// + sign to increment prodduct count
let removeProductCartBtn = document.getElementById('removeProductCartBtn_id_1');// bin to remove the product from cart
let decrementProductCountBtn = document.getElementById('decrementProductCountBtn_id_1');// - sign to decrement prodduct count

/* handeling when add to cart pressed */
addToCartBtn.addEventListener('click' , (e) => {
    displayNone(addToCartBtn); // remove add to cart button from the page
    display(productCountAndBinDiv); // add the div of count and bin instead
    console.log(++productCountSpan.innerHTML)// when the button clicked , count of product = 1
})

/* handeling when + sign pressed */
incrementProductCountBtn.addEventListener('click',()=>{
    // when the button clicked increment product count and display minus sign instead of bin
    console.log(++productCountSpan.innerHTML);
    displayNone(removeProductCartBtn);//remove my bin from the div
    display(decrementProductCountBtn);//dispaly - sign instead
})

/* handeling when - sign pressed */
decrementProductCountBtn.addEventListener('click' , ()=>{
    if(productCountSpan.innerHTML == 2){
        productCountSpan.innerHTML--;
        displayNone(decrementProductCountBtn);//remove my bin from the div
        display(removeProductCartBtn);//dispaly - sign instead
    }
    else
        productCountSpan.innerHTML--;
})

/* handeling when bin btn pressed */
removeProductCartBtn.addEventListener('click',()=>{
    productCountSpan.innerHTML--;
    displayNone(productCountAndBinDiv); // remove add to cart button from the page
    display(addToCartBtn); // add the div of count and bin instead
})
    
/* function to remove element with display none , param : your element */
function displayNone(element){
    element.classList.add("d-none");
}

/* function to dispaly element with removing display none , param : your element */
function display(element){
    element.classList.remove("d-none");
}