// import auth functions from auth.js
import {
  isUserLoggedIn,
  getCurrentUserId,
  getUserProfile,
  logoutUser,
  getCookie,
  deleteCookie,
} from "../../js/auth.js";

///////////////////////
//
//       Authentication
//
/////////////////////

document.addEventListener("DOMContentLoaded", async function () {
  const userId = getCookie("userId");
  const userName = getCookie("userName");
  const isAdmin = getCookie("isAdmin");
  if (isAdmin === "false") {
    window.location.href = "../../index.html";
  }
  if (userId) {
    // if user is logged in, set isLoggedIn to true
    var isLoggedIn = true;
  } else {
    // if user is not logged in, set isLoggedIn to false
    isLoggedIn = false;
  }

  if (!isLoggedIn) {
    console.log("Not Logged In");
    window.location.href = "../../CustomersPages/signin.html";
  } else {
    //  console.log("User ID:", userId);

    if (userId) {
      if (userName) {
        const userNameElement = document.getElementById("user-name");
        userNameElement.textContent = userName;
        //console.log("Username:", userName);
      } else {
        console.log("No user profile found or missing Username.");
      }
    } else {
      console.log("Failed to get user ID.");
    }
  }
});

/////////////// log out
let logoutBtns; // logoutBtns is a variable that contains all logout buttons in the page.
logoutBtns = document.querySelectorAll(".logoutBtn");
logoutBtns.forEach((logoutBtn) => {
    logoutBtn.addEventListener("click", async function () {
        await logoutUser();
        deleteCookie("userId");
        deleteCookie("userName");
        deleteCookie("isAdmin");
        deleteCookie("userEmail");
        deleteCookie("userPhone");
        deleteCookie("userAddress");
        window.location.href = "../../CustomersPages/signin.html";

});

/**
 * Adding addEventListener click for {profile Logo Div,bars Div, bars Left Side Div => (default d-none) }
 *
 */
let profileLogoDiv = document.getElementById("profileDiv_id"); // This Variable is profileDiv_id that go to Profile Page

let barsDiv = document.getElementById("barsDiv_id"); // This Variable is barsDiv_id that shows in Tablet and Mobile

let sideDashboard = document.getElementById("sideDashboard_id"); // This Variable is sideDashboard_id that shows in Tablet and Mobile

let notifiDropDownDiv = document.getElementById("notifiDropDownDiv_id"); // This Variable is notifiDropDownDiv Section that DropDown List for new notify

let notificationsDiv = document.getElementById("notificationsDiv_id"); // This Variable is notificationsDiv Icon

let searchDiv = document.getElementById("searchDiv_id"); // This Variable is searchDiv Icon

let search = document.getElementById("search_id"); // This Variable is search Section that search input for search any thing in admin pages

let addCategory = document.getElementById("addCategory_id"); // This Variable is search Section that search input for search any thing in admin pages

// ----------------------------------------------------- Buttons Variables ---------------------------------------------------------------------------------------

let addNewCategoryBtn = document.getElementById("addNewCategoryBtn_id"); // This Variable is search Section that search input for search any thing in admin pages

let CancelBtn = document.getElementById("CancelBtn_id"); // This Variable is search Section that search input for search any thing in admin pages

// -----------------------------------------------------------------------------------------------------------------------------------------------------------------

/**
 * - Adding addEventListener click for {profile Logo Div}
 * =========================================================
 * -- To assign new location and go to Setting Page
 */
profileLogoDiv.addEventListener("click", function () {
  window.location.assign("http://127.0.0.1:5500/AdminPages/AdminProfile.html"); // To go to Setting Page
});

/**
 * - Adding addEventListener click for {bars Div}
 * =========================================================
 * -- To Show Side Dashboard in Tablet and Mobile Phone
 */

document.addEventListener("click", (e) => {
  if (barsDiv.contains(e.target)) {
    appear(sideDashboard);
  } else {
    disappear(sideDashboard);
  }
});

function appear(sideBar) {
  sideBar.style.left = "0px";
  document.getElementById("main_id").classList.add("opacity-50");
}

function disappear(sideBar) {
  sideBar.style.left = "-75%";
  document.getElementById("main_id").classList.remove("opacity-50");
}
/**
 * - Adding addEventListener click for {notification Icon}
 * =========================================================
 * -- To Show new Notifications
 */

document.addEventListener("click", function (e) {
  if (notificationsDiv.contains(e.target)) {
    notifiDropDownDiv.classList.remove("d-none");

    notifiDropDownDiv.classList.add("d-block");
  } else {
    notifiDropDownDiv.classList.remove("d-block");
    notifiDropDownDiv.classList.add("d-none");
  }
});

/**
 * - Adding addEventListener click for {Search Icon}
 * =========================================================
 * -- To Show Search input
 */

searchDiv.addEventListener("click", function () {
  if (search.classList.contains("d-none")) {
    search.classList.remove("d-none");

    search.classList.add("d-block");
  } else {
    search.classList.remove("d-block");
    search.classList.add("d-none");
  }
});

/**
 * - Adding addEventListener click for {Add New Category}
 * =========================================================
 * -- To Show Add new Category Section
 */
if (addNewCategoryBtn) {
  addNewCategoryBtn.addEventListener("click", function () {
    if (addCategory.classList.contains("d-none")) {
      addCategory.classList.remove("d-none");

      document.getElementById("viewCategory_id").classList.remove("d-sm-flex");

      document.getElementById("viewCategory_id").classList.add("d-none"); // To Hide category content

      addCategory.classList.add("d-block");
    }
  });
}
if (CancelBtn) {
  CancelBtn.addEventListener("click", function () {
    if (addCategory.classList.contains("d-block")) {
      addCategory.classList.remove("d-block");

      document.getElementById("viewCategory_id").classList.add("d-sm-flex");

      document.getElementById("viewCategory_id").classList.remove("d-none"); // To show category content

      addCategory.classList.add("d-none");
    }
  });
}
function redirectToAddProduct() {
  window.location.href = "admin-add-product.html";
}
function redirectToDashboard() {
  window.location.href = "admin-home.html";
}