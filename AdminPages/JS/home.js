import { deleteDocById, getAllDocuments } from "../../js/main.js";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
} from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";
// Cache DOM elements
const dom = {
  productsTable: document.getElementById("productsTable"),
  totalProducts: document.getElementById("totalProducts"),
  totalCategories: document.getElementById("totalCategories"),
  addNewProductBtn: document.getElementById("addNewProductBtn_id"),
};

// Category cache for name lookups
let categoryCache = new Map();

async function fetchCategories() {
  try {
    const categories = await getAllDocuments("Categories");
    categories.forEach((cat) => {
      categoryCache.set(cat.id, cat.cat_name);
      console.log("category name", cat.cat_name);
    });
  } catch (error) {
    console.error("Category fetch error:", error);
    showNotification("Failed to load categories", "error");
  }
}

// Improved product fetching with category names
async function fetchProducts() {
  try {
    const products = await getAllDocuments("Products");

    // Clear table efficiently
    while (dom.productsTable.firstChild) {
      dom.productsTable.removeChild(dom.productsTable.firstChild);
    }

    products.forEach((product) => {
      const row = createProductRow(product.id, product);
      dom.productsTable.appendChild(row);
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
  console.log("category id", product.category_id);
  row.innerHTML = `
        <td>${id}</td>
        <td>${product.name}</td>
        <td class="img-container">
            <img src="${product.img}" alt="${product.name}" 
                 referrerpolicy="no-referrer"width="50" height="50">
        </td>
        <td>${categoryCache.get(product.cat_id) || "Unknown Category"}</td>
        <td>$${product.price.toFixed(2)}</td>
        <td>${product.inStock}</td>
        <td>${product.discount}%</td>
        <td>${product.rating}</td>

    `;
  return row;
}

// // Event delegation for delete buttons
// dom.productsTable.addEventListener("click", async (event) => {
//     if (event.target.classList.contains("delete-btn")) {
//         const id = event.target.dataset.id;
//         if (confirm(`Delete product ${id}? This cannot be undone!`)) {
//             try {
//                 await deleteDocById("products", id);
//                 event.target.closest("tr").remove();
//                 showNotification("Product deleted successfully", "success");
//                 updateSummaryAfterDeletion();
//             } catch (error) {
//                 console.error("Delete error:", error);
//                 showNotification("Failed to delete product", "error");
//             }
//         }
//     }
// });

// Optimized summary updates
function updateProductSummary(products) {
  dom.totalProducts.textContent = products.length;
  dom.totalCategories.textContent = new Set(
    products.map((p) => p.cat_id)
  ).size;
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
document.addEventListener("DOMContentLoaded", async () => {
  await fetchCategories();
  await fetchProducts();

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

// Event delegation for the entire row
const tableBody = document.querySelector("#productsTable");

tableBody.addEventListener("click", (event) => {
  const row = event.target.closest("tr"); // Get the closest <tr> to the clicked element
  if (!row) return; // Exit if no <tr> was clicked (this could happen if you clicked an empty space)

  const productId = row.querySelector("td:first-child").textContent; // Assuming the ID is in the first column
  if (productId) {
    // Redirect to the product details page
    window.location.href = `admin-product-details.html?id=${productId}`;
  }
});
