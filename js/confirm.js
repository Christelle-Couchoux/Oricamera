// get stored data from local storage

function getStoredData() {
    // order id
    let orderId = localStorage.getItem('orderId');
    //console.log(orderId);

    // order total price
    let orderTotal = localStorage.getItem('orderTotal');
    //console.log(orderTotal);

    if(orderId && orderTotal) {
        displayOrderDetails(orderId, orderTotal); // call function to add retrieved data to page
        clearStorage(); //cal function to empty cart
    }
}


// fill in order details

function displayOrderDetails(orderId, orderTotal) {
    // id
    const summaryOrderId = document.getElementById('order-id');
    summaryOrderId.innerText = orderId;

    // total
    const summaryOrderTotal = document.getElementById('order-total');
    summaryOrderTotal.innerText = orderTotal + ' €';
}


// clear localStorage

function clearStorage() { // once order is confirmed, clear cart
    localStorage.clear();
    //console.log (localStorage.length);
}


////////////


// call functions

getStoredData();
