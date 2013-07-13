// Caesar shift algorithm
// (c) Eric Smith 2010

function Caesar() {}

// Inherit from Algorithm.
Caesar.prototype = new Algorithm();

Caesar.prototype.name = "Caesar";
Caesar.prototype.keyHint = "Number from 1-25";
Caesar.prototype.infoPage = "caesar.html";

Caesar.prototype.isValidKey = function(key) {
	var normalKey = this.normalizeNumericKey(key);
	return (normalKey > 0 && normalKey < 26);
};

Caesar.prototype.encipher = function(plaintext, key) {
	if (this.isValidKey(key)) {
		return this.transform(plaintext, this.normalizeNumericKey(key)).toUpperCase();
	} else {
		return "";
	}
};

Caesar.prototype.decipher = function(ciphertext, key) {
	if (this.isValidKey(key)) {
		return this.transform(ciphertext, -this.normalizeNumericKey(key));
	} else {
		return "";
	}
};

Caesar.prototype.transform = function(text, amount) {
	text = text.toLowerCase();
	var resultChars = [];
	for (var i = 0; i < text.length; ++i) {
		if (this.isAlpha(text.charAt(i))) {
			resultChars[i] = this.rotate(text.charCodeAt(i), amount);
		} else {
			resultChars[i] = text.charCodeAt(i);
		}
	}
	return String.fromCharCode.apply(this, resultChars);
};