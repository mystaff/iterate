/** @file Iterate__aggregation Jest Tests */

const { testClass } = require('../jest-helper');
const { Iterate } = require('..');

// VSCode IntelliSense hack
/* eslint-disable *//* c8 ignore start */ if (false) {
  const Iterate__aggregation = require('./aggregation');
} /* c8 ignore stop *//* eslint-enable */

class Tests__Iterate {
  /**
    {@linkcode Iterate__aggregation#exec .exec()} -- execute the iteration pipeline
    @memberof Tests__Iterate
  */
  static exec_test() {
    const iterate = Iterate.from([1, 2, 3]);
    expect(iterate.exec()).toBe(undefined);
    expect(iterate.toArray()).toEqual([]); // all items should be consumed
  }

  /**
    {@linkcode Iterate__aggregation#toArray .toArray()} -- collect items to new array
    @memberof Tests__Iterate
  */
  static toArray_new() {
    const iterate = Iterate.from([1, 2, 3]);
    expect(iterate.toArray()).toEqual([1, 2, 3]);
  }

  /**
    {@linkcode Iterate__aggregation#toArray .toArray()} -- push items to existing array
    @memberof Tests__Iterate
  */
  static toArray_existing() {
    const existing = [-1, 0];
    const iterate = Iterate.from([1, 2, 3]);
    expect(iterate.toArray(existing)).toEqual([-1, 0, 1, 2, 3]);
  }

  /**
    {@linkcode Iterate__aggregation#each .each()} -- execute the mapper params for each value
    @memberof Tests__Iterate
  */
  static each_test() {
    let sum = 0;
    const iterate = Iterate.from([1, 2, 3]);
    iterate.each((value) => (sum += value));
    expect(sum).toBe(0);
    expect(iterate.toArray()).toEqual([1, 2, 3]);
    expect(sum).toBe(6);
  }

  /**
    {@linkcode Iterate__aggregation#forEach .forEach()} -- execute the mapper params for each value
    @memberof Tests__Iterate
  */
  static forEach_test() {
    let sum = 0;
    const iterate = Iterate.from([1, 2, 3]);
    const count = iterate.forEach((value) => (sum += value));
    expect(sum).toBe(6);
    expect(count).toBe(3);
  }

  /**
    {@linkcode Iterate__aggregation#count .count()} -- count iterated values
    @memberof Tests__Iterate
  */
  static count_test() {
    const iterate = Iterate.from([1, 2, 3]);
    const count = iterate.count();
    expect(count).toBe(3);
  }

  /**
    {@linkcode Iterate__aggregation#reduce .reduce()} -- reduce with reducer function
    @memberof Tests__Iterate
  */
  static reduce_withReducer() {
    // Sum with reducer
    const sum = Iterate.from([1, 2, 3, 4]).reduce((acc, val) => acc + val, 0);
    expect(sum).toBe(10);

    // Product with reducer
    const product = Iterate.from([2, 3, 4]).reduce((acc, val) => acc * val, 1);
    expect(product).toBe(24);

    // Concatenate strings
    const concat = Iterate.from(['a', 'b', 'c']).reduce((acc, val) => acc + val, '');
    expect(concat).toBe('abc');
  }

  /**
    {@linkcode Iterate__aggregation#reduce .reduce()} -- reduce with initial value
    @memberof Tests__Iterate
  */
  static reduce_withInitial() {
    // With initial value
    const result = Iterate.from([1, 2, 3]).reduce((acc, val) => acc + val, 10);
    expect(result).toBe(16); // 10 + 1 + 2 + 3

    // Without initial value (uses first element)
    const result2 = Iterate.from([1, 2, 3]).reduce((acc, val) => acc + val);
    expect(result2).toBe(6); // 1 + 2 + 3
  }

  /**
    {@linkcode Iterate__aggregation#reduce .reduce()} -- sum without reducer (default addition)
    @memberof Tests__Iterate
  */
  static reduce_sum() {
    // Default behavior (addition)
    const sum = Iterate.from([1, 2, 3, 4]).reduce();
    expect(sum).toBe(10);

    // With initial value
    const sumWithInitial = Iterate.from([1, 2, 3]).reduce(null, 10);
    expect(sumWithInitial).toBe(16);

    // String concatenation
    const concat = Iterate.from(['a', 'b', 'c']).reduce();
    expect(concat).toBe('abc');
  }

  /**
    {@linkcode Iterate__aggregation#toObject .toObject()} -- collect items to new object
    @memberof Tests__Iterate
  */
  static toObject_new() {
    const iterate = Iterate.from([['a', 1], ['b', 2], ['c', 3]]);
    expect(iterate.toObject()).toEqual({ a: 1, b: 2, c: 3 });
  }

  /**
    {@linkcode Iterate__aggregation#toObject .toObject()} -- add items to existing object
    @memberof Tests__Iterate
  */
  static toObject_existing() {
    const existing = { x: 0 };
    const iterate = Iterate.from([['a', 1], ['b', 2]]);
    expect(iterate.toObject(existing)).toEqual({ x: 0, a: 1, b: 2 });
  }
}

testClass(Tests__Iterate);

module.exports = { Tests__Iterate };
