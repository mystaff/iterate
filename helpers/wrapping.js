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

  /* c8 ignore start */
  debug(scopeCallback, options = {}) { /* external code from ./debug */ }, // eslint-disable-line

  fatal(error) {
    console.error(error.stack ?? error);
    process.exit(1);
  },
  /* c8 ignore stop */

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

  /**
    Returns a curried version of a function with global context.\
    * {@linkplain Tests__Helpers.curryFunction_test Unit Test}
    @param {function} func  Function to curry
    @returns {function}  A function that accepts curry arguments and returns the curried function
  */
  curryFunction: (func) => (...args) => {
    if (args.length >= func.length && !args.includes(WrappersFunctionalWrap.curryArgument)) {
      return func(...args); // call function if arguments fulfilled
    }
    return WrappersFunctionalWrap.curry(func, global, ...args);
  },

  /**
    Returns a curried version of a method with specified context.\
    * {@linkplain Tests__Helpers.curryMethod_test Unit Test}
    @param {function|string|number|symbol} func  Method to curry, or property name of the method in context
    @param {object} context  Context object containing the method
    @returns {function}  A function that accepts curry arguments and returns the curried method
  */
  curryMethod: (func, context) => (...args) => {
    if (typeof func !== 'function' && context && context !== WrappersFunctionalWrap.curryArgument) {
      func = context[func];
    }
    if (
      typeof func === 'function'
      && args.length >= func.length
      && !args.includes(WrappersFunctionalWrap.curryArgument
    )) {
      return func.call(context, ...args); // call method if arguments fulfilled
    }
    return WrappersFunctionalWrap.curry(func, context, ...args);
  },

  /**
    Returns a curried version of a function where the context is the first argument.\
    * {@linkplain Tests__Helpers.curryContext_test Unit Test}
    @example
    // Curry a function with context as first parameter
    const greet = function(greeting, name) {
      return `${greeting}, ${name}! I'm ${this.title}`;
    };
    const curriedGreet = _.curryContext(greet);
    const obj = { title: 'Assistant' };
    
    // Full args
    curriedGreet(obj, 'Hello', 'John'); // => "Hello, John! I'm Assistant"
    
    // Curry some args
    const greetObj = curriedGreet(obj, _, 'Jane');
    greetObj('Hi'); // => "Hi, Jane! I'm Assistant"
    @param {function} func  Function to curry with context as first argument
    @returns {function}  A function that accepts context as first arg, then curry arguments,
      and returns the curried function
  */
  curryContext: (func) => (context, ...args) => {
    if (args.length >= func.length && !args.includes(WrappersFunctionalWrap.curryArgument)) {
      return func.call(context, ...args); // call function if arguments fulfilled
    }
    return WrappersFunctionalWrap.curry(func, context, ...args);
  },

  /**
    Create an object with curried versions of specified methods from an object.\
    * {@linkplain Tests__Helpers.curryMethods_test Unit Test}
    @example
    // Curry methods from an object
    const calculator = {
      value: 100,
      add(a, b) { return this.value + a + b; },
      multiply(a, b) { return this.value * a * b; }
    };
    
    // Curry all methods
    const curried = _.curryMethods(calculator);
    curried.add(10, 20); // => 130 (100 + 10 + 20)
    
    // Curry specific methods
    const curriedAdd = _.curryMethods(calculator, ['add']);
    const add10 = curriedAdd.add(_, 10);
    add10(5); // => 115 (100 + 5 + 10)
    @param {object} object  Object containing methods to curry
    @param {Iterable<string|symbol>|object|null} [methodNames=null]  Method names to curry.
      If iterable, curry only specified method names. If object, curry all function properties.
      If null, curry all function properties of `object`.
    @param {object} [curried=Object.create(null)]  Destination object to add curried methods to
    @returns {object}  Object with curried methods
  */
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

  /**
    Generator that yields property names from an object and its prototype chain.\
    * {@linkplain Tests__Helpers.objectPropertyNames_test Unit Test}
    @example
    // Get all property names
    const obj = { a: 1, b: 'text', method() {} };
    const names = Array.from(_.objectPropertyNames(obj));
    // names includes: 'a', 'b', 'method'
    
    // Get only function property names
    const functionNames = Array.from(
      _.objectPropertyNames(obj, new Set(['function']))
    );
    // functionNames: ['method']
    
    // Get property names from prototype chain
    class Base { baseMethod() {} }
    class Child extends Base { childMethod() {} }
    const instance = new Child();
    const allMethods = Array.from(
      _.objectPropertyNames(instance, new Set(['function']), null, Infinity)
    );
    // allMethods: ['childMethod', 'baseMethod']
    @generator
    @param {object} object  Object to get property names from
    @param {Set<string>|null} [typeSet=null]  Filter by property types (typeof values).
      If null, all types are included.
    @param {Set<object>|null} [prototypeSet=null]  Filter by property prototypes.
      If null, all prototypes are included.
    @param {number} [depth=1]  How many levels up the prototype chain to traverse.
      Use `Infinity` for entire chain, 1 for own properties only.
    @yields {string|symbol}  Property names from object and its prototype chain
  */
  * objectPropertyNames(object, typeSet = null, prototypeSet = null, depth = 1) {
    if (!depth) { return; }
    let ownKeys = Reflect.ownKeys(object);
    if (typeSet) { ownKeys = ownKeys.filter((key) => typeSet.has(typeof object[key])); }
    if (prototypeSet) {
      ownKeys = ownKeys.filter((key) => {
        const value = object[key];
        if (value == null) { return false; }
        return prototypeSet.has(Object.getPrototypeOf(value));
      });
    }
    yield* ownKeys;
    if (depth === 1) { return; }
    const prototype = Object.getPrototypeOf(object);
    if (!prototype || prototype === Object.prototype) { return; }
    yield* Helpers__wrapping.objectPropertyNames(prototype, typeSet, prototypeSet, depth - 1);
  },

  functionTypes: new Set(['function']),

  /**
    Create an object with curried versions of all methods from an object and its prototype chain.\
    * {@linkplain Tests__Helpers.curryInstance_test Unit Test}
    @example
    // Curry all methods from an instance
    class Calculator {
      constructor(value) { this.value = value; }
      add(a, b) { return this.value + a + b; }
      multiply(a, b) { return this.value * a * b; }
    }
    
    const calc = new Calculator(100);
    const curried = _.curryInstance(calc);
    
    // Access original properties through prototype
    curried.value; // => 100
    
    // Use curried methods
    curried.add(10, 20); // => 130 (100 + 10 + 20)
    const add10 = curried.add(10, _);
    add10(20); // => 130 (100 + 10 + 20)
    @param {object} object  Object instance to curry methods from
    @param {object} [curried=Object.create(object)]  Destination object with `object` as prototype.
      Defaults to new object with `object` as prototype.
    @returns {object}  Object with curried methods and original object as prototype
  */
  curryInstance(object, curried = Object.create(object)) {
    return Helpers__wrapping.curryMethods(
      object,
      Helpers__wrapping.objectPropertyNames(object, Helpers__wrapping.functionTypes, null, Infinity),
      curried,
    );
  },
};

module.exports = Helpers__wrapping;
