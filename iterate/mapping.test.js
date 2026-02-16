/** @file Iterate__mapping Jest Tests */

const { testClass } = require('../jest-helper');
const { Iterate } = require('..');

// VSCode IntelliSense hack
/* eslint-disable *//* c8 ignore start */ if (false) {
  const Iterate__mapping = require('./mapping');
} /* c8 ignore stop *//* eslint-enable */

class Tests__Iterate {
  /**
    {@linkcode Iterate__mapping#flat .flat().}: depth=0 -- no operation
    @memberof Tests__Iterate
  */
  static flat_noop() {
    const deep = [[1, 2], [3, [4, [5]], null, 6], 'hello'];
    expect(Iterate.from(deep).flat(0).toArray()).toEqual(deep);
  }

  /**
    {@linkcode Iterate__mapping#flat .flat().}: depth=1,2,Infinity
    @memberof Tests__Iterate
  */
  static flat_deep() {
    const deep = [[1, 2], [3, [4, [5]], null, 6], ['hello']];
    expect(Array.from(Iterate.from(deep).flat())).toEqual([1, 2, 3, [4, [5]], null, 6, 'hello']);
    expect(Array.from(Iterate.from(deep).flat(2))).toEqual([1, 2, 3, 4, [5], 6, 'hello']);
    expect(Array.from(Iterate.from(deep).flat(Infinity))).toEqual([1, 2, 3, 4, 5, 6, 'hello']);
  }

  /**
    {@linkcode Iterate__mapping#map .map().}: mapper functions
    @memberof Tests__Iterate
  */
  static map_mapperFunctions() {
    const increasedStringifiedIterate = Iterate.from([1, 2, 3]);
    increasedStringifiedIterate.map((x) => x + 1, String);
    expect(Array.from(increasedStringifiedIterate)).toEqual(['2', '3', '4']);
  }

  /**
    {@linkcode Iterate__mapping#map .map().}: mapper parameters
    @memberof Tests__Iterate
  */
  static map_mapperParams() {
    const nameById = {
      1: 'John',
      2: 'Sam',
      3: 'Tom',
      4: 'Kate',
    };
    const ageByName = {
      John: 28,
      Sam: 30,
      Tom: 42,
      Kate: 18,
    };
    const agesIterate = Iterate.from([3, 1, 2, 0]);
    agesIterate.map(nameById, ageByName);
    expect(Array.from(agesIterate)).toEqual([42, 28, 30, undefined]);
  }

  /**
    {@linkcode Iterate__mapping#flatMap .flatMap().}: mapper functions
    @memberof Tests__Iterate
  */
  static flatMap_mapperFunctions() {
    const add5 = (x) => x + 5;
    function* actionsByCode(code) {
      yield 'open';
      if (code < 7) { yield 'load'; }
      yield 'sync';
      if (code > 7) { yield 'commit'; }
      yield 'close';
    }
    const actionsIterate = Iterate.from([1, 2, 3]);
    actionsIterate.flatMap(add5, actionsByCode);
    expect(Array.from(actionsIterate)).toEqual([
      'open', 'load', 'sync', 'close',
      'open', 'sync', 'close',
      'open', 'sync', 'commit', 'close',
    ]);
  }

  /**
    {@linkcode Iterate__mapping#flatMap .flatMap().}: mapper parameter
    @memberof Tests__Iterate
  */
  static flatMap_mapperParam() {
    const orderName = {
      1: 'first',
      2: 'second',
      3: 'third',
    };
    const duplicatedOrderNamesIterate = Iterate.from([0, 1, 2, 3]);
    duplicatedOrderNamesIterate.flatMap(orderName);
    expect(Array.from(duplicatedOrderNamesIterate)).toEqual(['first', 'second', 'third']);
  }

  /**
    {@linkcode Iterate__mapping#dim .dim().}: multi-dimensional cartesian product
    @memberof Tests__Iterate
  */
  static dim_test() {
    // Basic 2D cartesian product
    const result1 = Iterate.from([1, 2]).dim([3, 4]).toArray();
    expect(result1).toEqual([
      [1, 3],
      [1, 4],
      [2, 3],
      [2, 4],
    ]);

    // 3D cartesian product
    const result2 = Iterate.from(['a', 'b']).dim([1, 2], ['x', 'y']).toArray();
    expect(result2).toEqual([
      ['a', 1, 'x'],
      ['a', 1, 'y'],
      ['a', 2, 'x'],
      ['a', 2, 'y'],
      ['b', 1, 'x'],
      ['b', 1, 'y'],
      ['b', 2, 'x'],
      ['b', 2, 'y'],
    ]);

    // Single dimension (no additional iterables)
    const result3 = Iterate.from([1, 2, 3]).dim().toArray();
    expect(result3).toEqual([[1], [2], [3]]);
  }
}

testClass(Tests__Iterate);

module.exports = { Tests__Iterate };
