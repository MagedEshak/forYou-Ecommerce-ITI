import { getAllDocuments, getDocById } from "../../js/main.js";
import {
  registerUser,
  createUserProfile,
  getCookie,
  logoutUser,
} from "../../js/auth.js";

let name = document.getElementById("name");
let nameee = document.getElementById("nameee");
let emaiil = document.getElementById("email");
let mobile = document.getElementById("mobile");
let location = document.getElementById("location");

document.addEventListener("DOMContentLoaded", async function () {
  const userId = getCookie("userId");
  const userName = getCookie("userName");
  const userPhone = getCookie("phone");
  const userEmail = getCookie("email");
  const userAddress = getCookie("address");

  if (userId && userName && userEmail && userPhone && userAddress) {
    name.textContent = userName;
    nameee.textContent = userName;
    emaiil.textContent = userEmail;
    mobile.textContent = userPhone;
    location.textContent = userAddress;
  } else {
    console.log("No user profile found or missing Username.");
  }
});

window.onload = () => {
  let addAdmin = document.getElementById("addNewAdmin_id");
  if (addAdmin) {
    addAdmin.addEventListener("click", () => createNewAdminForm());
  }
};

function createNewAdminForm() {
  window.location.assign("../../AdminPages/addNewAdmin.html");
}

let cancelBtn = document.getElementById("cancelBtn_id");

if (cancelBtn) {
  cancelBtn.addEventListener("click", () => cancelCreateNewAdminForm());
}

function cancelCreateNewAdminForm() {
  window.history.back();
}

//---------------------------------------------------------

let adminCache = new Map();
// View All Admins in Setting Page

async function getAllAdmins() {
  const admins = await getAllDocuments("Users");

  let viewAddminsCon = document.getElementById("viewAddminsCon_id");

  admins.forEach((element) => {
    adminCache.set(element.id, element.email);
    if (element.email != "" && element.isAdmin === true) {
      let container = document.createElement("div");
      container.classList.add(
        "d-flex",
        "justify-content-between",
        "gap-5",
        "position-relative"
      );

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
      adminName.textContent = element.userName;
      viewAdminsDiv.appendChild(adminName);

      let adminStat = document.createElement("span");
      adminStat.classList.add("text-secondary");
      adminStat.textContent = element.email;
      viewAdminsDiv.appendChild(adminStat);

      divFlex.appendChild(viewAdminsDiv);

      container.appendChild(divFlex);

      let arrow = document.createElement("span");
      arrow.classList.add(
        "position-absolute",
        "bottom-50",
        "end-0",
        "Arrow-color",
        "cursor-pointer"
      );
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

// View All Admins in Table
const viewAdmins = new Map();
// Create table row with proper error handling
async function createAdminRow() {
  const admins = await getAllDocuments("Users");
  let body = document.getElementById("adminsTable");

  admins.forEach((element) => {
    viewAdmins.set(element.id, element);
    if (element.isAdmin === true) {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${element.id}</td>
        <td>${element.userName}</td>
        <td>${element.email}</td>
        <td>${element.phone}</td>
        <td>${element.address.city}</td>
        `;
      body.appendChild(row);
      return row;
    }
  });
}
createAdminRow();

// --------------------------------------------------------

//check form
// // Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
  "use strict";

  //     // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll(".needs-validation");

  //Loop over them and prevent submission
  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add("was-validated");
      },
      false
    );
  });
})();
