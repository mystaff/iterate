/** @file Helpers__mapping Jest Tests */

const { testClass } = require('../jest-helper');
const _ = require('.');

class Tests__Helpers {
  /** @memberof Tests__Helpers */

  static async mapperParam_test() {
    // TEST: _.mapperParam:
    const params = [];
    expect(params.map(_.mapperParam)).toEqual([]);
  }
}

testClass(Tests__Helpers);

module.exports = { Tests__Helpers };
