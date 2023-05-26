// IMPORT de la fonction mikaLog
const createMikaLog = require("./Tools/mikaLog");
const mikaLog = createMikaLog(__filename);

// IMPORT du console.log modifié
const path = require("path");
const log_file = require("./Tools/ConsoleLogCustom").log_file;

// IMPORT de la fonction mikaId
const mikaId = require("./Tools/mikaID");

mikaLog(mikaId);
console.log(mikaId);
