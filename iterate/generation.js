// VSCode IntelliSense hack
/* eslint-disable *//* c8 ignore start */ if (false) {
  const { Tests__Iterate } = require('./generation.test');
  const Iterate = require('.');
  const { IterateContext } = require('.');
} /* c8 ignore stop *//* eslint-enable */

/** @ignore */
/* c8 ignore next */
function IterateBase() { }
IterateBase.prototype = Object.create(null);

/**
  @class
  Value generation static methods of {@linkcode Iterate} class.
  @hideconstructor
*/
class Iterate__generation extends IterateBase {
  /**
    Create {@linkcode Iterate} from empty iterator.\
    * {@linkplain Tests__Iterate.empty_test Unit Test}
    @returns {Iterate}
    @method
    @example
    const { Iterate } = require('@mystaff/iterate');
    
    Iterate.empty().toArray(); // []
  */
  static* empty() {
    // Empty generator
  }

  /**
    A parameter, which is resolved to iterable depending on it's type:
    * * If `typeof` parameter is a `function`, it will be called in current {@linkcode IterateContext}
      (for chain methods) or {@linkcode Iterate} context for generation),
      and its result recursively interpreted as {@linkcode IterableParam}
    * * If `typeof` parameter is not `object`, it yields its single value as-is
    * * If parameter is iterable, it will yield it's values
    * * Otherwise, it will yield its {@linkcode Iterate__generation.objectEntries objectEntries}
    *
    @typedef {*} IterableParam
  */

  /**
    Create {@linkcode Iterate} instance from existing iterable (which can also be other {@linkcode Iterate} instance).\
    * {@linkplain Tests__Iterate.from_test Unit Test}
    @param {IterableParam} param  Iterable parameter to get iterator from. See {@linkcode IterableParam}.
    @param {...any} [args]  When `param` is a function, these arguments will be passed to it,
      and it shall return {@linkcode IterableParam}.
    @returns {Iterate}
    @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#the_iterable_protocol
    @example
    const { Iterate } = require('@mystaff/iterate');
    
    Iterate.from([1, 2, 3]).toArray(); // [1, 2, 3]
  */
  static* from(param, ...args) {
    if (param == null) { return; }
    if (param[Symbol.iterator]) {
      yield* param;
    } else if (typeof param === 'function') {
      yield* Iterate__generation.from(param.call(this, ...args));
    } else if (typeof param === 'object') {
      yield* Iterate__generation.objectEntries(param);
    } else {
      yield param;
    }
  }

  /**
    Create {@linkcode Iterate} instance as concatenation of values from existing iterables.\
    * {@linkplain Tests__Iterate.concat_test Unit Test}
    @param {...IterableParam} params  Iterable parameters to get iterators from.
      Functions will be called without arguments
    @returns {Iterate}
    @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#the_iterable_protocol
    @example
    const { Iterate } = require('@mystaff/iterate');
    
    Iterate.concat([1, 2], [3, 4]).toArray(); // [1, 2, 3, 4]
  */
  static* concat(...params) {
    for (const param of params) {
      yield* Iterate__generation.from(param);
    }
  }

  /**
    Create {@linkcode Iterate} for object keys\
    * {@linkplain Tests__Iterate.objectKeys_test Unit Test}
    @param {Object} object  An object, which keys to iterate through
    @yields {string}  Each key from `object`
    @returns {Iterate}
  */
  static* objectKeys(object) {
    for (const key in object) {
      yield key;
    }
  }

  /**
    Create {@linkcode Iterate} for object values\
    * {@linkplain Tests__Iterate.objectValues_test Unit Test}
    @param {Object} object  An object, which values to iterate through
    @yields {*}  Each value from `object`
    @returns {Iterate}
  */
  static* objectValues(object) {
    for (const key in object) {
      yield object[key];
    }
  }

  /**
    An array (tuple), representing the key-value pair: `[key: string, value: any]`
    Identical to inner arrays, returned from `Object.entries()`.
    @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries#return_value
    @typedef {Array} KeyValue
  */

  /**
    Create {@linkcode Iterate} for object entries\
    * {@linkplain Tests__Iterate.objectEntries_test Unit Test}
    @param {Object} object  An object, which entries to iterate through
    @yields {KeyValue}  Each entry from `object` as `[key, value]`
    @returns {Iterate}
  */
  static* objectEntries(object) {
    for (const key in object) {
      yield [key, object[key]];
    }
  }

  /**
    Create {@linkcode Iterate} for a equi-distanct (by `step` value) series of numbers\
    * **Unit Tests:**
    * * {@linkplain Tests__Iterate.range_3Args Using `start`, `end`, `step`}
    * * {@linkplain Tests__Iterate.range_3ArgsBadStep Using `start`, `end`, `step` = 0}
    * * {@linkplain Tests__Iterate.range_2Args Using `start`, `end`}
    * * {@linkplain Tests__Iterate.range_1Arg Using `end`}
    @param {number} [start=0]  Series will start from this number.
    @param {number} end  This number is greater than the last number of the series.
    @param {number} [step=1]  Each next number of series is greater than previous by this number.
      May also be negative or zero. Zero or too big value will produce only one item `start`
    @yields {KeyValue}  Each entry from `object` as `[key, value]`
    @returns {Iterate}
    @example
    const { Iterate } = require('@mystaff/iterate');
    
    Iterate.range(5).toArray(); // [0, 1, 2, 3, 4]
  */
  static* range(start, end, step = 1) {
    if (end == null) { end = start; start = 0; }
    if (step > 0) {
      for (let x = start; x < end; x += step) { yield x; }
    } else if (step < 0) {
      for (let x = start; x > end; x += step) { yield x; }
    } else {
      yield start;
    }
  }
}

Object.setPrototypeOf(Iterate__generation, Function.prototype);

module.exports = Iterate__generation;
