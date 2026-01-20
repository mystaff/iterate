/** @file Helpers__mapping Jest Tests */

const { testClass } = require('../jest-helper');
const _ = require('.');

// VSCode IntelliSense hack
/* eslint-disable *//* c8 ignore start */ if (false) {
  const Helpers__mapping = require('./mapping');
} /* c8 ignore stop *//* eslint-enable */

class Tests__Helpers {
  /**
    * {@linkcode Helpers__mapping.mapperParam _.mapperParam()}: convert mapper parameters to mapper functions
    @memberof Tests__Helpers
  */
  static async mapperParam_test() {
    const object = { a: 1, b: 2 };
    const [propertyA, propertyOfObject, propertyB] = ['a', object, 'b'].map(_.mapperParam);
    expect(propertyA(object)).toBe(1);
    expect(propertyOfObject('b')).toBe(2);
    expect(propertyB(object)).toBe(2);
  }

  /**
    * {@linkcode Helpers__mapping.mapper _.mapper()}: self-alternating mapper functions
    @memberof Tests__Helpers
  */
  static async mapper_alternatingFunctions() {
    const object = { a: { b: { c: 1, d: 2 } } };
    const nest = ['a', 'b', 'c'];
    const nestMapper = _.mapper(nest);
    expect(typeof nest[2] === 'function').toBe(true); // mapper functions to be mapped to mapper parameters in-place
    expect(nestMapper(object)).toBe(1);
    expect(nestMapper(object)).toBe(1);
    nest.pop(); // remove 'c' param; now: ['a', 'b']
    expect(nestMapper(object)).toEqual({ c: 1, d: 2 });
    nest.push(_.mapperParam('d')); // now: ['a', 'b', 'd']
    expect(nestMapper(object)).toBe(2);
  }

  /**
    * {@linkcode Helpers__mapping.Window Window}: Window
    @memberof Tests__Helpers
  */
  static window_test() {
    const w = new _.Window(3);
    expect(Array.from(w)).toEqual([undefined, undefined, undefined]);
    expect(w.push(1)).toBe(4);
    expect(Array.from(w)).toEqual([undefined, undefined, 1]);
    expect(w.push(2)).toBe(4);
    expect(Array.from(w)).toEqual([undefined, 1, 2]);
    expect(w.push(3)).toBe(4);
    expect(Array.from(w)).toEqual([1, 2, 3]);
    expect(w.push(4)).toBe(4);
    expect(Array.from(w)).toEqual([2, 3, 4]);
    expect(w[Symbol.iterator]()).toBe(w.iterator); // only one optimal iterator at once
    expect(w[Symbol.iterator]()).not.toBe(w); // parallelly created iterators are not optimal
    expect(w[Symbol.iterator]()).not.toBe(w); // another one
    w.iterator.return(); // resets to the optimal iterator
    expect(w[Symbol.iterator]()).toBe(w.iterator); // optimal iterator
  }
}

testClass(Tests__Helpers);

module.exports = { Tests__Helpers };
