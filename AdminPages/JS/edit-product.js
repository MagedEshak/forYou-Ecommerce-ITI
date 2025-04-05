import { uploadToImgur, getDocById, updateDocById, getAllDocuments } from "../../js/main.js";

let currentProductId = null;

// Initialize page
document.addEventListener("DOMContentLoaded", async () => {
    // Get product ID from URL
   
    currentProductId=new URLSearchParams(window.location.search).get('id');

    
    console.log("Current Product ID:", currentProductId);
    try {
        // First load categories
        await loadCategories();
        
        // Then load product data if in edit mode
        if (currentProductId) {
            await loadProductData(currentProductId);
        }
        
        // Set up form submission
        document.getElementById("product-form").addEventListener("submit", handleFormSubmit);
        document.getElementById("CancelBtn_id").addEventListener("click", () => {
            window.location.href = "admin-home.html";
        });
        
    } catch (error) {
        console.error("Initialization error:", error);
        alert("Failed to initialize page");
    }
});

// Load categories into dropdown
async function loadCategories() {
    const categorySelect = document.getElementById("product-category");
    categorySelect.innerHTML = '<option value="">Loading categories...</option>';

    try {
        const categories = await getAllDocuments("category");
        categorySelect.innerHTML = '<option value="">Select a category</option>';
        
        categories.forEach(cat => {
            const option = document.createElement("option");
            option.value = cat.id;
            option.textContent = cat.cat_name;
            categorySelect.appendChild(option);
        });
    } catch (error) {
        console.error("Category load error:", error);
        categorySelect.innerHTML = '<option value="">Error loading categories</option>';
    }
}

// Load product data into form
async function loadProductData(productId) {
    try {
        const product = await getDocById("products", productId);
        
        if (!product) {
            alert("Product not found!");
            window.location.href = "admin-home.html";
            return;
        }

        console.log("Product data:", product);
        // Fill form fields
        document.getElementById("product-name").value = product.name || "";
        document.getElementById("product-price").value = product.price?.toFixed(2) || "";
        document.getElementById("product-discount").value = product.discount || 0;
        document.getElementById("product-quantity").value = product.quantity || 1;
        document.getElementById("product-description").value = product.description || "";

        // Set category selection
        const categorySelect = document.getElementById("product-category");
        categorySelect.value = product.category_id || "";

      
            // Display the current image
            const imagePreviewContainer = document.getElementById("image-preview");
            imagePreviewContainer.innerHTML = ""; // Clear any previous preview

            console.log("Product image URL:", product.imageUrl);
            if (product.imageUrl) {
                const imagePreview = document.createElement("img");
                imagePreview.src = product.imageUrl;
                imagePreview.alt = "Product Image";
                imagePreview.style.maxWidth = "100px";
                imagePreview.style.marginTop = "10px";
                imagePreviewContainer.appendChild(imagePreview);
            } else {
                imagePreviewContainer.innerHTML = "<p>No image available</p>"; // If no image is available
            }

    } catch (error) {
        console.error("Product load error:", error);
        alert("Failed to load product data");
    }
}

// Handle form submission
async function handleFormSubmit(event) {
    event.preventDefault();

    // Form validation
    const formData = {
        name: document.getElementById("product-name").value.trim(),
        price: parseFloat(document.getElementById("product-price").value),
        category_id: document.getElementById("product-category").value,
        discount: parseFloat(document.getElementById("product-discount").value),
        quantity: parseInt(document.getElementById("product-quantity").value),
        description: document.getElementById("product-description").value.trim(),
    };

    console.log("Form Data:", formData);
    // Validation checks
    if (!formData.name || !formData.category_id) {
        alert("Please fill in all required fields");
        return;
    }

    if (isNaN(formData.price) || formData.price <= 0) {
        alert("Please enter a valid price");
        return;
    }

    try {
        // Handle image upload if new file selected
        const fileInput = document.getElementById("product-image");
        if (fileInput.files[0]) {
            formData.imageUrl = await uploadToImgur(fileInput.files[0]);
        }

        // Add update timestamp
        formData.updatedAt = new Date();

        // Update document
        await updateDocById("products", currentProductId, formData);
        
        alert("Product updated successfully!");
        window.location.href = "admin-home.html";

    } catch (error) {
        console.error("Update error:", error);
        alert(`Failed to update product: ${error.message}`);
    }
}