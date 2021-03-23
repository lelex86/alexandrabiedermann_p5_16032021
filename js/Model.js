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
            }
            request.open("GET", url);
            request.send();
        } );        
    };

    // Nouvelle classe pour réaliser notre POST
    static post(url) {
               
    }
}