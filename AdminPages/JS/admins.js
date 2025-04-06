import { getAllDocuments, addDocument } from "../../js/main.js";
import { registerUser,createUserProfile} from "../../js/auth.js";

let createNewAdmin = document.getElementById("createNewAdmin_id");
let mainContentSec = document.getElementById("mainContentSec_id");

window.onload = () => {
    let addAdmin = document.getElementById("addNewAdmin_id");
    let cancelBtn = document.getElementById("CancelBtn_id");
    
    if (addAdmin && cancelBtn) {
        addAdmin.addEventListener("click", ()=>createNewAdminForm(mainContentSec));
        cancelBtn.addEventListener("click", ()=>cancelCreateNewAdminForm(mainContentSec));
    }
};



function createNewAdminForm(mainDivInHTMlDoc) {
            if (createNewAdmin.classList.contains("d-none")) {
                createNewAdmin.classList.remove("d-none");
                mainDivInHTMlDoc.classList.remove("d-md-flex"); // To Hide category content
                mainDivInHTMlDoc.classList.add("d-none"); // To Hide category content  
                createNewAdmin.classList.add("d-block");
            }
}

function cancelCreateNewAdminForm(mainDivInHTMlDoc) {
            if (createNewAdmin.classList.contains("d-block")) {
                createNewAdmin.classList.add("d-none");
                mainDivInHTMlDoc.classList.add("d-md-flex"); // To Hide category content
                mainDivInHTMlDoc.classList.remove("d-none"); // To Hide category content
                createNewAdmin.classList.remove("d-block");
            }
}

// const adminsData =
// {
//     Username: "Mina Maged",
//     email: "mina@gmail.com",
//     password: "123456",
//     phone: "01266686544",
//     isAdmin: false,
//     address: ["EG", "Cairo"],
//     wishlist: [],
//     shoppingCart: [{
//         product_id: 1,
//         cat_id: 1,
//         quantaty: 0,
//         isPending: 0
//     }],
//     lastOrders: [],
//     retunOdrs: false
// };

//addDocument("User",adminsData);

let adminCache = new Map();

async function getAllAdmins() {
    const admins = await getAllDocuments("User");

    let viewAddminsCon = document.getElementById("viewAddminsCon_id");

    admins.forEach(element => {
        adminCache.set(element.id, element.email);
        if (element.email != "" && element.isAdmin === true) {
            let container = document.createElement("div");
            container.classList.add("d-flex", "justify-content-between", "gap-5", "position-relative");

            let divFlex = document.createElement("div");
            divFlex.classList.add("d-flex", "gap-3");


            let imgDiv = document.createElement("div");
            imgDiv.classList.add("position-relative");


            let img = document.createElement("img");
            img.classList.add("profile-img");
            img.src = "../ui-ux/icons/user.png";
            imgDiv.appendChild(img);
            divFlex.appendChild(imgDiv);

            let viewAdminsDiv = document.createElement("div");
            viewAdminsDiv.classList.add("d-flex", "flex-column", "mt-3");

            let adminName = document.createElement("span");
            adminName.classList.add("fw-bolder");
            adminName.textContent = element.Username;
            viewAdminsDiv.appendChild(adminName);

            let adminStat = document.createElement("span");
            adminStat.classList.add("text-secondary");
            adminStat.textContent = element.email;
            viewAdminsDiv.appendChild(adminStat);

            divFlex.appendChild(viewAdminsDiv);

            container.appendChild(divFlex);

            let arrow = document.createElement("span");
            arrow.classList.add("position-absolute", "bottom-50", "end-0", "Arrow-color", "cursor-pointer");
            let i = document.createElement("i");
            i.classList.add("bi", "bi-arrow-right");
            arrow.appendChild(i);
            container.appendChild(arrow);

            viewAddminsCon.appendChild(container);
            let hr = document.createElement("hr");
            viewAddminsCon.appendChild(hr);

        }
    });
}
getAllAdmins();


const viewAdmins = new Map();
// Create table row with proper error handling
async function createAdminRow() {
    const admins = await getAllDocuments("User");
    let body = document.getElementById("adminsTable");

    admins.forEach(element => {
        viewAdmins.set(admins.id);
        if (element.isAdmin === true) {

            const row = document.createElement("tr");
            row.innerHTML = `
        <td>${element.id}</td>
        <td>${element.Username}</td>
        <td>${element.email}</td>
        <td>${element.phone}</td>
        <td>${element.address[1]}</td>
        `;
            body.appendChild(row);
            return row;
        }
    });
}
createAdminRow();


//check form
// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
    'use strict'

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')

    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault()
                event.stopPropagation()
            }

            form.classList.add('was-validated')
        }, false)
    })
})();

// Create New Admins and Users

// const adminsData =
// {
//     Username: "Maged Eshak",
//     email: "magede@gmail.com",
//     password: "123456",
//     phone: "01266686544",
//     isAdmin: true,
//     address: ["EG", "Assiut"],
//     wishlist: [],
//     shoppingCart: [{
//         product_id: 0,
//         cat_id: 0,
//         quantaty: 0,
//         isPending: 0
//     }],
//     lastOrders: [],
//     retunOdrs: false
// };

// console.log(registerUser(adminsData.email, adminsData.password));

// const id = " MYJQYEX0gYOhRTh5GuAaWXGIx6L2";

// console.log(createUserProfile(id, adminsData));

// //-----------------------------------------------------------------------------
// const adminsData2 =
// {
//     Username: "Wesam Naser",
//     email: "wesamN@gmail.com",
//     password: "123456",
//     phone: "01566686544",
//     isAdmin: true,
//     address: ["EG", "Minya"],
//     wishlist: [],
//     shoppingCart: [{
//         product_id: 0,
//         cat_id: 0,
//         quantaty: 0,
//         isPending: 0
//     }],
//     lastOrders: [],
//     retunOdrs: false
// };

// console.log(registerUser(adminsData2.email, adminsData2.password));

// const id2 = "VMPgngpfenWCUTwU30Wg0XQXZvu2";

// console.log(createUserProfile(id2, adminsData2));

// //-----------------------------------------------------------------------------
// const adminsData3 =
// {
//     Username: "Sayed Ali",
//     email: "sayedali@gmail.com",
//     password: "123456",
//     phone: "01066686544",
//     isAdmin: true,
//     address: ["EG", "Minya"],
//     wishlist: [],
//     shoppingCart: [{
//         product_id: 0,
//         cat_id: 0,
//         quantaty: 0,
//         isPending: 0
//     }],
//     lastOrders: [],
//     retunOdrs: false
// };

// console.log(registerUser(adminsData3.email, adminsData3.password));

// const id3 = "tkGfVdLV3qYWwKlzJgL1NReVLie2";

// console.log(createUserProfile(id3, adminsData3));

// //-----------------------------------------------------------------------------
// const adminsData4 =
// {
//     Username: "Samuel",
//     email: "sam@gmail.com",
//     password: "123456",
//     phone: "01566686544",
//     isAdmin: true,
//     address: ["EG", "Minya"],
//     wishlist: [],
//     shoppingCart: [{
//         product_id: 0,
//         cat_id: 0,
//         quantaty: 0,
//         isPending: 0
//     }],
//     lastOrders: [],
//     retunOdrs: false
// };

// console.log(registerUser(adminsData4.email, adminsData4.password));

// const id4 = "nuGFENkbLbh74O3Mt3JbCNokOzu1";

// console.log(createUserProfile(id4, adminsData4));

// //-----------------------------------------------------------------------------
// const adminsData5 =
// {
//     Username: "Ali Gamal",
//     email: "aliga@gmail.com",
//     password: "123456",
//     phone: "01166686544",
//     isAdmin: true,
//     address: ["EG", "Minya"],
//     wishlist: [],
//     shoppingCart: [{
//         product_id: 0,
//         cat_id: 0,
//         quantaty: 0,
//         isPending: 0
//     }],
//     lastOrders: [],
//     retunOdrs: false
// };

// console.log(registerUser(adminsData5.email, adminsData5.password));

// const id5 = "QBJIxvvm2sZriVTmBqCTf8SE9Eg1";

// console.log(createUserProfile(id5, adminsData5));


// //-----------------------------------------------------------------------------
// const userData1 =
// {
//     Username: "Mohamed Ashraf",
//     email: "mohammedA@gmail.com",
//     password: "123456",
//     phone: "01166686544",
//     isAdmin: false,
//     address: ["EG", "Minya"],
//     wishlist: [],
//     shoppingCart: [{
//         product_id: 2,
//         cat_id: 1,
//         quantaty: 1,
//         isPending: 1
//     }],
//     lastOrders: [],
//     retunOdrs: false
// };

// console.log(registerUser(userData1.email, userData1.password));

// const usId1 = "rvo1JgwzEJc06oM31b6hZcDPSZ72";

// console.log(createUserProfile(usId1, userData1));


// //-----------------------------------------------------------------------------
// const userData2 =
// {
//     Username: "Mina Maged",
//     email: "minamaged@gmail.com",
//     password: "123456",
//     phone: "01252345789",
//     isAdmin: false,
//     address: ["EG", "Minya"],
//     wishlist: [],
//     shoppingCart: [{
//         product_id: 2,
//         cat_id: 2,
//         quantaty: 2,
//         isPending: 0
//     }],
//     lastOrders: [],
//     retunOdrs: false
// };

// console.log(registerUser(userData2.email, userData2.password));

// const usId2 = "bxqEejnR49NEKZVmYkfmDV5zEKD3";

// console.log(createUserProfile(usId2, userData2));