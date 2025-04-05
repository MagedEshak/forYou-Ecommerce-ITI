import {getAllDocuments,addDocument } from "../../js/main.js";


let addAdmin = document.getElementById("addNewAdmin_id");



addAdmin.addEventListener("click", () => {
    window.location.assign("../../CustomersPages/signin.html");
});

// const adminsData = {
//     Username: "Maged Eshak",
//      email: "maged@admin.com",
//     password: "123456",
//     phone: "01234586544",
//     isAdmin: true,
//     address:["EG","Assiut"]

// };

// addDocument("User",adminsData);

let adminCache = new Map();

async function getAllAdmins() {
    const admins = await getAllDocuments("User");
    console.log(admins);
      
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
