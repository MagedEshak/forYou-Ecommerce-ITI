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