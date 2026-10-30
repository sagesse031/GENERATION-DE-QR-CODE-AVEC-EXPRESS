const express = require(`express`)
const qrcode = require(`qrcode`)

const app = express();

// app.get(`/`, (req, res) => {
//     res.send("<h1>Bonjour, je suis la route 1</h1>")
// })

// Correction de "extends" par "extended"
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`public`));

app.post(`/generer`, async (req, res) => {
    // Récupération de l'URL envoyée par le formulaire
    const rawUrl = req.body.url;

    let adresse;

    try {
        // Validation et parsing de l'URL
        adresse = new URL(rawUrl);
    } catch {
        return res.status(400).send(`URL invalide.`);
    }

    // Vérification du protocole (attention au 'https:' avec les deux points)
    if (![`http:`, `https:`].includes(adresse.protocol)) {
        return res.status(400).send(`Utilise une URL HTTP ou HTTPS.`);
    }

    try {
        const qrImage = await qrcode.toDataURL(adresse.href);

        res.send(`
            <!DOCTYPE html>
            <html lang="fr">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Générateur de QR Code</title>
            </head>
            <body>
                <h1>Le QR Code est prêt</h1>

                <img
                    src="${qrImage}"
                    alt="QR Code du site"
                    width="250"
                >

                <p>Scanne ce code avec ton tel.</p>
                <br>
                <a href="/">Retour</a>
            </body>
            </html>
        `);
    } catch (erreur) {
        console.error(erreur);
        res.status(500).send(`Impossible de générer le QR Code`);
    }
});

app.listen(3000, () => {
    console.log("Serveur démarré sur le port 3000")
});