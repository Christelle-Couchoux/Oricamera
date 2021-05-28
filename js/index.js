const url = 'http://localhost:3000/api/cameras'


// get items from API

fetch(url)
    .then (function (response){
        if (response.ok) { // if response ok
            return response.json(); //return response (promise)
        }
    })

    .then (function (products){ // value of resolved promise is the array 'products'
        console.log(products); // print array
        createList(products); // call function createList
    })

    .catch (function (err){
        console.error('Erreur lors de la requête : ', err); // print error message in console
        const productsList = document.getElementById('products-list'); // in section id="products-list"
        const error = productsList.appendChild(document.createElement('div')); // create div error
        error.classList.add('error'); // with class="error" to add css style
        error.innerText = 'Une erreur est survenue lors du chargement des produits.'; // with error message text
    })


// create products list
    
function createList (products){ // function to create and fill in the html elements with data from array 'products'
    for (product of products){ // for each object in the array products
            
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
        img.setAttribute('alt', 'Photo du modèle ' + product.name); // with attibute alt="Photo du modèle xxx"
        
        // create link a
        //set attribute href for link to product.html page for specific product 
        const a = divItem.appendChild(document.createElement('a')); // create link in div item

        
        //a.setAttribute('href', 'product.html/?id=' + product._id);
        
        let url = new URL('http://product.html/');
        url.searchParams.set('id', product._id);
        console.log(url);

        a.setAttribute('href', url);



        /*
        
        let url = new URL('http://product.html/');
        url.searchParams.append('id', product._id);
        console.log(url);

        a.setAttribute('href', url);
         */
        
        // create div item__btn
        const btn = a.appendChild(document.createElement('div')); // create div in a
        btn.classList.add('item__btn'); // with class="item__btn"
        
        // create p
        const input = btn.appendChild(document.createElement('input')); // create input in div btn
        input.setAttribute('type', 'button'); // with attribute type="button"
        input.setAttribute('value', 'Voir ce modèle') // with attribute value="voir ce modèle" 
    }                
}           
