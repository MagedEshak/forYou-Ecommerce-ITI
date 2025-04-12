import {getDocById ,getDocumentByField,updateDocById} from "../../js/main.js";
import { getCookie, setCookie } from "./auth.js";


export async function initializeCart() {
    const userId = getCookie("userId");
    const myUser = await getDocById("User", userId);
  
    const myCookie = getCookie("cart");
    let myCart = [];
  
    if (!myCookie && myUser) {
      const userShoppingCart = myUser.shoppingCart;
  
      for (let item of userShoppingCart) {
        const prod = await getDocById("Products", item.product_id);
  
        const myProdJson = {
          prod_id: prod.id,
          prod_details: prod
        };
  
        myCart.push(myProdJson);
      }
  
      setCookie("cart", JSON.stringify(myCart), 100);
    } else if (myCookie) {
      myCart = JSON.parse(myCookie);
    }
  
    return { myUser, myCart };
}



export async function initWishlist(myUser) {
    let wishListLocalStorage = localStorage.getItem('wishlist');
    let myWishList = [];
    
    if (!wishListLocalStorage) {
        if (myUser) {
        let userWishList = myUser.wishlist;
    
        for (let item of userWishList) {
            let prod = await getDocById("Products", item.product_id);
    
            let myProdJson = {
            prod_id: prod.id,
            prod_details: prod
            };
    
            myWishList.push(myProdJson);
        }
    
        localStorage.setItem('wishlist', JSON.stringify(myWishList));
        }
    } else {
        myWishList = JSON.parse(wishListLocalStorage);
    }
    
    return myWishList;
}