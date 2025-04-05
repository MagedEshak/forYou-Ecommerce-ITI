

import { getDocById,deleteDocById} from "../../js/main.js";

// Get product ID from URL
function getProductIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("id");
}



//function to fetch product details by ID
async function fetchProductDetails(productId) {
    try {
        
    
        const product = await getDocById("products", productId);
        if (!product) {
            alert("Product not found!");
            window.location.href = "admin-home.html";
            return;
        }
        displayProductDetails(product, productId);
    } catch (error) {
        console.error("Error fetching product details:", error);
        alert("Error fetching product details. Please try again later.");
    }
}

// display product details
async function displayProductDetails(product,productId) {
    const productDetails = document.getElementById("productDetails");
    
    // Update existing elements instead of innerHTML
    document.getElementById("productId").textContent = productId ;
    document.getElementById("productName").textContent = product.name;
    document.getElementById("productImage").src = product.imageUrl;
    document.getElementById("productPrice").textContent = `$${product.price.toFixed(2)}`;
    document.getElementById("productCategory").textContent =product.category_id;
    document.getElementById("productCategory_id").textContent = product.category_id;
    document.getElementById("productQuantity").textContent = product.quantity;
    document.getElementById("productDiscount").textContent = `${product.discount}%`;
    document.getElementById("productDescription").textContent = product.description;

    //fetch category name from the database
    try {
        const category = await getDocById("category", product.category_id);
        document.getElementById("productCategory").textContent = category.cat_name;
    } catch (error) {
        console.warn("Error fetching category:", error);
        document.getElementById("productCategory").textContent = "Unknown Category";

    }
}


// Delete product
async function deleteProduct() {

    const productId = getProductIdFromUrl(); //productId 
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
        await deleteDocById("products", productId);
        alert("Product deleted successfully!");
        window.location.href = "admin-home.html";
    } catch (error) {
        console.error("Error deleting product:", error);
        alert("Failed to delete product");
    }
}

// edit button handler
document.getElementById("editProductBtn").addEventListener("click", () => {
    const productId = getProductIdFromUrl();
    if (!productId) {
        alert("Product ID is missing!");
        return;
    }
    window.location.href = `edit-product.html?id=${productId}`;
});


// Delete button handler
document.getElementById("deleteProductBtn").addEventListener("click", deleteProduct);


// Initialize page
document.addEventListener("DOMContentLoaded", async () => {
    const productId = getProductIdFromUrl();
   
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









