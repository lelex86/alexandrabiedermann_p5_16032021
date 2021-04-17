class View {

/*******************************PAGE D'ACCEUIL ********************************/

    showListProduct(listProduct) {
        Controller.displayBasketCount();
        if(listProduct.length>0){
            for (let i=0; i<listProduct.length; i++){
                document.getElementById("container").innerHTML+=/*html*/`
                    <a href= "fiche-produit.html?id=${listProduct[i]._id}" aria-label="lien vers le produit">
                        <article>
                            <div>
                                <img src="${listProduct[i].imageUrl}" alt="Nounours ${listProduct[i].name}"/>
                                <h2 class="product-name">${listProduct[i].name}</h2>
                            </div>
                        </article>
                    </a>`;
            }
        } else {
            document.getElementById("container").innerHTML=/*html*/`
            <article class="error"> 
                <h2>Problème technique</h2>
                <p><i class="fas fa-exclamation-triangle"></i></p>
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
        if(detailProduct.length==0){
            document.querySelector('meta[name="description"]').setAttribute("content", "Ceci est une page d'erreur.");
            document.querySelector('meta[property="og:description"]').setAttribute("content", "Ceci est une page d'erreur.");
            document.querySelector("title").innerHTML="erreur";
            document.getElementById("container").innerHTML =/*html*/`
            <h1>Problème technique</h1>
            <article class="error">
                <p><i class="fas fa-exclamation-triangle"></i></p>
                <p>Une erreur perturbe l’affichage de votre produit. Nous nous excusons pour les désagréments occasionnés.</p>
                <p>Veuillez s’il vous plait retourner à l’accueil et réessayez.</p>
                <button onclick="window.location.replace('index.html')">Retour à l'accueil</button>
            </article>
            `;
        } else{
            document.querySelector('meta[name="description"]').setAttribute("content", "Découvrez les particularités de "+detailProduct.name+", nounours d'exception.");
            document.querySelector('meta[property="og:description"]').setAttribute("content", "Découvrez les particularités de "+detailProduct.name+", nounours d'exception.");
            document.querySelector("title").innerHTML=detailProduct.name;
            document.getElementById("container").innerHTML =/*html*/`
                <h1 class="product-name">${detailProduct.name}</h1>
                <section class="detailProduct">
                    <div>
                        <img src="${detailProduct.imageUrl}" alt="Nounours ${detailProduct.name}"/>
                    </div>
                    <div>
                        <p>${detailProduct.description}</p>
                        <p>${detailProduct.price/100}€</p>
                        <form onsubmit="Controller.addToBasket(this); return false;">
                            <select id="select" required>
                                <option value="">Veuillez choisir une personalisation</option>
                            <select>
                            <button type="submit" id="button"> Ajouter au panier </button>
                        </form>
                        
                    </div>
                </section>`;
            for (let i=0; i<detailProduct.colors.length; i++){
                document.getElementById("select").innerHTML +=/*html*/`
                    <option value="${detailProduct.colors[i]}">${detailProduct.colors[i]}</option>`;
            }
            
        }
    }
 
    /*******************************PAGE PANIER ********************************/

    // Nous recupérons les données des produits achetés pour les afficher dans la page panier
    buyProduct(productsBought) {
        for (let productBought of productsBought){
            document.getElementById("listProductBought").innerHTML +=/*html*/ `
            <article class="basket">
                <div><img src= "${productBought.imageUrl}" alt="Nounours ${productBought.name}"/></div>
                <h2 class="product-name">${productBought.name}</h2>
                <p>${productBought.price/100}€</p>
                <button id="${productBought.uniqueId}" onclick="Controller.deleteBasketLine(this);">Retirer du panier</button>
            </article>`;
        } 
        document.getElementById("listProductBought").innerHTML +=/*html*/`
        <article class="basket">
            <h2>Total du panier : </h2>
            <p id="totalPrice"></p>
        </article>`;
        Controller.displayTotalPrice();
    }
    errorBasket() {
        document.getElementById("listProductBought").innerHTML +=/*html*/`
        <article class="error">
            <h2>Panier vide!</h2>
            <p><i class="fas fa-times-circle"></i></p>
            <p> Il semblerait que vous ayez atteri ici par erreur. Séléctionnez au moins un de nos nounours avant de revenir ici.</p>
            <button onclick="window.location.replace('index.html')">Retourner à l'accueil</button>
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
            document.getElementById("command").innerHTML +=/*html*/`
                <article class="error">
                    <p><i class="fas fa-exclamation-triangle"></i></p>
                    <p>Malheureusement l'envoi de votre commande a rencontré un problème technique.<br /> 
                    Nous vous prions de nous en excuser.</p>
                    <p>Vous pouvez réitérer votre commande en retournant au panier.</p>
                    <button onclick="window.location.replace('panier.html')">Retourner au panier</button>
                </article>
                `;
        } else{
            document.getElementById("command").innerHTML +=/*html*/ `
            <article>
                <div class="commandConfirmation">
                    <p>Votre numéro de commande est le : </p>
                    <p class="commandNumber">&nbsp ${commandNumber}</p>
                </div>
                <p id="totalPrice">Prix total de votre commande: ${totalPrice}€</p>
                <button onclick="sessionStorage.clear(); window.location.replace('index.html')">Retour à la boutique</button>
            </article>
        `; 
        }   
    }
}