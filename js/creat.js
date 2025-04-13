import { registerUser, createUserProfile } from "./auth.js";
import {
  validateName,
  validateEmail,
  validatePassword,
  validateRePassword,
  validatePhoneNumber,
} from "./CreatUser.js";

let CreatAcount = document.getElementById("Creataccount_id");
CreatAcount.addEventListener("click", (e) => {
  e.preventDefault();
  let name = document.getElementById("userName_id").value;
  let email = document.getElementById("email_id").value;
  let password = document.getElementById("password_id").value;
  let rePassword = document.getElementById("repassword_id").value;
  let phoneNumber = document.getElementById("phoneNumber_id").value;

  if (
    validateName(name) &&
    validateEmail(email) &&
    validatePassword(password) &&
    validateRePassword(password, rePassword) &&
    validatePhoneNumber(phoneNumber)
  ) {
    let dataUser = {
      isAdmin: false,
      name,
      password,
      email,
      phoneNumber,
      address: {
        country: "",
        city: "",
      },
      wishlist: [],
      shoppingCart: [],
      lastOrders: [],
    };

    registerUser(email, password)
      .then((uid) => {
        console.log(uid);
        return createUserProfile(uid, dataUser);
      })
      .then(() => {
        window.location.href = "../index.html";
      })
      .catch((error) => {
        console.error("Error creating account:", error);
        alert("There was an error creating your account. Please try again.");
      });
  }
});
