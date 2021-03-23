class View {


/*******************************PAGE D'ACCEUIL ********************************/


    showListProduct(listProduct) {
  
        let container= document.getElementById("container");    
        for (let i=0; i<=listProduct.length; i++){
        let viewProduct=listProduct[i];
        viewProduct= document.createElement("article");
        container.appendChild(viewProduct);
        viewProduct.setAttribute ("id","produit"+i);

        }

        
    }

    /***********************PAGE ARTICLE INDIVIDUEL **************************/

    // On affiche le produit récuperé avec l'Id + l'URL via notre controller
    showDetailProduct(detailProduct) {
                
    }
 
    /*******************************PAGE PANIER ********************************/

    // Nous recupérons les données des produits achetés pour les afficher dans la page panier
    buyProduct(productBought) {
        
        
    }


    /***************************PAGE DE CONFIRMATION ***************************/

    // Page finale avec les données que nous prenons du POST ainsi que le total de la commande
    cameraOrder(postOrder) {
        
    }
}