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
    const callerContextCurryArgsMethodCurry = _.curry(Array.prototype.push, null, _, _);
    expect(callerContextCurryArgsMethodCurry.call(callerContextCurryArgsMethodArray, 4, 5, 6, 7)).toBe(5);
    expect(callerContextCurryArgsMethodArray).toEqual([1, 2, 3, 4, 5]);

    const callerContextCurryArgsMethodNameArray = [1, 2, 3];
    const callerContextCurryArgsMethodNameCurry = _.curry('push', null, _, _);
    expect(callerContextCurryArgsMethodNameCurry.call(callerContextCurryArgsMethodNameArray, 4, 5, 6, 7)).toBe(5);
    expect(callerContextCurryArgsMethodNameArray).toEqual([1, 2, 3, 4, 5]);

    const curryContextCurryArgsMethodArray = [1, 2, 3];
    const curryContextCurryArgsMethodCurry = _.curry(Array.prototype.push, _, _, _);
    expect(curryContextCurryArgsMethodCurry(curryContextCurryArgsMethodArray, 4, 5, 6, 7)).toBe(5);
    expect(curryContextCurryArgsMethodArray).toEqual([1, 2, 3, 4, 5]);

    const curryContextCurryArgsMethodNameArray = [1, 2, 3];
    const curryContextCurryArgsMethodNameCurry = _.curry('push', _, _, _);
    expect(curryContextCurryArgsMethodNameCurry(curryContextCurryArgsMethodNameArray, 4, 5, 6, 7)).toBe(5);
    expect(curryContextCurryArgsMethodNameArray).toEqual([1, 2, 3, 4, 5]);

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
}

testClass(Tests__Helpers);

module.exports = { Tests__Helpers };
