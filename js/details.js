import { getDocById , updateDocById } from "./main.js";
import { getCookie, setCookie } from "./auth.js";
import {initializeCart, initWishlist} from "./cartAndWishList.js";


// code to handel cart buttons and cookies
const userId = getCookie("userId");
let {myUser , myCart} = await initializeCart();

/******************************************************************************************************** */
// code to handel wishlist
let myWishList = await initWishlist();
/******************************************************************************************************** */

//add event to add to cart btn
async function addEventToAddToCartBtn(){
  let addToCartBtn = document.getElementById('addToCartBtn_details');
  
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
          updateDocById("User" , myUser.id, myUser);

          addToCartBtn.innerHTML = "Added";
      }
      else{
          window.location.href = "../CustomersPages/signin.html";
      }
  }
}

//add event to add to wishlist btn
function addEventToAddToWishListBtn(){
  let addToWishListBtn = document.getElementById('addToWishListBtn_details');
  // check if the product in wishList or not
  if(myUser){
    for(let item of myUser.wishlist){
        if(item.product_id == product.id)
        {
            addToWishListBtn.innerHTML =  `<i class="fa-solid fa-heart"></i> Remove from wishlist`;
            break;
        }
    }
  }

  addToWishListBtn.onclick = ()=>{
    if(myUser){
        myWishList = JSON.parse(localStorage.getItem('wishlist'));

        if(addToWishListBtn.innerHTML.includes('Add')){
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
            updateDocById("User" , myUser.id, myUser);

            alert('added to wishlist');
            // heartIcon.style.webkitTextStroke = '1px black'
            addToWishListBtn.innerHTML =  `<i class="fa-solid fa-heart"></i> Remove from wishlist`;
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
            addToWishListBtn.innerHTML =  `<i class="fa-solid fa-heart"></i>Add to wishlist`;

            updateDocById('User', userId , myUser);

        }
        
    }
    else{
        window.location.href = "../CustomersPages/signin.html";
    }
  }

}






let params = new URLSearchParams(window.location.search);
let product = await getDocById("Products", params.get("product_id"));// ali update
let dicrabtion = document.getElementById("disc_id");
let productName = document.getElementById("name_id");
let price = document.getElementById("price_id");
let image = document.getElementById("productImage_id");
async function productDetails(id) {
  let res = await getDocById("Products", id);
  showProductdetails(res);
  console.log(id);
}

productDetails(params.get("product_id"));

function showProductdetails(details) {
  dicrabtion.innerText = details.disc;
  productName.innerHTML = details.name;
  price.innerHTML = `Price : ${details.price} EG`;

  image.src = details.img;
  image.alt = details.name || "Product Image";
}


/******************************************* */
addEventToAddToCartBtn();
addEventToAddToWishListBtn();
/****************************************************************************** */
