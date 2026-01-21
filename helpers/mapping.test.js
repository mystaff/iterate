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

  /**
    * {@linkcode Helpers__mapping.echo _.echo()}: echo function
    @memberof Tests__Helpers
  */
  static echo_test() {
    expect(_.echo(42)).toBe(42);
    expect(_.echo('test')).toBe('test');
    expect(_.echo(null)).toBe(null);
    expect(_.echo(undefined)).toBe(undefined);
    const obj = { a: 1 };
    expect(_.echo(obj)).toBe(obj);
  }

  /**
    * {@linkcode Helpers__mapping.echoAsync _.echoAsync()}: async echo function
    @memberof Tests__Helpers
  */
  static async echoAsync_test() {
    expect(await _.echoAsync(42)).toBe(42);
    expect(await _.echoAsync('test')).toBe('test');
    expect(await _.echoAsync(null)).toBe(null);
    const obj = { a: 1 };
    expect(await _.echoAsync(obj)).toBe(obj);
  }

  /**
    * {@linkcode Helpers__mapping.valueFn _.valueFn()}: returns function that always returns specified value
    @memberof Tests__Helpers
  */
  static valueFn_test() {
    const fn42 = _.valueFn(42);
    expect(fn42()).toBe(42);
    expect(fn42(100)).toBe(42);
    expect(fn42('anything')).toBe(42);

    const fnNull = _.valueFn(null);
    expect(fnNull()).toBe(null);
  }

  /**
    * {@linkcode Helpers__mapping.isNullish _.isNullish()}: check if value is nullish
    @memberof Tests__Helpers
  */
  static isNullish_test() {
    expect(_.isNullish(null)).toBe(true);
    expect(_.isNullish(undefined)).toBe(true);
    expect(_.isNullish(0)).toBe(false);
    expect(_.isNullish('')).toBe(false);
    expect(_.isNullish(false)).toBe(false);
  }

  /**
    * {@linkcode Helpers__mapping.isNotNullish _.isNotNullish()}: check if value is not nullish
    @memberof Tests__Helpers
  */
  static isNotNullish_test() {
    expect(_.isNotNullish(null)).toBe(false);
    expect(_.isNotNullish(undefined)).toBe(false);
    expect(_.isNotNullish(0)).toBe(true);
    expect(_.isNotNullish('')).toBe(true);
    expect(_.isNotNullish(false)).toBe(true);
  }

  /**
    * {@linkcode Helpers__mapping.not _.not()}: logical not
    @memberof Tests__Helpers
  */
  static not_test() {
    expect(_.not(true)).toBe(false);
    expect(_.not(false)).toBe(true);
    expect(_.not(1)).toBe(false);
    expect(_.not(0)).toBe(true);
    expect(_.not('')).toBe(true);
    expect(_.not('text')).toBe(false);
  }

  /**
    * {@linkcode Helpers__mapping.inOf _.inOf()}: check if key exists in object
    @memberof Tests__Helpers
  */
  static inOf_test() {
    const obj = { a: 1, b: undefined };
    const checker = _.inOf(obj);
    expect(checker('a')).toBe(true);
    expect(checker('b')).toBe(true);
    expect(checker('c')).toBe(false);
  }

  /**
    * {@linkcode Helpers__mapping.in _.in()}: check if object has key
    @memberof Tests__Helpers
  */
  static in_test() {
    const checker = _.in('a');
    expect(checker({ a: 1 })).toBe(true);
    expect(checker({ b: 1 })).toBe(false);
    expect(checker(null)).toBe(undefined);
    expect(checker(undefined)).toBe(undefined);
  }

  /**
    * {@linkcode Helpers__mapping.hasOwnOf _.hasOwnOf()}: check if key is own property
    @memberof Tests__Helpers
  */
  static hasOwnOf_test() {
    const obj = { a: 1 };
    const checker = _.hasOwnOf(obj);
    expect(checker('a')).toBe(true);
    expect(checker('toString')).toBe(false);
  }

  /**
    * {@linkcode Helpers__mapping.hasOwn _.hasOwn()}: check if object has own property
    @memberof Tests__Helpers
  */
  static hasOwn_test() {
    const checker = _.hasOwn('a');
    expect(checker({ a: 1 })).toBe(true);
    expect(checker({ b: 1 })).toBe(false);
    expect(checker(null)).toBe(undefined);
  }

  /**
    * {@linkcode Helpers__mapping.propertyOf _.propertyOf()}: get property from object
    @memberof Tests__Helpers
  */
  static propertyOf_test() {
    const obj = { a: 1, b: 2 };
    const getter = _.propertyOf(obj);
    expect(getter('a')).toBe(1);
    expect(getter('b')).toBe(2);
    expect(getter('c')).toBe(undefined);
  }

  /**
    * {@linkcode Helpers__mapping.property _.property()}: get property by key
    @memberof Tests__Helpers
  */
  static property_test() {
    const getter = _.property('a');
    expect(getter({ a: 1 })).toBe(1);
    expect(getter({ b: 2 })).toBe(undefined);
    expect(getter(null)).toBe(undefined);
    expect(getter(undefined)).toBe(undefined);
  }

  /**
    * {@linkcode Helpers__mapping.getOf _.getOf()}: get value from map
    @memberof Tests__Helpers
  */
  static getOf_test() {
    const map = new Map([['a', 1], ['b', 2]]);
    const getter = _.getOf(map);
    expect(getter('a')).toBe(1);
    expect(getter('b')).toBe(2);
    expect(getter('c')).toBe(undefined);
  }

  /**
    * {@linkcode Helpers__mapping.get _.get()}: get value from map by key
    @memberof Tests__Helpers
  */
  static get_test() {
    const getter = _.get('a');
    const map = new Map([['a', 1], ['b', 2]]);
    expect(getter(map)).toBe(1);
    expect(getter(new Map())).toBe(undefined);
    expect(getter(null)).toBe(undefined);
  }

  /**
    * {@linkcode Helpers__mapping.atOf _.atOf()}: get array element by index
    @memberof Tests__Helpers
  */
  static atOf_test() {
    const arr = [10, 20, 30];
    const getter = _.atOf(arr);
    expect(getter(0)).toBe(10);
    expect(getter(1)).toBe(20);
    expect(getter(-1)).toBe(30);
    expect(getter(-2)).toBe(20);
  }

  /**
    * {@linkcode Helpers__mapping.at _.at()}: get element from array by index
    @memberof Tests__Helpers
  */
  static at_test() {
    const getter = _.at(1);
    expect(getter([10, 20, 30])).toBe(20);
    expect(getter(null)).toBe(undefined);

    const lastGetter = _.at(-1);
    expect(lastGetter([10, 20, 30])).toBe(30);
  }

  /**
    * {@linkcode Helpers__mapping.hasOf _.hasOf()}: check if map/set has item
    @memberof Tests__Helpers
  */
  static hasOf_test() {
    const set = new Set([1, 2, 3]);
    const checker = _.hasOf(set);
    expect(checker(1)).toBe(true);
    expect(checker(4)).toBe(false);

    const map = new Map([['a', 1]]);
    const mapChecker = _.hasOf(map);
    expect(mapChecker('a')).toBe(true);
    expect(mapChecker('b')).toBe(false);
  }

  /**
    * {@linkcode Helpers__mapping.has _.has()}: check if map/set has key
    @memberof Tests__Helpers
  */
  static has_test() {
    const checker = _.has(1);
    expect(checker(new Set([1, 2, 3]))).toBe(true);
    expect(checker(new Set([4, 5]))).toBe(false);
  }

  /**
    * {@linkcode Helpers__mapping.pigOf _.pigOf()}: property/index/get from collection
    @memberof Tests__Helpers
  */
  static pigOf_test() {
    // Null
    const nullGetter = _.pigOf(null);
    expect(nullGetter('anything')).toBe('anything');
  }

  /**
    * {@linkcode Helpers__mapping.pig _.pig()}: get from collection by key
    @memberof Tests__Helpers
  */
  static pig_test() {
    const getter = _.pig('a');

    // Object
    expect(getter({ a: 1 })).toBe(1);

    // Null
    expect(getter(null)).toBe(undefined);

    // Array with numeric key
    const indexGetter = _.pig(1);
    expect(indexGetter([10, 20, 30])).toBe(20);
  }

  /**
    * {@linkcode Helpers__mapping.times _.times()}: return true N times
    @memberof Tests__Helpers
  */
  static times_test() {
    // Positive integer
    const fn3 = _.times(3);
    expect(fn3()).toBe(true);
    expect(fn3()).toBe(true);
    expect(fn3()).toBe(true);
    expect(fn3()).toBe(false);

    // Zero
    const fn0 = _.times(0);
    expect(fn0()).toBe(false);

    // Negative integer
    const fnNeg2 = _.times(-2);
    expect(fnNeg2()).toBe(false);
    expect(fnNeg2()).toBe(false);
    expect(fnNeg2()).toBe(true);

    // Positive non-integer
    const fnPos = _.times(1.5);
    expect(fnPos()).toBe(true);
    expect(fnPos()).toBe(true);

    // Negative non-integer
    const fnNeg = _.times(-1.5);
    expect(fnNeg()).toBe(false);
    expect(fnNeg()).toBe(false);
  }

  /**
    * {@linkcode Helpers__mapping.lag _.lag()}: delay stream by N iterations
    @memberof Tests__Helpers
  */
  static lag_test() {
    // Basic lag
    const lag2 = _.lag(2);
    expect(lag2(1)).toBe(undefined);
    expect(lag2(2)).toBe(1);
    expect(lag2(3)).toBe(2);
    expect(lag2(4)).toBe(3);

    // With default value
    const lag2Default = _.lag(2, { defaultValue: 0 });
    expect(lag2Default(1)).toBe(0);
    expect(lag2Default(2)).toBe(1);
    expect(lag2Default(3)).toBe(2);

    // With map function
    const lag1Map = _.lag(1, { mapFunction: (x) => x * 2 });
    expect(lag1Map(5)).toBe(10); // 5 * 2
    expect(lag1Map(10)).toBe(20); // 10 * 2
    expect(lag1Map(15)).toBe(30); // 15 * 2

    // Invalid count
    const lag0 = _.lag(0);
    expect(lag0(42)).toBe(42); // acts as echo
  }

  /**
    * {@linkcode Helpers__mapping.window _.window()}: sliding window
    @memberof Tests__Helpers
  */
  static windowFn_test() {
    const win2 = _.window(2);
    const w1 = win2(1);
    expect(Array.from(w1)).toEqual([undefined, 1]);
    const w2 = win2(2);
    expect(Array.from(w2)).toEqual([1, 2]);
    const w3 = win2(3);
    expect(Array.from(w3)).toEqual([2, 3]);

    // With default value
    const win2Default = _.window(2, { defaultValue: 0 });
    const wd1 = win2Default(5);
    expect(Array.from(wd1)).toEqual([0, 5]);

    // Invalid count
    const win0 = _.window(0);
    expect(win0(42)).toBe(42); // acts as echo
  }

  /**
    * {@linkcode Helpers__mapping.stretch _.stretch()}: duplicate value N times
    @memberof Tests__Helpers
  */
  static stretch_test() {
    const stretch3 = _.stretch(3);
    expect(stretch3(42)).toEqual([42, 42, 42]);

    const stretch0 = _.stretch(0);
    expect(stretch0(42)).toEqual([]);

    const stretch1 = _.stretch(1);
    expect(stretch1(42)).toEqual([42]);

    // Invalid count
    const stretchNeg = _.stretch(-1);
    expect(stretchNeg(42)).toEqual([42]); // defaults to 1
  }

  /**
    * {@linkcode Helpers__mapping.ifNull _.ifNull()}: map nullish values
    @memberof Tests__Helpers
  */
  static ifNull_test() {
    const mapper = _.ifNull(() => 'default');
    expect(mapper(null)).toBe('default');
    expect(mapper(undefined)).toBe('default');
    expect(mapper(0)).toBe(0);
    expect(mapper('')).toBe('');
    expect(mapper(false)).toBe(false);
  }

  /**
    * {@linkcode Helpers__mapping.nullDefault _.nullDefault()}: replace nullish with default
    @memberof Tests__Helpers
  */
  static nullDefault_test() {
    const mapper = _.nullDefault(42);
    expect(mapper(null)).toBe(42);
    expect(mapper(undefined)).toBe(42);
    expect(mapper(0)).toBe(0);
    expect(mapper('')).toBe('');
    expect(mapper(100)).toBe(100);
  }

  /**
    * {@linkcode Helpers__mapping.if _.if()}: conditional mapping
    @memberof Tests__Helpers
  */
  static if_test() {
    const mapper = _.if(
      (x) => x > 10,
      (x) => x * 2,
      (x) => x + 1,
    );
    expect(mapper(15)).toBe(30); // 15 > 10, so 15 * 2
    expect(mapper(5)).toBe(6); // 5 <= 10, so 5 + 1
    expect(mapper(10)).toBe(11); // 10 <= 10, so 10 + 1
  }

  /**
    * {@linkcode Helpers__mapping.predicatorParam _.predicatorParam()}: convert predicator parameters
    @memberof Tests__Helpers
  */
  static predicatorParam_test() {
    // Number -> times
    const times3 = _.predicatorParam(3);
    expect(times3()).toBe(true);
    expect(times3()).toBe(true);
    expect(times3()).toBe(true);
    expect(times3()).toBe(false);

    // Boolean true -> isNotNullish
    const notNullish = _.predicatorParam(true);
    expect(notNullish(1)).toBe(true);
    expect(notNullish(null)).toBe(false);

    // Boolean false -> not
    const notFn = _.predicatorParam(false);
    expect(notFn(true)).toBe(false);
    expect(notFn(false)).toBe(true);

    // null/undefined -> isNullish
    const nullish = _.predicatorParam(null);
    expect(nullish(null)).toBe(true);
    expect(nullish(1)).toBe(false);
  }

  /**
    * {@linkcode Helpers__mapping.pipelineMapping _.pipelineMapping()}: pipeline of functions
    @memberof Tests__Helpers
  */
  static pipelineMapping_test() {
    const pipeline = _.pipelineMapping([
      (x) => x + 1,
      (x) => x * 2,
      (x) => x - 3,
    ]);
    expect(pipeline(5)).toBe(9); // (5 + 1) * 2 - 3 = 9

    // Optimized empty
    const empty = _.pipelineMapping([], true);
    expect(empty(42)).toBe(42);

    // Optimized single
    const single = _.pipelineMapping([(x) => x * 2], true);
    expect(single(5)).toBe(10);
  }

  /**
    * {@linkcode Helpers__mapping.mapInPlace _.mapInPlace()}: map object values in-place
    @memberof Tests__Helpers
  */
  static mapInPlace_test() {
    const obj = { a: 1, b: 2, c: 3 };
    const result = _.mapInPlace(obj, (x) => x * 2);
    expect(result).toBe(obj); // same object
    expect(obj).toEqual({ a: 2, b: 4, c: 6 });

    // Array
    const arr = [1, 2, 3];
    _.mapInPlace(arr, (x) => x + 10);
    expect(arr).toEqual([11, 12, 13]);
  }

  /**
    * {@linkcode Helpers__mapping.predicator _.predicator()}: predicator pipeline
    @memberof Tests__Helpers
  */
  static predicator_test() {
    // Array pipeline
    const pred = _.predicator([
      (x) => x.value,
      (x) => x > 10,
    ]);
    expect(pred({ value: 15 })).toBe(true);
    expect(pred({ value: 5 })).toBe(false);

    // Single function
    const single = _.predicator((x) => x > 0);
    expect(single(5)).toBe(true);
    expect(single(-5)).toBe(false);

    // Number parameter
    const times2 = _.predicator(2);
    expect(times2()).toBe(true);
    expect(times2()).toBe(true);
    expect(times2()).toBe(false);
  }

  /**
    * {@linkcode Helpers__mapping.WindowIterator WindowIterator}: Window Iterator
    @memberof Tests__Helpers
  */
  static windowIterator_test() {
    const w = new _.Window(3);
    w.push(1);
    w.push(2);
    w.push(3);

    const iter = new _.WindowIterator(w);
    expect(iter.next().value).toBe(1);
    expect(iter.next().value).toBe(2);
    expect(iter.next().value).toBe(3);
    expect(iter.next().done).toBe(true);
  }
}

testClass(Tests__Helpers);

module.exports = { Tests__Helpers };
