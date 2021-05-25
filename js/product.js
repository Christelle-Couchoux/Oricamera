// url for selected product

const hashId = window.location.hash; // hashId = part of the url that corresponds to the product
const noHashId = hashId.replace("#", ""); // remove # so only id left
const url = 'http://localhost:3000/api/cameras/' + noHashId;


// function generate product page

function getProduct(){ // function to get product details from api and display them
    fetch(url)
        .then (function (response) {
            if (response.ok) { // if response ok
                return response.json(); //return response (promise)
            }
        })

        .then(function createProduct(product){
            console.log(product);

            // fill in name
            const h4 = document.getElementsByClassName('info__name'); // element for product name
            h4.innerText = product.name; // add name

            // fill in image attributes
            const img = document.querySelector('.info__image img'); //element for product photo
            img.setAttribute('src',product.imageUrl); // add url
            img.setAttribute('alt', product.name); // add alt

            // fill in description
            const description = document.getElementsByClassName('.info__description'); // element for product description
            description.innerText = product.description; // add descriptiom

            // fill in price
            const price = document.getElementsByClassName('.info__price'); // element for product price
            price.innerText = product.price / 100 + ' €'; // add price in euros

            // create and fill in lenses options
            const select = document.getElementById('lens-selection'); // element for lenses list
            for (lens of product.lenses){ // for each lens option
                let option = select.appendChild(document.createElement('option')); // create an option in select element
                option.setAttribute('value', lens); // with lens name in value attribute 
                option.innerText = lens; // add lens name to the option
            }


            // add product to cart
            const addtocart = document.getElementById('addtocart'); // element 'add to cart' button
            const selectedLens = document.getElementById('lens-selection'); 
            const quantity = document.getElementById('quantity');

            // listen to 'add to cart' button
            addtocart.addEventListener('click', function(event){ // listen to click on button 'add to cart'
                
                // when button is clicked, create order constant 'chosenCamera'
                const chosenCamera = { 
                    cameraId: product._id,
                    cameraName: product.name,
                    cameraLens: selectedLens.value,
                    cameraQuantity: quantity.value,
                    cameraPrice: product.price / 100,
                };
                console.log(chosenCamera);

                // store order in local storage
                /* local storage stores the array 'storedOrders', 
                with the key 'ordersList' and the value 'JSON.stigify(storedOrders)' */ 
                let storedOrders = JSON.parse(localStorage.getItem('ordersList')); // get the array out of local storage, change it to js and put it in a variable
                if (storedOrders) { // if the array already exists in local storage
                    storedOrders.push(chosenCamera); // add new order to array
                    localStorage.setItem('ordersList', JSON.stringify(storedOrders)); // send the array back to local storage (changed to json)
                    console.log(storedOrders);
                    window.location.href = "cart.html"; // go to cart page
                } else { // if the array does not exist yet
                    storedOrders = []; // create the array (empty)
                    storedOrders.push(chosenCamera); // put the new order in it
                    localStorage.setItem('ordersList', JSON.stringify(storedOrders)); // send the array to local storage (changed to json)
                    console.log(storedOrders);
                    window.location.href = "cart.html"; // go to cart page
                }

                /* 
                something wrong/misisng in there 
                --> add to cart should be impossible without chosing a lens
                --> should go to cart page when product with lens added to cart
                */

            })
        })

        .catch (function(err){
            console.error('Erreur lors de la requête : ', err); // print error message in console
            const model = document.getElementById('model'); // in div id="model"
            const error = model.appendChild(document.createElement('div')); // create div error
            error.classList.add('error'); // with class="error" to add css style
            error.innerText = 'Une erreur est survenue lors du chargement du produit.'; // with error message text
        });
    
}  


getProduct();



