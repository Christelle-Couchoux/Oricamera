// get items from API

const url = 'http://localhost:3000/api/cameras';

fetch(url)
    .then(function(response) {
        if(response.ok) { // if response ok
            return response.json(); //return response (promise)
        }
    })

    .then(function(products) { // value of resolved promise is the array 'products'
        console.log(products); // print array
        createList(products); // call function to create products list
    })

    .catch(function(err) {
        console.error('Erreur lors de la requête : ', err); // print error message in console
        const productsList = document.getElementById('products-list'); // in section id="products-list"
        const error = productsList.appendChild(document.createElement('div')); // create div error
        error.classList.add('error'); // with class="error" to add css style
        error.innerText = 'Une erreur est survenue lors du chargement des produits.'; // with error message text
    });


// create products list

function createList(products) {
    for(product of products) { // for each object in the array products

        // create div "item"
        const divItems = document.getElementById('items'); // in div id="items"
        const divItem = divItems.appendChild(document.createElement('div')); // create div in div items
        divItem.classList.add('item'); // with class="item"

        // create h4 item__name
        const h4 = divItem.appendChild(document.createElement('h4')); // create h4 in div item
        h4.classList.add('item__name'); // with class = "item__name"
        h4.innerText = product.name; // fill in with name retrieved from api

        // create div item__image
        const divImg = divItem.appendChild(document.createElement('div')); // create div image in div item
        divImg.classList.add('item__image'); // with class="item__image"

        // create img
        const img = divImg.appendChild(document.createElement('img')); // create element img in div image
        img.setAttribute('src', product.imageUrl); // with attribute src="url"
        img.setAttribute('alt', 'Photo du modèle ' + product.name); // with attibute alt="Photo du modèle xxx"

        // create url for product.html page for specific product
        let indexUrl = new URL(window.location.href); // get current url
        console.log(indexUrl);
        let indexUrlString = indexUrl.toString(); // convert to string
        console.log(indexUrlString);
        let productUrlString = indexUrlString.replace('index', 'product'); // change index to product
        console.log(productUrlString);
        let productUrl = new URL(productUrlString); // convert back to url
        console.log(productUrl);
        productUrl.searchParams.set('id', product._id); // add the parameter 'id', with the product id as value
        console.log(productUrl);

        // create link a
        const a = divItem.appendChild(document.createElement('a')); // create link in div item
        a.setAttribute('href', productUrl);
        a.setAttribute('title', 'Page du modèle ' + product.name); // with attibute Title="Page du modèle xxx"

        // create div item__btn
        const btn = a.appendChild(document.createElement('div')); // create div in a
        btn.classList.add('item__btn'); // with class="item__btn"

        // create p
        const input = btn.appendChild(document.createElement('input')); // create input in div btn
        input.setAttribute('type', 'button'); // with attribute type="button"
        input.setAttribute('value', 'Voir ce modèle') // with attribute value="voir ce modèle"
    }
}
