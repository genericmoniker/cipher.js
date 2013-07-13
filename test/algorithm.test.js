describe('Algorithm', function () {

    it('should calculate upper-case position correctly', function () {
        var algorithm = new Algorithm();
        var posA = algorithm.charPos('A');
        var posM = algorithm.charPos('M');
        var posZ = algorithm.charPos('Z');
        expect(posA).toEqual(0);
        expect(posM).toEqual(12);
        expect(posZ).toEqual(25);
    }),

    it('should calculate lower-case position correctly', function () {
        var algorithm = new Algorithm();
        var posA = algorithm.charPos('a');
        var posM = algorithm.charPos('m');
        var posZ = algorithm.charPos('z');
        expect(posA).toEqual(0);
        expect(posM).toEqual(12);
        expect(posZ).toEqual(25);
    }),

    it('should rotate forward correctly', function () {
        var algorithm = new Algorithm();
        var aCode = 'a'.charCodeAt();
        var bCode = 'b'.charCodeAt();
        expect(algorithm.rotate(aCode, 1)).toEqual(bCode);
    }),

    it('should rotate forward and wrap correctly', function () {
        var algorithm = new Algorithm();
        var zCode = 'z'.charCodeAt();
        var aCode = 'a'.charCodeAt();
        expect(algorithm.rotate(zCode, 1)).toEqual(aCode);
    }),

    it('should rotate backward correctly', function () {
        var algorithm = new Algorithm();
        var bCode = 'b'.charCodeAt();
        var aCode = 'a'.charCodeAt();
        expect(algorithm.rotate(bCode, -1)).toEqual(aCode);
    }),

    it('should rotate backward and wrap correctly', function () {
        var algorithm = new Algorithm();
        var aCode = 'a'.charCodeAt();
        var zCode = 'z'.charCodeAt();
        expect(algorithm.rotate(aCode, -1)).toEqual(zCode);
    })

});