class View {


/*******************************PAGE D'ACCEUIL ********************************/


    showListProduct(listProduct) {
  
        let container= document.getElementById("container");    
        for (let i=0; i<listProduct.length; i++){
            let linkProduct=listProduct[i];
            let viewProduct=listProduct[i];
            let viewImage=listProduct[i];
            linkProduct= document.createElement("a");
            viewProduct= document.createElement("article");
            viewImage=document.createElement("div");
            container.appendChild(linkProduct);
            linkProduct.setAttribute("href", "ficheProduit.html?id=" + listProduct[i]._id)
            linkProduct.appendChild(viewProduct);
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

        let nom = detailProduct.name;
        let description = detailProduct.description;
        let srcImage = detailProduct.imageUrl;
        let prix= detailProduct.price/100;
        let personalisation = detailProduct.colors;
        let container= document.getElementById("container"); 
        let imageProduit=document.createElement("img");
        let nomProduit= document.createElement("h1");
        let descriptionProduit = document.createElement("p");
        let prixProduit = document.createElement("p")
        let section=document.createElement("section");
        let blocDroit=document.createElement("div");
        let blocGauche=document.createElement("div");
        let choixPersonalisation= document.createElement("select")
        blocDroit.setAttribute("id", "droit");
        blocGauche.setAttribute("id", "gauche");
        imageProduit.setAttribute("src", srcImage);
        container.appendChild(nomProduit);
        container.appendChild(section);
        section.appendChild(blocGauche);
        section.appendChild(blocDroit);
        blocGauche.appendChild(imageProduit);
        blocDroit.appendChild(descriptionProduit);
        blocDroit.appendChild(prixProduit);
        nomProduit.innerHTML = nom;
        descriptionProduit.innerHTML = description;
        prixProduit.innerHTML = prix + "€";
        blocDroit.appendChild(choixPersonalisation);
        let bouton= document.createElement("button");
        blocDroit.appendChild(bouton);
        bouton.setAttribute("type", "submit");
        bouton.innerHTML = "Ajouter au panier";
        let optionDefault=document.createElement("option");
        choixPersonalisation.appendChild(optionDefault);
        optionDefault.innerHTML = "Veuillez séléctionner une personalisation";
        

        for (let i=0; i<detailProduct.colors.length; i++){
            let option=detailProduct.colors[i];
            option=document.createElement("option");
            option.setAttribute("value",detailProduct.colors[i]);
            option.innerHTML = detailProduct.colors[i];
            choixPersonalisation.appendChild(option);
        }



                
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