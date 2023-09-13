// IMPORT de la fonction mikaLog
const { createMikaLog, deleteOldLog } = require("./tools/mikaLog");
const mikaLog = createMikaLog(__filename);
deleteOldLog(mikaLog);

// IMPORT du console.log modifié
const path = require("path");
const log_file = require("./tools/consoleLogCustom").log_file;

// IMPORT de la fonction mikaId
const mikaId = require("./tools/mikaID");

// IMPORT du générateur de mdp
const mikaMDP = require("./tools/mikaMDP");
const { jwtHex, jwtB64, mikaXor } = require("./tools/mikaSecret");

// IMPORT de la fonction mikaHash
const mikaHash = require("./tools/mikaHash");

let monObjet = {
	propriete1: "valeur1",
	propriete2: "valeur2",
};
let err = new Error("erreur");

logResults();

function logResults() {
	mikaLog(err);
	mikaLog(monObjet);
	mikaLog("aleaID : " + mikaId);
	mikaLog("mikMDP : " + mikaMDP(10));
	mikaLog("jwtHex : " + jwtHex(128));
	mikaLog("jwtB64 : " + jwtB64(128));
	mikaLog("xor128 : " + mikaXor(128));
	mikaLog("mikaHash : " + mikaHash(64, 10));
}
