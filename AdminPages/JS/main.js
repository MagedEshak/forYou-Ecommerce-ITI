// Import necessary Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { getFirestore, collection, getDocs, getDoc, doc, updateDoc } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-storage.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB5OPT9O638qgV0synG6M3n1MKK_ysSuDM",
    authDomain: "e-commer-website.firebaseapp.com",
    projectId: "e-commer-website",
    storageBucket: "e-commer-website.firebasestorage.app",
    messagingSenderId: "72350924893",
    appId: "1:72350924893:web:28817a6b6d8eb470fa8db4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore and Firebase Storage
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

// Export Firestore and Firebase Storage for other modules
export { db, storage, auth };

// Function to upload an image to Firebase Storage
export async function uploadImage(file) {
    if (!file) {
        alert("Please select an image!");
        return null;
    }

    const fileName = `products/${Date.now()}_${file.name}`;
    const storageRef = ref(storage, fileName);

    try {
        const snapshot = await uploadBytes(storageRef, file);
        console.log("Image uploaded successfully!");

        const downloadURL = await getDownloadURL(snapshot.ref);
        return downloadURL;
    } catch (error) {
        console.error("Error uploading image:", error);
        alert("Failed to upload image.");
        return null;
    }
}

// Function to get all products
export async function getAllProducts() {
    try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const products = [];
        querySnapshot.forEach((doc) => {
            products.push({ id: doc.id, ...doc.data() });
        });
        console.log("Fetched products: ", products);
        return products;
    } catch (error) {
        console.error("Error getting products: ", error);
    }
}

// Function to get a product by ID
export async function getProductById(productId) {
    try {
        const docRef = doc(db, "products", productId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            console.log("Fetched product: ", docSnap.data());
            return { id: docSnap.id, ...docSnap.data() };
        } else {
            console.log("No such product!");
            return null;
        }
    } catch (error) {
        console.error("Error getting product by ID: ", error);
    }
}

// Function to update a product
export async function updateProduct(productId, updatedData) {
    try {
        const docRef = doc(db, "products", productId);
        await updateDoc(docRef, updatedData);
        console.log("Product updated successfully.");
    } catch (error) {
        console.error("Error updating product: ", error);
    }
}
