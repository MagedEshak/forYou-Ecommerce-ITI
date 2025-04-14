

//////////////
//  
//    Auth 
//
/////////////
import { getDocById, getDocumentByField, getAllDocuments } from "../../js/main.js";
import { getCookie, deleteAllCookies, logoutUser, setCookie, deleteCookie } from "./auth.js";

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
        const userNameElements = document.getElementsByClassName("userName_id");
        const logBtns = document.getElementsByClassName("logBtn");
        const regBtns = document.getElementsByClassName("regBtn");

        for (const userNameElement of userNameElements) {
            userNameElement.innerText = userName;
            userNameElement.style.display = "block";
            userNameElement.style.visibility = "visible";
            userNameElement.addEventListener('click', function () {
                // Always use absolute path from root
                const targetPath = '/CustomersPages/profile.html';

                // Check if we're already on the profile page
                if (window.location.pathname.endsWith('profile.html')) {
                    window.location.reload();
                } else {
                    window.location.href = targetPath;
                }
            });
        }
        for (const logBtn of logBtns) {
            logBtn.innerText = "Log Out";    // reload the page after log out to remove cookies
            logBtn.addEventListener('click', async function () {
                await logoutUser();
                deleteAllCookies();
                deleteCookie("cart")
                localStorage.removeItem("wishlist")
                if (window.location.href.split('/')[3] == 'index.html')
                    catLink.href = `./CustomersPages/signin.html`;
                else
                    catLink.href = "signin.html";
            });
            logBtn.style.display = "block";
            logBtn.style.visibility = "visible";
        }
        for (const regBtn of regBtns) {
            regBtn.style.display = "none";
            regBtn.style.visibility = "hidden";
        }

    }
});






async function initialzeNavBar() {

    controlSideNavBer();
    if (window.innerWidth <= 992) {
        await displayCategoriesinSideNavBar();
    }
    else {
        await displayCategoriesinNavBar();
    }
}

initialzeNavBar();





/* Dynamic creating of nav bar */
async function displayCategoriesinNavBar() {
    let categoriesTemp = await getAllDocuments("Categories");

    let cateLinksContainer = document.getElementById('navCategoriesLinks_id');

    categoriesTemp.forEach((category, index) => {
        let catLink = document.createElement('a');
        catLink.className = "col-auto px-4";
        // put the link to go to category you need
        if (window.location.href.split('/')[3] == 'index.html')
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

    categoriesTemp.forEach((category, index) => {

        let catLinkDiv = document.createElement('div');
        catLinkDiv.className = "w-100";

        let catLink = document.createElement('a');
        catLink.className = "w-100";
        // put the link to go to category you need
        if (window.location.href.split('/')[3] == 'index.html')
            catLink.href = `./CustomersPages/shopByCategory.html?cat_id=${category.id}`;
        else
            catLink.href = `shopByCategory.html?cat_id=${category.id}`;

        catLink.innerText = category.cat_name;

        catLinkDiv.appendChild(catLink)
        cateLinksContainer.insertBefore(catLinkDiv, whatsappLink);
    })


}

function controlSideNavBer() {
    /* when menu bar btn clicked the side bar must appear from left side */
    let menuBarBtn = document.getElementById('menuBarBtn_id');
    let sideNavBar = document.getElementById('sideNavBar_id');

    // this event handels appearance of side bar 
    // when you click on the menu bar btn , we display the side nav
    // then when you click on any part of the document , we remove the side nav
    document.addEventListener('click', (e) => {
        // in case menu bar btn clicked , display the side bar , and 
        if (menuBarBtn.contains(e.target))
            displaySideNavBar(sideNavBar);
        else
            disappearSideNavBar(sideNavBar);
    })
}

/* this function displays my side bar , by positioning it in my screen */
function displaySideNavBar(navBar) {
    navBar.style.left = "0px";
}
/* this function removes my side bar , by positioning it out of my screen */
function disappearSideNavBar(navBar) {
    navBar.style.left = "-75%"; // Hide sidebar off-screen
}
