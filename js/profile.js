import { getCookie } from "./auth.js";

// Add this at the beginning of your file
function displayUserInfo() {
    const userName = getCookie("userName");
    const userEmail = getCookie("email");
    const userPhone = getCookie("phone");
    const userAddress = getCookie("address");

    console.log(userName, userEmail, userPhone, userAddress);

    // Update profile overview section
    document.getElementById("username_id").textContent = userName || 'N/A';
    document.getElementById("userEmail_id").textContent = userEmail || 'N/A';
    document.getElementById("userAddress_id").innerHTML = userAddress ? 
        `Country: ${userAddress}` : 'N/A';
    document.getElementById("userPhone_id").textContent = userPhone || 'N/A';
    document.getElementById("userPhone_id").textContent = userPhone || 'N/A';
    
    // Update welcome heading
    document.getElementById("welcomeHead_id").textContent = `Hello, ${userName}`;

    // Update order details section
    document.getElementById("orderaddres_id").innerHTML = userAddress ? 
        `city: ${userAddress}<br>` : 'N/A';
    document.getElementById("orderUserName_id").textContent = userName || 'N/A';
    document.getElementById("orderPhone_id").textContent = userPhone || 'N/A';
}

// Call this when the page loads
document.addEventListener('DOMContentLoaded', displayUserInfo);

//**sewitch Profile category */
let overView = document.getElementById("overView_id");
let myMrders = document.getElementById("orders_id");
let wishList = document.getElementById("wishList_id");
let overSideBar = document.getElementById("overSideBar_id");
let orderSideBar = document.getElementById("orderSideBar_id");
let wishListSideBar = document.getElementById("WishListSideBar_id");
let porfielOverview = document.getElementById("porfielOverview_id");
let ordered = document.getElementById("ordered_id");
let WishListContant = document.getElementById("WishListContant_id");
function showProfielOverViweSection(e) {
  e.preventDefault();
  porfielOverview.classList.add("d-block");
  porfielOverview.classList.remove("d-none");
  ordered.classList.remove("d-block");
  ordered.classList.add("d-none");
  WishListContant.classList.remove("d-block");
  WishListContant.classList.add("d-none");
}
function showOrderdSection(e) {
  e.preventDefault();
  porfielOverview.classList.add("d-none");
  porfielOverview.classList.remove("d-block");
  ordered.classList.remove("d-none");
  ordered.classList.add("d-block");
  WishListContant.classList.remove("d-block");
  WishListContant.classList.add("d-none");
}
function showWishListSection(e) {
  e.preventDefault();
  porfielOverview.classList.add("d-none");
  porfielOverview.classList.remove("d-block");
  ordered.classList.remove("d-block");
  ordered.classList.add("d-none");
  WishListContant.classList.remove("d-none");
  WishListContant.classList.add("d-block");
}
function showEditUserSection(e) {
  e.preventDefault();
  porfielOverview.classList.add("d-none");
  porfielOverview.classList.remove("d-block");
  ordered.classList.remove("d-block");
  ordered.classList.add("d-none");
  WishListContant.classList.remove("d-block");
  WishListContant.classList.add("d-none");
}

overView.addEventListener("click", showProfielOverViweSection);
myMrders.addEventListener("click", showOrderdSection);
wishList.addEventListener("click", showWishListSection);

overSideBar.addEventListener("click", showProfielOverViweSection);
orderSideBar.addEventListener("click", showOrderdSection);
wishListSideBar.addEventListener("click", showWishListSection);


