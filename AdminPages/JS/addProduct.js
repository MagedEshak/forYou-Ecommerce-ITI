import {  uploadToImgur,getAllDocuments,addDocument} from "../../js/main.js";

// Load categories
async function loadCategories() {
    const categorySelect = document.getElementById("product-category");
    categorySelect.innerHTML = '<option value="">Select a category</option>';
  
    try {
        const categories = await getAllDocuments("category");
        categories.forEach(cat => {
            const option = document.createElement("option");
            option.value = cat.id; 
            option.textContent = cat.cat_name; 
            categorySelect.appendChild(option);
        
        });
    } catch (error) {
        console.error("Category fetch error:", error);
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
    const clientId = "5c51da6457cf182";

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
        const docRef = await addDocument("products", product);
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