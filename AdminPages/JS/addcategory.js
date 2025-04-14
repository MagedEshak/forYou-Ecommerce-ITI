import {
  addDocument,
  deleteAllDocuments,
  getDocumentByField,
  getAllDocuments,
  deleteDocumentByField,
  deleteDocById
} from "../../js/main.js";

// deleteAllDocuments("category")
// var cat ={
//     "cat_id": 1,
//     "cat_name": "TV"
// }
// addDocument("category", cat)

document
  .getElementById("form_id")
  .addEventListener("submit", async function (event) {
    event.preventDefault();
    var catName = document.getElementById("categoryNameInput_id").value;
    var cat = {
      cat_name: catName,
      img:""
    };
    await addDocument("Categories", cat);
    document.getElementById("categoryNameInput_id").value = "";
    location.reload();
  });

var categorys = await getAllDocuments("Categories");


for(var cat of categorys) {
  
  var products_cat = await getDocumentByField("Products","cat_id",cat.id)
  // Create the <tr> element
  /* console.log(products_cat?.length) */
  const tr = document.createElement("tr");

  // Create the <td> element for category info
  const tdCategory = document.createElement("td");
  const divContainer = document.createElement("div");
  divContainer.className =
    "align-content-center text-center d-flex justify-content-start";

  const rowDiv = document.createElement("div");
  rowDiv.className = "row";

  const catName = document.createElement("span");
  catName.className = "text-start";
  catName.id = "cat_name";
  catName.textContent = cat.cat_name;

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
   
  spanQuantity.textContent = products_cat?.length == null? 0:products_cat.length;

  // Append quantity elements
  tdQuantity.appendChild(spanQuantity);

  // Append everything to the row
  tr.appendChild(tdCategory);
  tr.appendChild(tdQuantity);

  const cancelBtn = document.createElement("button")
  cancelBtn.className="btn btn-secondary bg-danger align-content-center text-center mt-3"
  cancelBtn.innerText= "delete"
  cancelBtn.id = cat.id
  cancelBtn.onclick = async function(){
    var products = await getDocumentByField("Products","cat_id",this.id)
    console.log(products)

    if(products == null){
      await deleteDocById("Categories",this.id)
    }
    else{
      for(var item of products){
        await deleteDocumentByField("Products","cat_id",item.cat_id)
      }
    }
    location.reload()
  }
  tr.appendChild(cancelBtn)
  // Append the row to a table in the document (assuming you have a table with id "myTable")
  document.getElementById("tbody_id").appendChild(tr);
};
