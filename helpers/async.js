const { setTimeout, setImmediate } = require('node:timers/promises');

// VSCode IntelliSense hack
/* eslint-disable *//* c8 ignore start */ if (false) {
  const { Tests__Helpers } = require('./async.test');
} /* c8 ignore stop *//* eslint-enable */

/**
  @class
  Functional helpers for **async** time-scaled operations.
  @hideconstructor
*/
const Helpers__async = {
  /**
    Delay execution.\
    * {@linkplain Tests__Helpers.delay_test Unit Test}
    @async
    @param {number} milliseconds  Number of milliseconds
    @param {*} result  Result
    @returns {Promise<*>}  Returns value specified in `result` argument
    @see https://nodejs.org/api/timers.html#timerspromisessettimeoutdelay-value-options
  */
  async delay(milliseconds, result) {
    return setTimeout(milliseconds, result);
  },
};

module.exports = Helpers__async;
