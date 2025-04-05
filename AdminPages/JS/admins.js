import { getAllDocuments, addDocument } from "../../js/main.js";

let createNewAdmin = document.getElementById("createNewAdmin_id");

window.onload = () => {
    let addAdmin = document.getElementById("addNewAdmin_id");
    let CancelBtn = document.getElementById("CancelBtn_id");
    if (addAdmin && CancelBtn) {

        addAdmin.addEventListener("click", () => {

            if (createNewAdmin.classList.contains("d-none")) {

                createNewAdmin.classList.remove("d-none");

                document.getElementById("mainContentSec_id").classList.remove("d-md-flex"); // To Hide category content
                document.getElementById("mainContentSec_id").classList.add("d-none"); // To Hide category content


                createNewAdmin.classList.add("d-block");
            }
        });

        CancelBtn.addEventListener("click", () => {

            if (createNewAdmin.classList.contains("d-block")) {

                createNewAdmin.classList.add("d-none");

                document.getElementById("mainContentSec_id").classList.add("d-md-flex"); // To Hide category content
                document.getElementById("mainContentSec_id").classList.remove("d-none"); // To Hide category content

                createNewAdmin.classList.remove("d-block");
            }
        });
    }
};


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
            container.appendChild(arrow);

            viewAddminsCon.appendChild(container);
            let hr = document.createElement("hr");
            viewAddminsCon.appendChild(hr);

        }
        console.log(viewAddminsCon);
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