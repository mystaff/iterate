const Iterate = require('./iterate');
const Helpers = require('./helpers');

const FunctionalWrap = require('./wrappers/functional-wrap');

const _ = {
  ...Helpers,
  Iterate,
};

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

_._ = _; // under-the-hood correct short-circuit
Object.assign(module, { exports: _ }); // hack to trick Intellisense
FunctionalWrap.curryArgument = _; // use as default curry argument

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
