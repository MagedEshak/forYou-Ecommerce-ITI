import { getCookie, deleteCookie, setCookie } from "./auth.js";
import {getDocById} from "../../js/main.js";

const userId = getCookie("userId");
console.log("from cart userId = " + userId);
let myUser ;





let myCart = [];


// check if cookie exist ?
let myCookie = getCookie(`cart`);

// in case there is no cookie with ket = 'cart'
if(!myCookie){
    myUser = await getDocById("User" , userId);
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

async function addEventsToAllCartBtns(){
    /* handel all add to cart btn */
    let addToCartBtns = document.getElementsByClassName('addToCartBtn_class');/* hold all add to cart btns in this variable */
    debugger;
    /* handeling when add to cart btn pressed */
    for(let index = 0 ; index < addToCartBtns.length ; index++){
        debugger;
        // get product id
        let prodId = addToCartBtns[index].id.split("_")[2];
        // get product details
        let prod = await getDocById("Products" , prodId);
        let prodDetails = JSON.stringify(prod);

        addToCartBtns[index].addEventListener('click' , ()=>{
            debugger;
            let flag = 1;

            // put prod id and details in JSON
            let myProdJson = {
                prod_id : prodId,
                prod_details : prodDetails
            }

            myCart = JSON.parse(getCookie('cart'));
            myCart.push(myProdJson);
            setCookie(`cart`,JSON.stringify(myCart),100);

            for(let item of myUser.shoppingCart){
                if(item.product_id == prodId){
                    flag = 0;
                    break;
                }
            }
            debugger;
            if(flag){
                let userCartJson = {
                    cat_id : prod.cat_id,
                    isPending : 0,
                    product_id : prodId,
                    quantaty : 1,
                }
                myUser.shoppingCart.push(userCartJson);
            }

            addToCartBtns[index].innerHTML = "Added";
        })
    }

}




