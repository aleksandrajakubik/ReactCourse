const fizzBuzz = require("./fizzBuzz");

describe('fizzBuzz', () => {
    it('should return Fizz', () => {
        expect(fizzBuzz(3)).toBe("Fizz")
    });
    it('should return Buzz', () => {
        expect(fizzBuzz(5)).toBe("Buzz")
    });
    it('should return FizzBuzz', () => {
        expect(fizzBuzz(15)).toBe("FizzBuzz")
    });
    it('should return given number', () => {
        expect(fizzBuzz(19)).toBe(19)
    });
    it('should return nothing', () => {
        expect(fizzBuzz()).toBe()
    });
});
