/** @file Helpers__wrap Jest Tests */

const { testClass } = require('../jest-helper');
const _ = require('..');

// VSCode IntelliSense hack
/* eslint-disable *//* c8 ignore start */ if (false) {
  const Helpers__wrapping = require('./wrapping');
} /* c8 ignore stop *//* eslint-enable */

class Tests__Helpers {
  /**
    * {@linkcode Helpers__wrapping.voidFunction _.voidFunction()}:
    @memberof Tests__Helpers
  */
  static voidFunction_test() {
    expect(_.voidFunction()).toEqual(undefined);
  }

  /**
    * {@linkcode Helpers__wrapping.Function _.Function}:
    @memberof Tests__Helpers
  */
  static Function_test() {
    expect((function dummy() { /* */ }).constructor).toBe(_.Function);
  }

  /**
    {@linkcode Helpers__wrapping.voidAsyncFunction _.voidAsyncFunction()}
    @memberof Tests__Helpers
  */
  static async voidAsyncFunction_test() {
    expect(await _.voidAsyncFunction()).toEqual(undefined);
  }

  /**
    * {@linkcode Helpers__wrapping.AsyncFunction _.AsyncFunction}:
    @memberof Tests__Helpers
  */
  static AsyncFunction_test() {
    expect((async function dummy() { /* */ }).constructor).toBe(_.AsyncFunction);
  }

  /**
    * {@linkcode Helpers__wrapping.voidIterator _.voidIterator}:
    @memberof Tests__Helpers
  */
  static voidIterator_test() {
    expect(Array.from(_.voidIterator)).toEqual([]);
  }

  /**
    * {@linkcode Helpers__wrapping.voidGeneratorFunction _.voidGeneratorFunction()}:
    @memberof Tests__Helpers
  */
  static voidGeneratorFunction_test() {
    expect(Array.from(_.voidGeneratorFunction())).toEqual([]);
  }

  /**
    * {@linkcode Helpers__wrapping.GeneratorFunction _.GeneratorFunction}:
    @memberof Tests__Helpers
  */
  static GeneratorFunction_test() {
    expect((function* dummy() { /* */ }).constructor).toBe(_.GeneratorFunction);
  }

  /**
    * {@linkcode Helpers__wrapping.voidAsyncIterator _.voidAsyncIterator}:
    @memberof Tests__Helpers
  */
  static async voidAsyncIterator_test() {
    expect(await _.arrayFromAsync(_.voidAsyncIterator)).toEqual([]);
  }

  /**
    * {@linkcode Helpers__wrapping.voidAsyncGeneratorFunction _.voidAsyncGeneratorFunction()}:
    @memberof Tests__Helpers
  */
  static async voidAsyncGeneratorFunction_test() {
    expect(await _.arrayFromAsync(_.voidAsyncGeneratorFunction())).toEqual([]);
  }

  /**
    * {@linkcode Helpers__wrapping.AsyncGeneratorFunction _.AsyncGeneratorFunction}:
    @memberof Tests__Helpers
  */
  static AsyncGeneratorFunction_test() {
    expect((async function* dummy() { /* */ }).constructor).toBe(_.AsyncGeneratorFunction);
  }

  /**
    {@linkcode Helpers__wrap.chainGeneratorFunctionWrapper _.chainGeneratorFunctionWrapper()} --
    chain generator function wrapper
    @memberof Tests__Helpers
  */
  static chainGeneratorFunctionWrapper_test() {
    const Class = class {
      chainGen = _.chainGeneratorFunctionWrapper(function* rev2Args(a, b) { yield b; yield a; });
    };
    const context = new Class();
    expect(context.chainGen(1, 2)).toBe(context);
    expect(Array.from(context.iterator)).toEqual([2, 1]);
  }

  /**
    * {@linkcode Helpers__wrapping.generationGeneratorWrapper _.generationGeneratorWrapper()}:
    @memberof Tests__Helpers
  */
  static generationGeneratorFunctionWrapper_test() {
    const genClass = class {
      constructor(genFunc, ...args) { this.iterator = genFunc(...args); }
    };
    const generationGen = _.generationGeneratorFunctionWrapper(
      function* rev2Args(a, b) { yield b; yield a; }, genClass);
    const instance = generationGen(3, 4);
    expect(instance.constructor).toBe(genClass);
    expect(Array.from(instance.iterator)).toEqual([4, 3]);
  }

  /**
    * {@linkcode Helpers__wrapping.wrapProperties _.wrapProperties()}:
    @memberof Tests__Helpers
  */
  static wrapProperties_test() {
    const genClass = class {
      constructor(genFunc, ...args) { this.iterator = genFunc(...args); }

      [Symbol.iterator]() { return this.iterator; }
    };
    const context = {
      method() { return true; },
      * generator() { yield true; },
    };
    const originalMethod = context.method;
    const originalGenerator = context.generator;
    _.wrapProperties(context, new Set([_.GeneratorFunction]), _.generationGeneratorFunctionWrapper, genClass);
    expect(context.method).toBe(originalMethod);
    expect(context.generator).not.toBe(originalGenerator);
    expect(context.generator.wrapped).toBe(originalGenerator);
    expect(context.generator.toString()).toBe(originalGenerator.toString());
    expect(context.method()).toBe(true);
    expect(context.generator().constructor).toBe(genClass);
    expect(Array.from(context.generator())).toEqual([true]);
  }

  /**
    * {@linkcode Helpers__wrapping.unwindObjectPrototypes _.unwindObjectPrototypes()}:
    @memberof Tests__Helpers
  */
  static unwindObjectPrototypes_test() {
    const base = Object.create(null);
    base.a = 1;
    const medium = Object.create(base);
    medium.b = 2;
    const final = Object.create(medium);
    final.c = 3;
    const all = {};
    expect(_.unwindObjectPrototypes(final, all)).toBe(all);
    expect(final).toEqual({ c: 3 });
    expect(all).toEqual({ a: 1, b: 2, c: 3 });
    const all2 = _.unwindObjectPrototypes(final);
    expect(all2).toEqual(all);
  }

  /**
    * {@linkcode Helpers__wrapping.flattenObjectPrototypes _.flattenObjectPrototypes()}:
    @memberof Tests__Helpers
  */
  static flattenObjectPrototypes_test() {
    const base = Object.create(null);
    base.a = 1;
    const medium = Object.create(base);
    medium.b = 2;
    const final = Object.create(medium);
    final.c = 3;
    _.flattenObjectPrototypes(final);
    expect(medium).toEqual({ b: 2 });
    expect(final).toEqual({ a: 1, b: 2, c: 3 });
  }

  /**
    * {@linkcode Helpers__wrapping.curry _.curry()}: different ways to curry the function
    @memberof Tests__Helpers
  */
  static curry_function() {
    const mulAdd = (a, b, c, d) => a * b + c * d;
    expect(_.curry(mulAdd, global, _, 5, _, 2)(3, 4)).toBe(3 * 5 + 4 * 2); // args carried out using curry argument `_`
    expect(_.curry(mulAdd, global, 3, 5, 4)(2)).toBe(3 * 5 + 4 * 2); // less args specified carry out the remaining args
    expect(_.curry(mulAdd, global, 3, 5, 4, 2)()).toBe(3 * 5 + 4 * 2); // as-is
  }

  /**
    * {@linkcode Helpers__wrapping.curry _.curry()}: different ways to curry the methods
    @memberof Tests__Helpers
  */
  static curry_methods() {
    const callerContextCurryArgsMethodArray = [1, 2, 3];
    const callerContextCurryArgsMethodCurry = _.curry(Array.prototype.push, null, _, 5);
    expect(callerContextCurryArgsMethodCurry.call(callerContextCurryArgsMethodArray, 4, 6, 7)).toBe(7);
    expect(callerContextCurryArgsMethodArray).toEqual([1, 2, 3, 4, 5, 6, 7]);

    const callerContextCurryArgsMethodNameArray = [1, 2, 3];
    const callerContextCurryArgsMethodNameCurry = _.curry('push', null, 4, _);
    expect(callerContextCurryArgsMethodNameCurry.call(callerContextCurryArgsMethodNameArray, 5, 6, 7)).toBe(7);
    expect(callerContextCurryArgsMethodNameArray).toEqual([1, 2, 3, 4, 5, 6, 7]);

    const curryContextCurryArgsMethodArray = [1, 2, 3];
    const curryContextCurryArgsMethodCurry = _.curry(Array.prototype.push, _, 4, _);
    expect(curryContextCurryArgsMethodCurry(curryContextCurryArgsMethodArray, 5, 6, 7)).toBe(7);
    expect(curryContextCurryArgsMethodArray).toEqual([1, 2, 3, 4, 5, 6, 7]);

    const curryContextCurryArgsMethodNameArray = [1, 2, 3];
    const curryContextCurryArgsMethodNameCurry = _.curry('push', _, _, 5);
    expect(curryContextCurryArgsMethodNameCurry(curryContextCurryArgsMethodNameArray, 4, 6, 7)).toBe(7);
    expect(curryContextCurryArgsMethodNameArray).toEqual([1, 2, 3, 4, 5, 6, 7]);

    const fixedContextRestArgsMethodArray = [1, 2, 3];
    const fixedContextRestArgsMethodCurry = _.curry(Array.prototype.push, fixedContextRestArgsMethodArray, 4, 5);
    expect(fixedContextRestArgsMethodCurry(6, 7)).toBe(7);
    expect(fixedContextRestArgsMethodArray).toEqual([1, 2, 3, 4, 5, 6, 7]);

    const fixedContextRestArgsMethodNameArray = [1, 2, 3];
    const fixedContextRestArgsMethodNameCurry = _.curry('push', fixedContextRestArgsMethodNameArray, 4, 5);
    expect(fixedContextRestArgsMethodNameCurry(6, 7)).toBe(7);
    expect(fixedContextRestArgsMethodNameArray).toEqual([1, 2, 3, 4, 5, 6, 7]);

    const callerContextRestArgsMethodArray = [1, 2, 3];
    const callerContextRestArgsMethodCurry = _.curry(Array.prototype.push, null);
    expect(callerContextRestArgsMethodCurry.call(callerContextRestArgsMethodArray, 4, 5, 6, 7)).toBe(7);
    expect(callerContextRestArgsMethodArray).toEqual([1, 2, 3, 4, 5, 6, 7]);

    const restContextRestArgsMethodArray = [1, 2, 3];
    const restContextRestArgsMethodCurry = _.curry(Array.prototype.push);
    expect(restContextRestArgsMethodCurry(restContextRestArgsMethodArray, 4, 5, 6, 7)).toBe(7);
    expect(restContextRestArgsMethodArray).toEqual([1, 2, 3, 4, 5, 6, 7]);

    const restContextRestArgsMethodNameArray = [1, 2, 3];
    const restContextRestArgsMethodNameCurry = _.curry('push');
    expect(restContextRestArgsMethodNameCurry(restContextRestArgsMethodNameArray, 4, 5, 6, 7)).toBe(7);
    expect(restContextRestArgsMethodNameArray).toEqual([1, 2, 3, 4, 5, 6, 7]);
  }

  /**
    * {@linkcode Helpers__wrapping.curry _.curry()}: async race
    @memberof Tests__Helpers
  */
  static async curry_asyncRace() {
    async function mulAdd(a, b, c, d) {
      await _.delay(200);
      return a * b + c * d;
    }
    const mulAddCurry = _.curry(mulAdd, null, _, 5, _, 2);
    const result1 = mulAddCurry(3, 4);
    const result2 = mulAddCurry(1, 6);
    expect(await result1).toBe(3 * 5 + 4 * 2);
    expect(await result2).toBe(1 * 5 + 6 * 2);
  }

  /**
    * {@linkcode Helpers__wrapping.curry _.curry()}: async generator race
    @memberof Tests__Helpers
  */
  static async curry_asyncGeneratorRace() {
    async function* mulAdd(a, b, c, d) {
      await _.delay(200);
      yield a * b + c * d;
    }
    const mulAddCurry = _.curry(mulAdd, null, _, 5, _, 2);
    const result1 = mulAddCurry(3, 4);
    const result2 = mulAddCurry(1, 6);
    expect(await _.arrayFromAsync(result1)).toEqual([3 * 5 + 4 * 2]);
    expect(await _.arrayFromAsync(result2)).toEqual([1 * 5 + 6 * 2]);
  }

  /**
    * {@linkcode Helpers__wrapping.curryFunction _.curryFunction()}: curry function with global context
    @memberof Tests__Helpers
  */
  static curryFunction_test() {
    const add = (a, b, c) => a + b + c;
    const curriedAdd = _.curryFunction(add);
    
    // Curry with placeholders
    const add5 = curriedAdd(_, 5, _);
    expect(add5(10, 3)).toBe(18); // 10 + 5 + 3
    
    // Curry with partial args
    const add10 = curriedAdd(10);
    expect(add10(20, 30)).toBe(60); // 10 + 20 + 30
    
    // Full args
    expect(curriedAdd(1, 2, 3)).toBe(6);
  }

  /**
    * {@linkcode Helpers__wrapping.curryMethod _.curryMethod()}: curry method with context
    @memberof Tests__Helpers
  */
  static curryMethod_test() {
    const obj = {
      value: 10,
      add(a, b) {
        return this.value + a + b;
      },
    };
    
    // Curry method by function reference
    const curriedAdd = _.curryMethod(obj.add, obj);
    const add5 = curriedAdd(_, 5);
    expect(add5(3)).toBe(18); // 10 + 3 + 5
    
    // Curry method by name
    const curriedAddByName = _.curryMethod('add', obj);
    const add10 = curriedAddByName(10, _);
    expect(add10(20)).toBe(40); // 10 + 10 + 20
    
    // Full args
    expect(curriedAdd(1, 2)).toBe(13); // 10 + 1 + 2
  }

  /**
    * {@linkcode Helpers__wrapping.curryContext _.curryContext()}: curry function with context as first parameter
    @memberof Tests__Helpers
  */
  static curryContext_test() {
    const greet = function(greeting, name) {
      return `${greeting}, ${name}! I'm ${this.title}`;
    };
    
    const curriedGreet = _.curryContext(greet);
    const obj = { title: 'Assistant' };
    
    // Full args - call immediately
    expect(curriedGreet(obj, 'Hello', 'John')).toBe("Hello, John! I'm Assistant");
    
    // Curry with placeholders
    const greetObj = curriedGreet(obj, _, 'Jane');
    expect(greetObj('Hi')).toBe("Hi, Jane! I'm Assistant");
    expect(greetObj('Hey')).toBe("Hey, Jane! I'm Assistant");
    
    // Curry greeting
    const helloGreeter = curriedGreet(obj, 'Hello', _);
    expect(helloGreeter('Alice')).toBe("Hello, Alice! I'm Assistant");
    
    // Different context
    const obj2 = { title: 'Bot' };
    const greetObj2 = curriedGreet(obj2, 'Greetings', _);
    expect(greetObj2('Bob')).toBe("Greetings, Bob! I'm Bot");
  }

  /**
    * {@linkcode Helpers__wrapping.curryMethods _.curryMethods()}: curry multiple methods from an object
    @memberof Tests__Helpers
  */
  static curryMethods_test() {
    const calculator = {
      value: 100,
      add(a, b) { return this.value + a + b; },
      multiply(a, b) { return this.value * a * b; },
      subtract(a, b) { return this.value - a - b; },
    };
    
    // Curry all methods
    const curried = _.curryMethods(calculator);
    expect(curried.add(10, 20)).toBe(130); // 100 + 10 + 20
    expect(curried.multiply(2, 3)).toBe(600); // 100 * 2 * 3
    
    // Curry with placeholders
    const add10 = curried.add(_, 10);
    expect(add10(5)).toBe(115); // 100 + 5 + 10
    
    const multiply5 = curried.multiply(5, _);
    expect(multiply5(4)).toBe(2000); // 100 * 5 * 4
    
    // Curry specific methods only
    const curriedSpecific = _.curryMethods(calculator, ['add', 'subtract']);
    expect(curriedSpecific.add).toBeDefined();
    expect(curriedSpecific.subtract).toBeDefined();
    expect(curriedSpecific.multiply).toBeUndefined();
    
    expect(curriedSpecific.add(1, 2)).toBe(103); // 100 + 1 + 2
    expect(curriedSpecific.subtract(10, 5)).toBe(85); // 100 - 10 - 5
    
    // Custom destination object
    const customDest = { custom: true };
    const curriedCustom = _.curryMethods(calculator, ['add'], customDest);
    expect(curriedCustom).toBe(customDest);
    expect(curriedCustom.custom).toBe(true);
    expect(curriedCustom.add(1, 1)).toBe(102); // 100 + 1 + 1
  }

  /**
    * {@linkcode Helpers__wrapping.objectPropertyNames _.objectPropertyNames()}: get property names from object and prototype chain
    @memberof Tests__Helpers
  */
  static objectPropertyNames_test() {
    // Basic object
    const obj = { a: 1, b: 'text', c: new Date(), d: [2, 3], n: null, method() {}, [Symbol('sym')]: 'symbol' };
    const allNames = Array.from(_.objectPropertyNames(obj));
    expect(allNames).toContain('a');
    expect(allNames).toContain('b');
    expect(allNames).toContain('method');
    expect(allNames.some(n => typeof n === 'symbol')).toBe(true);
    
    // Filter by type
    const functionNames = Array.from(_.objectPropertyNames(obj, new Set(['function'])));
    expect(functionNames).toContain('method');
    expect(functionNames).not.toContain('a');
    expect(functionNames).not.toContain('b');
    
    const numberNames = Array.from(_.objectPropertyNames(obj, new Set(['number'])));
    expect(numberNames).toContain('a');
    expect(numberNames).not.toContain('b');
    expect(numberNames).not.toContain('method');

    // Filter by prototype
    const dateNames = Array.from(_.objectPropertyNames(obj, null, new Set([Date.prototype])));
    expect(dateNames).toContain('c');
    expect(dateNames).not.toContain('a');
    expect(dateNames).not.toContain('b');
    
    const arrayNames = Array.from(_.objectPropertyNames(obj, null, new Set([Array.prototype])));
    expect(arrayNames).toContain('d');
    expect(arrayNames).not.toContain('b');
    expect(arrayNames).not.toContain('method');

    // Prototype chain
    class Base {
      baseMethod() {}
    }
    Base.prototype.baseProp = 1;
    
    class Child extends Base {
      childMethod() {}
    }
    Child.prototype.childProp = 2;
    
    const instance = new Child();
    instance.ownProp = 3;
    
    // Depth 1 - own properties only
    const ownProps = Array.from(_.objectPropertyNames(instance, null, null, 1));
    expect(ownProps).toContain('ownProp');
    expect(ownProps).not.toContain('childProp');
    expect(ownProps).not.toContain('baseProp');
    
    // Infinite depth - entire prototype chain
    const allMethods = Array.from(
      _.objectPropertyNames(instance, new Set(['function']), null, Infinity)
    );
    expect(allMethods).toContain('childMethod');
    expect(allMethods).toContain('baseMethod');
    
    // Depth 2 - own + 1 level up
    const depth2Methods = Array.from(
      _.objectPropertyNames(instance, new Set(['function']), null, 2)
    );
    expect(depth2Methods).toContain('childMethod');
    // baseMethod is on Base.prototype, which is 2 levels up
    
    // Depth 0 - no properties
    const noProps = Array.from(_.objectPropertyNames(obj, null, null, 0));
    expect(noProps).toEqual([]);
  }

  /**
    * {@linkcode Helpers__wrapping.curryInstance _.curryInstance()}: curry all methods from an instance
    @memberof Tests__Helpers
  */
  static curryInstance_test() {
    class Calculator {
      constructor(value) {
        this.value = value;
      }
      add(a, b) {
        return this.value + a + b;
      }
      multiply(a, b) {
        return this.value * a * b;
      }
    }
    
    class ExtendedCalculator extends Calculator {
      subtract(a, b) {
        return this.value - a - b;
      }
    }
    
    const calc = new ExtendedCalculator(100);
    const curried = _.curryInstance(calc);
    
    // Original object is prototype
    expect(Object.getPrototypeOf(curried)).toBe(calc);
    
    // Can access original properties through prototype
    expect(curried.value).toBe(100);
    
    // Curried methods work
    expect(curried.add(10, 20)).toBe(130); // 100 + 10 + 20
    expect(curried.multiply(2, 3)).toBe(600); // 100 * 2 * 3
    expect(curried.subtract(10, 5)).toBe(85); // 100 - 10 - 5
    
    // Can use curry arguments
    const add10 = curried.add(10, _);
    expect(add10(20)).toBe(130); // 100 + 10 + 20
    
    const multiply5 = curried.multiply(5, _);
    expect(multiply5(4)).toBe(2000); // 100 * 5 * 4
    
    // Methods from parent class are also curried
    const subtract20 = curried.subtract(_, 20);
    expect(subtract20(10)).toBe(70); // 100 - 10 - 20
    
    // Custom destination
    const customCurried = _.curryInstance(calc, {});
    expect(customCurried.add).toBeDefined();
    expect(customCurried.add(1, 1)).toBe(102); // 100 + 1 + 1
  }
}

testClass(Tests__Helpers);

module.exports = { Tests__Helpers };
