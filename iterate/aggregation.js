const Iterate__generation = require('./generation');

// VSCode IntelliSense hack
/* eslint-disable *//* c8 ignore start */ if (false) {
  const { Tests__Iterate } = require('./aggregation.test');
  const Iterate = require('.');
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
  */
  toArray(array) {
    if (array) {
      for (const item of this) { array.push(item); }
      return array;
    }
    return Array.from(this);
  }
}

module.exports = Iterate__aggregation;
