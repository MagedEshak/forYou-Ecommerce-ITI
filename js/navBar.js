

//////////////
//  
//    Auth 
//
/////////////
import {getDocById ,getDocumentByField,getAllDocuments} from "../../js/main.js";
import { getCookie, deleteCookie, logoutUser } from "./auth.js";

document.addEventListener('DOMContentLoaded', function () {
    const userId = getCookie("userId");
    const userName = getCookie("userName");

    const isLoggedIn = !!userId;

    if (!isLoggedIn) {
        console.log("Not Logged In");
    } else {
        console.log("User ID:", userId);
        console.log("Username:", userName);

        // Update UI
        const userNameElement = document.getElementById("userName_id");
        const signBtn = document.getElementById("sign_id");

        signBtn.addEventListener("click", async function () {
            await logoutUser();
            deleteCookie("userId");
            deleteCookie("userName");
            deleteCookie("isAdmin");
            deleteCookie("userEmail");
            deleteCookie("userPhone");
            deleteCookie("userAddress");
            window.location.href = "./CustomersPages/signin.html";
        });

        if (userNameElement) {
            userNameElement.textContent = userName;
        }

        if (signBtn) {
            signBtn.textContent = "Logout"; // change sign in to logout
        }
    }
});






async function initialzeNavBar(){
    
    controlSideNavBer();
    if(window.innerWidth <= 992){
        await displayCategoriesinSideNavBar();
    }
    else{
        await displayCategoriesinNavBar();
    }
}

initialzeNavBar();





/* Dynamic creating of nav bar */
async function displayCategoriesinNavBar() {
    let categoriesTemp = await getAllDocuments("Categories");

    let cateLinksContainer = document.getElementById('navCategoriesLinks_id');

    categoriesTemp.forEach( (category , index) => {
        let catLink = document.createElement('a');
        catLink.className = "col-auto px-4";
        // put the link to go to category you need
        if(window.location.href.split('/')[3] == 'index.html')
            catLink.href = `CustomersPages/shopByCategory.html?cat_id=${category.id}`;
        else 
            catLink.href = `shopByCategory.html?cat_id=${category.id}`;
        
        catLink.innerText = category.cat_name;

        cateLinksContainer.appendChild(catLink);
    })
}
/* just called when the width of screen is small */
/* it displays just links of my cats in the nav bar */
async function displayCategoriesinSideNavBar() {
    let categoriesTemp = await getAllDocuments("Categories");
    
    let cateLinksContainer = document.getElementById('sideNavCategoriesLinks_id');
    let whatsappLink = document.getElementById('whatsappLink_id');

    categoriesTemp.forEach( (category , index) => {
        
        let catLinkDiv = document.createElement('div');
        catLinkDiv.className = "w-100";

        let catLink = document.createElement('a');
        catLink.className = "w-100";
        // put the link to go to category you need

        if(window.location.href.split('/')[3] == 'index.html')
            catLink.href = `CustomersPages/shopByCategory.html?cat_id=${category.id}`;
        else 
            catLink.href = `shopByCategory.html?cat_id=${category.id}`;

        catLink.innerText = category.cat_name;
        
        catLinkDiv.appendChild(catLink)
        cateLinksContainer.insertBefore(catLinkDiv , whatsappLink); 
    })

    
}

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