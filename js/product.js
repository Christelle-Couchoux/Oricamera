// url for selected product
let productUrl = new URL(window.location.href); // get current url
console.log(productUrl);
let id = productUrl.searchParams.get('id'); // get the value (= product id) of the parameter 'id'
console.log(id);


// get product details from API

const url = 'http://localhost:3000/api/cameras/' +id; // add product id 'id' to api url
console.log(url);

fetch(url)
    .then(function(response) {
        if(response.ok) { // if response ok
            return response.json(); //return response (promise)
        }
    })

    .then(function(product) { // value of resolved promise is the object 'product'
        console.log(product); // print object
        createProduct(product); // call function to display poduct details
        listenToAddToCart(product); // call function to listen to click on 'ajouter au panier' button
    })

    .catch(function(err) {
        console.error('Erreur lors de la requête : ', err); // print error message in console
        const model = document.getElementById('model'); // in div id="model"
        const error = model.appendChild(document.createElement('div')); // create div error
        error.classList.add('error'); // with class="error" to add css style
        error.innerText = 'Une erreur est survenue lors du chargement du produit.'; // with error message text
    });


// create product info

function createProduct(product) { // display info from object 'product'

    // create and fill in name
    const info = document.getElementById('div-info');
    const h4 = info.appendChild(document.createElement('h4')); // element h4 for product name
    h4.classList.add('info__name'); // with class="info__name"
    h4.innerText = product.name; // add name

    // create and fill in image
    const divImg = info.appendChild(document.createElement('div')); // create div image
    divImg.classList.add('info__image'); // with class="info__image"
    const img = divImg.appendChild(document.createElement('img')); // create element img
    img.setAttribute('src', product.imageUrl); // with attribute src="url"
    img.setAttribute('alt', 'Photo du modèle ' + product.name); // with attibute alt="Photo du modèle xxx"

    // fill in description
    const description = info.appendChild(document.createElement('p')); // create p description
    description.classList.add('info__description'); // with class="info__description"
    description.innerText = product.description; // add description

    // fill in price
    const price = info.appendChild(document.createElement('p')); // create p price
    price.classList.add('info__price'); // with class="info__price"
    price.innerText = product.price / 100 + ' €'; // add price in euros

    // create and fill in lenses options
    const select = document.getElementById('lens-selection'); // element for lenses list
    for(let lens of product.lenses) { // for each lens option
        let option = select.appendChild(document.createElement('option')); // create an option in select element
        option.setAttribute('value', lens); // with lens name in value attribute
        option.innerText = lens; // add lens name to the option
    }
}


// listen to click on 'add to cart' button

function listenToAddToCart(product) { // 'product' in parameter because createOrder needs it
    const btnAddtocart = document.getElementById('addtocart');
    btnAddtocart.addEventListener('click', function(event){
        event.preventDefault();
        createOrder(product); // call function to create the order
    })
}


// create order (if lens selected)

function createOrder(product) {
    const select = document.getElementById('lens-selection');
    const isValidLens = select.checkValidity();

    if(isValidLens) { // if a lens is selected
        console.log(isValidLens);

        // create order 
        // declare class Camera
        class Camera { 
            constructor(cameraId, cameraName, cameraLens, cameraQuantity, cameraPrice) {
                this.cameraId = cameraId;
                this.cameraName = cameraName;
                this.cameraLens = cameraLens;
                this.cameraQuantity = cameraQuantity;
                this.cameraPrice = cameraPrice; 
            }
        }
        // create new instance of class Camera
        let chosenCamera = new Camera(product._id, product.name, select.value, quantity.value, product.price / 100);
        console.log(chosenCamera);

        storeOrder(chosenCamera); // call function to store order in local storage
    } else {
        alert('Veuillez choisir un objectif.');
    }
}


// store order in localStorage

/* local storage stores the array 'storedOrders',
with the key 'ordersList' and the value 'JSON.stigify(storedOrders)' */

function storeOrder(object) {
    let storedOrders = JSON.parse(localStorage.getItem('ordersList')); // get the array out of local storage, change it to js and put it in a variable
    if(storedOrders) { // if the array already exists in local storage
        storedOrders.push(object); // add new order to array
        localStorage.setItem('ordersList', JSON.stringify(storedOrders)); // send the array back to local storage (changed to json)
        console.log(storedOrders);
        window.location.href = 'cart.html'; // go to cart page
    } else { // if the array does not exist yet
        storedOrders = []; // create the array (empty)
        storedOrders.push(object); // put the new order in it
        localStorage.setItem('ordersList', JSON.stringify(storedOrders)); // send the array to local storage (changed to json)
        console.log(storedOrders);
        window.location.href = 'cart.html'; // go to cart page
    }
}
