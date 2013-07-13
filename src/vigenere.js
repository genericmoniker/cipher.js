// Vigenere algorithm
// (c) Eric Smith 2010

function Vigenere() {}

Vigenere.prototype = new Algorithm();

Vigenere.prototype.name = "Vigenère";
Vigenere.prototype.keyHint = "Word or phrase-letters only";
Vigenere.prototype.infoPage = "vigenere.html";

Vigenere.prototype.isValidKey = function(key) {
	return this.isValidAlphaKey(key);
};

Vigenere.prototype.encipher = function(plaintext, key) {
	if (this.isValidKey(key)) {
		return this.transform(plaintext, key.toUpperCase(), 1).toUpperCase();
	} else {
		return "";
	}
};

Vigenere.prototype.decipher = function(ciphertext, key) {
	if (this.isValidKey(key)) {
		return this.transform(ciphertext, key.toUpperCase(), -1);
	} else {
		return "";
	}
};

Vigenere.prototype.transform = function(text, key, direction) {

	text = text.toLowerCase();
	var k = 0;
	var resultChars = [];

	for (var i = 0; i < text.length; ++i) {
		if (this.isAlpha(text.charAt(i))) {
			var amount = this.charPos(key.charAt(k++%key.length)) * direction;
			resultChars[i] = this.rotate(text.charCodeAt(i), amount);
		} else {
			resultChars[i] = text.charCodeAt(i);
		}
	}

	return String.fromCharCode.apply(this, resultChars);
};