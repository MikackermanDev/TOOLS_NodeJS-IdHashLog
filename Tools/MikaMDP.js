// generater aeatoire de mdp basé sur la table ASCII

function getNumeroAleatoire(min, max) {
	min = 33; // INCLUS
	max = 127; // EXCLUS
	return Math.floor(Math.random() * (max - min) + min);
}

function mikaMDP(longueur) {
	let myPassword = "";
	for (let i = 0; i < longueur; i++) {
		myPassword += String.fromCharCode(getNumeroAleatoire());
	}
	return myPassword;
}

module.exports = mikaMDP;

// Exclure certains caractères

// function mikaMDP(longueur) {
// 	let myPassword = "";
// 	let caracteresExclus = ["@", "#", "$"]; // liste des caractères à exclure
// 	for (let i = 0; i < longueur; i++) {
// 		let caractere = String.fromCharCode(getNumeroAleatoire());
// 		if (caracteresExclus.includes(caractere)) {
// 			// vérifier si le caractère est dans la liste des caractères à exclure
// 			continue; // passer à l'itération suivante sans ajouter le caractère au mot de passe
// 		}
// 		myPassword += caractere; // ajouter le caractère au mot de passe
// 	}
// 	return myPassword;
// }
