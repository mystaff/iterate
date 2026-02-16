/**
 * An iterator for the Window class that efficiently iterates over the circular buffer
 * in insertion order. This iterator maintains state to track its position and can be
 * reused or reset as needed.
 * 
 * @class WindowIterator
 * @implements {Iterator}
 * @example
 * const w = new Window(3);
 * w.push(1);
 * w.push(2);
 * const iter = w[Symbol.iterator]();
 * iter.next(); // { value: 1, done: false }
 * iter.next(); // { value: 2, done: false }
 * iter.next(); // { value: undefined, done: false }
 * iter.next(); // { done: true }
 */
class WindowIterator {
  /**
   * Reference to the parent Window instance
   * @type {Window}
   */
  window;

  /**
   * The underlying array iterator for the buffer
   * @type {Iterator}
   */
  iterator;

  /**
   * Current position in the iteration. -1 indicates the iterator is inactive/finished
   * @type {number}
   */
  index = -1;

  /**
   * Creates a new WindowIterator for the given window
   * @param {Window} window - The Window instance to iterate over
   */
  constructor(window) {
    this.window = window;
    if (window.buffer) { this.ffwd(); }
  }

  /**
   * Resets the internal iterator to the beginning of the buffer
   * @private
   */
  resetIterator() {
    this.iterator = this.window.buffer.values();
  }

  /**
   * Advances the iterator by one position and returns the value.
   * Wraps around to the beginning if the end of the buffer is reached.
   * @returns {*} The next value in the iteration
   * @private
   */
  shift() {
    let { value, done } = this.iterator.next();
    if (done) {
      this.resetIterator();
      ({ value, done } = this.iterator.next());
    }
    return value;
  }

  /**
   * Fast-forwards the iterator to the current window index position.
   * This synchronizes the iterator with the window's current state.
   * @private
   */
  ffwd() {
    let { index } = this.window;
    let done = false;
    this.resetIterator();
    this.activate();
    while (!done && index--) {
      ({ done } = this.iterator.next());
    }
  }

  /**
   * Activates the iterator by setting its index to the window's current index
   */
  activate() {
    this.index = this.window.index;
  }

  /**
   * Marks the iterator as finished by setting index to -1
   */
  finish() {
    this.index = -1;
  }

  /**
   * Returns the next value in the iteration sequence.
   * Implements the Iterator protocol's next() method.
   * @returns {{value: *, done: boolean}} An iterator result object
   */
  next() {
    if (this.index < 0) { return { done: true }; }
    let { value, done } = this.iterator.next();
    if (done) {
      this.resetIterator();
      this.index = 1;
      ({ value, done } = this.iterator.next());
    } else if (++this.index >= this.window.buffer.length) {
      this.index = 0;
    }
    if (this.index === this.window.index) { this.finish(); }
    return { value, done };
  }

  /**
   * Terminates the iterator early and returns the given value.
   * Implements the Iterator protocol's return() method.
   * @param {*} value - The value to return
   * @returns {{value: *, done: boolean}} An iterator result object with done: true
   */
  return(value) {
    this.index = -1;
    return { value, done: true };
  }

  /**
   * Terminates the iterator due to an error condition.
   * Implements the Iterator protocol's throw() method.
   * @returns {{done: boolean}} An iterator result object with done: true
   */
  throw() {
    this.index = -1;
    return { done: true };
  }

  /**
   * Returns this iterator instance (makes the iterator iterable)
   * @returns {WindowIterator} This iterator instance
   */
  [Symbol.iterator]() { return this; }
}

module.exports = WindowIterator;
