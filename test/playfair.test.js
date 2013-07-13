describe('Playfair', function () {

    beforeEach(function() {
      this.addMatchers( {
        toEqualTable: function(expected) {
          for (var row = 0; row < 5; row++) {
            for (var col = 0; col < 5; col++) {
              if (expected[row][col] != this.actual[row][col]) {
                return false;
              }
            }
          }
          return true;
        }
      });
    }),
    
    it('should find a letter in a table', function () {
      var algorithm = new Playfair();
      var position = algorithm.findLetter([
        ['C', 'H', 'A', 'R', 'L'],
        ['E', 'S', 'B', 'D', 'F'],
        ['G', 'I', 'K', 'M', 'N'],
        ['O', 'P', 'Q', 'T', 'U'],
        ['V', 'W', 'X', 'Y', 'Z']
        ], 'Q');
      expect(position).toEqual({ row: 3, col: 2 });
    }),
    
    it('should return null when finding a letter not in a table', function () {
      var algorithm = new Playfair();
      var position = algorithm.findLetter([
        ['C', 'H', 'A', 'R', 'L'],
        ['E', 'S', 'B', 'D', 'F'],
        ['G', 'I', 'K', 'M', 'N'],
        ['O', 'P', 'X', 'T', 'U'],
        ['V', 'W', 'X', 'Y', 'Z']
        ], 'Q');
      expect(position).toEqual(null);
    }),
    
    it('should find I when looking for J in a table', function () {
      var algorithm = new Playfair();
      var position = algorithm.findLetter([
        ['C', 'H', 'A', 'R', 'L'],
        ['E', 'S', 'B', 'D', 'F'],
        ['G', 'I', 'K', 'M', 'N'],
        ['O', 'P', 'Q', 'T', 'U'],
        ['V', 'W', 'X', 'Y', 'Z']
        ], 'J');
      expect(position).toEqual({ row: 2, col: 1 });
    }),
    
    // http://www.simonsingh.net/The_Black_Chamber/playfaircipher.htm
    it('should create the key table correctly when no key letters repeat', function () {
      var algorithm = new Playfair();
      var table = algorithm.createTable("CHARLES");
      expect(table).toEqualTable([
        ['C', 'H', 'A', 'R', 'L'],
        ['E', 'S', 'B', 'D', 'F'],
        ['G', 'I', 'K', 'M', 'N'],
        ['O', 'P', 'Q', 'T', 'U'],
        ['V', 'W', 'X', 'Y', 'Z']
        ]);
    }),

    // http://en.wikipedia.org/wiki/Playfair_cipher
    it('should create the key table correctly when key letters repeat', function () {
      var algorithm = new Playfair();
      var table = algorithm.createTable("PLAYFAIREXAMPLE");
      expect(table).toEqualTable([
        ['P', 'L', 'A', 'Y', 'F'],
        ['I', 'R', 'E', 'X', 'M'],
        ['B', 'C', 'D', 'G', 'H'],
        ['K', 'N', 'O', 'Q', 'S'],
        ['T', 'U', 'V', 'W', 'Z']
        ]);
    }),
    
    it('should pad correctly with X', function () {
      var algorithm = new Playfair();
      var padded = algorithm.pad("meetme");
      expect(padded).toEqual("meXetmeX");
    }), 

    it('should convert to digraphs correctly', function () {
      var algorithm = new Playfair();
      var digraphs = algorithm.toDigraphs("meet me at hammersmith bridge tonight");
      var string = algorithm.printDigraphs(digraphs);
      expect(string).toEqual("ME XE TM EA TH AM XM ER SM IT HB RI DG ET ON IG HT");
    }),
    
    it('should encipher a digraph for plain letters in the same row', function () {
      var algorithm = new Playfair();
      var table = algorithm.createTable("PLAYFAIREXAMPLE");
      var output = algorithm.transformDigraph(table, { left: 'W', right: 'Z' }, 1);
      expect(output).toEqual("ZT");
    }),

    it('should encipher a digraph for plain letters in the same column', function () {
      var algorithm = new Playfair();
      var table = algorithm.createTable("PLAYFAIREXAMPLE");
      var output = algorithm.transformDigraph(table, { left: 'O', right: 'V' }, 1);
      expect(output).toEqual("VA");
    }),

    it('should encipher a digraph for plain letters not aligned', function () {
      var algorithm = new Playfair();
      var table = algorithm.createTable("PLAYFAIREXAMPLE");
      var output = algorithm.transformDigraph(table, { left: 'N', right: 'X' }, 1);
      expect(output).toEqual("QR");
    }),

    it('should shift around positively', function () {
      var algorithm = new Playfair();
      expect(0).toEqual(algorithm.shift(4, 1));
     }),

    it('should shift around negatively', function () {
      var algorithm = new Playfair();
      expect(4).toEqual(algorithm.shift(0, -1));
     }),

    it('should encipher correctly', function () {
      var algorithm = new Playfair();
      var ciphertext = algorithm.encipher("meet me at hammersmith bridge tonight", "CHARLES");
      expect(ciphertext).toEqual("GDVBYTBCPRRKYKDCDIMPASHMEMDOUGKIRP");
    }),

    it('should decipher correctly', function () {
      var algorithm = new Playfair();
      var plaintext = algorithm.decipher("GDVBYTBCPRRKYKDCDIMPASHMEMDOUGKIRP", "CHARLES");
      expect(plaintext).toEqual("mexetmeathamxmersmithbridgetonight");
    }),

    it('should strip non-alpha characters on encipher', function () {
      var algorithm = new Playfair();
      var ciphertext = algorithm.encipher("me 1 ! ht", "CHARLES");
      expect(ciphertext).toEqual("GDRP");
    }),

    it('should strip non-alpha characters on decipher', function () {
      var algorithm = new Playfair();
      var plaintext = algorithm.decipher("GD 1 ! RP", "CHARLES");
      expect(plaintext).toEqual("meht");
    }),

    it('should encipher to empty string with a bad key', function () {
        var algorithm = new Playfair();
        expect(algorithm.encipher("abc", 123)).toEqual("");
    }),

    it('should decipher to empty string with a bad key', function () {
        var algorithm = new Playfair();
        expect(algorithm.decipher("abc", "hello!")).toEqual("");
    }),

    it('should encipher to empty string without a key', function () {
        var algorithm = new Playfair();
        expect(algorithm.encipher("abc", null)).toEqual("");
    }),

    it('should decipher to empty string without a key', function () {
        var algorithm = new Playfair();
        expect(algorithm.decipher("abc", "")).toEqual("");
    });
});

