const WindowIterator = require('./window-iterator');

/**
  A window
*/
class Window {
  buffer;

  iterator = new WindowIterator(this);

  index = 0;

  constructor(size) {
    this.buffer = Array(size);
    this.iterator.resetIterator();
  }

  fill(value) {
    this.buffer.fill(value);
    return this;
  }

  push(value) {
    this.buffer[this.index++] = value;
    if (this.iterator.index < 0) { this.iterator.shift(); }
    if (this.index >= this.buffer.length) { this.index = 0; }
    return this.buffer.length + 1;
  }

  shift() {
    return this.buffer[this.index];
  }

  * getSlowIterator() {
    for (let i = this.index; i < this.buffer.length; ++i) { yield this.buffer[i]; }
    for (let i = 0; i < this.index; ++i) { yield this.buffer[i]; }
  }

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
