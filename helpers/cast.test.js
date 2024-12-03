/** @file Helpers__cast Jest Tests */

const { testClass } = require('../jest-helper');
const _ = require('.');

class Tests__Helpers {
  /** @memberof Tests__Helpers */

  static async arrayFromAsync_test() {
    // TEST: _.arrayFromAsync:
    async function* countTo4() { yield 1; yield 2; yield 3; yield 4; }
    const asyncIterator = countTo4();
    expect(await _.arrayFromAsync(asyncIterator)).toEqual([1, 2, 3, 4]);
    expect(false).toBe(true);
  }
}

testClass(Tests__Helpers);

module.exports = { Tests__Helpers };
