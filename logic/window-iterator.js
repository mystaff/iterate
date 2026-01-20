/**
  A window iterator
*/
class WindowIterator {
  window;

  iterator;

  index = -1;

  constructor(window) {
    this.window = window;
    if (window.buffer) { this.ffwd(); }
  }

  resetIterator() {
    this.iterator = this.window.buffer.values();
  }

  shift() {
    let { value, done } = this.iterator.next();
    if (done) {
      this.resetIterator();
      ({ value, done } = this.iterator.next());
    }
    return value;
  }

  ffwd() {
    let { index } = this.window;
    let done = false;
    this.resetIterator();
    this.activate();
    while (!done && index--) {
      ({ done } = this.iterator.next());
    }
  }

  activate() {
    this.index = this.window.index;
  }

  finish() {
    this.index = -1;
  }

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

  return(value) {
    this.index = -1;
    return { value, done: true };
  }

  throw() {
    this.index = -1;
    return { done: true };
  }

  [Symbol.iterator]() { return this; }
}

module.exports = WindowIterator;
