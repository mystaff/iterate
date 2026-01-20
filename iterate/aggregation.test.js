/** @file Iterate__aggregation Jest Tests */

const { testClass } = require('../jest-helper');
const { Iterate } = require('..');

// VSCode IntelliSense hack
/* eslint-disable *//* c8 ignore start */ if (false) {
  const Iterate__aggregation = require('./aggregation');
} /* c8 ignore stop *//* eslint-enable */

class Tests__Iterate {
  /**
    {@linkcode Iterate__aggregation#exec .exec()} -- execute the iteration pipeline
    @memberof Tests__Iterate
  */
  static exec_test() {
    const iterate = Iterate.from([1, 2, 3]);
    expect(iterate.exec()).toBe(undefined);
    expect(iterate.toArray()).toEqual([]); // all items should be consumed
  }

  /**
    {@linkcode Iterate__aggregation#toArray .toArray()} -- collect items to new array
    @memberof Tests__Iterate
  */
  static toArray_new() {
    const iterate = Iterate.from([1, 2, 3]);
    expect(iterate.toArray()).toEqual([1, 2, 3]);
  }

  /**
    {@linkcode Iterate__aggregation#toArray .toArray()} -- push items to existing array
    @memberof Tests__Iterate
  */
  static toArray_existing() {
    const existing = [-1, 0];
    const iterate = Iterate.from([1, 2, 3]);
    expect(iterate.toArray(existing)).toEqual([-1, 0, 1, 2, 3]);
  }
}

testClass(Tests__Iterate);

module.exports = { Tests__Iterate };
