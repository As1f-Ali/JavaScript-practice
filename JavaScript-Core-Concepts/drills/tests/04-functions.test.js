import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import {
  makeCounter,
  once,
  multiplyBy,
  applyToAll,
  collectHandlers,
} from '../04-functions.js';

describe('04 · functions and closures', () => {
  describe('makeCounter', () => {
    test('starts at 0 by default', () => {
      assert.equal(makeCounter().getValue(), 0);
    });

    test('can start somewhere else', () => {
      assert.equal(makeCounter(10).getValue(), 10);
    });

    test('increment adds one and returns the new value', () => {
      const counter = makeCounter();
      assert.equal(counter.increment(), 1);
      assert.equal(counter.increment(), 2);
      assert.equal(counter.getValue(), 2);
    });

    test('two counters keep separate counts', () => {
      const a = makeCounter();
      const b = makeCounter(100);
      a.increment();
      a.increment();
      assert.equal(a.getValue(), 2);
      assert.equal(b.getValue(), 100, 'each counter has its own `count` in its own closure');
    });
  });

  describe('once', () => {
    test('runs the function only the first time', () => {
      let runs = 0;
      const setup = once(() => {
        runs += 1;
        return 42;
      });
      setup();
      setup();
      setup();
      assert.equal(runs, 1);
    });

    test('later calls return the first result', () => {
      const setup = once(() => 42);
      assert.equal(setup(), 42);
      assert.equal(setup(), 42);
    });

    test('arguments work on the first call', () => {
      const add = once((a, b) => a + b);
      assert.equal(add(2, 3), 5);
    });
  });

  describe('multiplyBy', () => {
    test('returns a function that multiplies', () => {
      const double = multiplyBy(2);
      assert.equal(typeof double, 'function', 'multiplyBy should RETURN a function');
      assert.equal(double(5), 10);
      assert.equal(double(0), 0);
    });

    test('each returned function remembers its own factor', () => {
      const double = multiplyBy(2);
      const triple = multiplyBy(3);
      assert.equal(double(5), 10);
      assert.equal(triple(5), 15);
    });
  });

  describe('applyToAll', () => {
    test('applies the function to every item', () => {
      assert.deepEqual(
        applyToAll([1, 2, 3], (n) => n * 2),
        [2, 4, 6],
      );
    });

    test('works with any function', () => {
      assert.deepEqual(
        applyToAll(['a', 'b'], (letter) => letter.toUpperCase()),
        ['A', 'B'],
      );
    });

    test('an empty array gives an empty array', () => {
      assert.deepEqual(
        applyToAll([], (n) => n),
        [],
      );
    });
  });

  describe('collectHandlers', () => {
    test('the function at index i returns i', () => {
      const handlers = collectHandlers(3);
      assert.equal(handlers.length, 3);
      assert.deepEqual(
        handlers.map((h) => h()),
        [0, 1, 2],
        'if you got [3, 3, 3], you used `var` instead of `let` — read the comment above the function',
      );
    });

    test('zero handlers is an empty array', () => {
      assert.deepEqual(collectHandlers(0), []);
    });
  });
});
