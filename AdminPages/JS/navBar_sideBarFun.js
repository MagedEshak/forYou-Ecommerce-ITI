/**
 * Adding addEventListener click for {profile Logo Div,bars Div, bars Left Side Div => (default d-none) }
 * 
 */
let profileLogoDiv = document.getElementById("profileDiv_id"); // This Variable is profileDiv_id that go to Profile Page

let barsDiv = document.getElementById("barsDiv_id"); // This Variable is barsDiv_id that shows in Tablet and Mobile

let sideDashboard = document.getElementById("sideDashboard_id"); // This Variable is sideDashboard_id that shows in Tablet and Mobile

let barsLeftSideDiv = document.getElementById("barsLeftSideDiv_id"); // This Variable is barsLeftSideDiv_id that shows in side Dashboard in Mobile mode

let mainContentSec = document.getElementById("mainContentSec_id"); // This Variable is mainContentSec_id Section that contains all sections

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

barsDiv.addEventListener("click", function () {
    if (sideDashboard.classList.contains("d-none")) {
        
        sideDashboard.classList.remove("col-2", "d-none");

        document.getElementById("main_id").classList.add("d-none", "d-md-block"); // To Hide main Tag 

        mainContentSec.classList.add("flex-md-column");
        

        barsLeftSideDiv.classList.add("d-block","d-md-none");

        sideDashboard.classList.add("col-9", "col-md-4", "d-block", "me-5");
        
    } else {
        sideDashboard.classList.remove("col-sm-9", "d-block", "me-5");

        barsLeftSideDiv.classList.remove("d-block");

        document.getElementById("main_id").classList.remove("d-none"); // To show main Tag 

        mainContentSec.classList.remove("flex-md-column");

        sideDashboard.classList.add("col-2", "d-none");

        barsLeftSideDiv.classList.remove("d-block","d-md-none");
    }
});

/**
 * - Adding addEventListener click for {bars Left SideDiv}
 * =========================================================
 * -- To Hide Side Dashboard in Mobile Phone
 */

barsLeftSideDiv.addEventListener("click", function () {
    if (barsLeftSideDiv.classList.contains("d-block")) {

        sideDashboard.classList.remove("col-sm-9", "d-block", "me-5");

        barsLeftSideDiv.classList.remove("d-block");

        document.getElementById("main_id").classList.remove("d-none");

        sideDashboard.classList.add("col-2", "d-none");
    }
});



/**
 * - Adding addEventListener click for {notification Icon}
 * =========================================================
 * -- To Show new Notifications
 */

notificationsDiv.addEventListener("click", function () {
    if (notifiDropDownDiv.classList.contains("d-none")) {
        
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

addNewCategoryBtn.addEventListener("click", function () {
    if (addCategory.classList.contains("d-none")) {
        
        addCategory.classList.remove("d-none");

        document.getElementById("viewCategory_id").classList.remove("d-sm-flex");
        
        document.getElementById("viewCategory_id").classList.add("d-none"); // To Hide category content

        addCategory.classList.add("d-block");
        
    } 
});

CancelBtn.addEventListener("click", function () {
    if (addCategory.classList.contains("d-block")) {
        
        addCategory.classList.remove("d-block");

      document.getElementById("viewCategory_id").classList.add("d-sm-flex");
        
        document.getElementById("viewCategory_id").classList.remove("d-none"); // To show category content

        addCategory.classList.add("d-none");
        
    } 
});