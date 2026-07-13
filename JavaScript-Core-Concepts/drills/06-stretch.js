/**
 * DRILL 06 — STRETCH (completely optional) 🌟
 *
 * These are here for anyone who finishes the five core drills and wants
 * something more to chew on. They carry NO MARKS and they are NOT on Friday's
 * test. Skip them with a clear conscience.
 *
 * If you do try them: they're a genuine step up in difficulty, so don't be
 * discouraged if one takes a while. That's the point of them.
 *
 * Run:  npm run test:stretch
 */

/**
 * Groups items into an object of arrays, using whatever key you ask for.
 *
 *   groupBy(students, (s) => s.course)
 *   →  { 'React Native': [aarav, diya], 'Node.js': [kabir] }
 *
 *   groupBy([1, 2, 3, 4], (n) => (n % 2 ? 'odd' : 'even'))
 *   →  { odd: [1, 3], even: [2, 4] }
 *
 * Notice it must work on ANY kind of item, not just students — so nothing in
 * here should mention a student. `reduce` is the tool.
 */
export function groupBy(items, keyFn) {
  // TODO
}

/**
 * Sorts by a key, and returns a NEW array.
 *
 *   sortBy(students, 'name')          →  A to Z
 *   sortBy(students, 'gpa', 'desc')   →  highest GPA first
 *
 * Watch out: `.sort()` changes the array in place. Copy it first ([...items]).
 *
 * Strings compare with `a.localeCompare(b)`; numbers just subtract.
 */
export function sortBy(items, key, direction = 'asc') {
  // TODO
}

/**
 * Cuts one page out of a longer list.
 *
 *   paginate(twelveItems, 2, 5)
 *   →  { items: [items 6 to 10], page: 2, totalPages: 3 }
 *
 * The tricky part: if someone asks for page 99 of a 3-page list, don't hand back
 * an empty page — give them the last real one.
 *
 *   paginate(twelveItems, 99, 5)   →  page: 3
 *   paginate(twelveItems, 0,  5)   →  page: 1
 *   paginate([],          1,  5)   →  { items: [], page: 1, totalPages: 1 }
 */
export function paginate(items, page, perPage) {
  // TODO
}

/**
 * Waits until someone stops calling it, then runs the function once.
 *
 *   const search = debounce(runSearch, 300);
 *   search('r'); search('re'); search('rea'); search('react');
 *   // 300ms after the LAST call: runSearch('react') runs — once.
 *
 * This is how a search box avoids firing a request on every single keystroke.
 *
 * Keep the timer id in a variable in the closure, and `clearTimeout` it at the
 * start of every call.
 */
export function debounce(fn, ms) {
  // TODO
}

/**
 * Tries a function again if it fails.
 *
 *   await retry(() => loadStudent(1), 3, 200);
 *   // calls it up to 3 times in total, waiting 200ms between tries.
 *   // Returns the first success. If all of them fail, throw the last error.
 *
 * A loop, a try/catch, and your `sleep` from drill 05.
 */
export async function retry(fn, attempts = 3, delayMs = 0) {
  // TODO
}
