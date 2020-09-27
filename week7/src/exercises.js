// 1. Function wait(ms) returns pending promise which has to be resolved
// after given ms
function wait(ms) {
    return new Promise( (resolve, reject) => {
        setTimeout(() => resolve(), ms)
    })
}
// 2. Function delayedError returns pending Promise which has to be rejected
// after given ms and give Error with given message
function delayedError(ms, message) {
    return new Promise( (resolve, reject) => {
        setTimeout(() => reject(new Error(message)), ms)
    })
}
// 3. Function isEven(num) returns Promise which has to be resolved immediately
// after given is integer number, it's value has to be true if it's even number and false if odd,
// promise has to be immediately rejected if given number is not integer.
function isEven(num) {
    return new Promise( (resolve, reject) => {
        if (Number.isInteger(num)) {
            if ( num % 2 == 0 ) {
                resolve(true)
            } else {
                resolve(false)
            }
        } else {
            reject("Number is not integer")
        }
    })
}
// 4. slowIsEven(num, ms=1000) is working like isEven, but after given ms
function slowIsEven(num, ms=1000) {
    return Promise.all([wait(ms), isEven(num)]);
}
slowIsEven(2, 4000).then(([x, y]) => console.log(y))