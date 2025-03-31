/**
 * Adding addEventListener click for {profile Logo Div,bars Div, bars Left Side Div => (default d-none) }
 * 
 */
let profileLogoDiv = document.getElementById("profileDiv_id"); // This Variable is profileDiv_id that go to Profile Page

let barsDiv = document.getElementById("barsDiv_id"); // This Variable is barsDiv_id that shows in Tablet and Mobile

let sideDashboard = document.getElementById("sideDashboard_id"); // This Variable is sideDashboard_id that shows in Tablet and Mobile

let barsLeftSideDiv = document.getElementById("barsLeftSideDiv_id"); // This Variable is barsLeftSideDiv_id that shows in side Dashboard in Mobile mode

let mainContentSec = document.getElementById("mainContentSec_id"); // This Variable is mainContentSec_id Section that contains all sections

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


