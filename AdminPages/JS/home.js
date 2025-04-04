
     
document.addEventListener("DOMContentLoaded", function () {
    fetchProducts();
});

function fetchProducts() {
    fetch("https://fakestoreapi.com/products")
        .then((response) => response.json())
        .then((products) => {
            displayProducts(products);
            updateProductSummary(products);

        })
        .catch((error) => console.error("Error fetching products:", error));
}

function displayProducts(products) {
    let productsTable = document.getElementById("productsTable");
    productsTable.innerHTML = ""; // تفريغ المحتوى السابق

    products.forEach((product) => {
        let row = document.createElement("tr");
        row.style.cursor = "pointer"; // تغيير مؤشر الفأرة
        row.onclick = function () {
            window.location.href = `admin-product-details.html?id=${product.id}`;
        };

        row.innerHTML = `
    <td>${product.id}</td>
    <td><img src="${product.image}" width="50" height="50"></td>
    <td>${product.title}</td>
    <td>${product.category}</td>
    <td>$${product.price}</td>
    <td>
        
        <button class="btn btn-sm btn-danger" onclick="event.stopPropagation(); deleteProduct(${product.id})"  
                >Delete</button>
    </td>
`;

        productsTable.appendChild(row);
    });
}


function updateProductSummary(products) {
    let totalProducts = products.length;
    let uniqueCategories = new Set(products.map(product => product.category)).size;

    document.getElementById("totalProducts").innerText = totalProducts;
    document.getElementById("totalCategories").innerText = uniqueCategories;
}
// Function to open the edit modal
function editProduct(id, title, price) {
    document.getElementById("editProductId").value = id;
    document.getElementById("editProductName").value = title;
    document.getElementById("editProductPrice").value = price;
    let modal = new bootstrap.Modal(document.getElementById("editModal"));
    modal.show();
}

// Function to save changes (Simulated)
function saveChanges() {
    let id = document.getElementById("editProductId").value;
    let newName = document.getElementById("editProductName").value;
    let newPrice = document.getElementById("editProductPrice").value;

    document.querySelector(`#product-${id} td:nth-child(3)`).innerText = newName;
    document.querySelector(`#product-${id} td:nth-child(4)`).innerText = `$${newPrice}`;

    alert(`Product ${id} updated successfully!`);
    let modal = bootstrap.Modal.getInstance(document.getElementById("editModal"));
    modal.hide();
}

// Function to delete product
function deleteProduct(id) {
    document.getElementById(`product-${id}`).remove();
    alert(`Product ${id} deleted successfully!`);
}
