// fs = lire, ecrire, créer ou supprimer fichier / dossier
const fs = require("fs");
// path manipule le chemin de fichiers
const path = require("path");
// fonction utilitaire (formater/inspecter des objets, promisifier des fonctions asynchrones)
const util = require("util");

// Contient le chemin du répertoire à créer
const logCheminDossier = path.join(__dirname, "logs");
// path.join pour joindre le nom du fichier au nom du répertoire
const logCheminFichier = path.join(logCheminDossier, "mikaApp.log");

// on définit le format d'affichage de l'horodatage
const mesOptions = {
	weekday: "long",
	day: "2-digit",
	month: "long",
	year: "numeric",
	hour: "2-digit",
	minute: "2-digit",
	second: "2-digit",
	fractionalSecondDigits: 3,
	hour12: false,
	timeZone: "UTC",
};

// fonction pour le log personnalisé
function createMikaLog(fichierOrigine) {
	return function (...args) {
		// Extraction du chemin relatif du fichier d'origine
		const cheminRelatif = path.relative(__dirname, fichierOrigine);
		// Création de l'horodatage
		const horodatage = new Date()
			.toLocaleString("fr-FR", mesOptions)
			.replace(",", ".");
		// Mise en forme du message de journalisation
		let logMessage = `${horodatage} -> issu de ${cheminRelatif} -> ${util.format(
			...args
		)}\n`;
		// Affichage du message dans la console
		console.log(logMessage);
		// Ajout du message au fichier de log
		fs.appendFile(logCheminFichier, logMessage, { flag: "a" }, (err) => {
			if (err) {
				console.error(`Une erreur s'est produite voici le log: ${err}`);
			}
		});
	};
}

// Créer le dossier s'il n'existe pas
if (!fs.existsSync(logCheminDossier)) {
	fs.mkdirSync(logCheminDossier);
}

module.exports = createMikaLog;

// Dans le fichier d'execution :
// const createMikaLog = require("./Tools/mikaLog");
// const mikaLog = createMikaLog(__filename);
