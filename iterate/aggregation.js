const Iterate__generation = require('./generation');
const Helpers = require('../helpers');

// VSCode IntelliSense hack
/* eslint-disable *//* c8 ignore start */ if (false) {
  const { Tests__Iterate } = require('./aggregation.test');
  const Iterate = require('.');
  const { IterateContext, IterateMapperFunction } = require('.');
  const { MapperParam, MapperFunction } = require('../helpers/mapping');
} /* c8 ignore stop *//* eslint-enable */

/**
  @class
  Aggregation and execution methods of {@linkcode Iterate} class
  @hideconstructor
*/
class Iterate__aggregation extends Iterate__generation {
  /**
    Execute the iteration pipeline\
    * {@linkplain Tests__Iterate.exec_test Unit Test}
    @this {Iterate}  Pipeline
    @returns {undefined}  Doesn't return a result
  */
  exec() {
    for (const item of this) { } // eslint-disable-line
  }

  /**
    Collect iteration results to new or existing array\
    * **Unit Tests:**
    * * {@linkplain Tests__Iterate.toArray_new Create new array}
    * * {@linkplain Tests__Iterate.toArray_existing Push to existing array}
    @param {Array} [array]  If specified, the results will be pushed to this array
    @this {Iterate}  Pipeline
    @returns {Array.<*>}  Array with iterated results
    @example
    const { Iterate } = require('@mystaff/iterate');
    
    const iter = new Iterate(Iterate.from([1, 2, 3]));
    iter.map(x => x * 2).toArray(); // [2, 4, 6]
  */
  toArray(array) {
    if (array) {
      for (const item of this) { array.push(item); }
      return array;
    }
    return Array.from(this);
  }

  /**
    Collect iteration results to new or existing object\
    * **Unit Tests:**
    * * {@linkplain Tests__Iterate.toObject_new Create new object}
    * * {@linkplain Tests__Iterate.toObject_existing Push to existing object}
    @param {Array} [object]  If specified, the entries will be added to this object
    @this {Iterate}  Pipeline
    @returns {Array.<*>}  Object with iterated entries
  */
  toObject(object) {
    if (object) {
      for (const [key, value] of this) { object[key] = value; }
      return object;
    }
    return Object.fromEntries(this);
  }

  /**
    Execute mapper parameters/functions for each value.
    Each value of iteration is transformed by one or more specified `mappers`, yet the result is ignored,
    so the next chain method gets the original value.\
    This is useful to call the functions for each value without modifying them.\
    * {@linkplain Tests__Iterate.each_test Unit Test}
    @param {...MapperParam} mappers  Mapper {@linkplain IterateMapperFunction callbacks} and/or
      {@linkplain MapperParam parameters} used in a sequence to transform the values of iteration.
    @this {IterateContext}  Current context of pipeline
    @returns {Iterate}  {@linkcode Iterate this} for chaining
  */
  * each(...mappers) {
    const mapper = Helpers.mapper(mappers);
    this.index = -1;
    for (const item of this) {
      this.value = item;
      mapper.call(this, item, ++this.index, this);
      yield item;
    }
  }

  /**
    Execute mapper parameters/functions for each value.
    Each value of iteration is transformed by one or more specified `mappers`.\
    * {@linkplain Tests__Iterate.forEach_test Unit Test}
    @param {...MapperParam} mappers  Mapper {@linkplain IterateMapperFunction callbacks} and/or
      {@linkplain MapperParam parameters} used in a sequence to transform the values of iteration.
    @this {Iterate}  Current pipeline
    @returns {number}  Number of iterated values
  */
  forEach(...mappers) {
    const mapper = Helpers.mapper(mappers);
    this.index = -1;
    for (const item of this) {
      this.value = item;
      mapper.call(this, item, ++this.index, this);
    }
    return this.index + 1;
  }

  /**
    Count number of iterated values.\
    * {@linkplain Tests__Iterate.count_test Unit Test}
    @this {Iterate}  Current pipeline
    @returns {number}  Number of iterated values
  */
  count() {
    let count = 0;
    for (const item of this) { ++count; } // eslint-disable-line
    return count;
  }

  /**
    Reduces iteration to a single value by applying a reducer function to each item.
    If no initial value is provided, uses the first item as initial value.\
    Similar to native
    {@linkplain https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator/reduce
    iterator.reduce()}
    method\
    * **Unit Tests:**
    * * {@linkplain Tests__Iterate.reduce_withReducer With reducer function}
    * * {@linkplain Tests__Iterate.reduce_withInitial With initial value}
    * * {@linkplain Tests__Iterate.reduce_sum Sum without reducer (default addition)}
    @param {function} [reducer]  Reducer function `(accumulator, currentValue, index) => newAccumulator`.
      If not provided, uses addition operator (`+`) to sum values.
    @param {*} [initialValue]  Initial value for the accumulator.
      If not provided, uses the first item from iteration.
    @this {Iterate}  Current pipeline
    @returns {*}  The final accumulated value
    @example
    const { Iterate } = require('@mystaff/iterate');
    
    const iter = new Iterate(Iterate.from([1, 2, 3, 4]));
    iter.reduce((acc, val) => acc + val, 0); // 10
  */
  reduce(reducer, initialValue) {
    if (initialValue === undefined) {
      this.index = 0;
      initialValue = this.next().value;
    } else {
      this.index = -1;
    }
    if (reducer) {
      for (const item of this) {
        initialValue = reducer(initialValue, item, ++this.index);
      }
    } else {
      for (const item of this) {
        initialValue += item;
      }
    }
    return initialValue;
  }
}

module.exports = Iterate__aggregation;
