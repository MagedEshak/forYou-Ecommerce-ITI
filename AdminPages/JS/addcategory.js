import { addDocument,deleteAllDocuments,getDocumentByField,getAllDocuments } from "../../js/main.js"


// deleteAllDocuments("category")
// var cat ={
//     "cat_id": 1,
//     "cat_name": "TV"
// }
// addDocument("category", cat)
document.getElementById("form_id").addEventListener("submit", function(event){
  event.preventDefault()
  var catName = document.getElementById("categoryNameInput_id").value
  var cat = {
    "name": catName,
  }
  addDocument("category" , cat)
  document.getElementById("categoryNameInput_id").value=""

})
var categorys = await getAllDocuments("category")
categorys.forEach(cat =>{
  // Create the <tr> element
const tr = document.createElement("tr");

// Create the <td> element for category info
const tdCategory = document.createElement("td");
const divContainer = document.createElement("div");
divContainer.className = "align-content-center text-center d-flex justify-content-start gap-5";

const rowDiv = document.createElement("div");
rowDiv.className = "row";

const catName = document.createElement("span");
catName.className = "text-start";
catName.id = "cat_name";
catName.textContent = cat.name;

const catId = document.createElement("span");
catId.className = "text-start";
catId.id = "cat_id";
catId.textContent = cat.id;

// Append category elements
rowDiv.appendChild(catName);
rowDiv.appendChild(catId);
divContainer.appendChild(rowDiv);
tdCategory.appendChild(divContainer);

// Create the <td> element for quantity
const tdQuantity = document.createElement("td");
tdQuantity.className = "text-center align-middle";

const spanQuantity = document.createElement("span");
spanQuantity.id = "catQuantity_id";
spanQuantity.className = "align-content-center text-center";
spanQuantity.textContent = "4";

// Append quantity elements
tdQuantity.appendChild(spanQuantity);

// Append everything to the row
tr.appendChild(tdCategory);
tr.appendChild(tdQuantity);

// Append the row to a table in the document (assuming you have a table with id "myTable")
document.getElementById("tbody_id").appendChild(tr);

})