/** @file Helpers__cast Jest Tests */

const { testClass } = require('../jest-helper');
const _ = require('.');

// VSCode IntelliSense hack
/* eslint-disable *//* c8 ignore start */ if (false) {
  const Helpers__async = require('./async');
} /* c8 ignore stop *//* eslint-enable */

class Tests__Helpers {
  /**
    * {@linkcode Helpers__async.delay _.delay()}: delay execution
    @memberof Tests__Helpers
  */
  static async delay_test() {
    const checkpoint = process.uptime();
    await _.delay(1000);
    expect(Math.round(process.uptime() - checkpoint)).toEqual(1);
  }
}

testClass(Tests__Helpers);

module.exports = { Tests__Helpers };
