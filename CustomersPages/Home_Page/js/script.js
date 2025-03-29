
/* this code handels our crusoal and its background images */
let backgroundImagesUrls = [
    '../images/carusoal_images/1.jpg' , 
    '../images/carusoal_images/2.jpg',
    '../images/carusoal_images/3.jpeg'
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