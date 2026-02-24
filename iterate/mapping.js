const Helpers = require('../helpers');
const Iterate__aggregation = require('./aggregation');
const Iterate__generation = require('./generation');

// VSCode IntelliSense hack
/* eslint-disable *//* c8 ignore start */ if (false) {
  const { Tests__Iterate } = require('./mapping.test');
  const Iterate = require('.');
  const { IterateContext, IterateMapperFunction } = require('.');
  const { MapperParam } = require('../helpers/mapping');
} /* c8 ignore stop *//* eslint-enable */

function* flatRecursion(iterable, depth) {
  if (!depth) { yield* iterable; return; }
  for (const item of iterable) {
    if (item != null) {
      if (item[Symbol.iterator] && typeof item !== 'string') {
        yield* depth === 1 ? item : flatRecursion(item, depth - 1);
      } else {
        yield item;
      }
    }
  }
}

function* dimRecursion(prefix, iterables) {
  if (prefix.length > iterables.length) { yield prefix; return; }
  for (const item of Iterate__generation.from(iterables[prefix.length - 1], prefix)) {
    yield* dimRecursion.call(this, [...prefix, item], iterables);
  }
}

/**
  @class
  Sync iteration mapping methods of {@linkcode Iterate} class
  @hideconstructor
*/
class Iterate__mapping extends Iterate__aggregation {
  /**
    Flatten input values and expand them into iteration\
    Similar to native
    {@linkplain https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator/flat
    iterator.flat()}
    method\
    If `depth > 0`, each input value is either:
    * * Flattened and expanded into iteration, if iterable, but not a string
    * * Skipped from iteration, if nullish
    * * Inserted as-is, if not iterable and not nullish, or a string
    *
    * If `depth > 1`, then the above is repeated `depth - 1` times for the results from previous flattening\
    * *Note:* To iterate the string characters, `string[Symbol.iterator]()` may be used\
    * **Unit Tests:**
    * * {@linkplain Tests__Iterate.flat_noop No operation}
    * * {@linkplain Tests__Iterate.flat_deep Depth of 1 (default), 2, Infinity}
    @param {number} [depth=1]  Depth of flattening. Zero means no flattening; positive integer defines the number of
      levels of depth to flatten. Use `Infinity` for unlimited depth. Default is `1` -- flatten once.
    @this {IterateContext}  Current context of pipeline
    @returns {Iterate}  {@linkcode Iterate this} for chaining
  */
  * flat(depth = 1) {
    yield* flatRecursion(this, depth);
  }

  /**
    Map values one-to-one.
    Each value of iteration is transformed by one or more specified `mappers`.\
    Similar to native
    {@linkplain https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator/map
    iterator.map()}
    method\
    * **Unit Tests:**
    * * {@linkplain Tests__Iterate.map_mapperFunctions Using mapper functions}
    * * {@linkplain Tests__Iterate.map_mapperParams Using mapper parameters}
    @param {...MapperParam} mappers  Mapper {@linkplain IterateMapperFunction callbacks} and/or
      {@linkplain MapperParam parameters} used in a sequence to transform the values of iteration.
    @this {IterateContext}  Current context of pipeline
    @returns {Iterate}  {@linkcode Iterate this} for chaining
    @example
    const { Iterate } = require('@mystaff/iterate');
    
    Iterate.from([1, 2, 3]).map(x => x * 2).toArray(); // [2, 4, 6]
  */
  * map(...mappers) {
    const func = Helpers.mapper(mappers);
    this.index = -1;
    for (const item of this) {
      this.value = item;
      yield func.call(this, item, ++this.index, this, mappers);
    }
  }

  /**
    Map values one-to-many. "Many" also includes "none" and "one".
    This acts the same as {@linkcode Iterate__mapping#map .map(...mappers)}{@linkcode Iterate__mapping#flat .flat()}
    Each value of iteration is transformed by one or more mapper functions
    (which may also be defined by mapper parameters), then the result is either:
    * * Flattened and expanded into iteration, if iterable, but not a string
    * * Skipped from iteration, if nullish
    * * Inserted as-is, if not iterable and not nullish, or a string
    *
    * *Note:* To iterate the string characters, `string[Symbol.iterator]()` may be used\
    Similar to native
    {@linkplain https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator/flatMap
    iterator.flatMap()}
    method\
    * **Unit Tests:**
    * * {@linkplain Tests__Iterate.flatMap_mapperFunctions Using generator function}
    * * {@linkplain Tests__Iterate.flatMap_mapperParam Using mapper parameter}
    @param {...MapperParam} mappers  Mapper {@linkplain IterateMapperFunction callbacks} and/or
      {@linkplain MapperParam parameters} used in a sequence to transform the values of iteration.
      The result of last mapper function is flattened into the iteration
    @this {IterateContext}  Current context of pipeline
    @returns {Iterate}  {@linkcode Iterate this} for chaining
    @example
    const { Iterate } = require('@mystaff/iterate');
    
    Iterate.from([1, 2, 3]).flatMap(x => [x, x * 2]).toArray(); // [1, 2, 2, 4, 3, 6]
  */
  * flatMap(...mappers) {
    const func = Helpers.mapper(mappers);
    this.index = -1;
    for (const item of this) {
      this.value = item;
      const value = func.call(this, item, ++this.index, this, mappers);
      if (value != null) {
        if (value[Symbol.iterator] && typeof value !== 'string') {
          yield* value;
        } else {
          yield value;
        }
      }
    }
  }

  /**
    Creates a multi-dimensional cartesian product by combining each value from the current iteration
    with values from specified iterables.\
    * {@linkplain Tests__Iterate.dim_test Unit Test}
    @param {...(Iterable|function)} iterables  One or more iterables (or functions returning iterables)
      to combine with current iteration values. Each iterable is combined in sequence to create
      multi-dimensional arrays.
    @this {IterateContext}  Current context of pipeline
    @returns {Iterate}  {@linkcode Iterate this} for chaining, yielding arrays of combined values
  */
  * dim(...iterables) {
    for (const item of this) {
      yield* dimRecursion.call(this, [item], iterables);
    }
  }
}

module.exports = Iterate__mapping;
