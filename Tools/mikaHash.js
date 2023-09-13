function mikaXor(longueur, salt) {
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

	let result = "";
	const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	const charactersLength = characters.length;
	for (let i = 0; i < longueur; i++) {
		result += characters.charAt(Math.floor(getRandomValue() * charactersLength));
	}
	return result;
}

function mikaHash(longueur, salt) {
	const mixedOutput = mikaXor(longueur, salt) + mikaXor(longueur, salt);

	return mixedOutput;
}

module.exports = mikaHash;
