import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  addDoc,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  setDoc,
} from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";

/// authentication

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB5OPT9O638qgV0synG6M3n1MKK_ysSuDM",
  authDomain: "e-commer-website.firebaseapp.com",
  projectId: "e-commer-website",
  storageBucket: "e-commer-website.firebasestorage.app",
  messagingSenderId: "72350924893",
  appId: "1:72350924893:web:28817a6b6d8eb470fa8db4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
export { app, db, auth };

/////////////////////////////
//
// authentication functions
//
/////////////////

// Register a new user
export async function registerUser(email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    console.log("User registered:", user.uid);
    return user.uid;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
}

// Login a user
export async function loginUser(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    console.log("User logged in 1: ", user.uid);
    return user.uid;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
}

// Logout a user
export async function logoutUser() {
  try {
    await signOut(auth);
    console.log("User logged out");
  } catch (error) {
    console.error("Error logging out:", error);
    throw error;
  }
}

/// change password
export async function changePassword(currentPassword, newPassword) {
  try {
    const user = auth.currentUser;
    if (!user) {
      throw new Error("No user is currently signed in.");
    }

    // Re-authenticate the user
    const credential = EmailAuthProvider.credential(
      user.email,
      currentPassword
    );
    await reauthenticateWithCredential(user, credential);

    // Update password
    await updatePassword(user, newPassword);

    console.log("Password changed successfully");
    return true;
  } catch (error) {
    console.error("Error changing password:", error.message);
    return false;
  }
}

// Check if user is logged in
export function isUserLoggedIn() {
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe(); // Stop listening immediately
      resolve(!!user);
    });
  });
}

// Get the current user's UID
export async function getCurrentUserId() {
  return new Promise((resolve) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        resolve(user.uid);
      } else {
        resolve(null);
      }
    });
  });
}

// create a user profile in Firestore
export async function createUserProfile(uid, userData) {
  try {

    await setDoc(doc(db, "Users", uid), userData);

    console.log("User profile created!");
  } catch (error) {
    console.error("Error creating user profile:", error);
  }
}

// Get user profile by UID
export async function getUserProfile(uid) {
  try {
    console.log("UID:", uid);
    if (!uid || typeof uid !== "string") {
      console.error("Invalid UID:", uid);
      return null;

    }

    const userDoc = await getDoc(doc(db, "Users", uid));
    if (userDoc.exists()) {
      return userDoc.data();
    } else {
      console.log("No such user!");
      return null;
    }

  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error;
  }
}

// Update user profile by UID
export async function updateUserProfile(uid, updatedData) {
  try {

    const userDoc = doc(db, "Users", uid);

    await updateDoc(userDoc, updatedData);
    console.log("User profile updated!");
  } catch (error) {
    console.error("Error updating user profile:", error);
  }
}
// edit user profile

// Delete user profile by UID
export async function deleteUserProfile(uid) {
  try {

    await deleteDoc(doc(db, "Users", uid));

    console.log("User profile deleted!");
  } catch (error) {
    console.error("Error deleting user profile:", error);
  }
}

// Listen for authentication state changes
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("User is logged in: auth", user.uid);
  } else {
    console.log("User is not logged in.");
  }
});

/////////////////// cookies

// set cookie
export function setCookie(name, value, days) {
  var expires = "";
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

// get cookie
export function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

// delee cookie
export function deleteCookie(name) {
  document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}


// delete all cookies
export function deleteAllCookies() {
  var cookies = document.cookie.split(";");

  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i];
    var eqPos = cookie.indexOf("=");
    var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
  }
}
