if (0) { const Iterate = require('.'); } // eslint-disable-line

/** @ignore */
function IterateBase() { }
IterateBase.prototype = Object.create(null);

/**
  @class
  Creation static methods for {@link Iterate} class.
  @hideconstructor
*/
class Iterate__creation extends IterateBase {
  /**
    Create {@link Iterate} from empty iterator.
    @returns {Iterate}
    @method
  */
  static* empty() {
    // Empty generator
  }

  /**
    Create {@link Iterate} instance from existing iterable (which can also be other {@link Iterate} instance).
    @param {Iterable} iterable  Iterator to set as current
    @returns {Iterate}
    @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#the_iterable_protocol
  */
  static* from(iterator) { yield* iterator; }

  /** Create {@link Iterate} for object keys
    @param {Object} object  An object, which keys to iterate through
    @yields {string}  Each key from `object`
    @returns {Iterate}
  */
  static* objectKeys(object) {
    for (const key in object) {
      yield key;
    }
  }

  /** Create {@link Iterate} for object values
    @param {Object} object  An object, which values to iterate through
    @yields {any}  Each value from `object`
    @returns {Iterate}
  */
  static* objectValues(object) {
    for (const key in object) {
      yield object[key];
    }
  }

  /**
    An array (tuple), representing the key-value pair: `[key: string, value: any]`
    Identical to inner arrays, returned from `Object.entries()`.
    @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries#return_value
    @typedef {Array} KeyValue
  */

  /** Create {@link Iterate} for object entries
    @param {Object} object  An object, which entries to iterate through
    @yields {KeyValue}  Each entry from `object` as `[key, value]`
    @returns {Iterate}
  */
  static* objectEntries(object) {
    for (const key in object) {
      yield [key, object[key]];
    }
  }

  static* range() {
    // e
  }
}

Object.setPrototypeOf(Iterate__creation, Function.prototype);

module.exports = Iterate__creation;
