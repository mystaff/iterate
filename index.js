const Helpers = require('./helpers');
const Iterate = require('./iterate');

const FunctionalWrap = require('./wrappers/functional-wrap');
const Debug = require('./debug');

/**
  Shorthand to many features of this library
  @function
  @memberof Helpers
*/
const _ = {
  ...Helpers,
  Iterate,
};

/**
  Shorthand to many features of this library
  @function
  @memberof Helpers
  @ignore
*/
module.exports = {
  ..._,

  /**
    Short-circuit to package import namespace.
    @example
    //
    const { _ } = require('@mystaff/iterate');
    // is the same as:
    const _ = require('@mystaff/iterate');
  */
  _,
};

function shorthand(...args) {
  if (!args.length) { return Object.create(null); }
  if (typeof args[0] === 'function') { return Debug.debug(...args); }
  if (args.length <= 3 && args.every((value) => typeof value === 'number')) {
    return Iterate.range(...args); // TODO: AsyncIterate
  }
  // if (args.some((value) => value?.[Symbol.iterator] || value?.[Symbol.asyncIterator])) {
  return Iterate.concat(...args); // TODO: AsyncIterate
  // }
}

Object.assign(shorthand, _);
shorthand._ = shorthand; // under-the-hood correct short-circuit
Object.assign(module, { exports: shorthand }); // hack to trick Intellisense
FunctionalWrap.curryArgument = shorthand; // use as default curry argument

Debug.createDebuggerCommandsClosure(shorthand);
shorthand.debug = Debug.debug;

/**
  @class
  * **The Unit Tests**
  This chapter contains the unit tests. It consists of the following sections:

  - {@linkplain Tests__Helpers **Tests for Helpers**} -- for {@linkcode Helpers} class;

  - {@linkplain Tests__Iterate **Tests for Iterate**} -- for {@linkcode Iterate} class;

  - {@linkplain Tests__AsyncIterate **Tests for AsyncIterate**} -- for {@linkcode AsyncIterate} class.
  @hideconstructor
*/
class Tests {} // eslint-disable-line

/**
  @class
  * **The Unit Tests**
  This section contains the **unit tests** for the properties/methods from all sections of {@linkplain Iterate} chapter.
  To show the **source code** of specific unit test, please click `line` number at the right side of the item.
  @hideconstructor
*/
const Tests__Iterate = class Tests__Iterate {} // eslint-disable-line
