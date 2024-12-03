const Iterate = require('./iterate');
const Helpers = require('./helpers');

const FunctionalWrap = require('./wrappers/functional-wrap');

module.exports = {
  ...Helpers,
  Iterate,
};

module.exports.Iterate = Iterate;

/**
  Short-circuit to package import namespace.
  @example
  //
  const { _ } = require('@mystaff/iterate');
  // is the same as:
  const _ = require('@mystaff/iterate');
*/
module.exports._ = FunctionalWrap.curryArgument = module.exports;

/**
  @class
  * **The Unit Tests**
  This chapter contains the unit tests. It consists of the following sections:

  - {@linkplain Tests__Helpers **Tests for Helpers**} -- for {@link Helpers} class;

  - {@linkplain Tests__Iterate **Tests for Iterate**} -- for {@link Iterate} class;

  - {@linkplain Tests__AsyncIterate **Tests for AsyncIterate**} -- for {@link AsyncIterate} class.
  @hideconstructor
*/
class Tests {} // eslint-disable-line
