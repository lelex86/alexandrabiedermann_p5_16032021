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
            <section>
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
        for (let i=0; i<productBought.length; i++){
            document.getElementById("listProductBought").innerHTML += `
            <article id="product${+ i}">
                <div><img src= "${productBought[i].imageUrl}"/></div>
                <h2>${productBought[i].name}</h2>
                <p>${productBought[i].price}€</p>
                <button id="remove${+ i}">Retirer du panier</button>
            </article>`;
        }
        for (let i=0; i<productBought.length; i++){
            let panier= JSON.parse(localStorage.getItem("panier"));
            document.getElementById("remove"+ i).addEventListener("click", function (){
                panier.splice(i,1);
                localStorage.removeItem("panier");
                localStorage.setItem("panier", JSON.stringify(panier));
                document.getElementById("listProductBought").removeChild(document.getElementById("product"+ i));
                console.log("Élément supprimé du panier");
            });
        }
        
    }


    /***************************PAGE DE CONFIRMATION ***************************/

    // Page finale avec les données que nous prenons du POST ainsi que le total de la commande
    cameraOrder(postOrder) {
        
    }
}