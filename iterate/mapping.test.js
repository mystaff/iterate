/** @file Iterate__mapping Jest Tests */

const { testClass } = require('../jest-helper');
const _ = require('..');

class Tests__Iterate {
  /** @memberof Tests__Iterate */

  static map_test() {
    // TEST: .map()
    const iter = _.Iterate.from([]);
    iter.map();
  }
}

testClass(Tests__Iterate);

module.exports = { Tests__Iterate };
