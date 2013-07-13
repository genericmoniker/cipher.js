describe('Vigenere', function () {

    it('should encipher correctly', function () {
        var algorithm = new Vigenere();
        var ciphertext = algorithm.encipher("diverttroopstoeastridge", "WHITE");
        expect(ciphertext).toEqual("ZPDXVPAZHSLZBHIWZBKMZNM");
    }),

    it('should decipher correctly', function () {
        var algorithm = new Vigenere();
        var ciphertext = algorithm.decipher("ZPDXVPAZHSLZBHIWZBKMZNM", "WHITE");
        expect(ciphertext).toEqual("diverttroopstoeastridge");
    }),

    it('should pass non-alpha characters through on encipher', function () {
        var algorithm = new Vigenere();
        var ciphertext = algorithm.encipher("d 1 ! i", "WHITE");
        expect(ciphertext).toEqual("Z 1 ! P");
    }),

    it('should pass non-alpha characters through on decipher', function () {
        var algorithm = new Vigenere();
        var plaintext = algorithm.decipher("Z 1 ! P", "WHITE");
        expect(plaintext).toEqual("d 1 ! i");
    }),

    it('should encipher to empty string with a bad key', function () {
        var algorithm = new Vigenere();
        expect(algorithm.encipher("abc", 12)).toEqual("");
    }),

    it('should decipher to empty string with a bad key', function () {
        var algorithm = new Vigenere();
        expect(algorithm.decipher("abc", "bad key")).toEqual("");
    }),

    it('should encipher to empty string without a key', function () {
        var algorithm = new Vigenere();
        expect(algorithm.encipher("abc", null)).toEqual("");
    }),

    it('should decipher to empty string without a key', function () {
        var algorithm = new Vigenere();
        expect(algorithm.decipher("abc", "")).toEqual("");
    });
});

