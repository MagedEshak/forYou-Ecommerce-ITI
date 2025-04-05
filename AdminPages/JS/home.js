import { db } from "./main.js";
import { collection, getDocs, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";

// Cache DOM elements
const dom = {
    productsTable: document.getElementById("productsTable"),
    totalProducts: document.getElementById("totalProducts"),
    totalCategories: document.getElementById("totalCategories"),
    addNewProductBtn: document.getElementById("addNewProductBtn_id")
};

// Category cache for name lookups
let categoryCache = new Map();

// Fetch categories first to map IDs to names
async function fetchCategories() {
    try {
        const snapshot = await getDocs(collection(db, "category"));
        snapshot.forEach(doc => categoryCache.set(doc.id, doc.data().cat_name));
    } catch (error) {
        console.error("Category fetch error:", error);
        showNotification("Failed to load categories", "error");
    }
}

// Improved product fetching with category names
async function fetchProducts() {
    try {
        await fetchCategories(); // Ensure categories are loaded first
        const snapshot = await getDocs(collection(db, "products"));
        const products = [];
        
        // Clear table efficiently
        while (dom.productsTable.firstChild) {
            dom.productsTable.removeChild(dom.productsTable.firstChild);
        }

        snapshot.forEach(doc => {
            const product = doc.data();
            products.push(product);
            dom.productsTable.appendChild(createProductRow(doc.id, product));
        });

        updateProductSummary(products);
    } catch (error) {
        console.error("Product fetch error:", error);
        showNotification("Failed to load products", "error");
    }
}

// Create table row with proper error handling
function createProductRow(id, product) {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${id}</td>
        <td>${product.name}</td>
        <td class="img-container">
            <img src="${product.imageUrl}" alt="${product.name}" 
                 referrerpolicy="no-referrer" width="50" height="50">
        </td>
        <td>${categoryCache.get(product.category_id) || 'Unknown Category'}</td>
        <td>$${product.price.toFixed(2)}</td>
        <td>${product.quantity}</td>
        <td>${product.discount}%</td>
        <td>
            <button class="btn btn-sm btn-danger delete-btn" data-id="${id}">
                Delete
            </button>
        </td>
    `;
    return row;
}

// Event delegation for delete buttons
dom.productsTable.addEventListener("click", async (event) => {
    if (event.target.classList.contains("delete-btn")) {
        const id = event.target.dataset.id;
        if (confirm(`Delete product ${id}? This cannot be undone!`)) {
            try {
                await deleteDoc(doc(db, "products", id));
                event.target.closest("tr").remove();
                showNotification("Product deleted successfully", "success");
                updateSummaryAfterDeletion();
            } catch (error) {
                console.error("Delete error:", error);
                showNotification("Failed to delete product", "error");
            }
        }
    }
});

// Optimized summary updates
function updateProductSummary(products) {
    dom.totalProducts.textContent = products.length;
    dom.totalCategories.textContent = new Set(
        products.map(p => p.category_id)
    ).size;
}

function updateSummaryAfterDeletion() {
    const currentCount = dom.productsTable.childElementCount;
    dom.totalProducts.textContent = currentCount;
}

// UI feedback system
function showNotification(message, type = "info") {
    const notification = document.createElement("div");
    notification.className = `alert alert-${type} fixed-top`;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => notification.remove(), 3000);
}

// Initialize
document.addEventListener("DOMContentLoaded", () => {
    fetchProducts();
    
    if (dom.addNewProductBtn) {
        dom.addNewProductBtn.addEventListener("click", redirectToAddProduct);
    }
});

// Navigation handlers
function redirectToAddProduct() {
    if (!window.location.href.endsWith("admin-add-product.html")) {
        window.location.href = "admin-add-product.html";
    }
}
