

//////////////
//  
//    Auth 
//
/////////////
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
