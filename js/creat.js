import { addDocument } from "./main.js";
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
  let userName = document.getElementById("userName_id").value;
  let email = document.getElementById("email_id").value;
  let password = document.getElementById("password_id").value;
  let rePassword = document.getElementById("repassword_id").value;
  let phone = document.getElementById("phoneNumber_id").value;

  if (
    validateName(userName) &&
    validateEmail(email) &&
    validatePassword(password) &&
    validateRePassword(password, rePassword) &&
    validatePhoneNumber(phone)
  ) {
    let dataUser = {
      isAdmin: false,
      userName,
      password,
      email,
      address: {
        country: "",
        city: "",
      },
      wishlist: [],
      shoppingCart: [],
      lastOrders: [
        {
          product_id: "",
          retunOdrs: false,
        },
      ],
    };

    registerUser(email, password)
      .then((uid) => {
        console.log(uid);
        return createUserProfile(uid, dataUser);
      })
      .then(() => {
        window.location.href = "../CustomersPages/signin.html";
      })
      .catch((error) => {
        console.error("Error creating account:", error);
        alert("There was an error creating your account. Please try again.");
      });
  }
});
