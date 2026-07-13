/**
 * DRILL 02 — WORKING WITH DATA
 *
 * map · filter · find · reduce · some · every
 *
 * These six methods do most of the day-to-day work in JavaScript. `reduce` is
 * the one that usually takes a few tries — that is completely normal, and it is
 * worth the effort. Everything else here is gentler.
 *
 * Every function below is given the same shape of data:
 *
 *   { id: 1, name: 'Aarav Sharma', age: 21, course: 'React Native', gpa: 8.4 }
 *
 * Run:  npm test -- --test-name-pattern="arrays"
 */

/**
 * Returns just the names.
 *
 *   getNames(students)  →  ['Aarav Sharma', 'Diya Patel', 'Kabir Singh']
 *
 * `map` turns each item into something else, keeping the same length.
 */
export function getNames(students) {
  // TODO
}

/**
 * Returns only the students on the given course.
 *
 *   filterByCourse(students, 'Node.js')  →  [Kabir]
 *   filterByCourse(students, 'Physics')  →  []      (no match → empty array)
 *
 * `filter` keeps the items you say yes to.
 */
export function filterByCourse(students, course) {
  // TODO
}

/**
 * Finds one student by id.
 *
 *   findById(students, 2)    →  the student with id 2
 *   findById(students, 999)  →  null
 *
 * Careful: `find` returns `undefined` when nothing matches, but this function
 * should return `null`. `??` is a neat way to turn one into the other.
 */
export function findById(students, id) {
  // TODO
}

/**
 * Counts how many students are on each course.
 *
 *   countByCourse(students)
 *   →  { 'React Native': 2, 'Node.js': 1 }
 *
 * This is the classic `reduce`. Start with an empty object `{}` as the initial
 * value, and add one to the right key each time round.
 *
 * Take it slowly:
 *   - What is the accumulator here?  (an object of counts)
 *   - What do you do with each student?  (add 1 to their course's count)
 *   - What if the course isn't in the object yet?  (it's `undefined` — start it at 0)
 */
export function countByCourse(students) {
  // TODO
}

/**
 * The average GPA, rounded to one decimal place.
 *
 *   averageGpa(students)  →  8.2
 *   averageGpa([])        →  null
 *
 * THE EMPTY LIST MATTERS. Adding up nothing gives 0, and 0 ÷ 0 is `NaN` — which
 * would end up printed on a page as "Average GPA: NaN". So check for an empty
 * list first and return `null` instead. A small habit that saves real bugs.
 *
 * To round: Math.round(n * 10) / 10
 */
export function averageGpa(students) {
  // TODO
}

/**
 * Have ALL the students passed?
 *
 *   allPassed(students, 5)   →  true    (everyone is above 5)
 *   allPassed(students, 8)   →  false   (Kabir is on 7.2)
 *   allPassed([], 5)         →  true    (nobody failed! this is how `every` works)
 *
 * `every` asks "is this true for all of them?".
 */
export function allPassed(students, minGpa) {
  // TODO
}
