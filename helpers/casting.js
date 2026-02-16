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
    @example
    const _ = require('@mystaff/iterate');
    
    async function* countTo3() { yield 1; yield 2; yield 3; }
    const arr = await _.arrayFromAsync(countTo3()); // [1, 2, 3]
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
    @example
    const _ = require('@mystaff/iterate');
    
    const iterator = { x: 1, next() { return { value: this.x++, done: this.x > 3 }; } };
    const iterable = _.getIterable(iterator);
    [...iterable]; // [1, 2]
  */
  getIterable: (iterator) => ({ [Symbol.iterator]: () => iterator }),

  /**
    * Create {@linkcode AsyncIterable} for specified {@linkcode AsyncIterator} object\
    * {@linkplain Tests__Helpers.getAsyncIterable_test Unit Test}
    @param {AsyncIterator} asyncIterator  Object implementing {@linkcode AsyncIterator} protocol
      (`{ async next() ... }`)
    @returns {AsyncIterable}
    @example
    const _ = require('@mystaff/iterate');
    
    const asyncIterator = { x: 1, async next() { return { value: this.x++, done: this.x > 3 }; } };
    const asyncIterable = _.getAsyncIterable(asyncIterator);
    await _.arrayFromAsync(asyncIterable); // [1, 2]
  */
  getAsyncIterable: (asyncIterator) => ({ [Symbol.asyncIterator]: () => asyncIterator }),
};

/* c8 ignore next */
if (Array.fromAsync) { Helpers__casting.arrayFromAsync = Array.fromAsync; } // native

module.exports = Helpers__casting;
