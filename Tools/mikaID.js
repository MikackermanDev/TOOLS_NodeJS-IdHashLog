// generateur d'ID basé sur une liste de caractère uniquement
function getIdAleatoire(longueur) {
	let resultat = "";
	const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	const charactersLength = characters.length;
	for (let i = 0; i < longueur; i++) {
		resultat += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return resultat;
}

function insererTirets(chaine) {
	let nouvelleChaine = "";
	for (let i = 0; i < chaine.length; i++) {
		// Si i est un multiple de 5 et pas le premier caractère, on ajoute un -
		if (i % 5 === 0 && i !== 0) {
			nouvelleChaine += "-";
		}
		// On ajoute le caractère courant
		nouvelleChaine += chaine[i];
	}
	return nouvelleChaine;
}
// generateur d'ID basé sur une liste de caractère + une partie du dateTime en milliseconde
const d = new Date();
function mikaId() {
	let t = d.getTime();
	let s = t.toString().substring(3);
	let idFinal = s + getIdAleatoire(15);
	idFinal = insererTirets(idFinal);

	return idFinal;
}

module.exports = mikaId();
