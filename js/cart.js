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


// empty cart

const btnEmpty = document.getElementById('empty');

btnEmpty.addEventListener('click', function(event){ // listen to empty cart button
    localStorage.removeItem('ordersList'); // remove array with stored orders
    window.location.href = "cart.html"; // reload the page so changes taken into account
});


// verify form
// with element.checkValidity

// save totalPrice in local storage for confirm page

// create object 'contact'

// create products array

// create object with contact + products array

// send data to server with fetch method POST
// if ok save order id in local storage
// and go to confirm page











createCart();

