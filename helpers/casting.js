// VSCode IntelliSense hack
/* eslint-disable *//* c8 ignore start */ if (false) {
  const { Tests__Helpers } = require('./casting.test');
} /* c8 ignore stop *//* eslint-enable */

/**
  @class
  Functional helpers for **type cast** and conversion.
  @hideconstructor
*/
const Helpers__casting = {
  /** Logic of `Array.fromAsync` function.\
    * {@linkplain Tests__Helpers.arrayFromAsync_test Unit Test}
    @async
    @param {AsyncIterable<*>} iterable  Items to assemble to array
    @returns {Array<*>}  Resulting array
    @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/fromAsync
  */
  async arrayFromAsync(iterable) {
    const result = [];
    for await (const item of iterable) {
      result.push(item);
    }
    return result;
  },

  /**
    * Create {@linkcode Iterable} for specified {@linkcode Iterator} object\
    * {@linkplain Tests__Helpers.getIterable_test Unit Test}
    @param {Iterator} iterator  Object implementing {@linkcode Iterator} protocol (`{ next() ... }`)
    @returns {Iterable}
  */
  getIterable: (iterator) => ({ [Symbol.iterator]: () => iterator }),

  /**
    * Create {@linkcode AsyncIterable} for specified {@linkcode AsyncIterator} object\
    * {@linkplain Tests__Helpers.getAsyncIterable_test Unit Test}
    @param {AsyncIterator} asyncIterator  Object implementing {@linkcode AsyncIterator} protocol
      (`{ async next() ... }`)
    @returns {AsyncIterable}
  */
  getAsyncIterable: (asyncIterator) => ({ [Symbol.asyncIterator]: () => asyncIterator }),
};

/* c8 ignore next */
if (Array.fromAsync) { Helpers__casting.arrayFromAsync = Array.fromAsync; } // native

module.exports = Helpers__casting;
