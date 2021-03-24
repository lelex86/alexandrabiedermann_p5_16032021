class View {


/*******************************PAGE D'ACCEUIL ********************************/


    showListProduct(listProduct) {
  
        let container= document.getElementById("container");    
        for (let i=0; i<listProduct.length; i++){
            let viewProduct=listProduct[i];
            let viewImage=listProduct[i];
            viewProduct= document.createElement("article");
            viewImage=document.createElement("div");
            container.appendChild(viewProduct);
            viewProduct.setAttribute ("id","produit"+i);
            viewProduct.appendChild(viewImage);
            viewImage.setAttribute("id","img"+i);
        }

        for (let i=0; i<listProduct.length; i++){
            let srcImage=listProduct[i].imageUrl;
            let nom=listProduct[i].name;
            let imageProduit= document.createElement("img");
            let nomProduit= document.createElement("h2");
            let img=document.getElementById("img"+i);
            let produit=document.getElementById("produit"+i);
            img.appendChild(imageProduit);
            imageProduit.setAttribute("src", srcImage);
            produit.appendChild(nomProduit);
            nomProduit.innerHTML= nom;
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