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
// Ajout au panier

        let panier= JSON.parse(localStorage.getItem("panier"));
        document.getElementById("button").addEventListener("click", function (){
            panier.push(detailProduct);
            localStorage.setItem("panier", JSON.stringify(panier));
            console.log("Élément ajouté au panier");
            Controller.displayBasketCount();
        });     
    }
 
    /*******************************PAGE PANIER ********************************/

    // Nous recupérons les données des produits achetés pour les afficher dans la page panier
    buyProduct(productBought) {
        let panier= JSON.parse(localStorage.getItem("panier"));
        for (let i=0; i<productBought.length; i++){
            document.getElementById("listProductBought").innerHTML += `
            <article id="product${+ i}">
                <div><img src= "${productBought[i].imageUrl}"/></div>
                <h2>${productBought[i].name}</h2>
                <p>${productBought[i].price/100}€</p>
                <button id="remove${+ i}">Retirer du panier</button>
            </article>`;
        }
        
        document.getElementById("listProductBought").innerHTML +=`
        <article>
            <h2>Total du panier : </h2>
            <p id="totalPrice"></p>
        </article>`;
        Controller.displayTotalPrice();

        for (let i=0; i<productBought.length; i++){
            document.getElementById("remove"+ i).addEventListener("click", function (){
                panier.splice(i,1);
                localStorage.removeItem("panier");
                localStorage.setItem("panier", JSON.stringify(panier));
                document.getElementById("listProductBought").removeChild(document.getElementById("product"+ i));
                Controller.displayTotalPrice();
                console.log("Élément supprimé du panier");
            });
        }
        let formulaire= document.getElementById("formulaire");
        document.getElementById("commandSend").addEventListener("click", function (event){
            event.preventDefault();
            let data=new FormData(formulaire);
            let contact=JSON.stringify(data);
            let products=[];
            for (let i=0; i< panier.length; i++){
                products.push(panier[i]._id)
            };
            let order={contact,products};
            Controller.orderSending(order);
            window.location.replace("commande.html");
        });  
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