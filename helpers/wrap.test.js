/** @file Helpers__wrap Jest Tests */

const { testClass } = require('../jest-helper');
const _ = require('.');

class Tests__Helpers {
  /** @memberof Tests__Helpers */

  static voidFunction_test() {
    // TEST: _.voidFunction:
    expect(_.voidFunction()).toEqual(undefined);
  }

  /** @memberof Tests__Helpers */

  static Function_test() {
    // TEST: _.Function
    expect((function dummy() { /* */ }).constructor).toBe(_.Function);
  }

  /** @memberof Tests__Helpers */

  static voidAsyncFunction_test() {
    // TEST: _.voidAsyncFunction
    expect(_.voidAsyncFunction()).toEqual(undefined);
  }

  /** @memberof Tests__Helpers */

  static AsyncFunction_test() {
    // TEST: _.AsyncFunction
    expect((async function dummy() { /* */ }).constructor).toBe(_.AsyncFunction);
  }

  /** @memberof Tests__Helpers */

  static voidIterator_test() {
    // TEST: _.voidIterator
    expect(Array.from(_.voidIterator)).toEqual([]);
  }

  /** @memberof Tests__Helpers */

  static voidGenerator_test() {
    // TEST: _.voidGenerator
    expect(Array.from(_.voidGenerator())).toEqual([]);
  }

  /** @memberof Tests__Helpers */

  static GeneratorFunction_test() {
    // TEST: _.GeneratorFunction
    expect((function* dummy() { /* */ }).constructor).toBe(_.GeneratorFunction);
  }

  /** @memberof Tests__Helpers */

  static async voidAsyncIterator_test() {
    // TEST: _.voidAsyncIterator
    expect(await _.arrayFromAsync(_.voidIterator)).toEqual([]);
  }

  /** @memberof Tests__Helpers */

  static async voidAsyncGenerator_test() {
    // TEST: _.voidAsyncGenerator
    expect(await _.arrayFromAsync(_.voidGenerator())).toEqual([]);
  }

  /** @memberof Tests__Helpers */

  static AsyncGeneratorFunction_test() {
    // TEST: _.AsyncGeneratorFunction
    expect((async function* dummy() { /* */ }).constructor).toBe(_.AsyncGeneratorFunction);
  }

  /** @memberof Tests__Helpers */

  static chainGeneratorFunctionWrapper_test() {
    // TEST: _.chainGeneratorWrapper
    const context = { chainGen: _.chainGeneratorFunctionWrapper(function* rev2Args(a, b) { yield b; yield a; }) };
    expect(context.chainGen(1, 2)).toBe(context);
    expect(Array.from(context.iterator)).toEqual([2, 1]);
  }

  /** @memberof Tests__Helpers */

  static creationGeneratorFunctionWrapper_test() {
    // TEST: _.creationGeneratorWrapper
    const creationGen = _.creationGeneratorFunctionWrapper(function* rev2Args(a, b) { yield b; yield a; }, Set);
    const instance = creationGen(3, 4);
    expect(instance.constructor).toBe(Set);
    expect(Array.from(instance)).toEqual([4, 3]);
  }

  /** @memberof Tests__Helpers */

  static wrapMethods_test() {
    // TEST: _.wrapMethods
    const context = {
      method() { return true; },
      * generator() { yield true; },
    };
    _.wrapMethods(context, new Set([_.GeneratorFunction]), _.creationGeneratorWrapper, Set);
    expect(context.method()).toBe(true);
    expect(context.generator().constructor).toBe(Set);
    expect(Array.from(context.generator())).toEqual([true]);
  }

  /** @memberof Tests__Helpers */

  static unwindObjectPrototypes_test() {
    // TEST: _.unwindObjectPrototypes
    const base = Object.create(null);
    base.a = 1;
    const medium = Object.create(base);
    medium.b = 2;
    const final = Object.create(medium);
    final.c = 3;
    const all = {};
    _.unwindObjectPrototypes(final, all);
    expect(final).toEqual({ c: 3 });
    expect(all).toEqual({ a: 1, b: 2, c: 3 });
  }

  /** @memberof Tests__Helpers */

  static flattenObjectPrototypes_test() {
    // TEST: _.flattenObjectPrototypes
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

  /** @memberof Tests__Helpers */

  static curryFunction_test() {
    // TEST: _.curryFunction
    const A = {};
    const mulAdd = _.curryFunction((a, b, c, d) => a * b + c * d, A);
    const scale5and2 = mulAdd(A, 5, A, 2);
    expect(scale5and2(3, 4)).toBe(3 * 5 + 4 * 2);
  }
}

testClass(Tests__Helpers);

module.exports = { Tests__Helpers };
