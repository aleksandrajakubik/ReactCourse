import toRoman from "./toRoman.js";

describe('toRoman()', () => {
    it.each([
        [1, "I"],
        [5, "V"]
    ])('convert %d to %s', (arabic, expectedRoman) => {
        expect(toRoman(arabic)).toEqual(expectedRoman)
    });
    it('does not convert 0 to any roman number', () => {
        expect(toRoman(0)).toEqual("none")
    });
});