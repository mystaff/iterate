/** @file Iterate__aggregation Jest Tests */

const { testClass } = require('../jest-helper');
const { Iterate } = require('..');

// VSCode IntelliSense hack
/* eslint-disable *//* c8 ignore start */ if (false) {
  const Iterate__generation = require('./generation');
} /* c8 ignore stop *//* eslint-enable */

class Tests__Iterate {
  /**
    {@linkcode Iterate__generation.empty .empty()} -- no items
    @memberof Tests__Iterate
  */
  static empty_test() {
    const iterate = Iterate.empty();
    expect(iterate.toArray()).toEqual([]);
  }

  /**
    {@linkcode Iterate__generation.from .from()} -- from iterable object
    @memberof Tests__Iterate
  */
  static from_test() {
    const iterable = {
      x: 0,
      next() { return { value: this.x++, done: this.x > 3 }; },
      [Symbol.iterator]() { return this; }, // iterable protocol
    };
    const iterate = Iterate.from(iterable);
    expect(iterate.toArray()).toEqual([0, 1, 2]);
  }

  /**
    {@linkcode Iterate__generation.concat .concat()} -- concatenate from several iterable parameters
    @memberof Tests__Iterate
  */
  static concat_test() {
    function* birds() { yield 'sparrow'; yield 'robin'; yield 'crow'; }
    function* pets() { yield 'dog'; yield 'cat'; yield 'hamster'; }
    const sea = ['shark', 'dolphin', 'whale'];
    const ground = { mole: 1, rat: 2, mouse: 3 };
    const animalsIterate = Iterate.concat(birds(), pets, sea, ground, 'ant');
    expect(animalsIterate.toArray()).toEqual([
      'sparrow', 'robin', 'crow',
      'dog', 'cat', 'hamster',
      'shark', 'dolphin', 'whale',
      ['mole', 1], ['rat', 2], ['mouse', 3],
      'ant',
    ]);
  }

  /**
    {@linkcode Iterate__generation.objectKeys .objectKeys()} -- object keys
    @memberof Tests__Iterate
  */
  static objectKeys_test() {
    const object = { one: 1, two: 2, three: 3 };
    const iterate = Iterate.objectKeys(object);
    expect(iterate.toArray()).toEqual(['one', 'two', 'three']);
  }

  /**
    {@linkcode Iterate__generation.objectValues .objectValues()} -- object values
    @memberof Tests__Iterate
  */
  static objectValues_test() {
    const object = { one: 1, two: 2, three: 3 };
    const iterate = Iterate.objectValues(object);
    expect(iterate.toArray()).toEqual([1, 2, 3]);
  }

  /**
    {@linkcode Iterate__generation.objectEntries .objectEntries()} -- object entries
    @memberof Tests__Iterate
  */
  static objectEntries_test() {
    const object = { one: 1, two: 2, three: 3 };
    const iterate = Iterate.objectEntries(object);
    expect(iterate.toArray()).toEqual([['one', 1], ['two', 2], ['three', 3]]);
  }

  /**
    {@linkcode Iterate__generation.range .range()} -- using `start`, `end`, `step`
    @memberof Tests__Iterate
  */
  static range_3Args() {
    const iterate = Iterate.range(8, 3, -2);
    expect(iterate.toArray()).toEqual([8, 6, 4]);
  }

  /**
    {@linkcode Iterate__generation.range .range()} -- using `start`, `end`, `step` = 0
    @memberof Tests__Iterate
  */
  static range_3ArgsBadStep() {
    const iterate = Iterate.range(8, 3, 0);
    expect(iterate.toArray()).toEqual([8]);
  }

  /**
    {@linkcode Iterate__generation.range .range()} -- using `start`, `end`
    @memberof Tests__Iterate
  */
  static range_2Args() {
    const iterate = Iterate.range(2, 6);
    expect(iterate.toArray()).toEqual([2, 3, 4, 5]);
  }

  /**
    {@linkcode Iterate__generation.range .range()} -- using `end`
    @memberof Tests__Iterate
  */
  static range_1Arg() {
    const iterate = Iterate.range(4);
    expect(iterate.toArray()).toEqual([0, 1, 2, 3]);
  }
}

testClass(Tests__Iterate);

module.exports = { Tests__Iterate };
