// Playfair algorithm
// (c) Eric Smith 2010

function Playfair() {}

Playfair.prototype = new Algorithm();

Playfair.prototype.name = "Playfair";
Playfair.prototype.keyHint = "Word or phrase-letters only";
Playfair.prototype.infoPage = "playfair.html";

Playfair.prototype.isValidKey = function(key) {
    return this.isValidAlphaKey(key);
};

Playfair.prototype.encipher = function(plaintext, key) {
	if (this.isValidKey(key)) {
		var ciphertext = "";
		var digraphs = this.toDigraphs(plaintext);
		var table = this.createTable(key);
		for (var i = 0; i < digraphs.length; ++i) {
			ciphertext += this.transformDigraph(table, digraphs[i], 1);
		}
		return ciphertext;
	}
	else {
		return "";
	}
};

Playfair.prototype.decipher = function(ciphertext, key) {
	if (this.isValidKey(key)) {
		var plaintext = "";
		var digraphs = this.toDigraphsDecipher(ciphertext);
		var table = this.createTable(key);
		for (var i = 0; i < digraphs.length; ++i) {
			plaintext += this.transformDigraph(table, digraphs[i], -1);
		}
		return plaintext.toLowerCase();
	}
	else {
		return "";
	}
};

// Private methods ------------------------------------------------------------

Playfair.prototype.createTable = function(key) {
	key = key.toUpperCase();
	var result = new Array(5);
	var letters = [];

	// Add the key letters
	for (var i = 0; i < key.length; ++i) {
		if (this.findLetter([letters], key.charAt(i)) === null) {
			letters.push(key.charAt(i));
		}
	}

	// Fill in the rest of the alphabet
	var alphabet = this.ALPHABET.toUpperCase();
	for (i = 0; i < alphabet.length; ++i) {
		if (this.findLetter([letters], alphabet.charAt(i)) === null) {
			letters.push(alphabet.charAt(i));
		}
	}

	// Rearrange into a table
	result[0] = letters.slice(0, 5);
	result[1] = letters.slice(5, 10);
	result[2] = letters.slice(10, 15);
	result[3] = letters.slice(15, 20);
	result[4] = letters.slice(20);

	return result;
};

// Enciphers (direction = 1) or deciphers (direction = -1) a single digraph.
Playfair.prototype.transformDigraph = function(table, digraph, direction) {
	var leftPos = this.findLetter(table, digraph.left);
	var rightPos = this.findLetter(table, digraph.right);
	var leftNew;
	var rightNew;

	if (leftPos.row === rightPos.row) {
		leftNew = table[leftPos.row][this.shift(leftPos.col, direction)];
		rightNew = table[rightPos.row][this.shift(rightPos.col, direction)];
	} else if (leftPos.col === rightPos.col) {
		leftNew = table[this.shift(leftPos.row, direction)][leftPos.col];
		rightNew = table[this.shift(rightPos.row, direction)][rightPos.col];
	} else {
		leftNew = table[leftPos.row][rightPos.col];
		rightNew = table[rightPos.row][leftPos.col];
	}

	return leftNew + rightNew;
};

Playfair.prototype.shift = function(value, direction) {
	var result = (value + direction) % 5;
	return (result >= 0) ? result : 4;
};

Playfair.prototype.findLetter = function(table, letter) {
	for (var i = 0; i < table.length; ++i) {
		for (var j = 0; j < table[i].length; ++j) {
			if (table[i][j] === letter || letter === 'J' && table[i][j] === 'I') {
				return {
					row: i,
					col: j
				};
			}
		}
	}

	return null;
};

// Converts a string to an array of letter pairs, padded and stripped. 
Playfair.prototype.toDigraphs = function(plaintext) {
	var text = this.pad(this.strip(plaintext.toUpperCase()));
	var result = [];

	for (var i = 0; i < text.length; i += 2) {
		result.push({
			left: text.charAt(i),
			right: text.charAt(i + 1)
		});
	}

	return result;
};

// Converts a string to an array of letter pairs, stripped but not padded. 
Playfair.prototype.toDigraphsDecipher = function(plaintext) {
	var text = this.strip(plaintext.toUpperCase());
	var result = [];

	for (var i = 0; i < text.length; i += 2) {
		result.push({
			left: text.charAt(i),
			right: text.charAt(i + 1)
		});
	}

	return result;
};

// Returns a new string stripped of all non-alpha characters.
Playfair.prototype.strip = function(text) {
	var result = "";
	for (var i = 0; i < text.length; ++i) {
		if (this.isAlpha(text.charAt(i))) {
			result += text.charAt(i);
		}
	}

	return result;
};

// Pads a string with 'X' characters according to Playfair rules.
Playfair.prototype.pad = function(text) {
	var result = "";

	// Pad with X if two consecutive characters are the same.
	for (var i = 0; i < text.length; ++i) {
		result += text.charAt(i);
		if (i + 1 < text.length && text[i] === text[i + 1]) {
			result += 'X';
		}
	}

	// Pad with X if we end up odd.
	if (result.length % 2 !== 0) {
		result += 'X';
	}

	return result;
};

// Prints an array of digraphs (mostly for testing).
Playfair.prototype.printDigraphs = function(digraphs) {
	var result = "";

	for (var i = 0; i < digraphs.length; ++i) {
		result += (digraphs[i].left + digraphs[i].right);
		if (i + 1 < digraphs.length) {
			result += ' ';
		}
	}

	return result;
};