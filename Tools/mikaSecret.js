const crypto = require("crypto");

// 1°) Fonction simple
function jwtHex(longueur) {
	const secretKey = crypto.randomBytes(longueur / 2).toString("hex");
	return secretKey;
}

function jwtB64(longueur) {
	const secretKey = crypto.randomBytes((longueur / 4) * 3).toString("base64");
	return secretKey;
}

// 2°) fonction non dépendant du module crypto utilisant l'algorythme de chiffrage xorshift128plus
// bonne entropie (= mauvaise prévisibilité) mais registre à décalage à rétroaction linéaire RDRL

function mikaXor(longueur) {
	let seed = [BigInt(Date.now()), BigInt(Math.floor(Math.random() * 0xffffffff))];

	function xorshift128plus() {
		let [x, y] = seed;
		x ^= x << BigInt(23);
		x ^= x >> BigInt(17);
		x ^= y ^ (y >> BigInt(26));
		seed = [y, x];
		return x + y;
	}

	function getRandomValue() {
		return (
			Number(xorshift128plus() % BigInt(0xffffffffffffffff)) / 0xffffffffffffffff
		);
	}

	let secretKey = "";
	const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	const charactersLength = characters.length;
	for (let i = 0; i < longueur; i++) {
		secretKey += characters.charAt(Math.floor(getRandomValue() * charactersLength));
	}
	return secretKey;
}

module.exports = { jwtHex, jwtB64, mikaXor };
