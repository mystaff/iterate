const { AsyncFunction, GeneratorFunction, AsyncGeneratorFunction } = require('./wrapping');
const Window = require('../logic/window');
const WindowIterator = require('../logic/window-iterator');

// VSCode IntelliSense hack
/* eslint-disable *//* c8 ignore start */ if (false) {
  const { Tests__Helpers } = require('./mapping.test');
} /* c8 ignore stop *//* eslint-enable */

/**
  A mapping function. Used to somehow transform the value.
  Optionally can use additional arguments and context provided by the caller for such transformation.
  @callback MappingFunction
  @param {*} value  Input value
  @param {...any} [args]  Optional arguments which may be defined by a caller
  @returns {*}  Mapped value
  @this {object}  Context may be defined (or not) by a caller
*/

/**
  A mapping pipeline -- an array of {@linkcode MappingFunction} functions.
  The input value is passed to 1st function in a pipeline, then the result of 1st passed to 2nd, etc.
  The result of last function in pipeline is the result of processing the input value through a pipeline.
  Empty array means that no processing is needed and the input value is the result of a pipeline as-is.
  The context and additional `args` of {@linkcode MappingFunction} are passed to each function in a pipeline as-is.
  Also, it can be a single {@linkcode MappingFunction}, which is a shorthand of an array, containing only that function.
  @typedef {MappingFunction[]|MappingFunction} MappingPipeline
*/

/**
  Mapper function.
  A {@linkcode MappingFunction} which advises that its result will be directly
    or indirectly (via other mapper functions)
  used in further data processing instead of the input value.
  @typedef {MappingFunction} MapperFunction
*/

/**
  Predicator function.
  A {@linkcode MappingFunction} which advises that its result will be used as a predicate (or one of the predicates)
  defining if and/or how the input value will be used in further data processing.
  @typedef {MappingFunction} PredicatorFunction
*/

/**
  Mapper parameter, which type/value is a shorthand to {@linkcode MapperFunction} as following:
  * * _negative number_ -- {@linkcode Helpers__mapping.lag lag(-number)}
  * * _positive number or zero_ -- {@linkcode Helpers__mapping.stretch stretch(number)}
  * * `false` -- {@linkcode Helpers__mapping.not not}
  * * `true` -- {@linkcode Helpers__mapping.isNotNullish isNotNullish}
  * * `null`, `undefined` -- {@linkcode Helpers__mapping.isNullish isNullish}
  * * `Array` -- {@linkcode Helpers__mapping.mapper mapper(array)}
  * * `Map` or `WeakMap` -- {@linkcode Helpers__mapping.getOf getOf(map)}
  * * `Set` or `WeakSet` -- {@linkcode Helpers__mapping.hasOf hasOf(set)}
  * * `String` or `Symbol` -- {@linkcode Helpers__mapping.pig propGet(stringOrSymbol)}
  * * _any function_ -- the {@linkplain MapperFunction mapper function} as-is
  * * _default_ (`Object`) -- {@linkcode Helpers__mapping.propertyOf propertyOf(object)}
  *
  These parameters may be used as quick and simple shorthand to avoid creating dedicated mapper functions.\
  So instead of:
  ```js
  const objectIds = objectsIterate.map((object) => object.id).toArray();
  ```
  you may use:
  ```js
  const objectIds = objectsIterate.map('id').toArray();
  ```
  However, it's better to create a mapper function instead of a sequence of simple mapper parameters.\
  Instead of:
  ```js
  const results = objectsIterate.map('metadata', '0', 'name').toArray();
  ```
  it's better to use:
  ```js
  const getFirstMetadataName = (object) => object?.metadata?.[0]?.name; // pre-create the function in global scope
  ...
  const results = objectsIterate.map(getFirstMetadataName).toArray(); // use single mapper function directly
  ```
  Also it's better to create a single mapper function instead of long sequence of simple mapper functions.\
  Instead of:
  ```js
  const results = numbersIterate.map(_.add(1), _.multiply(2), _.divide(3)).toArray();
  ```
  it's better to use:
  ```js
  const calculateExpression = (x) => ((x + 1) * 2) / 3; // pre-create the function in global scope
  ...
  const results = numbersIterate.map(calculateExpression).toArray(); // use single mapper function directly
  ```
  @typedef {*} MapperParam
*/

/**
  Predicator parameter, which type/value is a shorthand to {@linkcode PredicatorFunciton} as following:
  * * `Number` -- {@linkcode Helpers__mapping.times times(number)}
  * * `false` -- {@linkcode Helpers__mapping.not not}
  * * `true` -- {@linkcode Helpers__mapping.isNotNullish isNotNullish}
  * * `null`, `undefined` -- {@linkcode Helpers__mapping.isNullish isNullish}
  * * `Array` -- {@linkcode Helpers__mapping.predicator mapper(array)} --
  nested {@linkcode PredicatorPipeline predicator pipeline}
  * * `Map` or `WeakMap` -- {@linkcode Helpers__mapping.getOf getOf(map)}
  * * `Set` or `WeakSet` -- {@linkcode Helpers__mapping.hasOf hasOf(set)}
  * * `String` or `Symbol` -- {@linkcode Helpers__mapping.pig propGet(stringOrSymbol)}
  * * _any function_ -- the {@linkplain PredicatorFunction predicator function} as-is
  * * _default_ (`Object`) -- {@linkcode Helpers__mapping.propertyOf propertyOf(object)}
  *
  @typedef {*} PredicatorParam
*/

/**
  A mapper pipeline -- an array of {@linkcode MapperParam} parameters (or single mapper parameter),
  which represents a {@linkcode MappingPipeline} of {@linkcode MapperFunction} functions corresponding
    to these parameters.
  The result of last {@linkcode MapperFunction} is the result of a pipeline.
  @typedef {MapperParam[]|MapperParam} MapperPipeline
*/

/**
  A predicator pipeline -- an array of {@linkcode PredicatorParam} parameters (or single predicator parameter),
  which represents a {@linkcode MappingPipeline} of {@linkcode PredicatorFunction} functions
    corresponding to these parameters.
  The result of last {@linkcode PredicatorFunction} is treated as a boolean predication result of a pipeline.
  @typedef {PredicatorParam[]|PredicatorParam} PredicatorPipeline
*/

/**
  @class
  Functional helpers for data **mapping**.
  @hideconstructor
*/
const Helpers__mapping = {
  /**
    A window
  */
  Window,

  /**
    A window iterator
  */
  WindowIterator,

  /** Echo function.
    @param {*} value  A value to be returned as-is
    @returns {*}  Returns the `value` itself
  */
  echo: (value) => value,

  /** Async echo function.
    @param {*} value  A value to be returned as-is
    @returns {*}  Returns the `value` itself
  */
  echoAsync: async (value) => value,

  /** Returns a function, which always returns the specified value, ignoring the input value.
    @param {*} value  A value to return from resulting function
    @returns {MappingFunction}  A function, returning the specified `value`
  */
  valueFn: (value) => () => value,

  isNullish: (value) => value == null,

  isNotNullish: (value) => value != null,

  not: (value) => !value,

  /** Returns a function to check if key exists in an object, using `in`.
    @param {object} object  Object in which to check the key
    @returns {MappingFunction}  A `function(key):boolean`, returning result of `key in object`
  */
  inOf: (object) => (key) => key in object,
  /** Returns a function to checks if object has a key, using `in`.
    @param {*} key  Key to check
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
    @param {*} key  Key to check
    @returns {MappingFunction}  A `function(object):boolean`, returning result of `Object.hasOwn(object, key)`
  */
  hasOwn: (key) => (object) => (object == null ? undefined : Object.hasOwn(object, key)),

  /** Returns a function to get value from key in an object.
    @param {object} object  Object, from which to get the value
    @returns {MappingFunction}  A `function(key):any`, returning result of `object[key]`
  */
  propertyOf: (object) => (key) => object[key],
  /** Returns a function to get value from object property by a key.
    @param {*} key  Property key to get the value from
    @returns {MappingFunction}  `function(object):any`, returning result of `object?.[key]`
  */
  property: (key) => (object) => object?.[key],

  /** Returns a function to get value by key from a map.
    @param {(Map|WeakMap)} map  Map, from which to get the value
    @returns {MappingFunction}  A `function(key):any`, returning result of `map.get(key)`
  */
  getOf: (map) => (key) => map.get(key),
  /** Returns a function to get value from map by a key.
    @param {*} key  Key to get the value from
    @returns {MappingFunction}  A `function(map):any`, returning result of `map.get(key)`
  */
  get: (key) => (map) => map?.get?.(key),

  /** Returns a function to get array element by index, using `.at()` (negative indexes supported).
    @param {Array} array  Map, from which to get the value
    @returns {MappingFunction}  A `function(key):any`, returning result of `map.get(key)`
  */
  atOf: (array) => (index) => array.at(index),
  /** Returns a function to get an element by index from array, using `.at()` (negative indexes supported).
    @param {*} key  Key to get the value from
    @returns {MappingFunction}  A `function(map):any`, returning result of `map.get(key)`
  */
  at: (index) => (array) => array?.at?.(index),

  /** Returns a function to check if key exists in a map or set.
    @param {(Map|Set|WeakMap|WeakSet)} mapOrSet  Map or set, in which to check the key
    @returns {MappingFunction}  A `function(key):boolean`, returning result of `mapOrSet.has(key)`
  */
  hasOf: (mapOrSet) => (item) => mapOrSet.has(item),
  /** Returns a function to check if map or set has a key.
    @param {*} key  Key to check
    @returns {MappingFunction}  A `function(mapOrSet):any`, returning result of `mapOrSet.has(key)`
  */
  has: (item) => (mapOrSet) => mapOrSet.has(item),

  /**
    "PIG" means "Property or Index or Get"
    Returns a function to get value either:
    * * from `at` index (may also be negative number to get from end) of specified `Array`
    * * from key of specified `Map` or `WeakMap`
    * * `true` if key exists in specified `Set` or `WeakSet`
    * * from property of specified object
    *
    Returns a function to get value by key from a map.
    @param {(Array|Map|WeakMap|Set|WeakSet|object)} collection  Collection or object, from which to get the value
      or check its existense in
    @returns {MappingFunction}  A `function(key):any`, returning the value
  */
  pigOf(collection) {
    if (collection == null) { return Helpers__mapping.echo; }
    const getter = Helpers__mapping.collectionGetOfMethodsByType.get(Object.getPrototypeOf(collection))
      ?? Helpers__mapping.propertyOf;
    return getter(collection);
  },

  /**
    "PIG" means "Property or Index or Get"
    Returns a function to get value either:
    * * from `Array` by specified `at` index (may also be negative number to get from end)
    * * from `Map` or `WeakMap` by specified key
    * * `true` if `Set` or `WeakSet` has specified key
    * * from object by a property
    *
    @param {*} key  Key or index or property to get the value from or check its existense
    @returns {MappingFunction}  A `function(coll):any`, returning the value
  */
  pig(key) {
    const propertyFn = Helpers__mapping.property(key);
    const getFn = Helpers__mapping.get(key);
    const hasFn = Helpers__mapping.has(key);
    const atFn = Helpers__mapping.at(key);
    const getMethodsByType = new Map([
      [Map.prototype, getFn], [WeakMap.prototype, getFn],
      [Set.prototype, hasFn], [WeakSet.prototype, hasFn],
      [Array.prototype, atFn],
    ]);
    return (coll) => (coll == null ? undefined : (getMethodsByType[Object.getPrototypeOf(coll)] ?? propertyFn)(coll));
  },

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

  /**
    Returns a function, used to delay the data stream in specified number of iterations.
    @param {number} count  Positive integer number of iterations to delay the output values from input values
    @param {object} [options]  Additional options
    @returns {MappingFunction}  A function, accepting the value and returning the previously accepted value
      `count` iterations ago

    @property {Window|Array|*} [options.window]  A window to use; compatible
      (supporting `constructor(count)`, `.fill(value)`, `.push(value)` and `.shift()` methods) data structure;
      {@linkcode Window new Window(count)} by default
    @property {*} [options.defaultValue]  Value to return when the `window` is not full yet; Default: `undefined`
    @property {MapperParam} [options.map]  When specified: a {@linkcode MapperParam} to convert each value with
    ---
  */
  lag(steps, { window, defaultValue, map } = {}) {
    const count = steps + 1;
    if (!Number.isInteger(count) || count < 1) { return Helpers__mapping.echo; }
    if (!window) { window = new Helpers__mapping.Window(count); }
    window.fill(defaultValue);

    if (map) {
      const mapper = Helpers__mapping.mapper(map);
      return function _lag(value) {
        window.push(mapper(value));
        return window.shift();
      };
    }
    return function _lag(value) {
      window.push(value);
      return window.shift();
    };
  },

  /**
    Returns a function, which returns a {@linkcode Window} (or other explicitly-defined compatible object)
    representing a window containing specified number of last iterated values.
    @param {number} count  Positive integer, which defines the number of last values contained in the window
    @param {object} [options]  Additional options
    @returns {MappingFunction}  A function, accepting the value and returning the window of `count` last values

    @property {Window|Array|*} [options.window]  A window to use; compatible
      (supporting `constructor(count)`, `.fill(value)`, `.push(value)` and `.shift()` methods) data structure;
      {@linkcode Window new Window(count)} by default
    @property {*} [options.defaultValue]  Value to initially fill the `window` with; Default: `undefined`
    @property {MapperParam} [options.map]  When specified: a {@linkcode MapperParam} to convert each value with
    ---
  */
  window(count, { window, defaultValue, map } = {}) {
    if (!Number.isInteger(count) || count < 1) { return Helpers__mapping.echo; }
    if (!window) { window = new Helpers__mapping.Window(count); }
    window.fill(defaultValue);

    if (map) {
      const mapper = Helpers__mapping.mapper(map);
      return function _lag(value) {
        if (window.push(mapper(value)) > count) { window.shift(); }
        return window;
      };
    }
    return function _lag(value) {
      if (window.push(value) > count) { window.shift(); }
      return window;
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
    @param {*} defaultValue  A value to replace the nullish values in stream with
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
      ?? Helpers__mapping.propertyOf; // for object type
    const mapFn = getMapFn(parameter);
    return mapFn;
  },

  /** Get mapper function for specified mapper parameter.\
    * {@linkplain Tests__Helpers.mapperParam_test Unit Test}
    @param {MapperParam} parameter  Parameter, which to get a mapper function from
    @returns {MappingFunction}  Mapper function for the specified parameter
  */
  mapperParam(parameter) /* c8 ignore next */ { /* computed definition */ }, // eslint-disable-line

  /** Get predicator function for specified predicator parameter
    @param {PredicatorParam} parameter  Parameter, which to get a mapping function from
    @returns {MappingFunction}  Predicator function for the specified parameter
  */
  predicatorParam(parameter) /* c8 ignore next */ { /* computed definition */ }, // eslint-disable-line

  /**
    Returns a mapping function, representing given mapping pipeline.
    @param {MappingFunction[]} functions  A mapping pipeline as an array of mapping functions.
    @param {boolean} [optimize=false]  Is it ok to return simplified function? Don't use for alternating `functions`.
    @returns {MappingFunction}  A mapping function, which can be used to process the value though the given pipeline.
  */
  pipelineMapping: (functions, optimize) => {
    if (optimize) {
      if (!functions.length) { return Helpers__mapping.echo; }
      if (functions.length === 1) { return functions[0]; }
    }
    return function _pipelineMapping(value, ...args) {
      for (const func of functions) { value = func.call(this, value, ...args); }
      return value;
    };
  },

  /**
    Maps the values of object or array in-place. Returns the same `object` as input.
    @param {Object|Array} object  An object, which values to map.
    @param {MapperFunction} function  A mapper function to apply to each value.
    @returns {Object|Array}  returns `object`.
  */
  mapInPlace(object, mapperFunction, ...args) {
    for (const key in object) {
      object[key] = mapperFunction.call(this, object[key], ...args);
    }
    return object;
  },

  /**
    Returns a mapper function, representing given mapper pipeline.\
    * **Unit Tests:**
    * * {@linkplain Tests__Helpers.mapper_alternatingFunctions Self-alternating mapper functions}
    *
    @param {MapperPipeline} functions  A mapper pipeline: a single mapper function or an array of such.
    @param {boolean} [optimize=false]  Is it ok to return simplified function? Don't use for alternating `functions`.
    @returns {MapperFunction}  A mapper function, which can be used to process the value though the given pipeline.
  */
  mapper: (functions, optimize) => {
    if (functions instanceof Array) {
      return Helpers__mapping.pipelineMapping(
        Helpers__mapping.mapInPlace(functions, Helpers__mapping.mapperParam),
        optimize,
      );
    }
    return Helpers__mapping.mapperParam(functions);
  },

  /**
    Returns a predicator function, representing given predicator pipeline.
    @param {PredicatorPipeline} functions  A predicator pipeline: a single predicator function or an array of such.
    @param {boolean} [optimize=false]  Is it ok to return simplified function? Don't use for alternating `functions`.
    @returns {PredicatorFunction}  A predicator function,
      which can be used to process the value though the given pipeline.
  */
  predicator: (functions, optimize) => {
    if (functions instanceof Array) {
      return Helpers__mapping.pipelineMapping(
        Helpers__mapping.mapInPlace(functions, Helpers__mapping.predicatorParam),
        optimize,
      );
    }
    return Helpers__mapping.predicatorParam(functions);
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
  [String.prototype, Helpers__mapping.pig],
  [Symbol.prototype, Helpers__mapping.pig],
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

Helpers__mapping.collectionGetOfMethodsByType = new Map([
  [Map.prototype, Helpers__mapping.getOf],
  [WeakMap.prototype, Helpers__mapping.getOf],
  [Set.prototype, Helpers__mapping.hasOf],
  [WeakSet.prototype, Helpers__mapping.hasOf],
  [Array.prototype, Helpers__mapping.atOf],
]);

module.exports = Helpers__mapping;
