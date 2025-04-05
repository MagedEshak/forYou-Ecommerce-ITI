import {getAllDocuments, getCategoryById,getDocumentByField} from "../../js/main.js";

let categoriesTemp = [];


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
/*************************************************************************************************************** */

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
        debugger;
        if(counter <= 0)
            counter = backgroundImagesUrls.length - 1;
        else
            counter--;
        
        MyCarousel.style.backgroundImage = `url(${backgroundImagesUrls[counter]})` ;
    }
    function getNextImage(){
        debugger;
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





/******************************************************************************************************** */

/***************************************************************************************************** */

async function initialzePage(){
    
    controlSideNavBer();
    controlCrusoal();
    addEventsToAllCartBtns();
    if(window.innerWidth <= 992){
        displayCategoriesinSideNavBar();
    }
    else{
        displayCategoriesinNavBar();
    }
}

initialzePage();



/******************************************************/
/* this function displays cat links in the nav bar */
/* just called when the width of screen is large */
async function displayCategoriesinNavBar() {
    categoriesTemp = await getAllDocuments("aliCategories");

    let cateLinksContainer = document.getElementById('navCategoriesLinks_id');
    categoriesTemp.forEach( category => {
        let catLink = document.createElement('a');
        catLink.className = "col-auto px-5";
        // put the link to go to category you need
        catLink.href = `CustomersPages/shopByCategory.html?cat_id=${category.id}`;
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
        catLink.href = `CustomersPages/shopByCategory.html?cat_id=${category.id}`;
        catLink.innerText = category.cat_name;
        
        catLinkDiv.appendChild(catLink)
        cateLinksContainer.insertBefore(catLinkDiv , whatsappLink);
        
    })

    
}