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
}

testClass(Tests__Iterate);

module.exports = { Tests__Iterate };
