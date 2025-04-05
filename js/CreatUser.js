//
//**  validation Form inputs*/

//*input name */
let userName = document.getElementById("userName_id");
let invalidName = document.getElementById("invalidName_id");
let emptyName = document.getElementById("emptyName_id");
let regName = /^[a-zA-Z]{3,}$/;

userName.addEventListener("blur", () => {
  if (regName.test(userName.value)) {
    invalidName.classList.remove("d-block");
    invalidName.classList.add("d-none");
    emptyName.classList.remove("d-block");
    emptyName.classList.add("d-none");
  } else if (userName.value == "") {
    invalidName.classList.remove("d-block");
    invalidName.classList.add("d-none");
    emptyName.classList.remove("d-none");
    emptyName.classList.add("d-block");
  } else {
    invalidName.classList.remove("d-none");
    invalidName.classList.add("d-block");
    emptyName.classList.remove("d-block");
    emptyName.classList.add("d-none");
  }
});
//** input email */
let userEmail = document.getElementById("email_id");
let invalidEmail = document.getElementById("invalidEmail_id");
let emptyEmail = document.getElementById("emptyEmail_id");
let regEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
userEmail.addEventListener("blur", () => {
  if (regEmail.test(userEmail.value)) {
    isEmailValid = true;
    invalidEmail.classList.remove("d-block");
    invalidEmail.classList.add("d-none");
    emptyEmail.classList.remove("d-block");
    emptyEmail.classList.add("d-none");
  } else if (userEmail.value == "") {
    isEmailValid = false;
    invalidEmail.classList.remove("d-block");
    invalidEmail.classList.add("d-none");
    emptyEmail.classList.remove("d-none");
    emptyEmail.classList.add("d-block");
  } else {
    isEmailValid = false;
    invalidEmail.classList.remove("d-none");
    invalidEmail.classList.add("d-block");
    emptyEmail.classList.remove("d-block");
    emptyEmail.classList.add("d-none");
  }
});
//** input password */
let userPass = document.getElementById("password_id");
let invalidPass = document.getElementById("invalidPass_id");
let emptyPass = document.getElementById("emptyPass_id");
let regPassword =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
userPass.addEventListener("blur", () => {
  if (regPassword.test(userPass.value)) {
    invalidPass.classList.remove("d-block");
    invalidPass.classList.add("d-none");
    emptyPass.classList.remove("d-block");
    emptyPass.classList.add("d-none");
  } else if (userPass.value == "") {
    invalidPass.classList.remove("d-block");
    invalidPass.classList.add("d-none");
    emptyPass.classList.remove("d-none");
    emptyPass.classList.add("d-block");
  } else {
    invalidPass.classList.remove("d-none");
    invalidPass.classList.add("d-block");
    emptyPass.classList.remove("d-block");
    emptyPass.classList.add("d-none");
  }
});
//** show password */
let showPasswordCheckbox = document.getElementById(
  "showCurrentPasswordCheck_id"
);
showPasswordCheckbox.addEventListener("click", () => {
  if (showPasswordCheckbox.checked) {
    userPass.type = "text"; //  Show password
  } else {
    userPass.type = "password"; //  Hide password
  }
});

//** confirm pass */
let repassword = document.getElementById("repassword_id");
let matchedpass = document.getElementById("matchedpass_id");
let requpass = document.getElementById("requpass_id");
repassword.addEventListener("blur", () => {
  if (repassword.value == userPass.value) {
    matchedpass.classList.add("d-none");
    matchedpass.classList.remove("d-block");
    requpass.classList.add("d-none");
    requpass.classList.remove("d-block");
  } else if (repassword.value == "") {
    matchedpass.classList.add("d-none");
    matchedpass.classList.remove("d-block");
    requpass.classList.remove("d-none");
    requpass.classList.add("d-block");
  } else {
    matchedpass.classList.remove("d-none");
    matchedpass.classList.add("d-block");
    requpass.classList.add("d-none");
    requpass.classList.remove("d-block");
  }
});
//** show Repeat password */
let showRepeatPasswordCheck = document.getElementById(
  "showRepeatPasswordCheck_id"
);
showRepeatPasswordCheck.addEventListener("click", () => {
  if (showRepeatPasswordCheck.checked) {
    repassword.type = "text"; //  Show password
  } else {
    repassword.type = "password"; //  Hide password
  }
});
//** creat account  */
export function validateName(name) {
  return regName.test(name);
}
export function validateEmail(email) {
  return regEmail.test(email);
}
export function validatePassword(password) {
  return regPassword.test(password);
}
export function validateRePassword(password, repass) {
  return password === repass && repass !== "";
}
