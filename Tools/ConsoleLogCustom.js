// On modifie la sortie du console log
const fs = require("fs");
const util = require("util");

const date = new Date();
const isoDate = date.toISOString();
const logDate = isoDate.slice(0, 10);

// flags "w" pour écraser, flags "a" pour ajouter
let log_file = fs.createWriteStream("./logs/consoleLog-" + logDate + ".log", {
	flags: "a",
});
let log_stdout = process.stdout;

console.log = function (d) {
	let horodatage =
		date.toLocaleString("fr-FR") +
		"." +
		date.getMilliseconds().toString().padStart(3, "0");
	log_file.write(horodatage + " \t -> " + util.format(d) + "\n");
	log_stdout.write(horodatage + " \t -> " + util.format(d) + "\n");
};

module.exports.log_file = log_file;

// Dans le fichier d'execution :

// IMPORT du console.log modifié
// const path = require("path");
// const log_file = require("./Tools/ConsoleLogCustom").log_file;
// const fileName = path.basename(__filename); // obtention du nom du fichier
// log_file.write(fileName + " -> ");

// const filePath = path.join(__filename); // obtention du chemin complet +  , ".js" permet de supprimer l'extension dans le log
// log_file.write(filePath + " -> ");
