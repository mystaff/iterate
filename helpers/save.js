// VSCode IntelliSense hack
/* eslint-disable *//* c8 ignore start */ if (false) {
  const { Tests__Helpers } = require('./async.test');
} /* c8 ignore stop *//* eslint-enable */

/**
  @class
  Functional helpers for **saving** values to data structures.
  @hideconstructor
*/
const Helpers__save = {
  /**
    Add to object. Returns {@linkcode TransparentMappingFunction} `function(value)` returning `value`\
    * {@linkplain Tests__Helpers.addToObject_test Unit Test}
    @async
    @param {object} object  Object to add the `value` to
    @returns {TransparentMappingFunction}  `function(value)` returning `value`
  */
  addToObject: (object) => (entry) => {
    const [key, value] = entry;
    object[key] = value;
    return entry;
  },
};

module.exports = Helpers__save;
