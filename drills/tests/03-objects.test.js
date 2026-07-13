import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import {
  addStudent,
  updateStudent,
  removeStudent,
  getCity,
  formatGpa,
} from '../03-objects.js';

const makeStudents = () => [
  { id: 1, name: 'Aarav Sharma', course: 'React Native', gpa: 8.4 },
  { id: 2, name: 'Diya Patel', course: 'React Native', gpa: 9.0 },
  { id: 3, name: 'Kabir Singh', course: 'Node.js', gpa: 7.2 },
];

describe('03 · objects and safe reading', () => {
  describe('addStudent', () => {
    test('adds the student to the end', () => {
      const students = makeStudents();
      const result = addStudent(students, { id: 4, name: 'Meera Rao' });
      assert.equal(result.length, 4);
      assert.equal(result[3].name, 'Meera Rao');
    });

    test('leaves the original array unchanged', () => {
      const students = makeStudents();
      addStudent(students, { id: 4, name: 'Meera Rao' });
      assert.equal(students.length, 3, '`push` changes the original — spread into a new array instead');
    });
  });

  describe('updateStudent', () => {
    test('updates the matching student', () => {
      const result = updateStudent(makeStudents(), 2, { gpa: 9.5 });
      assert.equal(result[1].gpa, 9.5);
    });

    test('keeps the fields that were not in the patch', () => {
      const result = updateStudent(makeStudents(), 2, { gpa: 9.5 });
      assert.equal(result[1].name, 'Diya Patel');
      assert.equal(result[1].course, 'React Native');
    });

    test('leaves the other students alone', () => {
      const result = updateStudent(makeStudents(), 2, { gpa: 9.5 });
      assert.equal(result[0].gpa, 8.4);
      assert.equal(result[2].gpa, 7.2);
    });

    test('leaves the original array unchanged', () => {
      const students = makeStudents();
      updateStudent(students, 2, { gpa: 9.5 });
      assert.equal(students[1].gpa, 9.0, 'the original student object must not be edited');
    });
  });

  describe('removeStudent', () => {
    test('removes the matching student', () => {
      const result = removeStudent(makeStudents(), 2);
      assert.deepEqual(
        result.map((s) => s.id),
        [1, 3],
      );
    });

    test('removing an id that is not there changes nothing', () => {
      assert.equal(removeStudent(makeStudents(), 999).length, 3);
    });

    test('leaves the original array unchanged', () => {
      const students = makeStudents();
      removeStudent(students, 2);
      assert.equal(students.length, 3);
    });
  });

  describe('getCity', () => {
    test('reads the city when it is there', () => {
      assert.equal(getCity({ name: 'Aarav', address: { city: 'Mumbai' } }), 'Mumbai');
    });

    test('falls back to Unknown when there is no address at all', () => {
      assert.equal(getCity({ name: 'Diya' }), 'Unknown');
    });

    test('falls back to Unknown when the address has no city', () => {
      assert.equal(getCity({ name: 'Diya', address: {} }), 'Unknown');
    });

    test('does not throw on missing data', () => {
      assert.doesNotThrow(() => getCity({}), 'use ?. so a missing address cannot crash it');
    });
  });

  describe('formatGpa', () => {
    test('formats a number to one decimal place', () => {
      assert.equal(formatGpa(8.4), '8.4');
      assert.equal(formatGpa(9), '9.0');
    });

    test('a GPA of 0 shows 0.0, not an em-dash', () => {
      assert.equal(
        formatGpa(0),
        '0.0',
        'if you got the em-dash, you used `||`. 0 is falsy — `??` is the one you want here.',
      );
    });

    test('a missing GPA shows an em-dash', () => {
      assert.equal(formatGpa(null), '—');
      assert.equal(formatGpa(undefined), '—');
    });
  });
});
