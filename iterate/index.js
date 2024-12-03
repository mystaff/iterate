const Helpers = require('../helpers');

const IterateMapping = require('./mapping');

/**
  @class
  * **The Unit Tests**
  This section contains the **unit tests** for the properties/methods from all sections of {@linkplain Iterate} chapter.
  To show the **source code** of specific unit test, please click `line` number at the right side of the item.
  @hideconstructor
*/
const Tests__Iterate = class Tests__Iterate {} // eslint-disable-line

const IterateBase = class IterateBase extends IterateMapping {
  /** Current iterator of the pipeline.
    After calling every subsequent pipeline generator method (which uses this property as a source of items),
    this property is set to it's resulting {@link Iterator}.
    Thus the next transformation generator method (or final aggregation method) can operate
    on the items of each previous transformation generator in a chain.
    @memberof Iterate#
    @type {Iterator}
    @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator
  */ iterator;
};

/**
  @typedef {object} IterateBase
  @ignore
*/

/**
  An object, implementing the iterator protocol.
  Has `.next()` and optionally `.throw()` and `.return()` methods defined.
  @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#the_iterator_protocol
  @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator
  @typedef {object} Iterator
*/

/**
  An object, implementing the iterable protocol.
  Has `[Symbol.iterator]()` method, which can produce any {@link Iterator}
  (no matter: always the same, each time different, or equal to original Iterable object).
  @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#the_iterable_protocol
  @typedef {object} Iterable
*/

/**
  An object, implementing the iterable protocol.
  Has `[Symbol.iterator]()` method, which must produce different {@link Iterator} objects each time called.
  @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#the_iterable_protocol
  @typedef {object} MultiIterable
*/

/**
  @class
  * **Sync** iteration pipeline.

  The methods of this class are distributed within the following **sections**:

  &mdash; {@linkplain Iterate__creation **creation**} &ndash; static methods for pipeline creation;

  &mdash; {@linkplain Iterate__mapping **mapping**} &ndash; transformation generator methods for item mapping;

  ---

  * *Sync iteration* means that the whole pipeline is processed in a single tick.

  For multi-tick time-durable or event-driven iteration, please use {@link AsyncIterate} class.

  Iteration pipeline **flow**:

  - ***creation*** &rarr; ***transformations***... &rarr; ***aggregation***

  ---

  * **Example:**

  ```
  _.Iterate.from([-1, 0, 1, 2, 3]) .filter(_.gt(0)).map(_.add(1)) .reduce(_.multiply)
                  -- creation --        -- transformations --      -- aggregation --
  ```

  * **Calculates:** `(1 + 1) * (2 + 1) * (3 + 1)`

  All transformation generator methods in this class are wrapped in a way
  that their resulting {@link Iterator} objects are set to {@link Iterate#iterator .iterator} property,
  and they return the {@link Iterate} context, allowing chaining the methods.

  All instance generator methods use {@link Iterate#iterator .iterator} property
  to get a sequence of items from previous generation.

  This allows chaining the methods as much as breaking down the chain.

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
class Iterate extends IterateBase {
  /** A Constructor.
    * **Recommended not to invoke directly!**
    Use {@linkcode Iterate__creation.from Iterate.from()}
    (or other) static creation method from {@linkcode Iterate__creation **creation**} section instead.

    @constructor
    @param {Iterator} [iterator]  If specified, iterator object to set as current. Default: empty iterator
  */
  constructor(iterator) {
    super();
    if (iterator != null) { this.iterator = iterator; }
  }

  /** A `[Symbol.iterator]()` method. Used to get underlying iterator to be used in `for...of` etc.
    @method @@iterator
    @memberof Iterate#
    @returns {Iterator}  Returns current iterator of the pipeline or of the context
    @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#the_iterable_protocol
  */
  [Symbol.iterator]() {
    return this;
  }

  next(value) { return this.iterator.next(value); }

  throw(value) { return this.iterator.throw(value); }

  return(value) { return this.iterator.return(value); }
}

// optimize `Iterate` class for performance and usability
Helpers.flattenObjectPrototypes(Iterate.prototype);
Helpers.flattenObjectPrototypes(Iterate, class { });
Helpers.wrapMethods(Iterate.prototype, new Set([Helpers.GeneratorFunction]), Helpers.chainGeneratorFunctionWrapper);
Helpers.wrapMethods(Iterate, new Set([Helpers.GeneratorFunction]), Helpers.creationGeneratorFunctionWrapper, Iterate);

Iterate.prototype.iterator = Helpers.voidIterator;

module.exports = Iterate;
