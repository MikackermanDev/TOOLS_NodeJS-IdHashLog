// fs = lire, ecrire, créer ou supprimer fichier / dossier
const fs = require("fs");
// path manipule le chemin de fichiers
const path = require("path");
// fonction utilitaire (formater/inspecter des objets, promisifier des fonctions asynchrones)
const util = require("util");

// Contient le chemin du répertoire à créer
const logCheminDossier = path.join(__dirname, "..", "Logs");
console.log(logCheminDossier);

// Créer le dossier s'il n'existe pas
if (!fs.existsSync(logCheminDossier)) {
	fs.mkdirSync(logCheminDossier);
}
// on définit le format d'affichage de l'horodatage pour NodeJS avec date-fns
// const mesOptions = "eee dd MMM yyyy HH:mm:ss.SSS";

// on définit le format d'affichage de l'horodatage
const mesOptions = {
	// weekday: "short",
	day: "2-digit",
	month: "2-digit",
	year: "2-digit",
	hour: "2-digit",
	minute: "2-digit",
	second: "2-digit",
	hour12: false,
	timeZone: "Europe/Paris",
};

// fonction pour le log personnalisé
function createMikaLog(fichierOrigine) {
	return function (arg) {
		// Extraction du chemin relatif du fichier d'origine grace à path.relative
		const cheminRelatif = path.relative(__dirname, fichierOrigine);
		// Création de l'horodatage
		const date = new Date();
		// si NodeJS avec date-fns
		// const horodatage = format(date, mesOptions);
		const horodatage = date.toLocaleString("fr-FR", mesOptions).replace(",", " à");
		+"." + date.getMilliseconds().toString().padStart(3, "0");
		// Mise en forme du message de journalisation
		let logMessage = `${horodatage} -> ${cheminRelatif} \t -> ${util.format(arg)}\n`;
		// Affichage du message dans la console
		// ATTENTION PEU FAIRE CONFLIT AVEC CONSOLE.LOG
		// console.log(logMessage);

		// Détermination du nom du fichier de log en fonction du type de l'argument
		let logFileName;
		if (arg instanceof Error) {
			// Si l'argument est une instance de Error, on utilise errLog.txt
			logFileName = "mikaErr.log";
		} else {
			// Sinon, on utilise un nom par défaut
			logFileName = "mikaApp.log";
		}
		// Ajout du message au fichier de log
		fs.appendFile(
			path.join(logCheminDossier, logFileName),
			logMessage,
			{ flag: "a" },
			(err) => {
				if (err) {
					console.error(`Une erreur s'est produite voici le log: ${err}`);
				}
			}
		);
	};
}

module.exports = createMikaLog;

// Dans le fichier d'execution :
// IMPORT de la fonction mikaLog
// const createMikaLog = require("./Tools/mikaLog");
// const mikaLog = createMikaLog(__filename);
