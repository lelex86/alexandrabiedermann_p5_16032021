class Controller {
    //Classe à appeler dans la page html pour afficher la page

    //classe pour la page d'accueil
    async showListProduct() {
        let url = "http://localhost:3000/api/teddies/";
        let listProduct = await Model.get(url).then(function (response){
            return (JSON.parse(response))
        });
        let view = new View();
        view.showListProduct(listProduct);
    }

    //Classe pour un produit en particulier en utilisant l'id à ajouter à notre url de base
    async showDetailProduct() {
        let id = new URLSearchParams(window.location.search).get('id');
        let url = 'http://localhost:3000/api/teddies/' + id;
        let detailProduct = await Model.get(url).then(function (response){
            return (JSON.parse(response))
        });
        let view = new View();
        view.showDetailProduct(detailProduct);
    }

    //Classe permettant d'afficher notre page panier
    async showPanier() {
       
    }

    // page finale utilisant un POST pour afficher les données envoyées au server (Formulaire et produits)
    async postOrder() {
        
    }
}