import { getCookie, deleteCookie, setCookie } from "./auth.js";
import {getDocById} from "../../js/main.js";

const userId = getCookie("userId");
console.log("from cart userId = " + userId);





let myCart = [];


// check if cookie exist ?
let usrCart = getCookie(`cart`);
console.log(JSON.parse(usrCart))

// in case there is no cookie with ket = 'cart'
if(myCookie){
    let myUser = await getDocById("User" , userId);
    let userShoppingCart = myUser.shoppingCart;

    for(let item of userShoppingCart){
        let prod = await getDocById("Products" , item.product_id);

        let myProdJson = {
            prod_id : prod.id,
            prod_details : prod
        }
        
        myCart.push(myProdJson); 
    }

    setCookie(`cart`,JSON.stringify(myCart),100);
}




/* this code handels our add to cart btn */
/* when the button clicked , it must display none ,
and the productCountAndBin must appear */

export async function addEventsToAllCartBtns(products){
    /* handel all add to cart btn */
    let addToCartBtns = document.getElementsByClassName('addToCartBtn_class');/* hold all add to cart btns in this variable */
    let productCountAndBin = document.getElementsByClassName('productCountAndBin');/* hold all product count and bin divs */
    let removeProductCartBtns = document.querySelectorAll('.productCountAndBin .bin');/* hold all bin btn to remove product from cart */

    /* handeling when add to cart btn pressed */
    for(let index = 0 ; index < addToCartBtns.length ; index++){

        // get product id
        let prodId = addToCartBtns[index].id.split("_")[2];
        // get product details
        let prod = await getDocById("Products" , prodId);
        let prodDetails = JSON.stringify(prod);

        addToCartBtns[index].addEventListener('click' , ()=>{

            // put prod id and details in JSON
            let myProdJson = {
                prod_id : prodId,
                prod_details : prodDetails
            }

            myCart = JSON.parse(getCookie('cart'));
            myCart.push(myProdJson);
            setCookie(`cart`,JSON.stringify(myCart),100);
            addToCartBtns[index].innerHTML = "Added";

            // displayNone(addToCartBtns[index]); // remove add to cart button from the page
            // display(productCountAndBin[index]); // add the div of count and bin instead
            // ++productCountSpans[index].innerHTML;// when the button clicked , count of product = 1
        })
    }


    // /* handeling when + sign pressed */
    // for(let index = 0 ; index < incrProdCountBtns.length ; index++){
    //     incrProdCountBtns[index].addEventListener('click', (e)=>{
    //         ++productCountSpans[index].innerHTML;// increment product count by 1
    //         displayNone(removeProductCartBtns[index]);//remove my bin from the div
    //         display(decrProdCountBtns[index]);//display - sign in the div
    //     })
    // }

    /* handeling when bin btn pressed */
    /* the  productCountAndBin div will disappear , and instead the addTOCart btn will be displayed*/
    for(let index = 0 ; index < removeProductCartBtns.length ; index++){
        removeProductCartBtns[index].addEventListener('click', (e)=>{
            

            // get product id
            let prodId = addToCartBtns[index].id.split("_")[2];

            let prodIndex; // get index of product in my cart
            for(let index in myCart){
                if(myCart[index].prod_id == prodId){
                    prodIndex = index;
                    break;
                }
                    
            }  
            debugger; 
            if(myCart.length > 1)
                myCart.splice(prodIndex, 1); // delete my product from cart
            else
                myCart.pop();

            setCookie(`cart`,JSON.stringify(myCart),100);

            // --productCountSpans[index].innerHTML;// when the button clicked , count of product = 0
            display(addToCartBtns[index]); // remove add to cart button from the page
            displayNone(productCountAndBin[index]); // add the div of count and bin instead
        })
    }

    // /* handeling when - sign pressed */
    // for(let index = 0 ; index < decrProdCountBtns.length; index++){
    //     decrProdCountBtns[index].addEventListener('click', ()=>{
    //         if(productCountSpans[index].innerHTML == 2){
    //             productCountSpans[index].innerHTML--;//decrement number of products by 1
    //             displayNone(decrProdCountBtns[index]);//remove my - sign from the div
    //             display(removeProductCartBtns[index]);//dispaly bin btn  instead
    //         }
    //         else
    //             productCountSpans[index].innerHTML--;
    //     })
    // }
}

/* function to remove element with display none , param : your element */
function displayNone(element){
    element.classList.add("d-none");
}

/* function to dispaly element with removing display none , param : your element */
function display(element){
    element.classList.remove("d-none");
}
