const url = 'http://localhost:3000/api/cameras'

// create products list

function getItems(){ // function to get items from api and display them as a list
    fetch(url)
        .then (function (response) {
            if (response.ok) { // if response ok
                return response.json(); //return response (promise)
            }
        })

        .then (function createList (products){ // function to create and fill in the html elements
            console.log(products);
            for (product of products){ // for each object in the array items
                
                // create div "item"
                const divItems = document.getElementById('items'); // in div id="items"
                const divItem = divItems.appendChild(document.createElement('div')); // create div in div items
                divItem.classList.add('item'); // with class="item"
                
                // create h4 item__name
                const h4 = divItem.appendChild(document.createElement('h4')); // create h4 in div item
                h4.classList.add('item__name'); //with class = "item__name"
                h4.innerText = product.name; // fill in with name retrieved from api
                
                // create div item__image
                const divImg = divItem.appendChild(document.createElement('div')); // create div image in div item
                divImg.classList.add('item__image'); // with class="item__image"
                
                // create img
                const img = divImg.appendChild(document.createElement('img')); // create element img in div image
                img.setAttribute('src', product.imageUrl); // with attribute src="url"
                img.setAttribute('alt', 'Photo du modèle ' + product.name); // with attibute alt="Photo du modèle xxx", xxx is name retrieved from api
                
                // create link a
                const a = divItem.appendChild(document.createElement('a')); // create link in div item
                a.setAttribute('href', 'product.html#' + product._id); // link to product.html page for specific product
                
                // create div item__btn
                const btn = a.appendChild(document.createElement('div')); // create div in a
                btn.classList.add('item__btn'); // with class="item__btn"
                
                // create p
                const p = btn.appendChild(document.createElement('p')); // create p in div btn
                p.innerText = 'Voir ce modèle'; // create btn text   
            }
        })    

        .catch (function(err){
            console.error('Erreur lors de la requête : ', err); // print error message in console
            const productsList = document.getElementById('products-list'); // in section id="products-list"
            const error = productsList.appendChild(document.createElement('div')); // create div error
            error.classList.add('error'); // with class="error" to add css style
            error.innerText = 'Une erreur est survenue lors du chargement des produits.'; // with error message text
        });
         
}

getItems();
