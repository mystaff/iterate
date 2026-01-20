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
  */
  * filter(...predicators) {
    const func = Helpers.predicator(predicators);
    this.index = -1;
    for (const item of this) {
      this.value = item;
      if (func.call(this, item, ++this.index, this)) { yield item; }
    }
  }
}

module.exports = Iterate__filtering;
