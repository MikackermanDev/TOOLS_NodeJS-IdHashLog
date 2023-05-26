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

// on définit le format d'affichage de l'horodatage pour NodeJS avec date-fns
// const mesOptions = "eee dd MMM yyyy HH:mm:ss.SSS";

// on définit le format d'affichage de l'horodatage
const mesOptions = {
	weekday: "short",
	day: "2-digit",
	month: "short",
	year: "numeric",
	hour: "2-digit",
	minute: "2-digit",
	second: "2-digit",
	hour12: false,
	timeZone: "Europe/Paris",
};

// fonction pour le log personnalisé
function createMikaLog(fichierOrigine) {
	return function (...args) {
		// Extraction du chemin relatif du fichier d'origine grace à path.relative
		const cheminRelatif = path.relative(__dirname, fichierOrigine);
		// Création de l'horodatage
		const date = new Date();
		// si NodeJS avec date-fns
		// const horodatage = format(date, mesOptions);
		const horodatage =
			date.toLocaleString("fr-FR", mesOptions).replace(",", " à") +
			"." +
			date.getMilliseconds().toString().padStart(3, "0");
		// Mise en forme du message de journalisation
		let logMessage = `${horodatage} \t -> issu de ${cheminRelatif} \t -> ${util.format(
			...args
		)}\n`;
		// Affichage du message dans la console
		// ATTENTION PEU FAIRE CONFLIT AVEC CONSOLE.LOG
		// console.log(logMessage);
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
// IMPORT de la fonction mikaLog
// const createMikaLog = require("./Tools/mikaLog");
// const mikaLog = createMikaLog(__filename);
