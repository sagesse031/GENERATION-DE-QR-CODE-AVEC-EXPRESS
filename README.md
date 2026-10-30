<!-- INITIALISATION DU PROJET -->
npm init -y

<!-- INSTALLATION DE EXPRESS -->
npm install express

<!-- INSTALLATION DE QR CODE -->
npm i qrcode

<!-- Importation de express et qr code -->
const express = require(`express`)
const qrcode = require(`qrcode`)

<!-- CREATION DE APP -->
const app = express();

<!-- GENERATION DU FICHIER HTML AVEC LA METHODE POST -->
<!-- UTILISATION DES MIDDLEWARES DANS SERVER.JS -->
<!-- DEVELOPPEMENT DE LA ROUTE : /generer -->


<!-- DEFINITION DU PORT -->
app.listen(300, () => {
    console.log("Serveur demarre sur le port 3000")
})

<!-- LANCEMENT DU SERVEUR  -->
node --watch server.js