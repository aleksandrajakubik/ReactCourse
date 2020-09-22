const xxx = require("./xxx");

describe('xxx', () => {
    it('should do reverse Ola to alO', () => {
        expect(xxx("Ola")).toBe("alO")
    });
    it('should do reverse Ola to alO', () => {
        expect(xxx("Do a reverse")).toBe("esrever a oD")
    });
    it('should return empty string while given empty string', () => {
        expect(xxx("")).toBe("")
    });
});
