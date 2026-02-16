/** @file Iterate__mapping Jest Tests */

const { testClass } = require('../jest-helper');
const { Iterate } = require('..');

// VSCode IntelliSense hack
/* eslint-disable *//* c8 ignore start */ if (false) {
  const Iterate__filtering = require('./filtering');
} /* c8 ignore stop *//* eslint-enable */

class Tests__Iterate {
  /**
    {@linkcode Iterate__filtering#filter .filter().}: predicator functions
    @memberof Tests__Iterate
  */
  static filter_predicatorFunctions() {
    const digitOneFilteredIterate = Iterate.from([180, 230, 310]);
    digitOneFilteredIterate.filter(String, (string) => /1/.test(string));
    expect(Array.from(digitOneFilteredIterate)).toEqual([180, 310]);
  }

  /**
    {@linkcode Iterate__filtering#filter .filter().}: predicator parameters
    @memberof Tests__Iterate
  */
  static filter_predicatorParams() {
    const nameById = {
      1: 'John',
      2: 'Sam',
      3: 'Tom',
      4: 'Kate',
    };
    const ageByName = {
      John: 28,
      Sam: 30,
      Tom: 42,
      Kate: 18,
    };
    const age30PlusIdsIterate = Iterate.from([3, 1, 2, 0]);
    age30PlusIdsIterate.filter(nameById, ageByName, (age) => age >= 30);
    expect(Array.from(age30PlusIdsIterate)).toEqual([3, 2]);
  }

  /**
    {@linkcode Iterate__filtering#drop .drop().}: drop first N items
    @memberof Tests__Iterate
  */
  static drop_number() {
    const result = Iterate.from([1, 2, 3, 4, 5]).drop(2).toArray();
    expect(result).toEqual([3, 4, 5]);

    // Drop more than available
    const result2 = Iterate.from([1, 2]).drop(5).toArray();
    expect(result2).toEqual([]);

    // Drop zero
    const result3 = Iterate.from([1, 2, 3]).drop(0).toArray();
    expect(result3).toEqual([1, 2, 3]);
  }

  /**
    {@linkcode Iterate__filtering#drop .drop().}: drop while predicate is truthy
    @memberof Tests__Iterate
  */
  static drop_predicator() {
    const result = Iterate.from([1, 2, 3, 4, 5]).drop((x) => x < 3).toArray();
    expect(result).toEqual([3, 4, 5]);

    // Drop none
    const result2 = Iterate.from([1, 2, 3]).drop((x) => x > 10).toArray();
    expect(result2).toEqual([1, 2, 3]);

    // Drop all
    const result3 = Iterate.from([1, 2, 3]).drop((x) => x < 10).toArray();
    expect(result3).toEqual([]);
  }

  /**
    {@linkcode Iterate__filtering#take .take().}: take first N items
    @memberof Tests__Iterate
  */
  static take_number() {
    const result = Iterate.from([1, 2, 3, 4, 5]).take(3).toArray();
    expect(result).toEqual([1, 2, 3]);

    // Take more than available
    const result2 = Iterate.from([1, 2]).take(5).toArray();
    expect(result2).toEqual([1, 2]);

    // Take zero
    const result3 = Iterate.from([1, 2, 3]).take(0).toArray();
    expect(result3).toEqual([]);
  }

  /**
    {@linkcode Iterate__filtering#take .take().}: take while predicate is truthy
    @memberof Tests__Iterate
  */
  static take_predicator() {
    const result = Iterate.from([1, 2, 3, 4, 5]).take((x) => x < 4).toArray();
    expect(result).toEqual([1, 2, 3]);

    // Take none
    const result2 = Iterate.from([1, 2, 3]).take((x) => x > 10).toArray();
    expect(result2).toEqual([]);

    // Take all
    const result3 = Iterate.from([1, 2, 3]).take((x) => x < 10).toArray();
    expect(result3).toEqual([1, 2, 3]);
  }

  /**
    {@linkcode Iterate__filtering#every .every().}: test if all items satisfy predicate
    @memberof Tests__Iterate
  */
  static every_test() {
    // All satisfy
    expect(Iterate.from([2, 4, 6, 8]).every((x) => x % 2 === 0)).toBe(true);

    // Not all satisfy
    expect(Iterate.from([2, 3, 4]).every((x) => x % 2 === 0)).toBe(false);

    // Empty array
    expect(Iterate.from([]).every((x) => x > 0)).toBe(true);

    // With predicator parameter
    expect(Iterate.from([1, 2, 3]).every(true)).toBe(true); // all are not nullish
    expect(Iterate.from([1, null, 3]).every(true)).toBe(false);
  }

  /**
    {@linkcode Iterate__filtering#some .some().}: test if any item satisfies predicate
    @memberof Tests__Iterate
  */
  static some_test() {
    // Some satisfy
    expect(Iterate.from([1, 2, 3, 4]).some((x) => x % 2 === 0)).toBe(true);

    // None satisfy
    expect(Iterate.from([1, 3, 5]).some((x) => x % 2 === 0)).toBe(false);

    // Empty array
    expect(Iterate.from([]).some((x) => x > 0)).toBe(false);

    // With predicator parameter
    expect(Iterate.from([null, undefined, 0]).some(true)).toBe(true); // 0 is not nullish
    expect(Iterate.from([null, undefined]).some(true)).toBe(false);
  }

  /**
    {@linkcode Iterate__filtering#find .find().}: find first item satisfying predicate
    @memberof Tests__Iterate
  */
  static find_test() {
    // Find existing
    expect(Iterate.from([1, 2, 3, 4, 5]).find((x) => x > 3)).toBe(4);

    // Find none
    expect(Iterate.from([1, 2, 3]).find((x) => x > 10)).toBe(undefined);

    // Find first match
    expect(Iterate.from([1, 2, 3, 4]).find((x) => x % 2 === 0)).toBe(2);

    // With predicator parameter
    const items = [null, undefined, 0, false, 'hello'];
    expect(Iterate.from(items).find(true)).toBe(0); // first not nullish
  }
}

testClass(Tests__Iterate);

module.exports = { Tests__Iterate };
