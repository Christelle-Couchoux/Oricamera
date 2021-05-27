// get stored data from local storage

let storedOrders = JSON.parse(localStorage.getItem('ordersList'));
console.log(storedOrders);


// create cart

function createCart(){
    for (storedOrder of storedOrders){ // for each order in the array
        const tbody = document.getElementById('cart-tablebody'); // in the table
        
        // add one row
        const tr = tbody.appendChild(document.createElement('tr'));

        // add and fill in name cell
        const tdName = tr.appendChild(document.createElement('td'));
        tdName.classList.add('td-name', 'align-left');
        tdName.innerText = storedOrder.cameraName;

        // add and fill in lens cell
        const tdLens = tr.appendChild(document.createElement('td'));
        tdLens.classList.add('td-lens');
        tdLens.innerText = storedOrder.cameraLens;

        // add and fill in price cell
        const tdPrice = tr.appendChild(document.createElement('td'));
        tdPrice.classList.add('td-price', 'align-right');
        tdPrice.innerText = storedOrder.cameraPrice + ' €';

        // add and fill in quantity cell
        const tdQuantity = tr.appendChild(document.createElement('td'));
        tdQuantity.classList.add('td-quantity');
        tdQuantity.innerText = storedOrder.cameraQuantity;

        // add and fill in total cell
        const tdTotal = tr.appendChild(document.createElement('td'));
        tdTotal.classList.add('td-total', 'align-right');
        tdTotal.innerText = storedOrder.cameraPrice * storedOrder.cameraQuantity + ' €';
    }
    
};


// calculate total price
function priceCalculation(){
// put all prices in an array

let pricesArray = [];
for (storedOrder of storedOrders){ // for each order stored
    let price = storedOrder.cameraPrice; // get the price
    pricesArray.push(price); // put it in the array
};
console.log(pricesArray);


// add up all the prices
/* reducer function 
currentValue is each value in the array in turn
return value (sum) is put in accumulator for next iteration */
const reducer = (accumulator, currentValue) => accumulator + currentValue;

// reduce() execute the reducer function, from index 0
const totalPrice = pricesArray.reduce(reducer,0);
console.log(totalPrice);

//fill in total price cell
const thTotal = document.getElementById('total'); // in total price cell
thTotal.innerText = totalPrice + ' €';
}


// empty cart

const btnEmpty = document.getElementById('empty');

btnEmpty.addEventListener('click', function(event){ // listen to empty cart button
    localStorage.removeItem('ordersList'); // remove array with stored orders
    window.location.href = "cart.html"; // reload the page so changes taken into account
});


// save totalPrice in local storage for confirm page
function storeOrderTotal(){
    const storedTotal = localStorage.setItem('orderTotal', totalPrice);
    console.log(storedTotal);
}


// create object 'contact'
function createContact(){
    let contact = {
        firstName : firstname.value, // id de l'input .value
        lastName : lastname.value,
        address : address.value,
        city : city.value,
        email : email.value 
    }
    console.log(contact);
}


// create products array
function createProducts(){
    let products = [];
    for (storedOrder of storedOrders){
        let productId = storedOrder.cameraId;
        products.push(productId);
    }
    console.log(products);
}


// create object with contact + products array
function createObjectToSend(){
    let objectToSend = {
        contact,
        products
    }
    console.log(objectToSend);
}


// store order id

function storeOrderId(data){
    console.log(data.orderId);
    localStorage.setItem('orderId'. data.orderId);
    window.location = 'confirm.html';
    localStorage.removeItem('OrdersList')
}


// send data to server

function send(objectToSend){ // function to send order to server 
    fetch('http://localhost:3000/api/cameras/order', {
        method : "POST",
        headers : {
            'Accept' : 'application/json',
            'Content-type' : 'application/json',
        },
        body : JSON.stringify(objectToSend)
    })

    .then (function (response) {
        if (response.ok) { // if response ok
            return response.json(); //return response (promise)
        }
    })

    .then(function (serverResponse){ // resolved promise 
        console.log(serverResponse); // print object
        storeOrderId(serverResponse); // call function createProduct
    })

    .catch (function(err){
        console.error('Erreur lors de la requête : ', err); // print error message in console
        const model = document.getElementById('model'); // in div id="model"
        const error = model.appendChild(document.createElement('div')); // create div error
        error.classList.add('error'); // with class="error" to add css style
        error.innerText = 'Une erreur est survenue lors de la réponse serveur.'; // with error message text
    }); 
}


// validate order

const firstname = document.getElementById('firstname');
const lastname = document.getElementById('lastname');
const address = document.getElementById('address');
const city = document.getElementById('city');
const email = document.getElementById('email');

function validateOrder(){
    const submit = document.getElementById('submit');
    submit.addEventListener("click", function (event) {
        if ( isValid(firstname.value) && isValid(lastname.value) && isValid(address.value) 
            && isValid(city.value) && isValid(email.value) ){
            storedOrderTotal();
            createContact();
            createProducts();
            createObjectToSend();
            send(objectToSend);
        }
    })
}



// call functions

createCart();
validateOrder();

