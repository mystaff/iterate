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
export function arrayFromAsync(iterable: AsyncIterable<any>): Array<any>;
export function getIterable(iterator: Iterator<any, any, any>): Iterable<any>;
export function getAsyncIterable(asyncIterator: AsyncIterator<any, any, any>): AsyncIterable<any>;
