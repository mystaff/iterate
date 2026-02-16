const Helpers = require('../helpers');
const Iterate__mapping = require('./mapping');

// VSCode IntelliSense hack
/* eslint-disable *//* c8 ignore start */ if (false) {
  const { Tests__Iterate } = require('./filtering.test');
  const Iterate = require('.');
  const { IterateContext } = require('.');
  const { PredicatorParam, PredicatorFunction } = require('../helpers/mapping');
  const Helpers__mapping = require('../helpers/mapping');
} /* c8 ignore stop *//* eslint-enable */

/**
  A mapping function. Used to somehow transform the value.
  Optionally can use additional arguments and context provided by the caller for such transformation.
  The result of final function in the mapping pipeline will be used as predicate (truthy or falsy)

  @callback IteratePredicatorFunction
  @param {*} value  Input value
  @param {number} index  Integer zero-based index of iteration item
  @param {IterateContext} context  Context of iteration pipeline method.
    May be used for additional configuration of the method flow
  @returns {*}  Mapped value
  @this {IterateContext}  Same as `context` argument
  @implements {MapperFunction}
*/

/**
  @class
  Sync iteration filtering methods of {@linkcode Iterate} class
  @hideconstructor
*/
class Iterate__filtering extends Iterate__mapping {
  /**
    Filtering values from iterate.
    Predicate is determined from last mapping function of specified `predicators`.\
    Similar to native
    {@linkplain https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator/filter
    iterator.filter()}
    method\
    * **Unit Tests:**
    * * {@linkplain Tests__Iterate.filter_predicatorFunctions Using predicator functions}
    * * {@linkplain Tests__Iterate.filter_predicatorParams Using predicator parameters}
    @param {...MapperParam} predicators  Predicator {@linkplain IteratePredicatorFunction callbacks} and/or
      {@linkplain PredicatorParam parameters} used in a sequence to transform the value, so that
      the result of last function determines the predicate of filtering.
    @this {IterateContext}  Current context of pipeline
    @returns {Iterate}  {@linkcode Iterate this} for chaining
    @example
    const { Iterate } = require('@mystaff/iterate');
    
    Iterate.from([1, 2, 3, 4, 5]).filter(x => x > 2).toArray(); // [3, 4, 5]
  */
  * filter(...predicators) {
    const func = Helpers.predicator(predicators);
    this.index = -1;
    for (const item of this) {
      this.value = item;
      if (func.call(this, item, ++this.index, this)) { yield item; }
    }
  }

  /**
    Drop (skip) values from the beginning of iteration.
    If a number is provided, drops that many items.
    If predicator(s) provided, drops items while predicate is truthy, then yields remaining items.\
    * **Unit Tests:**
    * * {@linkplain Tests__Iterate.drop_number Drop first N items}
    * * {@linkplain Tests__Iterate.drop_predicator Drop while predicate is truthy}
    @param {...(number|PredicatorParam)} predicators  Either:
    * * A single number -- drops that many items from the beginning
    * * Predicator {@linkplain IteratePredicatorFunction callbacks} and/or {@linkplain PredicatorParam parameters}
      -- drops items while predicate is truthy
    @this {IterateContext}  Current context of pipeline
    @returns {Iterate}  {@linkcode Iterate this} for chaining
  */
  * drop(...predicators) {
    if (predicators.length === 1 && typeof predicators[0] === 'number') {
      let n = predicators[0];
      for (const item of this) {
        if (n--) { continue; }
        yield item;
        yield* this;
      }
      return;
    }
    const func = Helpers.predicator(predicators);
    this.index = -1;
    for (const item of this) {
      this.value = item;
      if (func.call(this, item, ++this.index, this)) { continue; }
      yield item;
      yield* this;
      break;
    }
  }

  /**
    Take (yield) values from the beginning of iteration, then stop.
    If a number is provided, takes that many items.
    If predicator(s) provided, takes items while predicate is truthy, then stops.\
    Similar to native
    {@linkplain https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator/take
    iterator.take()}
    method\
    * **Unit Tests:**
    * * {@linkplain Tests__Iterate.take_number Take first N items}
    * * {@linkplain Tests__Iterate.take_predicator Take while predicate is truthy}
    @param {...(number|PredicatorParam)} predicators  Either:
    * * A single number -- takes that many items from the beginning
    * * Predicator {@linkplain IteratePredicatorFunction callbacks} and/or {@linkplain PredicatorParam parameters}
      -- takes items while predicate is truthy
    @this {IterateContext}  Current context of pipeline
    @returns {Iterate}  {@linkcode Iterate this} for chaining
    @example
    const { Iterate } = require('@mystaff/iterate');
    
    Iterate.from([1, 2, 3, 4, 5]).take(3).toArray(); // [1, 2, 3]
  */
  * take(...predicators) {
    if (predicators.length === 1 && typeof predicators[0] === 'number') {
      let n = predicators[0];
      for (const item of this) {
        if (n--) { yield item; } else { break; }
      }
      return;
    }
    const func = Helpers.predicator(predicators);
    this.index = -1;
    for (const item of this) {
      this.value = item;
      if (func.call(this, item, ++this.index, this)) {
        yield item;
      } else { break; }
    }
  }

  /**
    Tests whether all values in iteration satisfy the predicate.
    Returns `true` if all items pass the test, `false` otherwise.\
    Similar to native
    {@linkplain https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator/every
    iterator.every()}
    method\
    * {@linkplain Tests__Iterate.every_test Unit Test}
    @param {...PredicatorParam} predicators  Predicator {@linkplain IteratePredicatorFunction callbacks} and/or
      {@linkplain PredicatorParam parameters} used to test each value
    @this {IterateContext}  Current context of pipeline
    @returns {boolean}  `true` if all values satisfy the predicate, `false` otherwise
  */
  every(...predicators) {
    const func = Helpers.predicator(predicators);
    for (const item of this) {
      this.value = item;
      if (!func.call(this, item, ++this.index, this)) { return false; }
    }
    return true;
  }

  /**
    Tests whether at least one value in iteration satisfies the predicate.
    Returns `true` if any item passes the test, `false` otherwise.\
    Similar to native
    {@linkplain https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator/some
    iterator.some()}
    method\
    * {@linkplain Tests__Iterate.some_test Unit Test}
    @param {...PredicatorParam} predicators  Predicator {@linkplain IteratePredicatorFunction callbacks} and/or
      {@linkplain PredicatorParam parameters} used to test each value
    @this {IterateContext}  Current context of pipeline
    @returns {boolean}  `true` if any value satisfies the predicate, `false` otherwise
  */
  some(...predicators) {
    const func = Helpers.predicator(predicators);
    for (const item of this) {
      this.value = item;
      if (func.call(this, item, ++this.index, this)) { return true; }
    }
    return false;
  }

  /**
    Finds and returns the first value in iteration that satisfies the predicate.
    Returns `undefined` if no value satisfies the predicate.\
    Similar to native
    {@linkplain https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator/find
    iterator.find()}
    method\
    * {@linkplain Tests__Iterate.find_test Unit Test}
    @param {...PredicatorParam} predicators  Predicator {@linkplain IteratePredicatorFunction callbacks} and/or
      {@linkplain PredicatorParam parameters} used to test each value
    @this {IterateContext}  Current context of pipeline
    @returns {*}  The first value that satisfies the predicate, or `undefined` if none found
  */
  find(...predicators) {
    const func = Helpers.predicator(predicators);
    for (const item of this) {
      this.value = item;
      if (func.call(this, item, ++this.index, this)) { return item; }
    }
    return undefined;
  }
}

module.exports = Iterate__filtering;
