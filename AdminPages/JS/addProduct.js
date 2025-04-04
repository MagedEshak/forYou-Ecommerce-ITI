import { db, uploadImage } from "./main.js";
import { collection, getDocs, addDoc } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";


/////////////////////////////////////////////////////////
//
//          Adding a new product
//
////////////////////////////////////////////////////////

// Function to load categories into the dropdown
async function loadCategories() {
    const categorySelect = document.getElementById("product-category"); // Get the dropdown element
    categorySelect.innerHTML = '<option value="">Select a category</option>'; // Reset the dropdown

    try {
        const querySnapshot = await getDocs(collection(db, "category")); // Get categories from Firestore
        querySnapshot.forEach((doc) => {
            const category = doc.data();
            const option = document.createElement("option"); // Create a new option element
            option.value = doc.id; // Set the value to the category's ID
            option.textContent = category.cat_name; // Set the option text to the category's name
            categorySelect.appendChild(option); // Append the option to the dropdown
        });
    } catch (error) {
        console.error("Error loading categories:", error);
        categorySelect.innerHTML = '<option value="">Error loading categories</option>';
    }
}

// Function to add a new product
async function addProduct(event) {
    event.preventDefault(); // Prevent form from refreshing the page

    // Get form values
    const productName = document.getElementById("product-name").value;
    const productPrice = document.getElementById("product-price").value;
    const productCategory = document.getElementById("product-category").value;
    const productDescription = document.getElementById("product-description").value;
    const productImageFile = document.getElementById("product-image").files[0]; // Get the file input element
    const productDiscount = document.getElementById("product-discount").value;
    const productQuantity = document.getElementById("product-quantity").value;

    if (!productName || !productPrice || !productCategory || !productDescription) {
        alert("Please fill in all required fields!");
        return;
    }

    try {
    // Upload image to Firebase Storage
    const imageUrl = await uploadImage(productImageFile); // Ensure this is awaited correctly
    } catch (error) {
        console.error("Error uploading image:", error);
        alert("Failed to upload image. Please try again.");
        imageUrl= "none"; // Set imageUrl to none if upload fails
        return;
    }
    try {
        // Create product object
        const product = {
            name: productName,
            price: parseFloat(productPrice),
            category_id: productCategory,
            description: productDescription,
            imageUrl: imageUrl, // Use default if no image URL
            discount: parseFloat(productDiscount),
            quantity: parseInt(productQuantity),
            createdAt: new Date(),
            rating: 0,
            reviews: [],
        };

        // Add product to Firestore
        const docRef = await addDoc(collection(db, "products"), product);
        console.log("Product added with ID: ", docRef.id);

        alert(`Product added successfully! ID: ${docRef.id}`);

        // Clear form fields
        document.getElementById("product-form").reset();
    } catch (error) {
        console.error("Error adding product:", error);
        alert("Failed to add product. Please try again.");
    }
}

// Attach event listener to form when the DOM is ready
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("product-form").addEventListener("submit", addProduct);
    loadCategories();
});


// Handle upload event
function handleUpload() {
    const fileInput = document.getElementById("imageInput");
    const file = fileInput.files[0]; // Get the file selected by the user
    uploadImage(file).then((downloadURL) => {
        if (downloadURL) {
            console.log("File uploaded successfully, Download URL: ", downloadURL);
            // You can now save the download URL to Firestore or display it on your page
        }
    });
}
