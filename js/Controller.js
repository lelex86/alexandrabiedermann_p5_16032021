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
        document.getElementById("ul").innerHTML=`
            <a href="panier.html"><li><i class="fas fa-shopping-cart"></i></li></a>
            <p>${JSON.parse(window.localStorage.getItem("panier")).length}</p>`;
    }
    static addToBasket(detailProduct){
        console.log("detailProduct:", detailProduct);
        document.getElementById("button").addEventListener("click", function (){
            detailProduct.uniqueId = new Date().getTime();
            let panier= JSON.parse(localStorage.getItem("panier"));
            panier.push(detailProduct);
            localStorage.setItem("panier", JSON.stringify(panier));
            console.log("Élément ajouté au panier");
            Controller.displayBasketCount();
            Controller.confirmBox();
        });
    }
    static confirmBox(){
        document.getElementById("container").innerHTML += `
            <div id="customBoxContainer">
                <div class="custom-box">
                    <p>L'article a bien été ajouté au panier</p>
                    <div>
                        <button onclick="Controller.goToBasket(this); return false;">Aller au panier</button>
                        <button onclick="Controller.goToIndex(this); return false;">Continuer les achats</button>
                    </div>
                </div>
            </div>
        `;
    }
    static goToBasket(){
        window.location.replace("panier.html");
    }
    static goToIndex(){
        window.location.replace("index.html");
    }
    /*static removeFromBasket(){
        let panier= JSON.parse(localStorage.getItem("panier"));
        let productsBought=JSON.parse(localStorage.getItem("panier"));
        for (let i=0; i<productsBought.length; i++){
            document.getElementById("remove"+ i).addEventListener("click", function (){
                panier.splice(i,1);
                localStorage.removeItem("panier");
                localStorage.setItem("panier", JSON.stringify(panier));
                document.getElementById("listProductBought").removeChild(document.getElementById("product"+ i));
                Controller.displayTotalPrice();
                console.log("Élément supprimé du panier");
            });
        }
    }*/
    static deleteBasketLine(basketLine) {
        var panier = JSON.parse(localStorage.getItem("panier"));
        // Supprime dans le panier l'élément donc le champ uniqueId correspond à celui du nounours supprimé
        var newPanier = panier.filter(function (element) {
            return (element.uniqueId != basketLine.id);
        });
        //-------------------------------------------------------
        localStorage.setItem("panier", JSON.stringify(newPanier));
        basketLine.parentNode.remove();
        Controller.displayTotalPrice();
        console.log("Élément supprimé du panier");
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
        console.log("contact:", contact);
        let products=[];
        for (let i=0; i< panier.length; i++){
            products.push(panier[i]._id)
        };
        console.log("products:", products);
        let order=JSON.stringify({contact,products});
        console.log("order:", order);
        Controller.orderSending(order);
        window.location.replace("commande.html");    
    }      
    static orderSending(order){
        let url = "http://localhost:3000/api/teddies/order";
        Model.post(url, order)
        .then(function (response){
            console.log("Connexion à l'API réussie!");
            console.log(response);
        })
        .catch( function (error){
            console.log("Échec connexion API. Erreur=", error);
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
        if(JSON.parse(localStorage.getItem("panier")).length>0){
            let productBought=JSON.parse(localStorage.getItem("panier"));
            let view = new View();
            view.buyProduct(productBought);
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