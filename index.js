// IMPORT de la fonction mikaLog
const createMikaLog = require("./tools/mikaLog");
const mikaLog = createMikaLog(__filename);

// IMPORT du console.log modifié
const path = require("path");
const log_file = require("./tools/consoleLogCustom").log_file;

// IMPORT de la fonction mikaId
const mikaId = require("./tools/mikaID");

// IMPORT du générateur de mdp
const mikaMDP = require("./tools/MikaMDP");

mikaLog(mikaId);
console.log(mikaId);
mikaLog(mikaMDP(10));
console.log(mikaMDP(10));
