import { addDocument } from "./main.js";
import {
  validateName,
  validateEmail,
  validatePassword,
  validateRePassword,
<<<<<<< HEAD
  validatePhoneNumber,
=======
>>>>>>> 08567adc21bc3dddfb29599c9ba9beb78dabbe42
} from "./CreatUser.js";

let CreatAcount = document.getElementById("Creataccount_id");
CreatAcount.addEventListener("click", (e) => {
  e.preventDefault();
  let name = document.getElementById("userName_id").value;
  let email = document.getElementById("email_id").value;
  let password = document.getElementById("password_id").value;
  let rePassword = document.getElementById("repassword_id").value;
<<<<<<< HEAD
  let phoneNumber = document.getElementById("phoneNumber_id");
=======
>>>>>>> 08567adc21bc3dddfb29599c9ba9beb78dabbe42

  if (
    validateName(name) &&
    validateEmail(email) &&
    validatePassword(password) &&
<<<<<<< HEAD
    validateRePassword(password, rePassword) &&
    validatePhoneNumber(phoneNumber)
=======
    validateRePassword(password, rePassword)
>>>>>>> 08567adc21bc3dddfb29599c9ba9beb78dabbe42
  ) {
    let dataUser = {
      isAdmin: false,
      name,
      password,
      email,
<<<<<<< HEAD
      phoneNumber,
=======
      phone: "",
>>>>>>> 08567adc21bc3dddfb29599c9ba9beb78dabbe42
      address: {
        country: "",
        city: "",
      },
      wishlist: [],
      shoppingCart: [
        {
          cat_id: "",
          quantaty: "",
          isPending: "",
        },
      ],
      lastOrders: [
        {
          product_id: "",
          retunOdrs: false,
        },
      ],
    };
    addDocument("User", dataUser)
      .then(() => {
        window.location.href = "../index.html";
      })
      .catch((error) => {
        console.error("Error creating account:", error);
        alert("There was an error creating your account. Please try again.");
      });
  }
});
