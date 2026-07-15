/**
 * DRILL 03 — OBJECTS, SAFELY
 *
 * Two ideas in this drill.
 *
 * 1. IMMUTABLE UPDATES — instead of changing an array or object, you make a new
 *    one with the change already in it. It feels like extra work at first. It
 *    prevents a whole category of bugs where something changes underneath you
 *    and you can't work out who did it.
 *
 * 2. READING DATA SAFELY — real data has holes in it. `?.` and `??` let you deal
 *    with a missing field without your program falling over.
 *
 * Run:  npm test -- --test-name-pattern="objects"
 */

/**
 * Adds a student to the end of the list, WITHOUT changing the original array.
 *
 *   const students = [a, b];
 *   addStudent(students, c)   →  [a, b, c]
 *   students                  →  [a, b]     (still the same!)
 *
 * `push` would change the original. Spread the old array into a new one instead.
 */
export function addStudent(students, student) {
  return [...students, student];
}

/**
 * Returns a new list with one student updated.
 *
 *   updateStudent(students, 2, { gpa: 9.5 })
 *   // the student with id 2 now has gpa 9.5, and keeps all their other fields.
 *   // Everyone else is untouched. The original array is untouched.
 *
 * `map` over the list. When you reach the matching student, return a new object
 * ({ ...student, ...patch }). For everyone else, just return them as they are.
 */
export function updateStudent(students, id, patch) {
  return students.map( student => student.id === id ? { ...student, ...patch} : student);
}

/**
 * Returns a new list with one student removed.
 *
 *   removeStudent(students, 2)   →  everyone except id 2
 *   removeStudent(students, 999) →  everyone (nothing matched, nothing removed)
 *
 * `filter` is perfect for this — and it already returns a new array for you.
 */
export function removeStudent(students, id) {
  return students.filter( student => student.id !== id );
}

/**
 * Reads the student's city, safely.
 *
 *   getCity({ name: 'Aarav', address: { city: 'Mumbai' } })  →  'Mumbai'
 *   getCity({ name: 'Diya' })                                →  'Unknown'
 *   getCity({ name: 'Diya', address: {} })                   →  'Unknown'
 *
 * If you write `student.address.city` and `address` is missing, JavaScript
 * throws "Cannot read properties of undefined" and your program stops.
 *
 * OPTIONAL CHAINING (`student.address?.city`) gives you `undefined` instead of
 * an error, and `??` supplies the fallback.
 */
export function getCity(student) {
  return (student.address?.city ?? "Unknown");
}

/**
 * Formats a GPA for display, to one decimal place.
 *
 *   formatGpa(8.4)        →  '8.4'
 *   formatGpa(9)          →  '9.0'
 *   formatGpa(0)          →  '0.0'    ← look carefully at this one
 *   formatGpa(null)       →  '—'
 *   formatGpa(undefined)  →  '—'
 *
 * Here's the interesting bit. It's tempting to write `gpa || '—'`. But `0` is
 * one of JavaScript's "falsy" values, so a student who genuinely scored 0 would
 * get an em-dash and their real mark would vanish from the screen.
 *
 * `??` only steps in for `null` and `undefined` — which is what you actually
 * meant. This is a small difference that catches almost everybody once.
 *
 * (`(8.4).toFixed(1)` gives you the one-decimal string.)
 */
export function formatGpa(gpa) {
  return gpa?.toFixed(1) ?? '—';
}
