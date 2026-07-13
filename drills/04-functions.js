/**
 * DRILL 04 — FUNCTIONS, A LEVEL DEEPER
 *
 * In JavaScript, a function is just a value. You can store it in a variable,
 * pass it into another function, and return it from one. Once that idea lands,
 * a lot of JavaScript stops looking like magic.
 *
 * This drill also introduces CLOSURES. A closure is simply a function that
 * remembers the variables that were around it when it was created — even after
 * the code that made those variables has finished.
 *
 * It sounds abstract. Write the first function and it will feel obvious.
 *
 * Run:  npm test -- --test-name-pattern="functions"
 */

/**
 * Makes a counter.
 *
 *   const counter = makeCounter();
 *   counter.increment();   // 1
 *   counter.increment();   // 2
 *   counter.getValue();    // 2
 *
 *   const other = makeCounter(10);
 *   other.getValue();      // 10   — a completely separate count
 *
 * Declare `let count` inside the function, and return an object with two small
 * functions that use it. `increment` returns the new value.
 *
 * That `count` variable is the closure: it stays alive because the returned
 * functions still refer to it, and nothing outside can reach it.
 */
export function makeCounter(start = 0) {
  // TODO
}

/**
 * Wraps a function so it only ever runs ONCE.
 * Every call after the first returns the first result, without running it again.
 *
 *   const setup = once(() => { console.log('setting up'); return 42; });
 *   setup();   // logs 'setting up', returns 42
 *   setup();   // logs nothing,      returns 42
 *
 * You'll need two variables in the closure: one remembering whether it has run,
 * and one remembering what it returned.
 */
export function once(fn) {
  // TODO
}

/**
 * Returns a FUNCTION that multiplies by the given number.
 *
 *   const double = multiplyBy(2);
 *   double(5);    // 10
 *
 *   const triple = multiplyBy(3);
 *   triple(5);    // 15
 *
 * `double` and `triple` each remember their own `factor`. That is a closure too.
 */
export function multiplyBy(factor) {
  // TODO
}

/**
 * Applies a function to every item in an array and returns the results.
 *
 *   applyToAll([1, 2, 3], (n) => n * 2)   →  [2, 4, 6]
 *   applyToAll([], (n) => n * 2)          →  []
 *
 * Yes — this is exactly what `map` does. Please write it yourself, with a `for`
 * loop and `push`, WITHOUT using `map`. Building it once is the quickest way to
 * understand what `map` has been doing for you all along.
 *
 * Notice that `fn` is a function you were handed as an argument. That is all a
 * "higher-order function" means.
 */
export function applyToAll(items, fn) {
  // TODO
}

/**
 * Returns an array of `n` functions. The function at index `i` returns `i`.
 *
 *   const handlers = collectHandlers(3);
 *   handlers[0]();   // 0
 *   handlers[2]();   // 2
 *
 * Write it with a `for` loop and `let`.
 *
 * Then, once it passes, try changing your `let` to `var` and run the test again.
 * You'll get [3, 3, 3] instead. That is one of the most famous quirks in the
 * language, and it's the reason we use `let`. Have a think about why — and if
 * it doesn't click, bring it to Friday. It's a great question.
 */
export function collectHandlers(n) {
  // TODO
}
