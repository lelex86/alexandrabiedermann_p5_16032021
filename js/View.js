class View {


/*******************************PAGE D'ACCEUIL ********************************/


    showListProduct(listProduct) {
        Controller.displayBasketCount();   
        for (let i=0; i<listProduct.length; i++){
            let linkProduct=listProduct[i];
            let viewProduct=listProduct[i];
            let viewImage=listProduct[i];
            document.getElementById("container").innerHTML+=`
                <a href= "ficheProduit.html?id=${listProduct[i]._id}">
                    <article>
                        <div>
                            <img src="${listProduct[i].imageUrl}"/>
                            <h2>${listProduct[i].name}</h2>
                        </div>
                    </article>
                </a>`;
        } 
    }

    /***********************PAGE ARTICLE INDIVIDUEL **************************/

    // On affiche le produit récuperé avec l'Id + l'URL via notre controller
    showDetailProduct(detailProduct) {
        Controller.displayBasketCount();
        document.getElementById("container").innerHTML =`
            <h1>${detailProduct.name}</h1>
            <section class="detailProduct">
                <div>
                    <img src="${detailProduct.imageUrl}"/>
                </div>
                <div>
                    <p>${detailProduct.description}</p>
                    <p>${detailProduct.price/100}€</p>
                    <select id="select">
                        <option>Veuillez choisir une personalisation</option>
                    <select>
                    <button type="submit" id="button"> Ajouter au panier </button>
                </div>
            </section>`;
        for (let i=0; i<detailProduct.colors.length; i++){
            document.getElementById("select").innerHTML +=`
                <option>${detailProduct.colors[i]}</option>`;
        }
        Controller.addToBasket(detailProduct);
    }
 
    /*******************************PAGE PANIER ********************************/

    // Nous recupérons les données des produits achetés pour les afficher dans la page panier
    buyProduct(productBought) {
        let panier= JSON.parse(localStorage.getItem("panier"));
        for (let i=0; i<productBought.length; i++){
            document.getElementById("listProductBought").innerHTML += `
            <article id="product${+ i}" class="basket">
                <div><img src= "${productBought[i].imageUrl}"/></div>
                <h2>${productBought[i].name}</h2>
                <p>${productBought[i].price/100}€</p>
                <button id="${productBought.uniqueId}" onclick='Controller.deleteBasketLine(this)">Retirer du panier</button>
            </article>`;
        }
        document.getElementById("listProductBought").innerHTML +=`
        <article class="basket">
            <h2>Total du panier : </h2>
            <p id="totalPrice"></p>
        </article>`;
        Controller.displayTotalPrice();
        //Controller.removeFromBasket();
    }
    errorBasket() {
        document.getElementById("listProductBought").innerHTML +=`
        <article class="errorBasket">
            <h2>Panier vide!</h2>
            <p><i class="fas fa-times-circle"></i></p>
            <p> Il semblerait que vous ayez atteri ici par erreur. Séléctionnez au moins un de nos ours avant de revenir ici</p>
            <button onclick="Controller.goToIndex(this)">Retourner à l'acceuil</button>
        </article>`;
        document.getElementById("form").style.display="none";
        
    }

    /***************************PAGE DE CONFIRMATION ***************************/

    // Page finale avec les données que nous prenons du POST ainsi que le total de la commande
    productOrder(postOrder) {
        
        let totalPrice=postOrder[1];
        let commandNumber=postOrder[0];
        document.getElementById("command").innerHTML += `
            <p id="commandNumber">Votre numéro de commande est le: ${commandNumber}</p>
            <p id="totalPrice">Prix total de votre commande: ${totalPrice}€</p>
        `; 
    }
}