let carts = document.querySelectorAll('.add-cart');

let products = [
    {
        name:'Air Jordan Low Travis Scott',
        tag:'airjordanlowtravisscott',
        prix:150,
        inCart: 0
    },
    {
        name:'Nike Dunk Low',
        tag:'nnikedunklow',
        prix:110,
        inCart: 0
    },
    {
        name:'New Balance 530',
        tag:'newbalance530',
        prix:90,
        inCart: 0
    },
    {
        name:'Maillot Russell Wilson - Seattle Seahawks',
        tag:'maillotrussellwilson',
        prix:150,
        inCart: 0
    },
    {
        name:"Maillot A'ja Wilson - Las Vegas Aces",
        tag:'maillotajawilson',
        prix:110,
        inCart: 0
    },
    {
        name:'Maillot Lamelo Ball - Charlotte Hornets',
        tag:'maillotlameloball',
        prix:110,
        inCart: 0
    }
];



for(let i=0; i < carts.length; i++) {
    carts[i].addEventListener('click', () => {
        cartNombres(products[i]);
        prixTotal(products[i])
    })
}

function OnLoadCartNombres(){
    let productNombres = localStorage.getItem('cartNombres');

    if(productNombres){
        document.querySelector('.cart span').textContent = productNombres;
    }
}

function cartNombres(product) {
   
    let productNombres = localStorage.getItem('cartNombres');
    productNombres = parseInt(productNombres);

        /**condition si il y a item(s) dans le stockage local, si oui +1 , si non mettre 1 item . Puis afficher le nombre d'item dans le panier au niveau de la navbar*/

    if(productNombres){
        localStorage.setItem('cartNombres', productNombres + 1);
        document.querySelector('.cart span').textContent = productNombres + 1;


    } else {
        localStorage.setItem('cartNombres', 1);
        document.querySelector('.cart span').textContent = 1;

    }

    setItems(product);
}

function setItems(product){
    let cartItems = localStorage.getItem('productsInCart');
    cartItems= JSON.parse(cartItems);

    /**--------convertir json en js normal---------- */

    if(cartItems !=null){
        if(cartItems[product.tag] == undefined){
            cartItems ={
                ...cartItems,
                [product.tag]: product
            }
        }
        cartItems[product.tag].inCart +=1; 
    } else {
        product.inCart =1;
        cartItems= {
            [product.tag]: product
        }
    }
    localStorage.setItem("productsInCart", JSON.stringify (cartItems))
}

function prixTotal(product){
    /**console.log("Le prix est", product.prix);*/
    let cartPrix = localStorage.getItem('prixTotal');
    
    console.log("Mon cartPrix est", cartPrix);

    if (cartPrix != null) {
        cartPrix = parseInt(cartPrix);
        localStorage.setItem("prixTotal", cartPrix + product.prix);
    } else{
        localStorage.setItem("prixTotal", product.prix);
    }

    
}

/**----------page panier-------------  */

function displayCart() {
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector(".products");
    let cartPrix = localStorage.getItem('prixTotal');

    console.log(cartItems);
    if(cartItems && productContainer) {
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
            <div class="product">
                <ion-icon name="close-circle-outline"></ion-icon>               
                <img src="index.html/images/${item.tag}jpg">
                <span>${item.name}</span>
            </div>
            <div class="prix">$${item.prix},00</div>
            <div class"quantité>
                <ion-icon name="chevron-back-circle-outline"></ion-icon>
                <span>${item.inCart}</span>
                <ion-icon name="chevron-forward-circle-outline"></ion-icon>
            </div>
            <div class="total">
                $${item.inCart * item.prix},00
            </div>
            `;

        });

        productContainer.innerHTML += `
            <div class="basketTotalContainer">
                <h4 class="basketTotalTitle">
                    Basket Total
                </h4>
                <h4 class="basketTotal">
                    $${cartPrix},00
                </h4>
            `
    }
}

/**permet d'avoir toujours les items mis dans le panier, m^ après refresh de la page */
OnLoadCartNombres();
displayCart();