// get stored data from local storage

function getStoredData() {
    // order id
    let orderId = localStorage.getItem('orderId');
    console.log(orderId);

    // order total price
    let orderTotal = localStorage.getItem('orderTotal');
    console.log(orderTotal);

    fillInOrderDetails(orderId, orderTotal); // call function to add retrieved data to page
}


// fill in order details

function fillInOrderDetails(orderId, orderTotal) {
    // id
    const summaryOrderId = document.getElementById('order-id');
    summaryOrderId.innerText = orderId;

    // total
    const summaryOrderTotal = document.getElementById('order-total');
    summaryOrderTotal.innerText = orderTotal + ' €';
}


////////////


// clear localStorage

function clearStorage() { // once order is confirmed, clear cart
    localStorage.clear();
}


////////////


// call functions

getStoredData();
clearStorage();
