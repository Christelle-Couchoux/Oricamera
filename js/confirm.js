// get stored data from local storage

// order id
let orderId = localStorage.getItem('orderId');
console.log(orderId);

// order total price
let orderTotal = localStorage.getItem('orderTotal');
console.log(orderTotal);


// fill in order details

// id
const summaryOrderId = document.getElementById('order-id');
summaryOrderId.innerText = orderId;

// total
const summaryOrderTotal = document.getElementById('order-total');
summaryOrderTotal.innerText = orderTotal;


// clear localStorage

localStorage.clear();
