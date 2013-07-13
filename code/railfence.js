// Rail Fence algorithm
// (c) Eric Smith 2010

function RailFence() {}

RailFence.prototype = new Algorithm();

RailFence.prototype.name = "Rail Fence";
RailFence.prototype.keyHint = "Number from 2 and up";
RailFence.prototype.infoPage = "railfence.html";

RailFence.prototype.isValidKey = function(key) {
	var normalKey = this.normalizeNumericKey(key);
	return normalKey >= 2;
};

RailFence.prototype.encipher = function(plaintext, key) {
	plaintext = plaintext.toUpperCase();
	key = this.normalizeNumericKey(key);
	var ciphertext = "";
	for (var i = 0; i < key; ++i) {
		for (var j = 0; j < plaintext.length; j += key) {
			if (i + j < plaintext.length) {
				ciphertext += plaintext.charAt(i + j);
			}
		}
	}
	return ciphertext;
};

RailFence.prototype.decipher = function(ciphertext, key) {
	ciphertext = ciphertext.toLowerCase();
	key = this.normalizeNumericKey(key);
	var plaintext = "";
	var columns = Math.ceil(ciphertext.length / key);
	for (var col = 0; col < columns; ++col) {
		for (var row = 0; row < key && plaintext.length < ciphertext.length; ++row) {
			var offset = row * columns + col;
			var adjustment = this.adjustment(key, ciphertext.length, row);
			plaintext += ciphertext.charAt(offset - adjustment);
		}
	}
	return plaintext;
};

// Adjustment to handle incomplete rows.
RailFence.prototype.adjustment = function(key, length, row) {
	var adjustment = 0;
	var remainder = length % key;
	while (remainder > 0 && row > 0 && row > remainder) {
		adjustment++;
		row--;
	}
	return adjustment;
};