

import { db ,getDocById} from "./main.js";
import { doc, getDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";


// Get product ID from URL
function getProductIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("id");
}



//function to fetch product details by ID
async function fetchProductDetails(productId) {
    try {
        
    
        const product = await getDocById("products", productId);
        displayProductDetails(product, productId);
    } catch (error) {
        console.error("Error fetching product details:", error);
        alert("Error fetching product details. Please try again later.");
    }
}

// display product details
function displayProductDetails(product,productId) {
    const productDetails = document.getElementById("productDetails");
    
    // Update existing elements instead of innerHTML
    document.getElementById("productId").textContent = productId ;
    document.getElementById("productName").textContent = product.name;
    document.getElementById("productImage").src = product.imageUrl;
    document.getElementById("productPrice").textContent = `$${product.price.toFixed(2)}`;
    document.getElementById("productCategory").textContent = product.category_id;
    document.getElementById("productQuantity").textContent = product.quantity;
    document.getElementById("productDiscount").textContent = `${product.discount}%`;
    document.getElementById("productDescription").textContent = product.description;

}


// Delete product
async function deleteProduct() {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
        await deleteDoc(doc(db, "products", getProductIdFromUrl()));
        alert("Product deleted successfully!");
        window.location.href = "admin-home.html";
    } catch (error) {
        console.error("Error deleting product:", error);
        alert("Failed to delete product");
    }
}




// Initialize page
document.addEventListener("DOMContentLoaded", async () => {
    const productId = getProductIdFromUrl();
    deleteProduct
    console.log("Product ID:", productId);
    if (!productId) {
        alert("Product ID is missing!");
        window.location.href = "admin-home.html";
        return;
    }

    
    try {
        await fetchProductDetails(productId);
    } catch (error) {
        console.error("Initialization error:", error);
    }
});

// Edit button handler
document.getElementById("editProductBtn").addEventListener("click", () => {
    window.location.href = `edit-product.html?id=${getProductIdFromUrl()}`;
});
// Delete button handler
document.getElementById("deleteProductBtn").addEventListener("click", deleteProduct);










