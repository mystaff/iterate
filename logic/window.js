const WindowIterator = require('./window-iterator');

/**
 * A circular buffer window that maintains a fixed-size buffer with efficient iteration.
 * The window uses a circular buffer pattern where new values overwrite the oldest values
 * when the buffer is full. It provides optimized iteration strategies based on the current
 * state of the iterator.
 *
 * @class Window
 * @example
 * const w = new Window(3);
 * w.push(1); // [1, undefined, undefined]
 * w.push(2); // [1, 2, undefined]
 * w.push(3); // [1, 2, 3]
 * w.push(4); // [4, 2, 3] - wraps around
 * Array.from(w); // [2, 3, 4] - iterates in insertion order
 */
class Window {
  /**
   * The internal circular buffer array
   * @type {Array}
   */
  buffer;

  /**
   * The primary iterator instance for this window
   * @type {WindowIterator}
   */
  iterator = new WindowIterator(this);

  /**
   * The current write position in the circular buffer
   * @type {number}
   */
  index = 0;

  /**
   * Creates a new Window with the specified size
   * @param {number} size - The fixed size of the circular buffer
   */
  constructor(size) {
    this.buffer = Array(size);
    this.iterator.resetIterator();
  }

  /**
   * Fills the entire buffer with the specified value
   * @param {*} value - The value to fill the buffer with
   * @returns {Window} This window instance for chaining
   */
  fill(value) {
    this.buffer.fill(value);
    return this;
  }

  /**
   * Pushes a new value into the window at the current index position.
   * When the buffer is full, this overwrites the oldest value (circular behavior).
   * @param {*} value - The value to push into the window
   * @returns {number} The buffer length plus 1 (for compatibility)
   */
  push(value) {
    this.buffer[this.index++] = value;
    if (this.iterator.index < 0) { this.iterator.shift(); }
    if (this.index >= this.buffer.length) { this.index = 0; }
    return this.buffer.length + 1;
  }

  /**
   * Returns the value at the current index position (the oldest value in the window)
   * @returns {*} The value at the current index position
   */
  shift() {
    return this.buffer[this.index];
  }

  /**
   * A fallback generator that yields values in insertion order.
   * This is used when the optimal iterator is not available.
   * @generator
   * @yields {*} Values from the buffer in insertion order
   * @private
   */
  * getSlowIterator() {
    for (let i = this.index; i < this.buffer.length; ++i) { yield this.buffer[i]; }
    for (let i = 0; i < this.index; ++i) { yield this.buffer[i]; }
  }

  /**
   * Returns an iterator for the window. The implementation chooses between:
   * - The primary iterator (if available and not in use)
   * - A new WindowIterator instance (if the primary iterator is in early iteration)
   * - A slow generator-based iterator (if the primary iterator is past halfway)
   *
   * @returns {Iterator} An iterator that yields values in insertion order
   */
  [Symbol.iterator]() {
    if (this.iterator.index < 0) {
      this.iterator.activate();
      return this.iterator;
    }
    if (this.iterator.index <= (this.buffer.length >> 1)) {
      const iterator = new WindowIterator(this);
      return iterator;
    }
    return this.getSlowIterator();
  }
}

module.exports = Window;
