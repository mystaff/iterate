const WrappersIterateWrap = require('../wrappers/iterate-wrap');
const WrappersFunctionalWrap = require('../wrappers/functional-wrap');

if (false) { const { Tests__Helpers } = require('./wrap.test'); } // eslint-disable-line

function voidFunction() { } // eslint-disable-line
async function voidAsyncFunction() { } // eslint-disable-line

function* voidGenerator() { } // eslint-disable-line
const voidIterator = voidGenerator();

async function* voidAsyncGenerator() { } // eslint-disable-line
const voidAsyncIterator = voidAsyncGenerator();

/**
  @class
  Various **wrappers** and reflections for iterators and functional helpers.
  Used internally to organize {@link Iterate} and {@link AsyncIterate} classes.
  @hideconstructor
*/
const Helpers__wrap = {
  /** Empty function.

    * {@linkplain Tests__Helpers.voidFunction_test Unit Test}
    @function
    @returns {undefined}  undefined
  */
  voidFunction,

  /** Function constructor.

    * {@linkplain Tests__Helpers.Function_test Unit Test}
    @type {Function}
  */
  Function,

  /** Empty async function.

    * {@linkplain Tests__Helpers.voidAsyncFunction_test Unit Test}
    @function
    @returns {undefined}  undefined
  */
  voidAsyncFunction,

  /** Async function constructor.

    * {@linkplain Tests__Helpers.AsyncFunction_test Unit Test}
    @type {Function}
  */
  AsyncFunction: voidAsyncFunction.constructor,

  /** Empty iterator (yielding no results).

    * {@linkplain Tests__Helpers.voidIterator_test Unit Test}
    @type {Iterator}
  */
  voidIterator,

  /** Generator function yielding no results.

    * {@linkplain Tests__Helpers.voidGenerator_test Unit Test}
    @function
    @returns {Iterator}  Empty iterator
  */
  voidGenerator,

  /** Constructor of built-in generator function.

    * {@linkplain Tests__Helpers.GeneratorFunction_test Unit Test}
    @type {Function}
  */
  GeneratorFunction: voidGenerator.constructor,

  /** Empty async iterator (yielding no results).

    * {@linkplain Tests__Helpers.voidAsyncIterator_test Unit Test}
    @type {AsyncIterator}
  */
  voidAsyncIterator,

  /** Async generator function yielding no results.

    * {@linkplain Tests__Helpers.voidAsyncGenerator_test Unit Test}
    @function
    @returns {AsyncIterator}  Empty async iterator
  */
  voidAsyncGenerator,

  /** Constructor of built-in async generator function.

    * {@linkplain Tests__Helpers.AsyncGeneratorFunction_test Unit Test}
    @type {Function}
  */
  AsyncGeneratorFunction: voidAsyncGenerator.constructor,

  /**
    Wrapper function to support chaining for generator chaining methods.
    Internally used in `wrapper` parameter of {@link Helpers__wrap.wrapMethods wrapMethods}
    to organize the chain generators.

    * {@linkplain Tests__Helpers.chainGeneratorFunctionWrapper_test Unit Test}
    @function
    @param {Function} genFunc  Generator function
    @returns {Function}  Wrapped function
  */
  chainGeneratorFunctionWrapper: WrappersIterateWrap.chainGeneratorFunction,

  /**
    Wrapper function to support chaining for generator static creation methods.
    Internally used in `wrapper` parameter of {@link Helpers__wrap.wrapMethods wrapMethods}
    to organize the creation generators.

    * {@linkplain Tests__Helpers.creationGeneratorFunctionWrapper_test Unit Test}
    @function
    @param {Function} genFunc  Generator function
    @param {constructor} Class  Create instance of this class as a result
    @returns {Function}  Wrapped function
  */
  creationGeneratorFunctionWrapper: WrappersIterateWrap.creationGeneratorFunction,

  /** In `object`, wrap all methods with `type` using `wrapper` function.

    * {@linkplain Tests__Helpers.wrapMethods_test Unit Test}
    @param {Object} object  Object to wrap the methods in-place
    @param {Set<constructor>} types  Types of methods to wrap
    @param {function(Function)} wrapper  Wrapping function to be called to wrap each method
    @param {...any} args  Additional args to pass to `wrapper` function
    @returns {void}
  */
  wrapMethods(object, types, wrapper, ...args) {
    for (const key in object) {
      const value = object[key];
      if (types.has(value?.constructor)) {
        const wrapped = wrapper(value, ...args);
        // Following properties intended for internal use:
        Object.defineProperty(wrapped, 'generator', { value }); // original generator function
        Object.defineProperty(wrapped, 'toString', { // show source of original function
          value: () => value.toString(),
        });
        // Substitute generator function with its wrapped function:
        Object.defineProperty(object, key, { value: wrapped, enumerable: true });
      }
    }
  },

  /** Copy all the enumerable properties of `object` and its prototype chain to specific object.

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

  /** Unwind object's prototype chain into object and mask it's prototype.

    * {@linkplain Tests__Helpers.flattenObjectPrototypes_test Unit Test}
    @param {Object} object  Object to flatten in-place
    @param {Object} [prototype=null]  Prototype to set
  */
  flattenObjectPrototypes(object, prototype) {
    const oldPrototype = Object.getPrototypeOf(object);
    Object.setPrototypeOf(object, prototype ?? null);
    this.unwindObjectPrototypes(oldPrototype, object);
  },

  /** Wrapper function to support the currying functions.

    * {@linkplain Tests__Helpers.curryFunction_test Unit Test}
    @function
    @param {Function} func  Source function
    @param {Symbol} [symbol=_]  Curry argument symbol
    @returns {Function}  Wrapped function
  */
  curryFunction: WrappersFunctionalWrap.curryFunction,
};

module.exports = Helpers__wrap;
