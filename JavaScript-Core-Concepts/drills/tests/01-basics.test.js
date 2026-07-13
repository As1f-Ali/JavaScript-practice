import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { greet, describeStudent, updateProfile, sum, splitFirst } from '../01-basics.js';

describe('01 · basics', () => {
  describe('greet', () => {
    test('greets a name', () => {
      assert.equal(greet('Aarav'), 'Hello, Aarav!');
    });

    test('falls back to a default when no name is given', () => {
      assert.equal(greet(), 'Hello, friend!');
    });
  });

  describe('describeStudent', () => {
    test('builds a sentence from the student object', () => {
      assert.equal(
        describeStudent({ name: 'Diya', course: 'React Native', gpa: 9 }),
        'Diya is studying React Native with a GPA of 9.',
      );
    });

    test('works for any student', () => {
      assert.equal(
        describeStudent({ name: 'Kabir', course: 'Node.js', gpa: 7.2 }),
        'Kabir is studying Node.js with a GPA of 7.2.',
      );
    });
  });

  describe('updateProfile', () => {
    test('applies the updates', () => {
      const result = updateProfile({ name: 'Kabir', gpa: 7.2 }, { gpa: 8.0 });
      assert.deepEqual(result, { name: 'Kabir', gpa: 8.0 });
    });

    test('keeps the fields that were not updated', () => {
      const result = updateProfile(
        { name: 'Kabir', course: 'Node.js', gpa: 7.2 },
        { gpa: 8.0 },
      );
      assert.equal(result.course, 'Node.js');
      assert.equal(result.name, 'Kabir');
    });

    test('leaves the ORIGINAL object unchanged', () => {
      const student = { name: 'Kabir', gpa: 7.2 };
      updateProfile(student, { gpa: 8.0 });
      assert.equal(student.gpa, 7.2, 'the original must not be modified — spread into a new object');
    });

    test('returns a new object, not the same one', () => {
      const student = { name: 'Kabir', gpa: 7.2 };
      assert.notEqual(updateProfile(student, { gpa: 8 }), student);
    });
  });

  describe('sum', () => {
    test('adds the numbers it is given', () => {
      assert.equal(sum(1, 2, 3), 6);
      assert.equal(sum(5), 5);
      assert.equal(sum(1, 2, 3, 4, 5), 15);
    });

    test('with no arguments the total is 0', () => {
      assert.equal(sum(), 0);
    });
  });

  describe('splitFirst', () => {
    test('splits into the first item and the rest', () => {
      assert.deepEqual(splitFirst(['a', 'b', 'c']), { first: 'a', rest: ['b', 'c'] });
    });

    test('a single item leaves an empty rest', () => {
      assert.deepEqual(splitFirst(['a']), { first: 'a', rest: [] });
    });

    test('an empty array gives undefined and an empty rest', () => {
      assert.deepEqual(splitFirst([]), { first: undefined, rest: [] });
    });
  });
});
