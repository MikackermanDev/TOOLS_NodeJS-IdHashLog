const fs = require("fs");
const path = require("path");
const util = require("util");

const logCheminDossier = path.join(__dirname, "..", "logs");
console.log(logCheminDossier);

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
const date = new Date();
const isoDate = date.toISOString();
const logDate = isoDate.slice(0, 10);

if (!fs.existsSync(logCheminDossier)) {
	fs.mkdirSync(logCheminDossier);
	// Créer des fichiers de journalisation vides pour corriger l'absence du dossier LOGS
	fs.writeFileSync(path.join(logCheminDossier, "mikaApp-" + logDate + ".log"), "");
}

function deleteOldLog(mikaLog) {
	fs.readdir(logCheminDossier, (err, files) => {
		if (err) throw err;
		//mikaLog(files);
		files
			.filter((file) => file.endsWith(".log"))
			.forEach((file) => {
				const fileDate = new Date(file.slice(-14, -4));
				const currentDate = new Date();
				const timeDiff = Math.abs(currentDate.getTime() - fileDate.getTime());
				const dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
				if (dayDiff > 15) {
					const filePath = path.join(logCheminDossier, file);
					fs.unlink(filePath, (err) => {
						if (err) throw err;
						mikaLog(`fichier supprimé : ${file}`);
					});
				}
			});
	});
}

function createMikaLog(fichierOrigine) {
	return function (arg) {
		const cheminRelatif = path.relative(__dirname, fichierOrigine);
		const horodatage =
			date.toLocaleString("fr-FR", mesOptions).replace(",", " à") +
			"." +
			date.getMilliseconds().toString().padStart(3, "0");
		let logMessage = `${horodatage} -> ${cheminRelatif} \t -> ${util.format(arg)}\n`;
		let logFileName;
		if (arg instanceof Error) {
			logFileName = "mikaErr-" + logDate + ".log";
		} else {
			logFileName = "mikaApp-" + logDate + ".log";
		}
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

module.exports = { createMikaLog, deleteOldLog };

// IMPORT de la fonction mikaLog
// const { createMikaLog, deleteOldLog } = require("./tools/mikaLog");
// const mikaLog = createMikaLog(__filename);
// deleteOldLog(mikaLog);
