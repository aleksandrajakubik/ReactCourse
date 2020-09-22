module.exports = function fib(x) {
    return x <= 1 ? x : fib(x-2) + fib(x-1)
}