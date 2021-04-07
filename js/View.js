class View {

/*******************************PAGE D'ACCEUIL ********************************/

    showListProduct(listProduct) {
        Controller.displayBasketCount();
        if(listProduct.length<0){
            for (let i=0; i<listProduct.length; i++){
                let linkProduct=listProduct[i];
                let viewProduct=listProduct[i];
                let viewImage=listProduct[i];
                document.getElementById("container").innerHTML+=`
                    <a href= "ficheProduit.html?id=${listProduct[i]._id}" aria-label="lien vers le produit">
                        <article>
                            <div>
                                <img src="${listProduct[i].imageUrl}" alt="Nounours ${listProduct[i].name}"/>
                                <h2>${listProduct[i].name}</h2>
                            </div>
                        </article>
                    </a>`;
            }
        } else {
            document.getElementById("container").innerHTML=`
            <article> 
                <h2>Problème technique<h2>
                <p> En raison d’un problème technique nous ne sommes pas en mesure de vous présenter nos produits.</br>
                Veuillez nous excuser de la gêne occasionnée.</p>
            </article>
            `;   
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
                    <img src="${detailProduct.imageUrl}" alt="Nounours ${detailProduct.name}"/>
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
    buyProduct(productsBought) {
        for (let productBought of productsBought){
            document.getElementById("listProductBought").innerHTML += `
            <article class="basket">
                <div><img src= "${productBought.imageUrl}" alt="Nounours ${productBought.name}"/></div>
                <h2>${productBought.name}</h2>
                <p>${productBought.price/100}€</p>
                <button id="${productBought.uniqueId}" onclick="Controller.deleteBasketLine(this);">Retirer du panier</button>
            </article>`;
        } 
        document.getElementById("listProductBought").innerHTML +=`
        <article class="basket">
            <h2>Total du panier : </h2>
            <p id="totalPrice"></p>
        </article>`;
        Controller.displayTotalPrice();
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
        if(commandNumber==null || commandNumber==undefined){
            document.getElementById("orderText").innerHTML = 
            "Problème lors de l'envoi de votre commande";
            document.getElementById("command").innerHTML +=`
                <div class="errorCommand">
                    <p>Malheureusement l'envoi de votre commande a rencontré un problème technique.</br> 
                    Nous vous prions de nous en excuser.</p>
                    <p>Vous pouvez réitérer votre commande en retournant au panier.</p>
                    <button onclick="Controller.goToBasket(this);">Retourner au panier</button>
                </div>
                `;
        } else{
            document.getElementById("command").innerHTML += `
            <div class="commandConfirmation">
                <p>Votre numéro de commande est le : </p>
                <p class="commandNumber"> ${commandNumber}</p>
            </div>
            <p id="totalPrice">Prix total de votre commande: ${totalPrice}€</p>
        `; 
        }   
    }
}