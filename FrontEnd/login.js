function login(username, password) {
    fetch('http://localhost:5678/api/users/login', {

        method: "POST",
        headers: {
            'accept': 'application/json', // demande de reponse au format json
            'Content-Type': 'application/json', // on signale au serveur qu'on lui envoi les infos en json
        },
        body: JSON.stringify({
            email: username,
            password: password
        })
    })
        .then(response => {
            let reponseServeur = response.json()
            if (response.status === 200) {
                reponseServeur.then(data => {
                    console.log(data)
                    localStorage.setItem("token", JSON.stringify(data.token))
                    window.location.href="./index.html"  // redirection vers la page d'accueil             
                })
            } else {                
               let messageErreur = document.getElementById("error_message")
               messageErreur.innerText = "Erreur dans l’identifiant ou le mot de passe"                   
            }
        })
        
        
}

let token = localStorage.getItem("token");

// ajout de l'event listener "submit" au formulaire, recupere les valeurs email/password et lance la fonction login

document.getElementById("login_form").addEventListener("submit", function (event) {
    event.preventDefault() // empecher le rechargement de la page
    let username = document.getElementById("email").value
    let password = document.getElementById("password").value
    login(username, password)
})