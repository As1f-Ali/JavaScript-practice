import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { groupBy, sortBy, paginate, debounce, retry } from '../06-stretch.js';

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

const students = [
  { id: 1, name: 'Aarav Sharma', course: 'React Native', gpa: 8.4 },
  { id: 2, name: 'Diya Patel', course: 'React Native', gpa: 9.0 },
  { id: 3, name: 'Kabir Singh', course: 'Node.js', gpa: 7.2 },
];

describe('06 · stretch (optional)', () => {
  describe('groupBy', () => {
    test('groups students by course', () => {
      const grouped = groupBy(students, (s) => s.course);
      assert.equal(grouped['React Native'].length, 2);
      assert.equal(grouped['Node.js'][0].name, 'Kabir Singh');
    });

    test('works on anything, not just students', () => {
      assert.deepEqual(
        groupBy([1, 2, 3, 4, 5], (n) => (n % 2 ? 'odd' : 'even')),
        { odd: [1, 3, 5], even: [2, 4] },
      );
    });

    test('an empty list gives an empty object', () => {
      assert.deepEqual(
        groupBy([], (x) => x),
        {},
      );
    });
  });

  describe('sortBy', () => {
    test('sorts strings A to Z by default', () => {
      assert.deepEqual(
        sortBy(students, 'name').map((s) => s.id),
        [1, 2, 3],
      );
    });

    test('sorts numbers highest first on request', () => {
      assert.deepEqual(
        sortBy(students, 'gpa', 'desc').map((s) => s.gpa),
        [9.0, 8.4, 7.2],
      );
    });

    test('does not change the original array', () => {
      const input = [...students];
      sortBy(input, 'gpa', 'desc');
      assert.deepEqual(
        input.map((s) => s.id),
        [1, 2, 3],
        '.sort() sorts in place — copy the array first',
      );
    });
  });

  describe('paginate', () => {
    const items = Array.from({ length: 12 }, (_, i) => i + 1);

    test('cuts out the right page', () => {
      assert.deepEqual(paginate(items, 2, 5), {
        items: [6, 7, 8, 9, 10],
        page: 2,
        totalPages: 3,
      });
    });

    test('the last page can be short', () => {
      assert.deepEqual(paginate(items, 3, 5).items, [11, 12]);
    });

    test('a page that is too high gives the last real page', () => {
      assert.equal(paginate(items, 99, 5).page, 3);
      assert.deepEqual(paginate(items, 99, 5).items, [11, 12]);
    });

    test('a page below 1 gives page 1', () => {
      assert.equal(paginate(items, 0, 5).page, 1);
    });

    test('an empty list still has one page', () => {
      assert.deepEqual(paginate([], 1, 5), { items: [], page: 1, totalPages: 1 });
    });
  });

  describe('debounce', () => {
    test('a burst of calls runs the function only once', async () => {
      let runs = 0;
      const fn = debounce(() => {
        runs += 1;
      }, 30);
      fn();
      fn();
      fn();
      assert.equal(runs, 0, 'it should not fire straight away');
      await wait(60);
      assert.equal(runs, 1);
    });

    test('it uses the arguments of the LAST call', async () => {
      const seen = [];
      const fn = debounce((q) => seen.push(q), 30);
      fn('r');
      fn('re');
      fn('react');
      await wait(60);
      assert.deepEqual(seen, ['react']);
    });
  });

  describe('retry', () => {
    test('does not retry something that works', async () => {
      let calls = 0;
      const result = await retry(async () => {
        calls += 1;
        return 'ok';
      }, 3);
      assert.equal(result, 'ok');
      assert.equal(calls, 1);
    });

    test('tries again until it works', async () => {
      let calls = 0;
      const flaky = async () => {
        calls += 1;
        if (calls < 3) throw new Error('boom');
        return 'ok';
      };
      assert.equal(await retry(flaky, 3, 5), 'ok');
      assert.equal(calls, 3);
    });

    test('gives up after `attempts` tries and throws the last error', async () => {
      let calls = 0;
      const always = async () => {
        calls += 1;
        throw new Error(`fail ${calls}`);
      };
      await assert.rejects(() => retry(always, 3, 5), { message: 'fail 3' });
      assert.equal(calls, 3, '`attempts` is the total number of tries, including the first');
    });
  });
});
