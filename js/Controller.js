class Controller {
    //Classe à appeler dans la page html pour afficher la page

    //classe pour la page d'accueil
    showListProduct() {
        let listProduct = Model.get('http://localhost:3000/api/cameras');
        let view = new View();
        view.showListProduct(listProduct);
    }

    //Classe pour un produit en particulier en utilisant l'id à ajouter à notre url de base
    async showDetailProduct() {
        let searchParams = new URLSearchParams(window.location.search);
        let id = searchParams.get('id');
        let url = 'http://localhost:3000/api/cameras/' + id;
        let detailProduct = Model.get(url)
        let view = new View();
        view.showDetailProduct(detailProduct);
    }

    //Classe permettant d'afficher notre page panier
    async showPanier() {
        let view = new View();
        view.buyProduct(productBought);
    }

    // page finale utilisant un POST pour afficher les données envoyées au server (Formulaire et produits)
    async postOrder() {
        let postOrder = Model.post('http://localhost:3000/api/cameras/order');
        let view = new View();
        view.cameraOrder(postOrder);
        // la ligne suivante vide le panier apres chaque achats.
        localStorage.clear();
    }
}