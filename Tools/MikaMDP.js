// generater aeatoire de mdp basé sur la table ASCII

function getNumeroAleatoire(min, max) {
	min = 33; // INCLUS
	max = 127; // EXCLUS
	return Math.floor(Math.random() * (max - min) + min);
}

function mikaMDP(longueur) {
	let myPassword = "";
	let lastChar = "";
	for (let i = 0; i < longueur; i++) {
		let newChar = String.fromCharCode(getNumeroAleatoire());
		while (newChar === lastChar) {
			newChar = String.fromCharCode(getNumeroAleatoire());
		}
		myPassword += newChar;
		lastChar = newChar;
	}
	return myPassword;
}

module.exports = mikaMDP;

// Exclure certains caractères

// function mikaMDP(longueur) {
// 	let myPassword = "";
// 	let lastChar = "";
// 	let caracteresExclus = ["@", "#", "$"]; // liste des caractères à exclure
// 	for (let i = 0; i < longueur; i++) {
// 		let newChar = String.fromCharCode(getNumeroAleatoire());
// 		while (newChar === lastChar || caracteresExclus.includes(newChar)) {
// 			newChar = String.fromCharCode(getNumeroAleatoire());
// 		}
// 		myPassword += newChar;
// 		lastChar = newChar;
// 	}
// 	return myPassword;
// }
