/**
 * DRILL 01 — THE BASICS
 *
 * Template literals, destructuring, spread, rest, default parameters.
 *
 * You met all of these in Week 2. The aim here is not to see them again — it is
 * to use them enough times that you stop having to think about them.
 *
 * Fill in each TODO, then run:  npm test -- --test-name-pattern="basics"
 */

/**
 * Returns a greeting.
 *
 *   greet('Aarav')  →  'Hello, Aarav!'
 *   greet()         →  'Hello, friend!'
 *
 * Use a DEFAULT PARAMETER for the name, and a TEMPLATE LITERAL for the string.
 */
export function greet(name = 'friend') {
  // TODO
}

/**
 * Describes a student in one sentence.
 *
 *   describeStudent({ name: 'Diya', course: 'React Native', gpa: 9 })
 *   →  'Diya is studying React Native with a GPA of 9.'
 *
 * Pull `name`, `course` and `gpa` out of the object with DESTRUCTURING first,
 * then build the sentence with a TEMPLATE LITERAL.
 */
export function describeStudent(student) {
  // TODO
}

/**
 * Returns a NEW student object with the updates applied.
 * The original object must be left exactly as it was.
 *
 *   const student = { name: 'Kabir', gpa: 7.2 };
 *   updateProfile(student, { gpa: 8.0 })   →  { name: 'Kabir', gpa: 8.0 }
 *   student                                →  { name: 'Kabir', gpa: 7.2 }   (unchanged!)
 *
 * The SPREAD operator copies the old object; the updates are applied on top.
 * Order matters — think about which one has to come second.
 */
export function updateProfile(student, updates) {
  // TODO
}

/**
 * Adds up any number of arguments.
 *
 *   sum(1, 2, 3)   →  6
 *   sum(5)         →  5
 *   sum()          →  0
 *
 * Use a REST parameter (`...numbers`) to collect the arguments into an array.
 */
export function sum(...numbers) {
  // TODO
}

/**
 * Splits an array into its first item and everything else.
 *
 *   splitFirst(['a', 'b', 'c'])   →  { first: 'a', rest: ['b', 'c'] }
 *   splitFirst(['a'])             →  { first: 'a', rest: [] }
 *   splitFirst([])                →  { first: undefined, rest: [] }
 *
 * ARRAY DESTRUCTURING with a rest element does this in one line:
 *   const [first, ...rest] = items;
 */
export function splitFirst(items) {
  // TODO
}
