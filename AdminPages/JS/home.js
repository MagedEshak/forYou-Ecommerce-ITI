
import { db } from "./main.js";
import { collection, getDocs ,deleteDoc,doc} from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";


// Function to fetch products from Firestore
async function fetchProducts() {
    const productsCollection = document.getElementById("productsTable");
    productsCollection.innerHTML = ""; // Clear previous content
 
    try{
        const querySnapshot = await getDocs(collection(db, "products"));
        querySnapshot.forEach((doc) => {
            const product = doc.data();
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${doc.id}</td>
                <td>${product.name}</td>
                <td><img src="${product.imageUrl}" width="50" height="50"></td>
                
                <td>${product.category_id}</td>
                <td>$${product.price}</td>
                <td>${product.quantity}</td>
                <td>${product.discount}</td>
               <td>
                  <button class="btn btn-sm btn-danger delete-btn" data-id="${doc.id}">Delete</button>

                </td>

            `;
            productsCollection.appendChild(row);

        });

         // Attach event listeners to delete buttons
         document.querySelectorAll(".delete-btn").forEach((button) => {
            button.addEventListener("click", function () {
                const id = this.getAttribute("data-id");
                deleteProduct(id);
            });
        });

    } catch (error) {
        console.error("Error fetching products:", error);
    }
}

async function deleteProduct(productId) {
    if (!confirm("Are you sure you want to delete this product?")) {
        return;
    }

    try {
        await deleteDoc(doc(db, "products", productId));
        alert("Product deleted successfully!");
        fetchProducts(); // Refresh product list
    } catch (error) {
        console.error("Error deleting product:", error);
        alert("Failed to delete product.");
    }
}
  



// Function to update product summary
function updateProductSummary(products) {
    let totalProducts = products.length;
    let uniqueCategories = new Set(products.map((product) => product.category_id)).size;

    document.getElementById("totalProducts").innerText = totalProducts;
    document.getElementById("totalCategories").innerText = uniqueCategories;
}



document.addEventListener("DOMContentLoaded", function () {
    
    // Fetch products from Firestore
    fetchProducts().then(() => updateProductSummary());
    
    const addNewProductBtn = document.getElementById("addNewProductBtn_id");

    if (addNewProductBtn) {
        addNewProductBtn.addEventListener("click", redirectToAddProduct);
    }
});


// Handle redirects

function redirectToAddProduct() {
    window.location.href = "admin-add-product.html";
}
function redirectToDashboard() {
    window.location.href = "admin-home.html";
}

