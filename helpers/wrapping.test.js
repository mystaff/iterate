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
    * {@linkcode Helpers__wrapping.curryFunction _.curryFunction()}:
    @memberof Tests__Helpers
  */
  static curryFunction_test() {
    const mulAdd = _.curryFunction((a, b, c, d) => a * b + c * d);
    expect(mulAdd(3, 5, 4, 2)).toBe(3 * 5 + 4 * 2); // as-is
    expect(mulAdd(_, 5, _, 2)(3, 4)).toBe(3 * 5 + 4 * 2); // some args carried out using curry argument `A`
    expect(mulAdd(3, 5, 4)(2)).toBe(3 * 5 + 4 * 2); // less args specified carry out the remaining args
  }
}

testClass(Tests__Helpers);

module.exports = { Tests__Helpers };
