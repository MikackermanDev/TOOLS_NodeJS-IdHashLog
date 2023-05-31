// IMPORT de la fonction mikaLog
const createMikaLog = require("./tools/mikaLog");
const mikaLog = createMikaLog(__filename);

// IMPORT du console.log modifié
const path = require("path");
const log_file = require("./tools/consoleLogCustom").log_file;

// IMPORT de la fonction mikaId
const mikaId = require("./tools/mikaID");

// IMPORT du générateur de mdp
const mikaMDP = require("./tools/mikaMDP");
const { jwtHex, jwtB64, mikaXor } = require("./tools/mikaSecret");

logResults();

function logResults() {
	let err = new Error("erreur");
	mikaLog(err);
	mikaLog("aleaID : " + mikaId);
	mikaLog("mikMDP : " + mikaMDP(10));
	mikaLog("jwtHex : " + jwtHex(128));
	mikaLog("jwtB64 : " + jwtB64(128));
	mikaLog("xor128 : " + mikaXor(128));
}
