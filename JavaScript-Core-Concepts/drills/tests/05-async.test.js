import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { sleep, safeLoad, loadAll, loadInOrder } from '../05-async.js';

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

/** A pretend server. Takes 50ms, and doesn't know anybody with an id above 100. */
const loader = async (id) => {
  await wait(50);
  if (id > 100) throw new Error('Student not found');
  return { id, name: `Student ${id}` };
};

describe('05 · async', () => {
  describe('sleep', () => {
    test('waits for roughly the time it was given', async () => {
      const started = Date.now();
      await sleep(50);
      assert.ok(Date.now() - started >= 45, 'it should actually pause — setTimeout inside a Promise');
    });
  });

  describe('safeLoad', () => {
    test('returns the data when the load works', async () => {
      const result = await safeLoad(loader, 1);
      assert.deepEqual(result, { data: { id: 1, name: 'Student 1' }, error: null });
    });

    test('returns the error message when the load fails', async () => {
      const result = await safeLoad(loader, 999);
      assert.deepEqual(result, { data: null, error: 'Student not found' });
    });

    test('never throws, whatever happens', async () => {
      await assert.doesNotReject(() => safeLoad(loader, 999), 'catch the error — do not let it escape');
    });
  });

  describe('loadAll', () => {
    test('returns the students in the order of the ids', async () => {
      const result = await loadAll([3, 1, 2], loader);
      assert.deepEqual(
        result.map((s) => s.id),
        [3, 1, 2],
      );
    });

    test('an empty list gives an empty list', async () => {
      assert.deepEqual(await loadAll([], loader), []);
    });

    test('loads them all at the same time', async () => {
      const started = Date.now();
      await loadAll([1, 2, 3, 4], loader);
      const elapsed = Date.now() - started;
      assert.ok(
        elapsed < 150,
        `four 50ms loads took ${elapsed}ms — that means they ran one after another. ` +
          'Start them all with .map(), then Promise.all the results.',
      );
    });
  });

  describe('loadInOrder', () => {
    test('returns the students in the order of the ids', async () => {
      const result = await loadInOrder([3, 1, 2], loader);
      assert.deepEqual(
        result.map((s) => s.id),
        [3, 1, 2],
      );
    });

    test('an empty list gives an empty list', async () => {
      assert.deepEqual(await loadInOrder([], loader), []);
    });

    test('loads them one after another — this one is MEANT to be slower', async () => {
      const started = Date.now();
      await loadInOrder([1, 2, 3], loader);
      const elapsed = Date.now() - started;
      assert.ok(
        elapsed >= 140,
        `three 50ms loads finished in ${elapsed}ms — that is too fast to have been sequential. ` +
          'Use a for...of loop with await inside it.',
      );
    });
  });
});
