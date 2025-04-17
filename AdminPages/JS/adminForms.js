import {
  getCookie,
  updateUserProfile,
  changePassword,
  setCookie,
  createUserProfile,
  registerUser,
  getCurrentUserId,
  getUserProfile,
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
let cekBoxEPass = document.getElementById("showNewPasswordCheck_id");
let cekBoxReNPass = document.getElementById("showRepeatPasswordCheck_id");

//--------------------------------------------------------------------------------------
// Create New Admin Profile
let fullName = document.getElementById("fullNewAdminNameInput_id");
let email = document.getElementById("emailNewAdminInput_id");
let phone = document.getElementById("phoneNewAdminInput_id");
let password = document.getElementById("newAdPassInput_id");
let repeatPassword = document.getElementById("reNewPassInput_id");
let city = document.getElementById("cityNewAdminInput_id");


let createNewAdminForm = document.getElementById("adminRegitForm");



//-----------------------------------------------------------------------------
const userId = getCurrentUserId();
const userprofile = getUserProfile(userId);
// Edit Admin Profile Form Validation
document.addEventListener("DOMContentLoaded", async function () {
  const userId = getCookie("userId");
  const userName = getCookie("userName");
  const userPhone = getCookie("phone");
  const userEmail = getCookie("email");
  const userAddress = getCookie("address");

  editFullName.placeholder = userName;
  editEmail.placeholder = userEmail;
  editPhone.placeholder = userPhone;
  editCity.placeholder = userAddress;

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
      userName:
        editFullName.value.trim() !== "" ? editFullName.value : userName,
      email: editEmail.value.trim() !== "" ? editEmail.value : userEmail,
      phone: editPhone.value.trim() !== "" ? editPhone.value : userPhone,
      isAdmin: true,
      address: {
        country: "EG",
        city:
          editCity.value.trim() !== ""
            ? editCity.value
            : userAddress,
      },
      wishlist: userprofile.wishlist,
      shoppingCart:userprofile.shoppingCart
    };

    try {
      if (userId) {
        await updateUserProfile(userId, adminDataValue);

        // Update cookies
        setCookie("userName", adminDataValue.userName, 30);
        setCookie("email", adminDataValue.email, 30);
        setCookie("phone", adminDataValue.phone, 30);
        setCookie("address", "EG-" + adminDataValue.address.city, 30);

        alert("Profile Updated Successfully");
        window.location.reload();
      } else {
        alert("Updated Failed");
      }
    } catch (error) {
      alert("Something Went Wrong");
    }
  });


  cekBoxCPass.addEventListener("click", () => {
    if (cekBoxCPass.checked) {
      currentPassInput.type = "text"; //  Show password
    } else {
      currentPassInput.type = "password"; //  Hide password
    }
  });
  
  cekBoxEPass.addEventListener("click", () => {
    if (cekBoxEPass.checked) {
      debugger;
      editPassword.type = "text"; //  Show password
    } else {
      editPassword.type = "password"; //  Hide password
    }
  });
  
  cekBoxReNPass.addEventListener("click", () => {
    if (cekBoxReNPass.checked) {
      repeatEditPassword.type = "text"; //  Show password
    } else {
      repeatEditPassword.type = "password"; //  Hide password
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
    userName: fullName.value,
    email: email.value,
    phone: phone.value,
    isAdmin: true,
    address: { country: "EG", city: city.value },
    wishlist: [],
    shoppingCart: [],
    lastOrders: [],
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
