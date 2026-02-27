export = Iterate;
declare const Iterate_base: {
    new (): {
        /**
          Iterator, used by a generator function.
          * * For a pipeline: last iterator of the pipeline:
          After calling every subsequent pipeline generator method (which uses this property as a source of items),
          this property is set to it's resulting {@linkcode Iterator}.
          Thus the next transformation generator method (or final aggregation method) can operate
          on the items of each previous transformation generator in a chain.\
          * * For a context: previous iterator of the context:
          An iterator, used in current generator context. When constructing a chain, this will be copied from
          the last iterator of the pipeline.
          @memberof Iterate#
          @type {Iterator}
          @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator
        */ iterator: Iterator;
        /**
          Generator, produced by a generator function of current {@linkplain IterateContext context}.
          This is set after calling {@linkcode Iterate#unlink .unlink()} method, so unlinked context
          may be restored in the chain by calling {@linkcode Iterate#insert .insert()}
        */ currentIterator: any;
        /**
          * * For a pipeline: last context of the pipeline;
          * * For a context: previous context (if `iterator` is of a transformation chain).
          *
          * **Unit Tests:**
          * * {@linkplain Tests__Iterate.context_addLinkBefore
          *     Insert a chain link in the middle of the pipeline before a context}
          *
          @memberof Iterate#
          @type {Iterate}
        */ context: Iterate;
        /** In a context, specifies the subsequent (chain) context, if it's not the last.
          @memberof Iterate#
          @type {Iterate}
          @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator
        */ chain: Iterate;
        /**
          Defined for {@linkplain IterateContext context} only. Backlinks to the originating pipeline.
          @memberof Iterate#
          @type {Iterate}
          @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator
        */ pipeline: Iterate;
        filter(this: Iterate, ...predicators: MapperParam[]): Iterate;
        index: number;
        value: any;
        drop(this: Iterate, ...predicators: (number | import("../helpers/mapping").PredicatorParam)[]): Iterate;
        take(this: Iterate, ...predicators: (number | import("../helpers/mapping").PredicatorParam)[]): Iterate;
        every(this: Iterate, ...predicators: import("../helpers/mapping").PredicatorParam[]): boolean;
        some(this: Iterate, ...predicators: import("../helpers/mapping").PredicatorParam[]): boolean;
        find(this: Iterate, ...predicators: import("../helpers/mapping").PredicatorParam[]): any;
        flat(this: Iterate, depth?: number): Iterate;
        map(this: Iterate, ...mappers: import("../helpers/mapping").MapperParam[]): Iterate;
        flatMap(this: Iterate, ...mappers: import("../helpers/mapping").MapperParam[]): Iterate;
        dim(this: Iterate, ...iterables: (globalThis.Iterable<any> | Function)[]): Iterate;
        exec(this: Iterate): undefined;
        toArray(this: Iterate, array?: any[]): Array<any>;
        toObject(this: Iterate, object?: any[]): Array<any>;
        each(this: Iterate, ...mappers: import("../helpers/mapping").MapperParam[]): Iterate;
        forEach(this: Iterate, ...mappers: import("../helpers/mapping").MapperParam[]): number;
        count(this: Iterate): number;
        reduce(this: Iterate, reducer?: Function, initialValue?: any): any;
        prepend(...params: any[]): Generator<any, void, any>;
        append(...params: any[]): Generator<any, void, any>;
    };
    empty(): Iterate;
    from(param: any, ...args?: any[]): Iterate;
    concat(...params: any[]): Iterate;
    objectKeys(object: any): Iterate;
    objectValues(object: any): Iterate;
    objectEntries(object: any): Iterate;
    range(start?: number, end: number, step?: number): Iterate;
};
/**
  @typedef {object} IterateBase
  @ignore
*/
/**
  Native `IteratorResult` interface
  @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#the_iterator_protocol
  @typedef {object} IteratorResult
  @property {*} value  Any JavaScript value returned by the iterator. Can be omitted when done is `true`.
  @property {boolean} done  A boolean that's `false` if the iterator was able to produce the next value in the sequence.
*/
/**
  `.next()` function of iterator protocol.
  @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#the_iterator_protocol
  @callback IteratorNextFunction
  @param {*} [value]  Optional input value to return from `yield` statement if called for a generator
  @returns {IteratorResult}  Next value of iteration
  @this {Iterator}  Context of current iterator
*/
/**
  `.throw()` function of iterator protocol.
  @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#the_iterator_protocol
  @callback IteratorThrowFunction
  @param {Error} error  An error, to inform the iterator about
  @returns {IteratorResult}  Mapped value
  @this {Iterator}  Context of current iterator
*/
/**
  `.return()` function of iterator protocol.
  @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#the_iterator_protocol
  @callback IteratorReturnFunction
  @param {*} [value]  Optional input value, which is typically returned with result near `done: true`
  @returns {IteratorResult}  Mapped value
  @this {Iterator}  Context of current iterator
*/
/**
  An object, implementing the iterator protocol.
  Has {@linkcode IteratorNextFunction .next()}, and optionally {@linkcode IteratorThrowFunction .throw()}
  and {@linkcode IteratorReturnFunction .return()} methods defined.
  @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#the_iterator_protocol
  @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator
  @typedef {object} Iterator
  @property {IteratorNextFunction} next  Function which is called to get each next value of iterator
  @property {IteratorThrowFunction} [throw]  Function which is called to tell the iterator about error state
  @property {IteratorReturnFunction} [return]  Function which is called to close the iterator
*/
/**
  An object, implementing the iterable protocol.
  Has `[Symbol.iterator]()` method, which return {@linkcode Iterator} object. This object is either:
  * * New object on every call -- typically means reproducible iterable, such as for collection structures
  (`Array`, `Map`, `Set` etc.).
  * * The same object on every call -- typically for not reproducible iterable, which may be iterated only once.
  * * The iterator itself -- same as previous; this is called `iterable iterator` and is used
  to allow using iterator in constructs, which accept iterables. This is typically the objects, produced by
  collections' iterables.
  (either the same, or different, or equal to original Iterable object).
  @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#the_iterable_protocol
  @typedef {object} Iterable
*/
/**
  An object, implementing the iterable protocol.
  Has `[Symbol.iterator]()` method, which must produce different {@linkcode Iterator} objects each time called.
  @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#the_iterable_protocol
  @typedef {object} MultiIterable
*/
/**
  @implements {Iterable}
  @implements {Iterator}
  @class

  * **Sync** iteration pipeline.

  ---

  * *Sync iteration* means that the whole pipeline is processed in a single tick.

  For multi-tick time-durable or event-driven iteration, please use {@linkcode AsyncIterate} class.

  Iteration pipeline **flow**:

  - ***generation head*** &rarr; ***transformation chain***... &rarr; ***aggregation tail***

  ---

  This class contains structure and methods for working with the pipeline and context chains.

  Other methods of this class are distributed within the following **sections**:

  * * Generation:
  &mdash; {@linkplain Iterate__generation **generation**} &ndash; static methods for pipeline generation head;

  * * Transformation and pre-aggregation:
  &mdash; {@linkplain Iterate__mapping **mapping**} &ndash; transformation chain methods for item mapping;

  * * Transformation and pre-aggregation:
  &mdash; {@linkplain Iterate__filtering **filtering**} &ndash; transformation chain methods for item filtering;

  * * Aggregation:
  &mdash; {@linkplain Iterate__aggregation **aggregation**} &ndash; aggregation tail methods.

  ---

  * **Example:**

  * * classic chain (similar to *lodash*, *ramda*, *joi* etc.):
  ```js
  const { _, Iterate } = require('@mystaff/iterate');
  ...
  const result =
    Iterate.from([-1, 0, 1, 2, 3]) // generation head
      .filter(_.gt(0)).map(_.add(1)) // transformation chain
      .reduce(_.multiply); // aggregation tail
  ```

  * * splitted chain:
  ```js
  const { _, Iterate } = require('@mystaff/iterate');
  ...
  const resultIterate = Iterate.from([-1, 0, 1, 2, 3]); // generation head
  resultIterate.filter(_.gt(0)).map(_.add(1)); // transformation chain
  const result = resultIterate.reduce(_.multiply); // aggregation tail
  ```
  or:
  ```js
  const { _, Iterate } = require('@mystaff/iterate');
  ...
  // generation head and part of trasnformation chain
  const resultIterate = Iterate.from([-1, 0, 1, 2, 3]).filter(_.gt(0));

  // part of trasnformation chain and aggregation tail
  const result = resultIterate.map(_.add(1)).reduce(_.multiply);
  ```

  * *(all the examples above do the same)*\
  * **Calculates:** `(1 + 1) * (2 + 1) * (3 + 1)`

  All transformation generator methods in this class are wrapped in a way
  that their resulting {@linkcode Iterator} objects are set to {@linkcode Iterate#iterator .iterator} property,
  and they return {@linkcode Iterate} context, allowing chaining the methods.

  All instance generator methods use their own contexts containing {@linkcode Iterate#iterator .iterator} property
  from previous generation and thus the chain may be dynamically manipulated both on build and execution states.

  The generator methods may be chained or broken down within the multiple statements.

  It can be useful if you want to conditionally add some method to the chain.
  @example
  // Count how many object items have values longer than 1 character
  const longValuesCount = Iterate.values({ a: 1, b: 11 }).map(String, 'length').filter(gt(1)).count();
  @example
  // Thw above can be broken down to:
  const longValues = Iterate.values({ a: 1, b: 11 });
  longValues.map(String, 'length');
  longValues.filter(gt(1));
  const longValuesCount = longValues.count();
*/
declare class Iterate extends Iterate_base implements Iterable, Iterator {
    /**
      A Constructor.
      * **Recommended not to invoke directly!**
      Use {@linkcode Iterate__generation.from Iterate.from()}
      (or other) static generation method from {@linkcode Iterate__generation **generation**} section instead.
      @constructor
      @param {Iterator|function} [iteratorOrFunction]  When specified, either:
      * * Iterator object to set as current.
      * * Function to call in a context of current `Iterate` object, returning iterator,
        which to set as current iterator of the pipeline. Typically is a generator function.
  
      Default: empty iterator
      @param {...any} [args]  When generator function is used as 1st parameter: these arguments will be passed to it
    */
    constructor(iterator: any, ...args?: any[]);
    generatorFn: any;
    /**
      Implementation of iterator protocol {@linkcode IteratorNextFunction .next()} method.
      @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#the_iterator_protocol
      @param {*} [value]  A value, `sent` to iterator processor.
      @returns {IteratorResult}
    */
    next(value?: any): IteratorResult;
    /**
      Implementation of iterator protocol {@linkcode IteratorNextFunction .return()} method.\
      * {@linkcode Tests__Iterate.throw_test Unit Test}
      @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#the_iterator_protocol
      @param {Error} [error]  An error, to inform the iterator processor about.
      @returns {IteratorResult}
    */
    throw(error?: Error): IteratorResult;
    /**
      Implementation of iterator protocol {@linkcode IteratorNextFunction .return()} method.\
      * {@linkcode Tests__Iterate.return_test Unit Test}
      @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#the_iterator_protocol
      @param {*} [value]  A value, `sent` to iterator processor.
      @returns {IteratorResult}
    */
    return(value?: any): IteratorResult;
    /** Get initial context (link in chain, which is next to generation) from pipeline or specified context.\
      * {@linkcode Tests__Iterate.getInitialContext_test Unit Test}
      @this {IterateContext}  Pipeline or base context
    */
    getInitialContext(this: Iterate): Iterate;
    /**
      Append external link(s) into current pipeline, or insert them after specified context of current pipeline.\
      Method may be called either for:
      * * {@linkplain Iterate Pipeline}: to append `external` to it
      * * {@linkplain IterateContext Context}: to insert `external` before it
      *
      * **Unit Tests:**
      * * {@linkplain Tests__Iterate.insert_append Append all chain links of a pipeline to a pipeline}
      * * {@linkplain Tests__Iterate.insert_appendEmpty Nothing to append from empty pipeline}
      * * {@linkplain Tests__Iterate.insert_before Insert all chain links of a pipeline before a context
      before some context of current pipeline}
      * * {@linkplain Tests__Iterate.insert_contextBefore Append single unlinked context to a pipeline}
      @param {IteratePipelineOrContext} external  Either:
      * * An external pipeline to move its whole chain into current. External pipeline will lose its generation head.
      Iteration of external pipeline will behave as if the generation head was replaced with part of current pipeline
      before the place it was inserted
      * * A single, previously unlinked context to link into current
      @this {IteratePipelineOrContext}
    */
    insert(this: Iterate, external: IteratePipelineOrContext): void;
    /**
      Unlink the chain operator specified by its context. Has no effect for a pipeline\
      * **Unit Tests:**
      * * {@linkplain Tests__Iterate.unlink_last Last link in transformation chain}
      * * {@linkplain Tests__Iterate.unlink_notLast Other than last link in transformation chain}
      @this {IterateContext}  Context of chain operator
    */
    unlink(this: Iterate): void;
    /**
      A `[Symbol.iterator]()` method. Used to get underlying iterator to be used in `for...of` etc.
      @method @@iterator
      @memberof Iterate#
      @returns {Iterator}  Returns self context/pipeline, as it's compliant with iterator protocol.
      @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#the_iterable_protocol
    */
    [Symbol.iterator](): Iterator;
}
declare namespace Iterate {
    export { IterateBase, IteratorResult, IteratorNextFunction, IteratorThrowFunction, IteratorReturnFunction, Iterator, Iterable, MultiIterable, IterateContext, IteratePipelineOrContext, IterateMapperFunction };
}
type IterateBase = object;
/**
 * Native `IteratorResult` interface
 */
type IteratorResult = {
    /**
     * Any JavaScript value returned by the iterator. Can be omitted when done is `true`.
     */
    value: any;
    /**
     * A boolean that's `false` if the iterator was able to produce the next value in the sequence.
     */
    done: boolean;
};
/**
 * `.next()` function of iterator protocol.
 */
type IteratorNextFunction = (value?: any) => IteratorResult;
/**
 * `.throw()` function of iterator protocol.
 */
type IteratorThrowFunction = (error: Error) => IteratorResult;
/**
 * `.return()` function of iterator protocol.
 */
type IteratorReturnFunction = (value?: any) => IteratorResult;
/**
 * An object, implementing the iterator protocol.
 * Has {@linkcode IteratorNextFunction.next ()}, and optionally {@linkcode IteratorThrowFunction.throw ()}
 * and {@linkcode IteratorReturnFunction.return ()} methods defined.
 */
type Iterator = {
    /**
     * Function which is called to get each next value of iterator
     */
    next: IteratorNextFunction;
    /**
     * Function which is called to tell the iterator about error state
     */
    throw?: IteratorThrowFunction;
    /**
     * Function which is called to close the iterator
     */
    return?: IteratorReturnFunction;
};
/**
 * An object, implementing the iterable protocol.
 * Has `[Symbol.iterator]()` method, which return {@linkcode Iterator} object. This object is either:
 *  * New object on every call -- typically means reproducible iterable, such as for collection structures
 * (`Array`, `Map`, `Set` etc.).
 *  * The same object on every call -- typically for not reproducible iterable, which may be iterated only once.
 *  * The iterator itself -- same as previous; this is called `iterable iterator` and is used
 * to allow using iterator in constructs, which accept iterables. This is typically the objects, produced by
 * collections' iterables.
 * (either the same, or different, or equal to original Iterable object).
 */
type Iterable = object;
/**
 * An object, implementing the iterable protocol.
 * Has `[Symbol.iterator]()` method, which must produce different {@linkcode Iterator} objects each time called.
 */
type MultiIterable = object;
/**
 * Iterate chain context. Has {@linkcode Iterate#pipeline pipeline} set to parent {@linkcode Iterate} instance.
 * Last context has {@linkcode Iterate#chain chain} nullish, others have it defined to subsequent `IterateContext`.
 */
type IterateContext = Iterate;
/**
 * Iteration pipeline or a context of one of its chain methods
 */
type IteratePipelineOrContext = Iterate | IterateContext;
/**
 * A mapping function. Used to somehow transform the value.
 * Optionally can use additional arguments and context provided by the caller for such transformation
 */
type IterateMapperFunction = (value: any, index: number, context: IterateContext, predicators: MappingPipeline) => any;
import { MappingPipeline } from "../helpers/mapping";
