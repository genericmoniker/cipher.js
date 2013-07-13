// Cipher algorithm base class

function Algorithm() {}

Algorithm.prototype = {

	ALPHABET_SIZE: 26,

	ALPHABET: "abcdefghijklmnopqrstuvwxyz",

	// Determines whether a "character" is an alphabet character (a-zA-Z).
	isAlpha: function(char) {
		return this.ALPHABET.indexOf(char.toLowerCase()) != -1;
	},

	// Gets the position of a "character" (not a character code) from 0 to ALPHABET_SIZE.
	charPos: function(char) {
		if (!this.isAlpha(char)) {
			throw new Error("Call to charOffset with non-alpha char.");
		}

		var aChar;

		if (this.ALPHABET.indexOf(char) != -1) {
			aChar = 'a'.charCodeAt();
		} else {
			aChar = 'A'.charCodeAt();
		}

		return char.charCodeAt() - aChar;
	},

	// Rotates a character code by the specified amount, wrapping around if necessary.
	rotate: function(charCode, amount) {
		var aCode = "a".charCodeAt();
		var offset = charCode - aCode;
		return aCode + (offset + amount + ((amount > 0) ? 0 : this.ALPHABET_SIZE)) % this.ALPHABET_SIZE;
	},

	isValidAlphaKey: function(key) {
		if (typeof key !== "string") {
			return false;
		}
		if (key.length === 0) {
			return false;
		}

		for (var i = 0; i < key.length; ++i) {
			if (!this.isAlpha(key.charAt(i))) {
				return false;
			}
		}
		return true;
	},

	normalizeNumericKey: function(key) {
		if (typeof key !== "number") {
			key = parseInt(key, 10);
			if (isNaN(key)) {
				key = 0;
			}
		}
		return key;
	}

};