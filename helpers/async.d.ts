/**
  Delay execution.\
  * {@linkplain Tests__Helpers.delay_test Unit Test}
  @async
  @param {number} milliseconds  Number of milliseconds
  @param {*} result  Result
  @returns {Promise<*>}  Returns value specified in `result` argument
  @see https://nodejs.org/api/timers.html#timerspromisessettimeoutdelay-value-options
  @example
  const _ = require('@mystaff/iterate');
  
  await _.delay(1000, 'done'); // waits 1 second, returns 'done'
*/
export function delay(milliseconds: number, result: any): Promise<any>;
