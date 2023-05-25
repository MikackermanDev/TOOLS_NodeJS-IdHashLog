// On modifie la sortie du console log
const fs = require("fs");
const util = require("util");

// flags "w" pour écraser, flags "a" pour ajouter
let log_file = fs.createWriteStream("./Tools/logs/debug.log", { flags: "a" });
let log_stdout = process.stdout;

console.log = function (d) {
	let date = new Date();
	let horodatage =
		date.toLocaleString("fr-FR") +
		"." +
		date.getMilliseconds().toString().padStart(3, "0");
	log_file.write(horodatage + " -> " + util.format(d) + "\n");
	log_stdout.write(horodatage + " -> " + util.format(d) + "\n");
};

module.exports.log_file = log_file;

// Dans le fichier d'execution :
// const path = require("path");
// const log_file = require("./Tools/appConsoleLog").log_file;
// const fileName = path.basename(__filename); // obtention du nom du fichier
// log_file.write(fileName + " -> ");

// const filePath = path.join(__filename); // obtention du chemin complet +  , ".js" permet de supprimer l'extension dans le log
// log_file.write(filePath + " -> ");
