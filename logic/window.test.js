/** @file Helpers__mapping Jest Tests */

const { testClass } = require('../jest-helper');
const Window = require('./window');

class Tests__Logic {
  /**
    * {@linkcode Helpers__mapping.Window Window}: Window
    @memberof Tests__Logic
  */
  static window_test() {
    const w = new Window(3).fill();
    let iterator;
    expect(Array.from(w)).toEqual([undefined, undefined, undefined]);

    expect(w.push(1)).toBe(4);
    expect(Array.from(w)).toEqual([undefined, undefined, 1]);
    expect(w[Symbol.iterator]()).toBe(w.iterator); // only one optimal iterator at once
    iterator = w[Symbol.iterator]();
    expect(Array.from(iterator)).toEqual([undefined, undefined, 1]);
    expect(iterator).not.toBe(w); // parallelly created iterators are not optimal. creates slow iterator
    w.iterator.return(); // resets the optimal iterator and makes it usable

    expect(w.push(2)).toBe(4);
    expect(Array.from(w)).toEqual([undefined, 1, 2]);
    expect(w[Symbol.iterator]()).toBe(w.iterator);
    iterator = w[Symbol.iterator]();
    expect(Array.from(iterator)).toEqual([undefined, 1, 2]);
    expect(iterator).not.toBe(w);
    w.iterator.return();

    expect(w.push(3)).toBe(4);
    expect(Array.from(w)).toEqual([1, 2, 3]);
    expect(w.shift()).toBe(1);

    expect(w.push(4)).toBe(4);
    expect(Array.from(w)).toEqual([2, 3, 4]);
    expect(w[Symbol.iterator]()).toBe(w.iterator);
    expect(w[Symbol.iterator]()).not.toBe(w);
    expect(w[Symbol.iterator]()).not.toBe(w); // another one
    w.iterator.throw(); // acts the same as return
    expect(w[Symbol.iterator]()).toBe(w.iterator);
    expect(w.shift()).toBe(2);
  }
}

testClass(Tests__Logic);

module.exports = { Tests__Logic };
