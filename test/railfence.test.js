describe('RailFence', function () {

    beforeEach(function() {
    }),
    
    it('should encipher correctly', function () {
      var algorithm = new RailFence();
      var ciphertext = algorithm.encipher("ionceknewamanfromitalywhoencipheredmessageswithascytale", 4);
      expect(ciphertext).toEqual("IEWNMLOIREGISAOKAFIYEPESETCLNNMRTWNHDSSHYECEAOAHCEMAWAT");
    }),
    
    it('should parse string keys', function () {
      var algorithm = new RailFence();
      var ciphertext = algorithm.encipher("hellot", "4");
      expect(ciphertext).toEqual("HOETLL");
    }),
    
    it('should decipher correctly with an uneven square', function () {
      var algorithm = new RailFence();
      var plaintext = algorithm.decipher("AOAPUNDNETYYTA?BWAN", 4); // 19 chars / 4 = 4R3
      expect(plaintext).toEqual("anybodywantapeanut?");
    }),

    it('should decipher correctly with an even square', function () {
      var algorithm = new RailFence();
      var plaintext = algorithm.decipher("AOAPUNDNETYYTA?BWAN?", 4); // 20 chars / 4 = 5R0
      expect(plaintext).toEqual("anybodywantapeanut??");
    }),

    it('should encipher correctly with spaces', function () {
      var algorithm = new RailFence();
      var ciphertext = algorithm.encipher("i do not think that word means what you think it means.", 3);
      expect(ciphertext).toEqual("IOOTNTTO A AY I  A.  THKH RMNWTOTNIMNDN I AWDESH UHKTES");
    }),
    
    it('should decipher correctly with spaces', function () {
      var algorithm = new RailFence();
      var plaintext = algorithm.decipher("AUHS . WYIOS", 5);
      expect(plaintext).toEqual("as you wish.");
    }),

    it('should degenerate with a key equal to the message length', function () {
      var algorithm = new RailFence();
      var ciphertext = algorithm.encipher("no more rhyming, and i mean it!", 31);
      expect(ciphertext).toEqual("NO MORE RHYMING, AND I MEAN IT!");
    });

    it('should decipher a degenerate message correctly', function () {
      var algorithm = new RailFence();
      var plaintext = algorithm.decipher("NO MORE RHYMING, AND I MEAN IT!", 31);
      expect(plaintext).toEqual("no more rhyming, and i mean it!");
    }),

    it('should encipher to empty string with a bad key', function () {
        var algorithm = new RailFence();
        expect(algorithm.encipher("abc", "fred")).toEqual("");
    }),

    it('should decipher to empty string with a bad key', function () {
        var algorithm = new RailFence();
        expect(algorithm.decipher("abc", -22)).toEqual("");
    });
    
});

