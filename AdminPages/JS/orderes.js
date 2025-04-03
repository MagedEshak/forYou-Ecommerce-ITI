

let usersTemp = [
    {
        "isAdmin": false,
        "id": 1,
        "name":"Ali",
        "password": "123",
        "email": "ali@gmail.com",
        "wishlist":[] , 
        "shoppingCart":[{
            "cat_id": 1,
            "product_id": 1,
            "quantaty": 2,
            "PendingStatus": 0
        }],
        "lastOrders":[],
        "retunOdrs": false
    },
    {
        "isAdmin": false,
        "id": 2,
        "name":"Maged",
        "password": "123",
        "email": "ali@gmail.com",
        "wishlist":[] , 
        "shoppingCart":[
            {
            "cat_id": 1,
            "product_id": 2,
            "quantaty": 4,
            "PendingStatus": 1
            },
            {
                "cat_id": 1,
                "product_id": 3,
                "quantaty": 1,
                "PendingStatus": 0
            },
            {
                "cat_id": 1,
                "product_id": 1,
                "quantaty": 2,
                "PendingStatus": -1
            }
        ],
        "lastOrders":[],
        "retunOdrs": false
    },
    {
        "isAdmin": false,
        "id": 3,
        "name":"Sayed",
        "password": "123",
        "email": "ali@gmail.com",
        "wishlist":[] , 
        "shoppingCart":[{
            "cat_id": 4,
            "product_id": 10,
            "quantaty": 5,
            "PendingStatus": 1
        }],
        "lastOrders":[],
        "retunOdrs": false
    },
    {
        "isAdmin": false,
        "id": 4,
        "name":"Wesam",
        "password": "123",
        "email": "ali@gmail.com",
        "wishlist":[] , 
        "shoppingCart":[{
            "cat_id": 8,
            "product_id": 115,
            "quantaty": 10,
            "PendingStatus": 0
        }],
        "lastOrders":[],
        "retunOdrs": false
    },
    {
        "isAdmin": false,
        "id": 5,
        "name":"Samuel",
        "password": "123",
        "email": "ali@gmail.com",
        "wishlist":[] , 
        "shoppingCart":[{
            "cat_id": 1,
            "product_id": 5,
            "quantaty": 1,
            "PendingStatus": -1
        }],
        "lastOrders":[],
        "retunOdrs": false
    }
]

// we assume that in database , there are users with their shopping carts


let allProducts = document.getElementById('allProducts_id');// btn that shows all orrders
let newProducts = document.getElementById('newProductsId');// btn that shows new orders
let approvedProducts = document.getElementById('approvedPoducts_id');// btn that shows approved orders
let canceledProducts = document.getElementById('canceledProducts_id');// btn that shows canceled orders

allProducts.addEventListener('click' , (e)=>{
    addActiveClassToCurrentBtn(e.target);
    displayProducts(usersTemp , "all");
})

newProducts.addEventListener('click' , (e)=>{
    addActiveClassToCurrentBtn(e.target);
    displayProducts(usersTemp , "new");
})

approvedProducts.addEventListener('click' , (e)=>{
    addActiveClassToCurrentBtn(e.target);
    displayProducts(usersTemp , "approved");
})

canceledProducts.addEventListener('click' , (e)=>{
    addActiveClassToCurrentBtn(e.target);
    displayProducts(usersTemp , "canceled");
})


// this function add active class to specific element from the nav bar btns (all , new , approved , declined)
function addActiveClassToCurrentBtn(btn){
    // first remove the active class from all btns
    allProducts.classList.remove('active');
    newProducts.classList.remove('active');
    approvedProducts.classList.remove('active');
    canceledProducts.classList.remove('active');

    // then add the active class to your element
    btn.classList.add('active');
}

// this function displays all oreders of all users
// takes users as a parameter
function displayProducts(users , type){
    // this is table body where we will put our products information
    let myTbodyContainer = document.getElementById('tbody_productsInfo_id');
    myTbodyContainer.replaceChildren();// this function to clear entire body
    // the shopCart item contains , user id , and shopCart object contains
//  products(id, catID , quantity , status) added to cart
     users.forEach((user) => {

        user.shoppingCart.forEach((shopCartProduct) => {
            // this is the row that contains our order info
            let tableRow = document.createElement('tr');
            // conditions to display all or new or approved or declined orders
            if(type == "all")
                tableRow.classList.remove('d-none');
            else if(type == "new")
            {
                if(shopCartProduct.PendingStatus == 0)
                    tableRow.classList.remove('d-none');
                else
                    tableRow.classList.add('d-none');
            }
            else if(type == "approved")
            {
                if(shopCartProduct.PendingStatus == 1)
                    tableRow.classList.remove('d-none');
                else
                    tableRow.classList.add('d-none');
            }
            else if(type == "canceled")
            {
                if(shopCartProduct.PendingStatus == -1)
                    tableRow.classList.remove('d-none');
                else
                    tableRow.classList.add('d-none');
            }


            // first cell in the row : product id
            let productId = document.createElement('th');
            productId.innerText = shopCartProduct.product_id ;

            // second cell in the row : user name 
            let userName = document.createElement('td');
            userName.innerText = user.name ;

            // third cell in the row : product price
            let productPrice = document.createElement('td');
            productPrice.innerText = shopCartProduct.quantaty * 4500; // this should be handeled dynamically

            // fourth cell in the row : pay method
            let payMethod = document.createElement('td');
            payMethod.innerText = "PayPal";  // this should be handeled dynamically

            // fifth cell in the row : product quantity
            let productQuantitiy = document.createElement('td');
            productQuantitiy.innerText = shopCartProduct.quantaty;

            // sixth cell in the row : product status (pending = 0 , canceled = -1 , approved = 1)
            let productStatusTD = document.createElement('td');

            let productStatusDiv = document.createElement('div');

            let cancelApproveBtnsTD =  document.createElement('td'); // table cell contains the div that contains the two btns
            if(shopCartProduct.PendingStatus == 0)
            {
                productStatusDiv.className = "text-primary p-2 rounded-3 text-center badge text-decoration-none";
                productStatusDiv.innerText = "New";
                productStatusTD.appendChild(productStatusDiv);

                let cancelApproveBtnsDiv = document.createElement('div');// the div that contains the two btns
                cancelApproveBtnsDiv.className = "d-flex justify-content-around gap-1";

                // approve btn , contains icon and approve word
                let approveBtn = document.createElement('button'); 
                approveBtn.className = "btn btn-success d-flex gap-1 btn-color";

                let approveIcon = document.createElement('i');
                approveIcon.className = "bi bi-check-lg";

                let approveText =  document.createTextNode("Approve");

                approveBtn.appendChild(approveIcon);
                approveBtn.appendChild(approveText);

                // cancel btn , contains icon and cancel word
                cancelBtn = document.createElement('button'); // cancel btn , contains icon and cancel word
                cancelBtn.className = "btn btn-danger d-flex gap-1 ";

                let cancelIcon = document.createElement('i');
                cancelIcon.className = "bi bi-x-lg";

                let cancelText =  document.createTextNode("Decline");

                cancelBtn.appendChild(cancelIcon);
                cancelBtn.appendChild(cancelText);
                

                cancelApproveBtnsDiv.appendChild(approveBtn);// append approve btn
                cancelApproveBtnsDiv.appendChild(cancelBtn);// append decline btn
                cancelApproveBtnsTD.appendChild(cancelApproveBtnsDiv);// append the div that contains the two btns

            }
            else if(shopCartProduct.PendingStatus == 1)
            {
                productStatusDiv.className = "text-success p-2 rounded-3 text-center badge";
                productStatusDiv.innerText = "Approved";
                productStatusTD.appendChild(productStatusDiv);
            }
            else if(shopCartProduct.PendingStatus == -1)
            {
                productStatusDiv.className = "text-danger   p-2 rounded-3 text-center badge";
                productStatusDiv.innerText = "Declined";
                productStatusTD.appendChild(productStatusDiv);
            }

            tableRow.appendChild(productId);
            tableRow.appendChild(userName);
            tableRow.appendChild(productPrice);
            tableRow.appendChild(payMethod);
            tableRow.appendChild(productQuantitiy);
            tableRow.appendChild(productStatusTD);
            tableRow.appendChild(cancelApproveBtnsTD);
            
            myTbodyContainer.appendChild(tableRow);

        })

    })
}

// initial display : dispaly all products
displayProducts(usersTemp , "all");













// in case order status is pending , we have to create two buttons : cancel and approve
// if(status == 0){
    

// }





