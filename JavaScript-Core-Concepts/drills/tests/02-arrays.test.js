import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import {
  getNames,
  filterByCourse,
  findById,
  countByCourse,
  averageGpa,
  allPassed,
} from '../02-arrays.js';

const students = [
  { id: 1, name: 'Aarav Sharma', age: 21, course: 'React Native', gpa: 8.4 },
  { id: 2, name: 'Diya Patel', age: 22, course: 'React Native', gpa: 9.0 },
  { id: 3, name: 'Kabir Singh', age: 20, course: 'Node.js', gpa: 7.2 },
];

describe('02 · arrays', () => {
  describe('getNames', () => {
    test('returns every name, in order', () => {
      assert.deepEqual(getNames(students), ['Aarav Sharma', 'Diya Patel', 'Kabir Singh']);
    });

    test('an empty list gives an empty list', () => {
      assert.deepEqual(getNames([]), []);
    });
  });

  describe('filterByCourse', () => {
    test('keeps only the matching students', () => {
      assert.deepEqual(
        filterByCourse(students, 'React Native').map((s) => s.id),
        [1, 2],
      );
    });

    test('no match gives an empty array', () => {
      assert.deepEqual(filterByCourse(students, 'Physics'), []);
    });
  });

  describe('findById', () => {
    test('finds the right student', () => {
      assert.equal(findById(students, 2).name, 'Diya Patel');
    });

    test('returns null when there is no match', () => {
      assert.equal(
        findById(students, 999),
        null,
        '`find` gives you undefined here — turn it into null (?? is handy)',
      );
    });
  });

  describe('countByCourse', () => {
    test('counts the students on each course', () => {
      assert.deepEqual(countByCourse(students), { 'React Native': 2, 'Node.js': 1 });
    });

    test('an empty list gives an empty object', () => {
      assert.deepEqual(countByCourse([]), {});
    });

    test('one student, one course', () => {
      assert.deepEqual(countByCourse([students[2]]), { 'Node.js': 1 });
    });
  });

  describe('averageGpa', () => {
    test('averages, rounded to one decimal place', () => {
      assert.equal(averageGpa(students), 8.2);
    });

    test('rounds properly', () => {
      assert.equal(averageGpa([{ gpa: 8 }, { gpa: 9 }, { gpa: 9 }]), 8.7);
    });

    test('an empty list gives null, not NaN', () => {
      assert.equal(
        averageGpa([]),
        null,
        'dividing by zero gives NaN — check for the empty list first',
      );
    });
  });

  describe('allPassed', () => {
    test('true when everyone is above the mark', () => {
      assert.equal(allPassed(students, 5), true);
    });

    test('false when someone is below it', () => {
      assert.equal(allPassed(students, 8), false);
    });

    test('an empty list is true — there is nobody to fail', () => {
      assert.equal(allPassed([], 5), true);
    });
  });
});
