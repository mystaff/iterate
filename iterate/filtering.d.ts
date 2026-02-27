export = Iterate__filtering;
/**
  A mapping function. Used to somehow transform the value.
  Optionally can use additional arguments and context provided by the caller for such transformation.
  The result of final function in the mapping pipeline will be used as predicate (truthy or falsy)

  @callback IteratePredicatorFunction
  @param {*} value  Input value
  @param {number} index  Integer zero-based index of iteration item
  @param {IterateContext} context  Context of iteration pipeline method.
    May be used for additional configuration of the method flow
  @param {MappingPipeline} predicators  Predicator functions used to transform
    or test (last predicator) the value.
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
declare class Iterate__filtering extends Iterate__mapping {
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
    filter(this: Iterate, ...predicators: MapperParam[]): Iterate;
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
    drop(this: Iterate, ...predicators: (number | PredicatorParam)[]): Iterate;
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
    take(this: Iterate, ...predicators: (number | PredicatorParam)[]): Iterate;
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
    every(this: Iterate, ...predicators: PredicatorParam[]): boolean;
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
    some(this: Iterate, ...predicators: PredicatorParam[]): boolean;
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
    find(this: Iterate, ...predicators: PredicatorParam[]): any;
}
declare namespace Iterate__filtering {
    export { IteratePredicatorFunction };
}
import Iterate__mapping = require("./mapping");
import Iterate = require(".");
import { PredicatorParam } from "../helpers/mapping";
/**
 * A mapping function. Used to somehow transform the value.
 * Optionally can use additional arguments and context provided by the caller for such transformation.
 * The result of final function in the mapping pipeline will be used as predicate (truthy or falsy)
 */
type IteratePredicatorFunction = (value: any, index: number, context: Iterate.IterateContext, predicators: MappingPipeline) => any;
import { MappingPipeline } from "../helpers/mapping";
