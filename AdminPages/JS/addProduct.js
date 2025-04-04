// var productName = document.getElementById("productName");
// var productCategory = document.getElementById("productCategory");
// var productPrice = document.getElementById("productPrice");
// var productDiscount = document.getElementById("productDiscount");
// var productQuantity = document.getElementById("productQuantity");
// var productDescription = document.getElementById("productDescription");


// var products=[];
// // Check if products already exist in local storage
// if (localStorage.getItem("products") == null) {
//     products = []; // Initialize products array if it doesn't exist
// }
// else {  
//     products = JSON.parse(localStorage.getItem("products")); // Parse the existing products from local storage
// }


// function addProduct() {

//     event.preventDefault();
//     var productImage = document.getElementById("productImage").files[0];
//     var product ={
//         name: productName.value,
//         image: productImage ? productImage.name : "", // Get file name
//         category: productCategory.value,
//         price: productPrice.value,
//         discount: productDiscount.value,
//         quantity: productQuantity.value,
//         description: productDescription.value
//     }
//     products.unshift(product); // Add product to the beginning of the array
    
//     localStorage.setItem("products", JSON.stringify(products)); // Store products in local storage
    
//     console.log(product);
//     alert(product.name + " added successfully");
//     clearForm(); // Clear the form after submission
   
// }

// function clearForm() {
//     productName.value = "";
//     productCategory.value = "";
//     productPrice.value = "";
//     productDiscount.value = "";
//     productQuantity.value = "";
//     productDescription.value = "";
//     document.getElementById("productImage").value = ""; // Clear file input
// }






// to redirect to the add product page
function redirectToAddProduct() {
    window.location.href = "admin-add-product.html";
}
// to redirect to admin home page
     function redirectToDashboard() {
            window.location.href = "admin-home.html";
}




/////////////////////////////////////////////////////////
//
//          adding a new product
//
////////////////////////////////////////////////////////

import { getAllProductsToFire,addProductToFire } from "../../js/main.js";
import { getProductByIdFromFire } from "../../js/main.js";
import { updateProductTofire } from "../../js/main.js";
import { deleteProductFromFire } from "../../js/main.js";


// const newProduct = {
//     name: "Smartphone XYZ",
//     category: "Electronics",
//     price: 799.99,
//     stock: 50,
//     description: "A high-end smartphone with a 64MP camera and OLED display.",
//     imageUrl: "https://example.com/smartphone.jpg"
// };

// addProduct(newProduct);

// getAllProducts().then(products => console.log(products));




// Function to Add Product
async function addProduct(event) {
    event.preventDefault(); // Prevent form from refreshing the page

    // Get form values
    const productName = document.getElementById("product-name").value;
    const productPrice = document.getElementById("product-price").value;
    const productCategory = document.getElementById("product-category").value;
    const productDescription = document.getElementById("product-description").value;
    const productImage = document.getElementById("product-image").files[0]; // Get the file input
    const productDiscount = document.getElementById("product-discount").value;
    const productQuantity = document.getElementById("product-quantity").value;
    

    if (!productName || !productPrice || !productCategory||!productDescription ) {
        alert("Please fill in all required fields!");
        return;
    }

    try {
        var  product= {
            name: productName,
            price: parseFloat(productPrice),
            category: productCategory,
            description: productDescription,
            imageUrl: productImage ? productImage.name : "", // Store file name
            discount: parseFloat(productDiscount),
            quantity: parseInt(productQuantity),
           
            createdAt: new Date(),
        };
        // Add product to Firestore
        const docRef = await addProductToFire(product);
        console.log("Product added successfully!");
        console.log("Document ID:", docRef.id);

        alert(`Product added successfully! ID: ${docRef.id}`);

        // Clear form fields after submission
        document.getElementById("product-form").reset();
    } catch (error) {
        console.error("Error adding product:", error);
        alert("Failed to add product. Please try again.");
    }
}


// Attach event listener to form
document.getElementById("product-form").addEventListener("submit", addProduct);
