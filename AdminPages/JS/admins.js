import { getAllDocuments, getDocById } from "../../js/main.js";
import {
  registerUser,
  createUserProfile,
  getCookie,
  isUserLoggedIn,
  getCurrentUserId,
  getUserProfile,
} from "../../js/auth.js";

let createNewAdmin = document.getElementById("createNewAdmin_id");
let mainContentSec = document.getElementById("mainContentSec_id");

//--------------------------------------------------------------------------------------

let fullName = document.getElementById("fullNewAdminNameInput_id");
let email = document.getElementById("emailNewAdminInput_id");
let phone = document.getElementById("phoneNewAdminInput_id");
let password = document.getElementById("newAdPassInput_id");
let repeatPassword = document.getElementById("reNewPassInput_id");
let city = document.getElementById("cityNewAdminInput_id");
let cekBoxPass = document.getElementById("showadPasswordCheck_id");
let cekBoxRePass = document.getElementById("showReNewPasswordCheck_id");
let adForm = document.getElementById("adminRegitForm");

//-----------------------------------------------------------------------------

window.onload = () => {
  let addAdmin = document.getElementById("addNewAdmin_id");
  let cancelBtn = document.getElementById("CancelBtn_id");

  if (addAdmin && cancelBtn) {
    addAdmin.addEventListener("click", () => createNewAdminForm());
    cancelBtn.addEventListener("click", () => cancelCreateNewAdminForm());
  }
};

function createNewAdminForm() {
  location.assign("../../AdminPages/addNewAdmin.html");
}

function cancelCreateNewAdminForm() {
  history.back();
}
//---------------------------------------------------------

let adminCache = new Map();

async function getAllAdmins() {
  const admins = await getAllDocuments("User");

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
      adminName.textContent = element.Username;
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

const viewAdmins = new Map();
// Create table row with proper error handling
async function createAdminRow() {
  const admins = await getAllDocuments("User");
  let body = document.getElementById("adminsTable");

  admins.forEach((element) => {
    viewAdmins.set(element.id, element);
    if (element.isAdmin === true) {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${element.id}</td>
        <td>${element.Username}</td>
        <td>${element.email}</td>
        <td>${element.phone}</td>
       <td>${element.address?.[1] || "N/A"}</td>
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

adForm.addEventListener("submit", async (e) => {
  if (!isNaN(fullName.value)) {
    showAlert("Please Enter Valid Name");
    e.preventDefault();
    return;
  }

  let emailRegEx = /^[a-zA-Z][a-zA-Z0-9._-]*@admin\.com$/i;
  if (email.value.trim() === "") {
    showAlert("Please Enter Valid Email like (abcd@admin.com)");
    e.preventDefault();
    return;
  }

  if (!emailRegEx.test(email.value)) {
    showAlert("Please Enter Valid Email like (abcd@admin.com)");
    e.preventDefault();
    return;
  }

  if (password.value.length < 6) {
    showAlert("Please Enter Valid Password at least 6 characters");
    e.preventDefault();
    return;
  }

  if (password.value !== repeatPassword.value) {
    showAlert("Please Enter Valid Password");
    e.preventDefault();
    return;
  }

  password.type = cekBoxPass.checked ? "text" : "password";
  repeatPassword.type = cekBoxRePass.checked ? "text" : "password";

  let phoneRegEx = /^[01]+[0||1||2||5]+[0-9]{9}$/i;
  if (phone.value.trim() === "") {
    showAlert("Please Enter Valid Phone Number");
    e.preventDefault();
    return;
  }

  if (!phoneRegEx.test(phone.value)) {
    showAlert("Please Enter Valid Phone Number");
    e.preventDefault();
    return;
  }

  const adminDataValue = {
    Username: fullName.value,
    email: email.value,
    phone: phone.value,
    isAdmin: true,
    address: ["EG", city.value],
  };

  try {
    const adminID = await registerUser(adminDataValue.email, password.value);
    if (adminID) {
      await createUserProfile(adminID, adminDataValue);
      alert("Admin Created Successfully");
    } else {
      alert("Registration Failed");
    }
  } catch (error) {
    alert("Something Went Wrong");
  }
});

function showAlert(
  message,
  containerId = "createNewAdmin_id",
  duration = 2000
) {
  let alert = document.createElement("div");
  alert.classList.add("alert", "alert-warning");
  alert.setAttribute("role", "alert");
  alert.innerText = message;
  document.getElementById(containerId).prepend(alert);
  setTimeout(() => {
    alert.remove();
  }, duration);
}

document.addEventListener("DOMContentLoaded", async function () {
  const userId = getCookie("userId");
  const userName = getCookie("userName");
  const userPhone = getCookie("userPhone");
  const userEmail = getCookie("userEmail");
  const userAddress = getCookie("userAddress");
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
      console.log("User ID:", userId);

    if (userId && userName) {
      let name = document.getElementById("name");
      let nameee = document.getElementById("nameee");
      let email = document.getElementById("email");
      let mobile = document.getElementById("mobile");
      let location = document.getElementById("location");

      name.textContent = userName;
      nameee.textContent = userName;
      email.textContent = userEmail;
      mobile.textContent = userPhone;
      location.textContent = userAddress;
    } else {
      console.log("No user profile found or missing Username.");
    }
  }
});
