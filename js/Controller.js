class Controller {
    //Classe à appeler dans la page html pour afficher la page
    static displayBasketCount(){
        if (localStorage.getItem("panier")== null){
            let panierInitialisation=[];
            localStorage.setItem("panier", JSON.stringify(panierInitialisation));
        }
        document.getElementById("ul").innerHTML=`
            <a href="panier.html"><li><i class="fas fa-shopping-cart"></i></li></a>
            <p>${JSON.parse(window.localStorage.getItem("panier")).length}</p>`;
    }
    static displayTotalPrice(){
        let totalPrice=0;
        let productBought=JSON.parse(localStorage.getItem("panier"));
        for (let i=0; i<productBought.length; i++){  
          totalPrice+=productBought[i].price/100;
        }
        document.getElementById("totalPrice").innerHTML+=totalPrice;
        sessionStorage.setItem("totalPrice", JSON.stringify(totalPrice));
    }

    static orderSending(order){
        let url = "http://localhost:3000/api/teddies/order";
        Model.post(url, order)
        .then(function (response){
            console.log("Connexion à l'API réussie!");
            sessionStorage.setItem("commandNumber", JSON.parse(response));
        })
        .catch( function (error){
            console.log("Échec connexion API. Erreur=", error);
        });  
    }
    //classe pour la page d'accueil
    showListProduct() {
        let url = "http://localhost:3000/api/teddies/";
        let listProduct = Model.get(url)
        .then(function (response){
            console.log("Connexion à l'API réussie!");
            let view = new View();
            view.showListProduct(JSON.parse(response)); 
        })
        .catch( function (error){
            console.log("Échec connexion API. Erreur=", error);
        });
    }

    //Classe pour un produit en particulier en utilisant l'id à ajouter à notre url de base
    showDetailProduct() {
        let id = new URLSearchParams(window.location.search).get('id');
        let url = "http://localhost:3000/api/teddies/" + id;
        let detailProduct =Model.get(url)
        .then(function (response){
            console.log("Connexion à l'API réussie!");
            let view = new View();
            view.showDetailProduct(JSON.parse(response));
        })
        .catch( function (error){
            console.log("Échec connexion API. Erreur=", error);
        });
    }

    //Classe permettant d'afficher notre page panier
   showPanier() {

        let productBought=JSON.parse(localStorage.getItem("panier"));
        let view = new View();
        view.buyProduct(productBought);
    }

    // page finale utilisant un POST pour afficher les données envoyées au server (Formulaire et produits)
    postOrder() {
        let commandNumber=window.sessionStorage.getItem("commandNumber");
        let totalPrice=JSON.parse(window.sessionStorage.getItem("totalPrice"));
        let postOrder=[commandNumber, totalPrice];
        let view = new View();
        view.productOrder(postOrder);
    }
}