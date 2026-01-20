/** @file Helpers__cast Jest Tests */

const { testClass } = require('../jest-helper');
const _ = require('.');

// VSCode IntelliSense hack
/* eslint-disable *//* c8 ignore start */ if (false) {
  const Helpers__casting = require('./casting');
} /* c8 ignore stop *//* eslint-enable */

class Tests__Helpers {
  /**
    * {@linkcode Helpers__casting.arrayFromAsync _.arrayFromAsync()}: Create array from async iterable
    @memberof Tests__Helpers
  */
  static async arrayFromAsync_test() {
    async function* countTo4() { yield 1; yield 2; yield 3; yield 4; }
    const asyncIterable = countTo4();
    expect(await _.arrayFromAsync(asyncIterable)).toEqual([1, 2, 3, 4]);
  }

  /**
    * {@linkcode Helpers__casting.getIterable _.getIterable()}: Create iterable for iterator
    @memberof Tests__Helpers
  */
  static async getIterable_test() {
    const iterator = {
      x: 0,
      next() { return { value: this.x++, done: this.x > 3 }; },
      return() { this.x = Infinity; return { done: true }; },
    };
    const iterable = _.getIterable(iterator);
    expect(iterable[Symbol.iterator]()).toBe(iterator);
    expect(Array.from(iterable)).toEqual([0, 1, 2]);
  }

  /**
    * {@linkcode Helpers__casting.getAsyncIterable _.getAsyncIterable()}: Create async iterable for async iterator
    @memberof Tests__Helpers
  */
  static async getAsyncIterable_test() {
    const asyncIterator = {
      x: 0,
      async next() { return { value: this.x++, done: this.x > 3 }; },
      async return() { this.x = Infinity; return { done: true }; },
    };
    const asyncIterable = _.getAsyncIterable(asyncIterator);
    expect(asyncIterable[Symbol.asyncIterator]()).toBe(asyncIterator);
    expect(await _.arrayFromAsync(asyncIterable)).toEqual([0, 1, 2]);
  }
}

testClass(Tests__Helpers);

module.exports = { Tests__Helpers };
