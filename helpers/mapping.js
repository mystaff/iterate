const { AsyncFunction, GeneratorFunction, AsyncGeneratorFunction } = require('./wrap');

if (false) { const { Tests__Helpers } = require('./mapping.test'); } // eslint-disable-line

/**
  A mapping function. Used to somehow transform the value.
  Optionally can use additional arguments and context provided by the caller for such transformation.
  @callback MappingFunction
  @param {any} value  Input value
  @param {...any} [args]  Optional arguments which may be defined by a caller
  @returns {any}  Mapped value
  @this {object}  Context may be defined (or not) by a caller
*/

/**
  A mapping pipeline -- an array of {@link MappingFunction} functions.
  The input value is passed to 1st function in a pipeline, then the result of 1st passed to 2nd, etc.
  The result of last function in pipeline is the result of processing the input value through a pipeline.
  Empty array means that no processing is needed and the input value is the result of a pipeline as-is.
  The context and additional `args` of {@link MappingFunction} are passed to each function in a pipeline as-is.
  Also, it can be a single {@link MappingFunction}, which is a shorthand of an array, containing only that function.
  @typedef {MappingFunction[]|MappingFunction} MappingPipeline
*/

/**
  Mapper function.
  A {@link MappingFunction} which advises that its result will be directly or indirectly (via other mapper functions)
  used in further data processing instead of the input value.
  @typedef {MappingFunction} MapperFunction
*/

/**
  Predicator function.
  A {@link MappingFunction} which advises that its result will be used as a predicate (or one of the predicates)
  defining if and/or how the input value will be used in further data processing.
  @typedef {MappingFunction} PredicatorFunction
*/

/**
  Special parameter value, which represents a {@link MapperFunction}.
  * | Type | Mapper | Description |
  * |-|-|-|
  * | _negative number_ | {@link Helpers__mapping.lag lag(-number)} | Lags the stream by |
  * | | | specified number of steps |
  * | _positive number or zero_ | {@link Helpers__mapping.stretch stretch(number)} | Stretches the item |
  * | | | to array of its duplicates |
  * | `false` | {@link Helpers__mapping.not not} | `true` for falsy, else `false` |
  * | `true` | {@link Helpers__mapping.isNotNullish isNotNullish} | `false` for nullish, else `true` |
  * | _nullish_ | {@link Helpers__mapping.isNullish isNullish} | `true` for nullish, else `false` |
  * | `Array` | {@link Helpers__mapping.mapper mapper(array)} | {@link MapperPipeline mapper pipeline} |
  * | `Map` or `WeakMap` | {@link Helpers__mapping.getOf getOf(map)} | value for key |
  * | `Set` or `WeakSet` | {@link Helpers__mapping.hasOf hasOf(set)} | `true` if key exists, else `false` |
  * | `String` or `Symbol` | {@link Helpers__mapping.field field(stringOrSymbol)} | value for object field |
  * | _any function_ | the _function_ itself | returned as-is, considered as a {@link MapperFunction} |
  * | _default_ (`Object`) | {@link Helpers__mapping.fieldOf fieldOf(object)} | value for field of object |
  @typedef {any} MapperParam
*/

/**
  Special parameter value, which represents a {@link PredicatorFunciton}.
  * | Type | Function | Description |
  * |-|-|-|
  * | `Number` | {@link Helpers__mapping.times times(number)} | `true` for first `number` of iterations, |
  * | | | else `false` |
  * | `false` | {@link Helpers__mapping.not not} | `true` for falsy, else `false` |
  * | `true` | {@link Helpers__mapping.isNotNullish isNotNullish} | `false` for nullish, else `true` |
  * | _nullish_ | {@link Helpers__mapping.isNullish isNullish} | `true` for nullish, else `false` |
  * | `Array` | {@link Helpers__mapping.predicator predicator(array)} | |
  * | | | {@link PredicatorPipeline predicator pipeline} |
  * | `Map` or `WeakMap` | {@link Helpers__mapping.getOf getOf(map)} | value for key |
  * | `Set` or `WeakSet` | {@link Helpers__mapping.hasOf hasOf(set)} | `true` if key exists, else `false` |
  * | `String` or `Symbol` | {@link Helpers__mapping.field field(stringOrSymbol)} | value for object field |
  * | _any function_ | the _function_ itself | returned as-is, considered as a {@link PredicatorFunction} |
  * | _default_ (`Object`) | {@link Helpers__mapping.fieldOf fieldOf(object)} | value for field of object |
  @typedef {any} PredicatorParam
*/

/**
  A mapper pipeline -- an array of {@link MapperParam} parameters (or single mapper parameter),
  which represents a {@link MappingPipeline} of {@link MapperFunction} functions corresponding to these parameters.
  The result of last {@link MapperFunction} is the result of a pipeline.
  @typedef {MapperParam[]|MapperParam} MapperPipeline
*/

/**
  A predicator pipeline -- an array of {@link PredicatorParam} parameters (or single predicator parameter),
  which represents a {@link MappingPipeline} of {@link PredicatorFunction} functions corresponding to these parameters.
  The result of last {@link PredicatorFunction} is treated as a boolean predication result of a pipeline.
  @typedef {PredicatorParam[]|PredicatorParam} PredicatorPipeline
*/

/**
  @class
  Functional helpers for data **mapping**.
  @hideconstructor
*/
const Helpers__mapping = {
  /** Echo function.
    @param {any} value  A value to be returned as-is
    @returns {any}  Returns the `value` itself
  */
  echo: (value) => value,

  /** Async echo function.
    @param {any} value  A value to be returned as-is
    @returns {any}  Returns the `value` itself
  */
  echoAsync: async (value) => value,

  /** Returns a function, which always returns the specified value, ignoring the input value.
    @param {any} value  A value to return from resulting function
    @returns {MappingFunction}  A function, returning the specified `value`
  */
  value: (value) => () => value,

  isNullish: (value) => value == null,

  isNotNullish: (value) => value != null,

  not: (value) => !value,

  /** Returns a function to check if key exists in an object, using `in`.
    @param {object} object  Object in which to check the key
    @returns {MappingFunction}  A `function(key):boolean`, returning result of `key in object`
  */
  inOf: (object) => (key) => (object == null ? undefined : key in object),
  /** Returns a function to checks if object has a key, using `in`.
    @param {any} key  Key to check
    @returns {MappingFunction}  A `function(object):boolean`, returning result of `key in object`
      or `undefined` if object is nullish
  */
  in: (key) => (object) => (object == null ? undefined : key in object),

  /** Returns a function to check if key exists in an object, using `hasOwn`.
    @param {object} object  Object in which to check the key
    @returns {MappingFunction}  A `function(key):boolean`, returning result of `Object.hasOwn(object, key)`
      or `undefined` if object is nullish
  */
  hasOwnOf: (object) => (key) => Object.hasOwn(object, key),
  /** Returns a function to checks if object has a key, using `hasOwn`.
    @param {any} key  Key to check
    @returns {MappingFunction}  A `function(object):boolean`, returning result of `Object.hasOwn(object, key)`
  */
  hasOwn: (key) => (object) => Object.hasOwn(object, key),

  /** Returns a function to get value from key in an object.
    @param {object} object  Object, from which to get the value
    @returns {MappingFunction}  A `function(key):any`, returning result of `object[key]`
  */
  fieldOf: (object) => (key) => object[key],
  /** Returns a function to get value in object from a key.
    @param {any} key  Key to get the value from
    @returns {MappingFunction}  A `function(object):any`, returning result of `object[key]`
  */
  field: (key) => (object) => object[key],

  /** Returns a function to get value from key in a map.
    @param {(Map|WeakMap)} map  Map, from which to get the value
    @returns {MappingFunction}  A `function(key):any`, returning result of `map.get(key)`
  */
  getOf: (map) => (item) => map.get(item),
  /** Returns a function to get value in map from a key.
    @param {any} key  Key to get the value from
    @returns {MappingFunction}  A `function(map):any`, returning result of `map.get(key)`
  */
  get: (item) => (map) => map.get(item),

  /** Returns a function to check if key exists in a map or set.
    @param {(Map|Set|WeakMap|WeakSet)} mapOrSet  Map or set, in which to check the key
    @returns {MappingFunction}  A `function(key):boolean`, returning result of `mapOrSet.has(key)`
  */
  hasOf: (mapOrSet) => (item) => mapOrSet.has(item),
  /** Returns a function to check if map or set has a key.
    @param {any} key  Key to check
    @returns {MappingFunction}  A `function(mapOrSet):any`, returning result of `mapOrSet.has(key)`
  */
  has: (item) => (mapOrSet) => mapOrSet.has(item),

  /** Returns a function, which returns:
    - `false`, if `count` is zero or negative non-integer;
    - `true`, if `count` is positive non-integer;
    - `true` `count` number of times, then `false`, if `count` is positive integer;
    - `false` `-count` number of times, then `true`, if `count` is negative integer.
    @param {number} count  Number of times to return `true` from resulting function
    @returns {MappingFunction}  A function returning boolean
  */
  times(count) {
    if (!count) { return () => false; }
    if (count < 0) { return () => !(count++); }
    return () => Boolean(count--);
  },

  /*
    @param {Array} [options.window=[]]  A window to use; array or array-like
      (supporting `.push` and `.shift` methods); new empty array by default
    @param {any} [options.defaultValue=undefined]  Value to return when the `window` is not full yet
    @param {MappingFunction} [options.mapFunction]  If specified:
      a function to convert each output from a stream value with
  */

  /** Returns a function, used to delay the data stream in specified number of iterations.
    @param {number} count  Positive integer number of iterations to delay the output values from input values
    @param {object} [options]  Additional options
    @returns {MappingFunction}  A function, accepting the values and returning the previously accepted values
      `count` iterations ago

    @property {Array} [options.window]  A window to use; array or array-like
      (supporting `.push` and `.shift` methods); new empty array of `count` length by default
    @property {any} [options.defaultValue]  Value to return when the `window` is not full yet.
      When specified and is not `undefined`, default `window` will be empty array `[]` with zero length.
    @property {MappingFunction} [options.mapFunction]  If specified: a function to convert each output
      from a stream value with
    ---
  */
  lag(count, { window, defaultValue, mapFunction } = {}) {
    if (!Number.isInteger(count) || count < 1) { return Helpers__mapping.echo; }
    if (!window) { window = defaultValue === undefined ? [] : new Array(count); }

    if (mapFunction) {
      return function _lag(value) {
        if (window.push(value) > count) { return mapFunction(window.shift()); }
        return defaultValue;
      };
    }
    return function _lag(value) {
      if (window.push(value) > count) { return window.shift(); }
      return defaultValue;
    };
  },

  /** Returns a function, which returns array of duplicates from input value.
    @param {number} count  Number of duplicates to return
    @returns {MappingFunction}  A `function(value):[...value]`, which returns an array of `count` duplictes of `value`
  */
  stretch(count) {
    if (!Number.isInteger(count) || count < 0) { count = 1; }
    return (value) => new Array(count).fill(value);
  },

  /** Returns a function, which returns nullish values mapped with specified function, other values as-is.
    @param {MappingFunction} mapper  A function to call for nullish values in stream
    @returns {MappingFunction}  Returns the function, which returns nullish values mapped with `mapper`
  */
  ifNull: (mapper, ...args) => function _ifNull(value) {
    if (value == null) { return mapper.call(this, value, ...args); }
    return value;
  },

  /** Returns a function, which returns nullish values replaces with specified default values, other values as-is.
    @param {any} defaultValue  A value to replace the nullish values in stream with
    @returns {MappingFunction}  Returns the function, which returns nullish values replaced with `defaultValue`
  */
  nullDefault: (defaultValue) => function _nullDefault(value) {
    if (value == null) { return defaultValue; }
    return value;
  },

  /** Returns a function, preforming the conditional processing of input value using the pipelines.
    @param {PredicatorPipeline} conditionPredicator  A condition
    @param {MapperPipeline} truthyMapper  Truthy outcome
    @param {MapperPipeline} falsyMapper  Falsy outcome
    @returns {MappingFunction}  A function, returning the result of either pipeline depending on condition outcome.
  */
  if: (conditionPredicator, truthyMapper, falsyMapper) => (value) => (
    Helpers__mapping.predicator(conditionPredicator)(value)
      ? Helpers__mapping.mapper(truthyMapper)(value)
      : Helpers__mapping.mapper(falsyMapper)(value)
  ),

  mappingByParam: (paramTypeMap) => function _mappingByParam(parameter) {
    if (parameter == null) { return Helpers__mapping.isNullish; }
    const getMapFn = paramTypeMap.get(Object.getPrototypeOf(parameter))
      ?? Helpers__mapping.fieldOf; // for object type
    const mapFn = getMapFn(parameter);
    return mapFn;
  },

  /** Get mapper function for specified mapper parameter.

    * {@linkplain Tests__Helpers.mapperParam_test Unit Test}
    @param {MapperParam} parameter  Parameter, which to get a mapper function from
    @returns {MappingFunction}  Mapper function for the specified parameter
  */
  mapperParam(parameter) { /* computed definition below */ }, // eslint-disable-line

  /** Get predicator function for specified predicator parameter
    @param {PredicatorParam} parameter  Parameter, which to get a mapping function from
    @returns {MappingFunction}  Predicator function for the specified parameter
  */
  predicatorParam(parameter) { /* computed definition below */ }, // eslint-disable-line

  /** Returns a mapping function, representing given mapping pipeline.
    @param {MappingFunction[]} funcs  A mapping pipeline as an array of mapping functions.
    @returns {MappingFunction}  A mapping function, which can be used to process the value though the given pipeline.
  */
  pipelineMapping: (funcs) => {
    if (!funcs.length) { return Helpers__mapping.echo; }
    if (funcs.lenght === 1) { return funcs[0]; }
    return function _pipelineMapping(value, ...args) {
      for (const func of funcs) { value = func.call(this, value, ...args); }
      return value;
    };
  },

  /** Returns a mapper function, representing given mapper pipeline.
    @param {MapperPipeline} funcs  A mapper pipeline: a single mapper function or an array of such.
    @returns {MapperFunction}  A mapper function, which can be used to process the value though the given pipeline.
  */
  mapper: (funcs) => {
    if (funcs instanceof Array) { return Helpers__mapping.pipelineMapping(funcs.map(Helpers__mapping.mapperParam)); }
    return Helpers__mapping.mapperParam(funcs);
  },

  /** Returns a predicator function, representing given predicator pipeline.
    @param {PredicatorPipeline} funcs  A predicator pipeline: a single predicator function or an array of such.
    @returns {PredicatorFunction}  A predicator function,
      which can be used to process the value though the given pipeline.
  */
  predicator: (funcs) => {
    if (funcs instanceof Array) {
      return Helpers__mapping.pipelineMapping(funcs.map(Helpers__mapping.predicatorParam));
    }
    return Helpers__mapping.predicatorParam(funcs);
  },
};

Helpers__mapping.mapperByType = new Map([
  [Number.prototype, (number) => {
    if (number < 0) { return Helpers__mapping.lag(-number); }
    return Helpers__mapping.stretch(number);
  }],
  [Boolean.prototype, (boolean) => {
    if (boolean) { return Helpers__mapping.isNotNullish; }
    return Helpers__mapping.not;
  }],
  [Array.prototype, Helpers__mapping.mapper],
  [Map.prototype, Helpers__mapping.getOf],
  [WeakMap.prototype, Helpers__mapping.getOf],
  [Set.prototype, Helpers__mapping.hasOf],
  [WeakSet.prototype, Helpers__mapping.hasOf],
  [String.prototype, Helpers__mapping.field],
  [Symbol.prototype, Helpers__mapping.field],
  [Function.prototype, Helpers__mapping.echo],
  [AsyncFunction.prototype, Helpers__mapping.echo],
  [GeneratorFunction.prototype, Helpers__mapping.echo],
  [AsyncGeneratorFunction.prototype, Helpers__mapping.echo],
]);

Helpers__mapping.predicatorByType = new Map([
  ...Helpers__mapping.mapperByType,
  [Number.prototype, Helpers__mapping.times],
  [Array.prototype, Helpers__mapping.predicator],
]);

Helpers__mapping.mapperParam = Helpers__mapping.mappingByParam(Helpers__mapping.mapperByType);

Helpers__mapping.predicatorParam = Helpers__mapping.mappingByParam(Helpers__mapping.predicatorByType);

module.exports = Helpers__mapping;
