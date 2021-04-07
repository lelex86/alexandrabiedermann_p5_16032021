/**
 * Le but de cette classe est d'encapsuler les méhtodes pour pouvoir faire
 * les appels Ajax. 
 */
class Model {

    /**
     * Cette méthode appelle une url et retourne son contenu après un parseJSON. 
     * @param {string} url 
     */
    static get(url) {
        return new Promise (function (resolve) {
            let request = new XMLHttpRequest();
            request.onreadystatechange = function (){
                if (this.readyState===XMLHttpRequest.DONE&&this.status===200){
                    resolve(request.responseText);
                }
                else{
                    console.log("Erreur connexion API!")
                }
            }
            request.open("GET", url);
            request.send();
        } );        
    };

    // Nouvelle classe pour réaliser notre POST
    static post(url,order) {
        return new Promise (function (resolve) {
            let request = new XMLHttpRequest();
            request.onreadystatechange = function (){
                if (this.readyState===XMLHttpRequest.DONE&&this.status===201){
                    resolve=JSON.parse(request.responseText);
                    console.log(JSON.parse(this.responseText).orderId);
                    sessionStorage.setItem("commandNumber", JSON.parse(this.responseText).orderId);
                }    
            }
            request.open("POST", url);
            request.setRequestHeader("Content-Type", "application/json");
            request.send(order);
        });
    }
}