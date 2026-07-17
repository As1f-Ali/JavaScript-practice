/**
 * DRILL 05 — ASYNCHRONOUS JAVASCRIPT
 *
 * Some things take time: fetching data, reading a file, waiting for a server.
 * JavaScript doesn't sit and wait for them — it carries on, and comes back when
 * the answer arrives. Promises and `async`/`await` are how you write that down.
 *
 * Nothing here talks to a real server. You'll be given a `loader` function that
 * pretends to be one, so you can focus on the shapes rather than on the network.
 *
 * Run:  npm test -- --test-name-pattern="async"
 */

/**
 * Waits for a number of milliseconds, then finishes.
 *
 *   await sleep(500);
 *   console.log('half a second later');
 *
 * A promise finishes when you call its `resolve`. `setTimeout` is what waits.
 *
 *   return new Promise((resolve) => { ... });
 *
 * This little function is used by all the others below, so start here.
 */
export function sleep(ms) {
  return new Promise((resolve) => { setTimeout(resolve,ms)});
}

/**
 * Loads one student, and never throws.
 *
 * `loader(id)` is an async function. Sometimes it works, sometimes it fails.
 * Whatever happens, this function returns an object telling you which:
 *
 *   await safeLoad(loader, 1)     →  { data: {...student}, error: null }
 *   await safeLoad(loader, 999)   →  { data: null, error: 'Student not found' }
 *
 * Use `async`/`await` inside a `try`/`catch`. In the `catch`, you get the error
 * object — its message is on `error.message`.
 *
 * This is the everyday shape of handling failure: don't let it crash, turn it
 * into a value you can do something sensible with.
 */
export async function safeLoad(loader, id) {
  try {

    const student = await loader(id);
    return {data: student, error: null} ;
  } catch(error) {
    return {data: null, error: error.message};
  }
}

/**
 * Loads several students AT THE SAME TIME, and returns them in order.
 *
 *   await loadAll([1, 2, 3], loader)   →  [student1, student2, student3]
 *   await loadAll([], loader)          →  []
 *
 * `ids.map(...)` gives you an array of PROMISES (not results — the work has
 * started, but none of it has finished). `Promise.all` waits for all of them
 * and hands you the results, in the original order.
 *
 * If any one of them fails, the whole thing fails. That's fine here.
 */
export function loadAll(ids, loader) {
  return Promise.all(ids.map( id => loader(id)));
}

/**
 * Loads several students ONE AFTER ANOTHER, and returns them in order.
 *
 *   await loadInOrder([1, 2, 3], loader)   →  [student1, student2, student3]
 *
 * Same result as `loadAll` — but each load only starts once the previous one has
 * finished. Use a `for...of` loop with `await` inside it, and push each result.
 *
 * WHY BOTH? Compare them. If each load takes 50ms, `loadAll` finishes three of
 * them in about 50ms, and `loadInOrder` takes about 150ms. That is the whole
 * difference between doing things in parallel and doing them one at a time —
 * and it's one of the most useful things to understand about `await`.
 *
 * (Sometimes you genuinely need them one at a time — when each request depends
 * on the answer to the last one. But when you don't, `Promise.all` is free speed.)
 */
export async function loadInOrder(ids, loader) {
  const students = [];
  for (let id of ids){
    const student = await loader(id);
    students.push(student);
  }
  return students;
}
