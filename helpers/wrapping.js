const WrappersIterateWrap = require('../wrappers/iterate-wrap');
const WrappersFunctionalWrap = require('../wrappers/functional-wrap');

// VSCode IntelliSense hack
/* eslint-disable *//* c8 ignore start */ if (false) {
  const { Tests__Helpers } = require('./wrapping.test');
} /* c8 ignore stop *//* eslint-enable */

function voidFunction() { } // eslint-disable-line
async function voidAsyncFunction() { } // eslint-disable-line

function* voidGeneratorFunction() { } // eslint-disable-line
const voidIterator = voidGeneratorFunction();

async function* voidAsyncGeneratorFunction() { } // eslint-disable-line
const voidAsyncIterator = voidAsyncGeneratorFunction();

/**
  @class
  Various **wrappers** and reflections for iterators and functional helpers.
  Used internally to organize {@linkcode Iterate} and {@linkcode AsyncIterate} classes.
  @hideconstructor
*/
const Helpers__wrapping = {
  /**
    Empty function.\
    * {@linkplain Tests__Helpers.voidFunction_test Unit Test}
    @function
    @returns {undefined}  undefined
  */
  voidFunction,

  /**
    Function constructor.\
    * {@linkplain Tests__Helpers.Function_test Unit Test}
    @type {Function}
  */
  Function,

  /**
    Empty async function.\
    * {@linkplain Tests__Helpers.voidAsyncFunction_test Unit Test}
    @function
    @returns {undefined}  undefined
  */
  voidAsyncFunction,

  /**
    Async function constructor.\
    * {@linkplain Tests__Helpers.AsyncFunction_test Unit Test}
    @type {Function}
  */
  AsyncFunction: voidAsyncFunction.constructor,

  /**
    Exhausted iterator.\
    * {@linkplain Tests__Helpers.voidIterator_test Unit Test}
    @type {Iterator}
  */
  voidIterator,

  /**
    Generator function yielding no results (resulting in exhausted iterator).\
    * {@linkplain Tests__Helpers.voidGeneratorFunction_test Unit Test}
    @function
    @returns {Iterator}  Empty iterator
  */
  voidGeneratorFunction,

  /**
    Generator function
    @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/GeneratorFunction
    @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator
    @example
    // Generator function, returning generator of 3 numbers:
    function* createGenerator() {
      yield 1;
      yield 2;
      yield 3;
    }
    @typedef {function} GeneratorFunction
  */

  /**
    Constructor of built-in {@linkplain GeneratorFunction generator function}.\
    * {@linkplain Tests__Helpers.GeneratorFunction_test Unit Test}
    @type {Function}
  */
  GeneratorFunction: voidGeneratorFunction.constructor,

  /**
    Exhausted async iterator.\
    * {@linkplain Tests__Helpers.voidAsyncIterator_test Unit Test}
    @type {AsyncIterator}
  */
  voidAsyncIterator,

  /**
    Async generator function yielding no results (resulting in exhausted async iterator).\
    * {@linkplain Tests__Helpers.voidAsyncGenerator_test Unit Test}
    @function
    @returns {AsyncIterator}  Empty async iterator
  */
  voidAsyncGeneratorFunction,

  /**
    {@linkcode IteratorResult}, returned by a method of exhausted iterator: `{ value: undefined, done: true }`
    @type {IteratorResult}
  */
  exhaustedIteratorResult: { value: undefined, done: true },

  /**
    Async generator function
    @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/AsyncGeneratorFunction
    @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/AsyncGenerator
    @example
    // Async generator function, returning async generator of 3 numbers:
    async function* createAsyncGenerator() {
      yield Promise.resolve(1);
      yield await Promise.resolve(2);
      yield 3;
    }
    @typedef {function} AsyncGeneratorFunction
  */

  /**
    Constructor of built-in {@linkplain AsyncGeneratorFunction async generator function}.\
    * {@linkplain Tests__Helpers.AsyncGeneratorFunction_test Unit Test}
    @type {Function}
  */
  AsyncGeneratorFunction: voidAsyncGeneratorFunction.constructor,

  /**
    Wrapper function to support chaining for pipeline chaining methods.
    Internally used in `wrapper` parameter of {@linkcode Helpers__wrapping.wrapProperties wrapProperties}
    to organize the chain methods from their defining generator functions.\
    * {@linkplain Tests__Helpers.chainGeneratorFunctionWrapper_test Unit Test}
    @function
    @param {Function} genFunc  Generator function
    @returns {Function}  Wrapped function
  */
  chainGeneratorFunctionWrapper: WrappersIterateWrap.chainGeneratorFunction,

  /**
    Wrapper function to support chaining for generator static generation methods.
    Internally used in `wrapper` parameter of {@linkcode Helpers__wrapping.wrapProperties wrapProperties}
    to organize the value generation methods from their defining static generator functions.\
    * {@linkplain Tests__Helpers.generationGeneratorFunctionWrapper_test Unit Test}
    @function
    @param {Function} genFunc  Generator function
    @param {constructor} Class  Create instance of this class as a result
    @returns {Function}  Wrapped function
  */
  generationGeneratorFunctionWrapper: WrappersIterateWrap.generationGeneratorFunction,

  /**
    In `object`, wrap all methods having one of specified `types` using `wrapper` function.\
    * {@linkplain Tests__Helpers.wrapProperties_test Unit Test}
    @param {Object} object  Object to wrap the methods in-place
    @param {Set<constructor>} types  Types of methods to wrap
    @param {function(Function)} wrapper  Wrapping function to be called to wrap each method
    @param {...any} args  Additional args to pass to `wrapper` function
    @returns {void}
  */
  wrapProperties(object, types, wrapper, ...args) {
    for (const key in object) {
      const value = object[key];
      if (types.has(value?.constructor)) {
        const wrapped = wrapper(value, ...args);
        // Following properties intended for internal use:
        Object.defineProperty(wrapped, 'wrapped', { value }); // wrapped value
        Object.defineProperty(wrapped, 'toString', { // stringify wraped value
          value: () => value.toString(),
        });
        // Substitute generator function with its wrapped function:
        Object.defineProperty(object, key, { value: wrapped, enumerable: true });
      }
    }
  },

  /**
    Copy all the enumerable properties of `object` and its prototype chain to specific object.\
    * {@linkplain Tests__Helpers.unwindObjectPrototypes_test Unit Test}
    @param {Object} object  Source object
    @param {Object} [to]  Destination object. Defaults to new null-prototype object.
    @returns {Object}  Destination object
  */
  unwindObjectPrototypes(object, to) {
    if (!to) { to = Object.create(null); }
    while (object && object !== Function.prototype) {
      for (const key of Object.getOwnPropertyNames(object)) {
        if (!Object.hasOwn(to, key)) { to[key] = object[key]; }
      }
      object = Object.getPrototypeOf(object);
    }
    return to;
  },

  /**
    Unwind object's prototype chain into object and mask it's prototype.\
    * {@linkplain Tests__Helpers.flattenObjectPrototypes_test Unit Test}
    @param {Object} object  Object to flatten in-place
    @param {Object} [prototype=null]  Prototype to set
  */
  flattenObjectPrototypes(object, prototype) {
    const oldPrototype = Object.getPrototypeOf(object);
    Object.setPrototypeOf(object, prototype ?? null);
    this.unwindObjectPrototypes(oldPrototype, object);
  },

  /**
    Curry the function, so it may be called with partially predefined context/arguments. Returns curried funciton.\
    * **Unit Tests:**
    * * {@linkplain Tests__Helpers.curry_function Curry function}
    * * {@linkplain Tests__Helpers.curry_methods Curry methods}
    * * {@linkplain Tests__Helpers.curry_asyncRace Async race using curry arguments by 2 async functions}
    * * {@linkplain Tests__Helpers.curry_asyncGeneratorRace Async race using curry arguments
      by 2 async generator functions}
    @function
    @param {function|object|string|number|symbol} func  Source to curry. Either:
    * * Function -- curry the specified function;
    * * String, number or symbol -- Curry the method, which is a property of `context` with specified name.
    @param {function|object|null} [context=null]  `this` context. Either:
    * * `null` or `undefined` -- use the calling context of the method;
    * * Curry argument `_` -- curry the context as 1st argument in curried function;
    * * `global` -- use global context. Also recommended to specify by default if context is not significant --
      this is faster than specifying `null`/`undefined`;
    * * Object or function -- context to bind to curried function.
    @param {...*} [args]  Arguments to bind or curry in specified order. Curry argument `_` specifies
      the arguments to curry. Other values are bound.
    @returns {Function}  Curried function
  */
  curry: WrappersFunctionalWrap.curry,

  curryFunction: (func) => (...args) => WrappersFunctionalWrap.curry(func, global, ...args),

  curryMethod: (func, context) => (...args) => {
    if (typeof func !== 'function' && context && context !== WrappersFunctionalWrap.curryArgument) {
      func = context[func];
    }
    return WrappersFunctionalWrap.curry(func, context, ...args);
  },

  curryContext: (func) => (...args) => WrappersFunctionalWrap.curry(func, ...args),

  curryMethods(object, methodNames = null, curried = Object.create(null)) {
    if (methodNames?.[Symbol.iterator]) {
      for (const name of methodNames) {
        curried[name] = Helpers__wrapping.curryMethod(object[name], object);
      }
    } else {
      for (const name of Reflect.ownKeys(methodNames ?? object)) {
        const method = object[name];
        if (typeof method !== 'function') { continue; }
        curried[name] = Helpers__wrapping.curryMethod(method, object);
      }
    }
    return curried;
  },

  * objectPropertyNames(object, typeSet = null, prototypeSet = null, depth = 1) {
    if (!depth) { return; }
    let ownKeys = Reflect.ownKeys(object);
    if (typeSet) { ownKeys = ownKeys.filter((key) => typeSet.has(typeof object[key])); }
    if (prototypeSet) { ownKeys = ownKeys.filter((key) => prototypeSet.has(Object.getPrototypeOf(object[key]))); }
    yield* ownKeys;
    if (depth === 1) { return; }
    const prototype = Object.getPrototypeOf(object);
    if (!prototype || prototype === Object.prototype) { return; }
    yield* Helpers__wrapping.objectPropertyNames(prototype, typeSet, prototypeSet, depth - 1);
  },

  functionTypes: new Set(['function']),

  curryInstance(object, curried = Object.create(object)) {
    return Helpers__wrapping.curryMethods(
      object,
      Helpers__wrapping.objectPropertyNames(object, Helpers__wrapping.functionTypes, null, Infinity),
      curried,
    );
  },
};

module.exports = Helpers__wrapping;
