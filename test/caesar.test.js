describe('Caesar shift', function () {

    it('should encipher correctly', function () {
        var algorithm = new Caesar();
        var ciphertext = algorithm.encipher("abcdefghijklmnopqrstuvwxyz", "1");
        expect(ciphertext).toEqual("BCDEFGHIJKLMNOPQRSTUVWXYZA");
    }),

    it('should decipher correctly', function () {
        var algorithm = new Caesar();
        var plaintext = algorithm.decipher("BCDEFGHIJKLMNOPQRSTUVWXYZA", "1");
        expect(plaintext).toEqual("abcdefghijklmnopqrstuvwxyz");
    }),

    it('should pass non-alpha characters through on encipher', function () {
        var algorithm = new Caesar();
        var ciphertext = algorithm.encipher("a 1 ! b", "2");
        expect(ciphertext).toEqual("C 1 ! D");
    }),

    it('should pass non-alpha characters through on decipher', function () {
        var algorithm = new Caesar();
        var plaintext = algorithm.decipher("C 1 ! D", "2");
        expect(plaintext).toEqual("a 1 ! b");
    }),

    it('should rotate correctly forward', function () {
        var algorithm = new Caesar();
        expect("a".charCodeAt()).toEqual(algorithm.rotate("z".charCodeAt(), 1));
    }),

    it('should rotate correctly backward', function () {
        var algorithm = new Caesar();
        expect("z".charCodeAt()).toEqual(algorithm.rotate("a".charCodeAt(), -1));
    }),

    it('should encipher to empty string with a bad key', function () {
        var algorithm = new Caesar();
        expect(algorithm.encipher("abc", 0)).toEqual("");
    }),

    it('should decipher to empty string with a bad key', function () {
        var algorithm = new Caesar();
        expect(algorithm.decipher("abc", 26)).toEqual("");
    });

});

