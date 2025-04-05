import { db } from "./main.js";
import { collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";

// Imgur upload function
async function uploadToImgur(imageFile, clientId) {
    const formData = new FormData();
    formData.append("image", imageFile);

    try {
        const response = await fetch("https://api.imgur.com/3/image", {
            method: "POST",
            headers: {
                "Authorization": `Client-ID ${clientId}`
            },
            body: formData
        });

        const data = await response.json();

        if (data.success) {
            return data.data.link;
        } else {
            throw new Error("Upload failed!");
        }
    } catch (error) {
        console.error("Error uploading image:", error);
        return null;
    }
}

// Load categories
async function loadCategories() {
    const categorySelect = document.getElementById("product-category");
    categorySelect.innerHTML = '<option value="">Select a category</option>';

    try {
        const querySnapshot = await getDocs(collection(db, "category"));
        querySnapshot.forEach((doc) => {
            const category = doc.data();
            const option = document.createElement("option");
            option.value = doc.id;
            option.textContent = category.cat_name;
            categorySelect.appendChild(option);
        });
    } catch (error) {
        console.error("Error loading categories:", error);
    }
}

// Add product function
async function addProduct(event) {
    event.preventDefault();

    const productName = document.getElementById("product-name").value;
    const productPrice = document.getElementById("product-price").value;
    const productCategory = document.getElementById("product-category").value;
    const productDescription = document.getElementById("product-description").value;
    const fileInput = document.getElementById("product-image");
    const productDiscount = document.getElementById("product-discount").value;
    const productQuantity = document.getElementById("product-quantity").value;

    const imageFile = fileInput.files[0];
    
    if (!productName || !productPrice || !productCategory || !productDescription || !imageFile) {
        alert("Please fill in all required fields and upload an image!");
        return;
    }

    const imageUrl = await uploadToImgur(imageFile, clientId);

    if (!imageUrl) {
        alert("Image upload failed.");
        return;
    }

    const product = {
        name: productName,
        price: parseFloat(productPrice),
        category_id: productCategory,
        description: productDescription,
        imageUrl: imageUrl,
        discount: parseFloat(productDiscount),
        quantity: parseInt(productQuantity),
        createdAt: new Date(),
        rating: 0,
        reviews: [],
    };

    try {
        const docRef = await addDoc(collection(db, "products"), product);
        alert(`Product added successfully! ID: ${docRef.id}`);
        document.getElementById("product-form").reset();
    } catch (error) {
        console.error("Error adding product:", error);
        alert("Failed to add product. Please try again.");
    }
}

// Init
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("product-form").addEventListener("submit", addProduct);
    loadCategories();
});
document.getElementById("CancelBtn_id").addEventListener("click", () => {
    window.location.href = "admin-home.html";
});
