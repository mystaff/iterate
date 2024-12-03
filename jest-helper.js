/* global test */

function testClass(Class) {
  for (const { value: fn } of Object.values(Object.getOwnPropertyDescriptors(Class))) {
    if (typeof fn === 'function') { test(fn.toString().match(/\/\/ TEST: (.*)/)?.[1], fn); }
  }
}

module.exports = {
  testClass,
};
