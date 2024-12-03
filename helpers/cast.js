if (false) { const { Tests__Helpers } = require('./cast.test'); } // eslint-disable-line

/**
  @class
  Functional helpers for **type cast** and conversion.
  @hideconstructor
*/
const Helpers__cast = {
  /** Logic of `Array.fromAsync` function.

    * {@linkplain Tests__Helpers.arrayFromAsync_test Unit Test}
    @async
    @param {AsyncIterable<any>} iterable  Items to assemble to array
    @returns {Array<any>}  Resulting array
    @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/fromAsync
  */
  async arrayFromAsync(iterable) {
    const result = [];
    for await (const item of iterable) {
      result.push(item);
    }
    return result;
  },
};

if (Array.fromAsync) { Helpers__cast.arrayFromAsync = Array.fromAsync; } // native

module.exports = Helpers__cast;
