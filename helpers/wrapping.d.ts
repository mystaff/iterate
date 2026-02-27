export function voidFunction(): void;
export function voidAsyncFunction(): Promise<void>;
export const voidIterator: Generator<never, void, unknown>;
export function voidGeneratorFunction(): Generator<never, void, unknown>;
export const voidAsyncIterator: AsyncGenerator<never, void, unknown>;
export function voidAsyncGeneratorFunction(): AsyncGenerator<never, void, unknown>;
export declare let Function: Function;
export declare let AsyncFunction: Function;
export declare let GeneratorFunction: Function;
export declare let exhaustedIteratorResult: IteratorResult;
export declare let AsyncGeneratorFunction: Function;
export declare let chainGeneratorFunctionWrapper: (genFunc: Function) => Function;
export declare let generationGeneratorFunctionWrapper: (genFunc: Function, Class: constructor) => Function;
/**
  In `object`, wrap all methods having one of specified `types` using `wrapper` function.\
  * {@linkplain Tests__Helpers.wrapProperties_test Unit Test}
  @param {Object} object  Object to wrap the methods in-place
  @param {Set<constructor>} types  Types of methods to wrap
  @param {function(Function)} wrapper  Wrapping function to be called to wrap each method
  @param {...any} args  Additional args to pass to `wrapper` function
  @returns {void}
*/
export declare function wrapProperties(object: any, types: Set<constructor>, wrapper: (arg0: Function) => any, ...args: any[]): void;
/**
  Copy all the enumerable properties of `object` and its prototype chain to specific object.\
  * {@linkplain Tests__Helpers.unwindObjectPrototypes_test Unit Test}
  @param {Object} object  Source object
  @param {Object} [to]  Destination object. Defaults to new null-prototype object.
  @returns {Object}  Destination object
*/
export declare function unwindObjectPrototypes(object: any, to?: any): any;
/**
  Unwind object's prototype chain into object and mask it's prototype.\
  * {@linkplain Tests__Helpers.flattenObjectPrototypes_test Unit Test}
  @param {Object} object  Object to flatten in-place
  @param {Object} [prototype=null]  Prototype to set
*/
export declare function flattenObjectPrototypes(object: any, prototype?: any): void;
export declare function fatal(error: any): never;
export declare let curry: (func: Function | object | string | number | symbol, context?: Function | object | null, ...args?: any[]) => Function;
export declare function curryFunction(func: Function): Function;
export declare function curryMethod(func: Function | string | number | symbol, context: object): Function;
export declare function curryContext(func: Function): Function;
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
export declare function curryMethods(object: object, methodNames?: Iterable<string | symbol> | object | null, curried?: object): object;
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
export declare function objectPropertyNames(object: object, typeSet?: Set<string> | null, prototypeSet?: Set<object> | null, depth?: number): any;
export declare let functionTypes: Set<string>;
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
export declare function curryInstance(object: object, curried?: object): object;
