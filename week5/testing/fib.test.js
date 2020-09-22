const fib = require("./fib");

describe('fibonacci', () => {
    it('should return 0', () => {
        expect(fib(0)).toBe(0);
    });
    it('should return 1 when given 1', () => {
        expect(fib(1)).toBe(1);
    });
    it('should return 1 when given 2', () => {
        expect(fib(2)).toBe(1);
    });
    it('should return 987 when given 16', () => {
        expect(fib(16)).toBe(987);
    });
});

