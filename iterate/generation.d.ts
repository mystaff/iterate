export = Iterate__generation;
/**
  @class
  Value generation static methods of {@linkcode Iterate} class.
  @hideconstructor
*/
declare class Iterate__generation {
    /**
      Create {@linkcode Iterate} from empty iterator.\
      * {@linkplain Tests__Iterate.empty_test Unit Test}
      @returns {Iterate}
      @method
      @example
      const { Iterate } = require('@mystaff/iterate');
      
      Iterate.empty().toArray(); // []
    */
    static empty(): Iterate;
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
    static from(param: any, ...args?: any[]): Iterate;
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
    static concat(...params: any[]): Iterate;
    /**
      Create {@linkcode Iterate} for object keys\
      * {@linkplain Tests__Iterate.objectKeys_test Unit Test}
      @param {Object} object  An object, which keys to iterate through
      @yields {string}  Each key from `object`
      @returns {Iterate}
    */
    static objectKeys(object: any): Iterate;
    /**
      Create {@linkcode Iterate} for object values\
      * {@linkplain Tests__Iterate.objectValues_test Unit Test}
      @param {Object} object  An object, which values to iterate through
      @yields {*}  Each value from `object`
      @returns {Iterate}
    */
    static objectValues(object: any): Iterate;
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
    static objectEntries(object: any): Iterate;
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
    static range(start?: number, end: number, step?: number): Iterate;
    prepend(...params: any[]): Generator<any, void, any>;
    append(...params: any[]): Generator<any, void, any>;
}
import Iterate = require(".");
