class Controller {
    //Fonctions générales
    static getFormData(formData) {
        let objectData = {};
        formData.forEach(function (value, key) {
            objectData[key] = value;
        });
        return (objectData);
    }
    static displayBasketCount(){
        if (localStorage.getItem("panier")== null){
            let panierInitialisation=[];
            localStorage.setItem("panier", JSON.stringify(panierInitialisation));
        }
        document.getElementById("nav").innerHTML= /*html*/`
            <a href="panier.html" rel=”nofollow” aria-label="liens vers le panier">
                <i class="fas fa-shopping-cart"></i>
                <p>${JSON.parse(window.localStorage.getItem("panier")).length}</p>
            </a>
            `;
    }
    static addToBasket(detailProduct){
        document.getElementById("button").addEventListener("click", function (){
            detailProduct.uniqueId = new Date().getTime();
            let panier= JSON.parse(localStorage.getItem("panier"));
            panier.push(detailProduct);
            localStorage.setItem("panier", JSON.stringify(panier));
            Controller.displayBasketCount();
            Controller.confirmBox();
        });
    }
    static confirmBox(){
        document.getElementById("container").innerHTML += /*html*/`
            <div id="customBoxContainer">
                <div class="custom-box">
                    <p>L'article a bien été ajouté au panier</p>
                    <div>
                        <button onclick="window.location.replace('panier.html')">Aller au panier</button>
                        <button onclick="window.location.replace('index.html')">Continuer les achats</button>
                    </div>
                </div>
            </div>
        `;
    }
    static deleteBasketLine(basketLine) {
        let panier = JSON.parse(localStorage.getItem("panier"));
        // Supprime dans le panier l'élément donc le champ uniqueId correspond à celui du nounours supprimé
        let newPanier = panier.filter(function (element) {
            return (element.uniqueId != basketLine.id);
        });
        //-------------------------------------------------------
        localStorage.setItem("panier", JSON.stringify(newPanier));
        basketLine.parentNode.remove();
        if (newPanier.length==0){
            window.location.replace("index.html");
        } else {
            Controller.displayTotalPrice();
        }
    }
    static displayTotalPrice(){
        let totalPrice=0;
        let productsBought=JSON.parse(localStorage.getItem("panier"));
        for (let productBought of productsBought){  
          totalPrice+=productBought.price/100;
        }
        document.getElementById("totalPrice").innerHTML=totalPrice + "€";
        sessionStorage.setItem("totalPrice", JSON.stringify(totalPrice));
    }
    static sendOrder(){
        let panier= JSON.parse(localStorage.getItem("panier"));
        let formulaire= document.getElementById("formulaire");
        let data=new FormData(formulaire);
        let contact=Controller.getFormData(data);
        let products=[];
        for (let i=0; i< panier.length; i++){
            products.push(panier[i]._id)
        };
        let order=JSON.stringify({contact,products});
        let url = "http://localhost:3000/api/teddies/order";
        Model.post(url, order)
        .then(function (response){
            console.log("Connexion à l'API réussie!");
            sessionStorage.setItem("commandNumber", JSON.parse(response).orderId);
            localStorage.clear();
            window.location.replace("commande.html");
        })
        .catch(function (error){
            console.log("Échec connexion API. Erreur=", error);
            window.location.replace("commande.html");
        });  
    }
    
    //Classe à appeler dans la page html pour afficher la page
    
    //classe pour la page d'accueil
    showListProduct() {
        let url = "http://localhost:3000/api/teddies/";
        let listProduct = Model.get(url)
        .then(function (response){
            console.log("Connexion à l'API réussie!");
            let view = new View();
            view.showListProduct(JSON.parse(response)); 
        })
        .catch(function (error){
            console.error("Échec connexion API. Erreur=", error);
            let view = new View();
            view.showListProduct([]);
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
        .catch(function (error){
            console.error("Échec connexion API. Erreur=", error);
            let view = new View();
            view.showDetailProduct([]);
        });
    }

    //Classe permettant d'afficher notre page panier
   showPanier() {
        if(JSON.parse(localStorage.getItem("panier")).length>0){
            let productsBought=JSON.parse(localStorage.getItem("panier"));
            let view = new View();
            view.buyProduct(productsBought);
        }
        else{
            let view = new View();
            view.errorBasket();
        } 
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