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
let editUser = document.getElementById("editUser_id");
let editUserBtn = document.getElementById("editUserBtn_id");
let editAddress = document.getElementById("editAddress_id");
function showProfielOverViweSection(e) {
  e.preventDefault();
  porfielOverview.classList.add("d-block");
  porfielOverview.classList.remove("d-none");
  ordered.classList.remove("d-block");
  ordered.classList.add("d-none");
  WishListContant.classList.remove("d-block");
  WishListContant.classList.add("d-none");
  editUser.classList.remove("d-block");
  editUser.classList.add("d-none");
}
function showOrderdSection(e) {
  e.preventDefault();
  porfielOverview.classList.add("d-none");
  porfielOverview.classList.remove("d-block");
  ordered.classList.remove("d-none");
  ordered.classList.add("d-block");
  WishListContant.classList.remove("d-block");
  WishListContant.classList.add("d-none");
  editUser.classList.remove("d-block");
  editUser.classList.add("d-none");
}
function showWishListSection(e) {
  e.preventDefault();
  porfielOverview.classList.add("d-none");
  porfielOverview.classList.remove("d-block");
  ordered.classList.remove("d-block");
  ordered.classList.add("d-none");
  WishListContant.classList.remove("d-none");
  WishListContant.classList.add("d-block");
  editUser.classList.remove("d-block");
  editUser.classList.add("d-none");
}
function showEditUserSection(e) {
  porfielOverview.classList.add("d-none");
  porfielOverview.classList.remove("d-block");
  ordered.classList.remove("d-block");
  ordered.classList.add("d-none");
  WishListContant.classList.remove("d-block");
  WishListContant.classList.add("d-none");
  editUser.classList.remove("d-none");
  editUser.classList.add("d-block");
}

overView.addEventListener("click", showProfielOverViweSection);
myMrders.addEventListener("click", showOrderdSection);
wishList.addEventListener("click", showWishListSection);
editUserBtn.addEventListener("click", showEditUserSection);
editAddress.addEventListener("click", showEditUserSection);
overSideBar.addEventListener("click", showProfielOverViweSection);
orderSideBar.addEventListener("click", showOrderdSection);
wishListSideBar.addEventListener("click", showWishListSection);
