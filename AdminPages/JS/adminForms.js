import { getAllDocuments, getDocById } from "../../js/main.js";
import {
  getCookie,
  updateUserProfile,
  changePassword,
  deleteCookie,
  setCookie,
  createUserProfile,
  registerUser,
} from "../../js/auth.js";

// Edit Admin Profile
let editProfileForm = document.getElementById("editProfileForm_id");
let editFullName = document.getElementById("eFullNameInput_id");
let editEmail = document.getElementById("eEmailInput_id");
let editPhone = document.getElementById("ePhoneInput_id");
let editCity = document.getElementById("eCityInput_id");

// Edit Admin Password
let changePasswordForm = document.getElementById("changePasswordForm_id");
let currentPassInput = document.getElementById("currentPassInput_id");
let editPassword = document.getElementById("newPassInput_id");
let repeatEditPassword = document.getElementById("repeatPassInput_id");

let cekBoxCPass = document.getElementById("showCurrentPasswordCheck_id");
let cekBoxEPass = document.getElementById("showReNewPasswordCheck_id");
let cekBoxReNPass = document.getElementById("showRepeatPasswordCheck_id");

//--------------------------------------------------------------------------------------
// Create New Admin Profile
let fullName = document.getElementById("fullNewAdminNameInput_id");
let email = document.getElementById("emailNewAdminInput_id");
let phone = document.getElementById("phoneNewAdminInput_id");
let password = document.getElementById("newAdPassInput_id");
let repeatPassword = document.getElementById("reNewPassInput_id");
let city = document.getElementById("cityNewAdminInput_id");
let cekBoxPass = document.getElementById("showadPasswordCheck_id");
let cekBoxRePass = document.getElementById("showReNewPasswordCheck_id");
let createNewAdminForm = document.getElementById("adminRegitForm");

//-----------------------------------------------------------------------------

// Edit Admin Profile Form Validation
document.addEventListener("DOMContentLoaded", async function () {
  const userId = getCookie("userId");
  const userName = getCookie("userName");
  const userPhone = getCookie("userPhone");
  const userEmail = getCookie("userEmail");
  const userAddress = getCookie("userAddress");

  editFullName.placeholder = userName;
  editEmail.placeholder = userEmail;
  editPhone.placeholder = userPhone;
  editCity.placeholder = userAddress.substring(3);

  // Edit Admin Profile Form Validation
  editProfileForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (editFullName.value.trim() !== "" && !validateName(editFullName.value)) {
      showFieldError("fullname", "Please enter a valid name (letters only)");
      e.preventDefault();
      return;
    } else {
      clearFieldError("fullname");
    }

    if (editEmail.value.trim() !== "" && !validateEmail(editEmail.value)) {
      showFieldError("email", "Please Enter Valid Email like (abcd@admin.com)");
      e.preventDefault();
      return;
    } else {
      clearFieldError("email");
    }

    if (editPhone.value.trim() !== "" && !validatePhone(editPhone.value)) {
      showFieldError("phone", "Please Enter Valid Phone Number");
      e.preventDefault();
      return;
    } else {
      clearFieldError("phone");
    }

    if (editCity.value.trim() !== "" && !validateName(editCity.value)) {
      showFieldError("city", "Please enter a valid City (letters only)");
      e.preventDefault();
      return;
    } else {
      clearFieldError("city");
    }

    const adminDataValue = {
      Username:
        editFullName.value.trim() !== "" ? editFullName.value : userName,
      email: editEmail.value.trim() !== "" ? editEmail.value : userEmail,
      phone: editPhone.value.trim() !== "" ? editPhone.value : userPhone,
      isAdmin: true,
      address: [
        "EG",
        editCity.value.trim() !== ""
          ? editCity.value
          : userAddress.substring(3),
      ],
    };

    try {
      if (userId) {
        await updateUserProfile(userId, adminDataValue);

        // Update cookies
        setCookie("userName", adminDataValue.Username, 30);
        setCookie("userEmail", adminDataValue.email, 30);
        setCookie("userPhone", adminDataValue.phone, 30);
        setCookie("userAddress", "EG-" + adminDataValue.address[1], 30);

        alert("Profile Updated Successfully");
        window.location.reload();
      } else {
        alert("Updated Failed");
      }
    } catch (error) {
      alert("Something Went Wrong");
    }
  });

  //---------------------------------------------------------

  // Edit Admin Password Form Validation
  changePasswordForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (currentPassInput.value.length < 6 || currentPassInput == "") {
      showFieldError("currentPassInput", "Please Enter Your Current Password");
      e.preventDefault();
      return;
    } else {
      clearFieldError("currentPassInput");
    }

    if (editPassword.value.length < 6) {
      showFieldError(
        "newPassInpu",
        "Please Enter Valid New Password at least 6 characters"
      );
      e.preventDefault();
      return;
    } else {
      clearFieldError("newPassInpu");
    }

    if (editPassword.value !== repeatEditPassword.value) {
      showFieldError("repeatPassInput", "New Passwords Not Matches");
      e.preventDefault();
      return;
    } else {
      clearFieldError("repeatPassInput");
    }

    let checkCurrentPass = await changePassword(
      currentPassInput.value,
      editPassword.value
    );

    if (checkCurrentPass) {
      alert("Password Changed Successfully");
      window.location.reload();
    } else {
      alert("Your Current Password incorrect");
    }
  });
});

// Create New Admin Form Validation
createNewAdminForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (!validateName(fullName.value)) {
    showFieldError("fullname", "Please enter a valid name (letters only)");
    e.preventDefault();
    return;
  } else {
    clearFieldError("fullname");
  }

  if (email.value.trim() !== "" && !validateEmail(email.value)) {
    showFieldError("email", "Please Enter Valid Email like (abcd@admin.com)");
    e.preventDefault();
    return;
  } else {
    clearFieldError("email");
  }

  if (password.value.length < 6) {
    showFieldError(
      "newPassInpu",
      "Please Enter Valid New Password at least 6 characters"
    );
    e.preventDefault();
    return;
  } else {
    clearFieldError("newPassInpu");
  }

  if (password.value !== repeatPassword.value) {
    showFieldError("repeatPassInput", "New Passwords Not Matches");
    e.preventDefault();
    return;
  } else {
    clearFieldError("repeatPassInput");
  }

  password.type = cekBoxPass.checked ? "text" : "password";
  repeatPassword.type = cekBoxRePass.checked ? "text" : "password";

  if (phone.value.trim() !== "" && !validatePhone(phone.value)) {
    showFieldError("phone", "Please Enter Valid Phone Number");
    e.preventDefault();
    return;
  } else {
    clearFieldError("phone");
  }

  if (city.value.trim() !== "" && !validateName(city.value)) {
    showFieldError("city", "Please enter a valid City (letters only)");
    e.preventDefault();
    return;
  } else {
    clearFieldError("city");
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
      window.location.reload();
    } else {
      alert("Registration Failed");
    }
  } catch (error) {
    alert("Something Went Wrong");
  }
});

function showFieldError(inputId, message) {
  const errorContainer = document.getElementById(`error-${inputId}`);
  if (!errorContainer) return;

  errorContainer.innerText = message;
  errorContainer.style.display = "block";
}

function clearFieldError(inputId) {
  const errorContainer = document.getElementById(`error-${inputId}`);
  if (!errorContainer) return;

  errorContainer.innerText = "";
  errorContainer.style.display = "none";
}

// Validation Functions
function validateName(name) {
  return /^[a-zA-Z\s]+$/.test(name.trim());
}

function validateEmail(email) {
  return /^[a-zA-Z][a-zA-Z0-9._-]*@admin\.com$/i.test(email.trim());
}

function validatePhone(phone) {
  return /^01[0125][0-9]{8}$/.test(phone.trim());
}

//----------------------------------------------------------------------
