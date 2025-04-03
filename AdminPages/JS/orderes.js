

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

// adding events to tab btns (all , new , approved , canceled)
function addEventsToTabBtns(){

    let allProducts = document.getElementById('allProducts_id');// btn that shows all orrders
    let newProducts = document.getElementById('newProductsId');// btn that shows new orders
    let approvedProducts = document.getElementById('approvedPoducts_id');// btn that shows approved orders
    let canceledProducts = document.getElementById('canceledProducts_id');// btn that shows canceled orders

    let btnsArray = [allProducts, newProducts, approvedProducts, canceledProducts];

    allProducts.addEventListener('click' , (e)=>{
        // this function add active class to specific element from the nav bar btns (all , new , approved , declined)
        addActiveClassToCurrentBtn(btnsArray , e.target);
        displayProductsByStatus();// this function displays products depends on the tab
    })

    newProducts.addEventListener('click' , (e)=>{
        debugger;
        addActiveClassToCurrentBtn(btnsArray, e.target);
        displayProductsByStatus(0);
    })

    approvedProducts.addEventListener('click' , (e)=>{
        addActiveClassToCurrentBtn(btnsArray, e.target);
        displayProductsByStatus(1);
    })
    
    canceledProducts.addEventListener('click' , (e)=>{
        addActiveClassToCurrentBtn(btnsArray , e.target);
        displayProductsByStatus(-1);
    })
}

// this function add active class to specific element from the nav bar btns (all , new , approved , declined)
function addActiveClassToCurrentBtn(btns , currentBtn){
    // first remove the active class from all btns
    btns.forEach( btn => {btn.classList.remove('active')})

    // then add the active class to your element
    currentBtn.classList.add('active');
}

// this function displays all oreders of all users
// takes users as a parameter
function createProductsInHtml(users){
    // this is table body where we will put our products information
    let myTbodyContainer = document.getElementById('tbody_productsInfo_id');

    // the shopCart item contains , user id , and shopCart object contains
    //  products(id, catID , quantity , status) added to cart
     users.forEach((user) => {

        user.shoppingCart.forEach((shopCartProduct) => {
            // this is the row that contains our order info
            let tableRow = document.createElement('tr');
            tableRow.id = `row_${user.id}_${shopCartProduct.cat_id}_${shopCartProduct.product_id}`;

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
                approveBtn.className = "btn btn-success d-flex gap-1 btn-color approve";
                approveBtn.id = `user_${user.id}_cat_${shopCartProduct.cat_id}_prod_${shopCartProduct.product_id}_1`;

                let approveIcon = document.createElement('i');
                approveIcon.className = "bi bi-check-lg";

                let approveText =  document.createTextNode("Approve");

                approveBtn.appendChild(approveIcon);
                approveBtn.appendChild(approveText);

                // cancel btn , contains icon and cancel word
                cancelBtn = document.createElement('button'); // cancel btn , contains icon and cancel word
                cancelBtn.className = "btn btn-danger d-flex gap-1 cancel";
                cancelBtn.id = `user_${user.id}_cat_${shopCartProduct.cat_id}_prod_${shopCartProduct.product_id}_2`;


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

// this function displays products depending on status
// if status = 1      => displays approved  orders
// if status = 0      => displays pending   orders
// if status = -1     => displays canceled  orders
// if status = none   => displays All   orders
function displayProductsByStatus(status){
    usersTemp.forEach( user => {
        user.shoppingCart.forEach( product => {
            let productRow = document.getElementById(`row_${user.id}_${product.cat_id}_${product.product_id}`);
            if(product.PendingStatus == status || status == undefined)
                productRow.classList.remove('d-none');
            else
                productRow.classList.add('d-none');
        })
    })
}

// this function is to add events to both approve and cancel btns
function addEventsToApproveAndCancelBtns(){
    // we get all approve btns
    let approveBtns = document.querySelectorAll('.approve');
    // we get all cancel btns
    let cancelBtns = document.querySelectorAll('.cancel');

    // adding the events here to approve btns
    approveBtns.forEach( approveBtn => {
        approveBtn.addEventListener('click' , (e) => {
            approveAndCancelBtnAction( 1 , e.target);
        })
    })

    // adding the events here to cancel btns
    cancelBtns.forEach( cancelBtn => {
        cancelBtn.addEventListener('click' , (e) => {
            approveAndCancelBtnAction( -1 , e.target);
        })
    })
}

// this function is called when the approve or cancel btns clicked
// it takes state : it is 1 if approved , and -1 if canceled
// it takes the btn clicked
function approveAndCancelBtnAction(state , btn){
    // the button has id that consists of : userID , catID , prodID
    let btnId = btn.id.split('_');
    userId =  btnId[1];
    catId = btnId[3];
    prodId = btnId[5];

    // when the button clicked we update the product status depending on the btn clicked
    // we update specific prod in specific category in specific user
    updateOrderStatus(userId , catId, prodId , state);

    // here i get the current tab that we are on (all , new , approved , canceled)
    let currentTab =  document.querySelector('.active').innerHTML;
    
    // depending on our tab , i refresh the table to be displayed with latest update
    if(currentTab == "New")
        displayProductsByStatus(0); // in case of we are in new tab
    else if(currentTab == "Approved")
        displayProductsByStatus(1); // in case of we are in approved tab
    else if(currentTab == "Canceled")
        displayProductsByStatus(-1); // in case of we are in canceled tab 
    else
        displayProductsByStatus(); // in case of we are in all tab
}

// function to update the product status (approve / cancel)
function updateOrderStatus(userId , catId , prodID , status){
    // finding the user with his id
    let myUser =  usersTemp.find( user => user.id == userId );
    // then finding the product in his shopping cart
    let myProduct = myUser.shoppingCart.find( product =>
                    (product.cat_id == catId) && (product.product_id == prodID) );
    // then we update the product status
    myProduct.PendingStatus = status;

    // we update the row that contains this product
    myRow = document.getElementById(`row_${userId}_${catId}_${prodID}`);    
    myRow.removeChild(myRow.lastElementChild); // we removed approve and cancel btns from the row

    // in case of status approved = 1
    if(status == 1)
    {
        // we change the status to approved
        myRow.lastElementChild.lastElementChild.innerHTML = "Approved";
        myRow.lastElementChild.lastElementChild.className = "text-success p-2 rounded-3 text-center badge";    
    }
    // in case of status canceled = -1
    else if(status == -1){
        // we change the status to canceled
        myRow.lastElementChild.lastElementChild.innerHTML = "Canceled";
        myRow.lastElementChild.lastElementChild.className = "text-danger   p-2 rounded-3 text-center badge";    
    }
   
}

// add events to tab btns (all , new , approved , canceled)
addEventsToTabBtns();

// initial display : dispaly all products
createProductsInHtml(usersTemp);

// add events to both approve and cancel btns 
addEventsToApproveAndCancelBtns();









