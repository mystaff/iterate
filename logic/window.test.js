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

  /**
   * Test Window constructor and basic properties
   * @memberof Tests__Logic
   */
  static window_constructor_test() {
    const w = new Window(5);
    expect(w.buffer.length).toBe(5);
    expect(w.index).toBe(0);
    expect(w.iterator).toBeDefined();
    expect(w.iterator.index).toBe(-1); // Iterator starts inactive
  }

  /**
   * Test Window fill method with different values
   * @memberof Tests__Logic
   */
  static window_fill_test() {
    const w = new Window(4);
    w.fill(0);
    expect(Array.from(w)).toEqual([0, 0, 0, 0]);
    
    w.fill('test');
    expect(Array.from(w)).toEqual(['test', 'test', 'test', 'test']);
    
    w.fill(null);
    expect(Array.from(w)).toEqual([null, null, null, null]);
  }

  /**
   * Test circular buffer wrapping behavior
   * @memberof Tests__Logic
   */
  static window_circular_wrapping_test() {
    const w = new Window(3);
    w.push(1);
    w.push(2);
    w.push(3);
    expect(Array.from(w)).toEqual([1, 2, 3]);
    
    // Wrap around - should overwrite first element
    w.push(4);
    expect(Array.from(w)).toEqual([2, 3, 4]);
    
    w.push(5);
    expect(Array.from(w)).toEqual([3, 4, 5]);
    
    w.push(6);
    expect(Array.from(w)).toEqual([4, 5, 6]);
  }

  /**
   * Test shift method returns correct oldest value
   * @memberof Tests__Logic
   */
  static window_shift_test() {
    const w = new Window(4);
    w.push(10);
    w.push(20);
    w.push(30);
    w.push(40);
    
    expect(w.shift()).toBe(10);
    
    w.push(50); // wraps around, oldest is now 20
    expect(w.shift()).toBe(20);
    
    w.push(60); // oldest is now 30
    expect(w.shift()).toBe(30);
  }

  /**
   * Test multiple concurrent iterations
   * @memberof Tests__Logic
   */
  static window_multiple_iterations_test() {
    const w = new Window(3);
    w.push('a');
    w.push('b');
    w.push('c');
    
    const iter1 = w[Symbol.iterator]();
    expect(iter1.next().value).toBe('a');
    
    const iter2 = w[Symbol.iterator]();
    expect(iter2.next().value).toBe('a');
    
    expect(iter1.next().value).toBe('b');
    expect(iter2.next().value).toBe('b');
    
    expect(iter1.next().value).toBe('c');
    expect(iter2.next().value).toBe('c');
    
    expect(iter1.next().done).toBe(true);
    expect(iter2.next().done).toBe(true);
  }

  /**
   * Test iterator return method
   * @memberof Tests__Logic
   */
  static window_iterator_return_test() {
    const w = new Window(3);
    w.push(1);
    w.push(2);
    w.push(3);
    
    const iter = w[Symbol.iterator]();
    expect(iter.next().value).toBe(1);
    
    const result = iter.return(99);
    expect(result.value).toBe(99);
    expect(result.done).toBe(true);
    
    // Iterator should be finished
    expect(iter.next().done).toBe(true);
  }

  /**
   * Test iterator throw method
   * @memberof Tests__Logic
   */
  static window_iterator_throw_test() {
    const w = new Window(3);
    w.push(1);
    w.push(2);
    w.push(3);
    
    const iter = w[Symbol.iterator]();
    expect(iter.next().value).toBe(1);
    
    const result = iter.throw();
    expect(result.done).toBe(true);
    
    // Iterator should be finished
    expect(iter.next().done).toBe(true);
  }

  /**
   * Test empty window iteration
   * @memberof Tests__Logic
   */
  static window_empty_iteration_test() {
    const w = new Window(3);
    const values = Array.from(w);
    expect(values.length).toBe(3);
    expect(values.every(v => v === undefined)).toBe(true);
  }

  /**
   * Test window with size 2 (smallest practical size)
   * @memberof Tests__Logic
   */
  static window_size_two_test() {
    const w = new Window(2);
    w.push('first');
    expect(Array.from(w)).toEqual([undefined, 'first']);
    
    w.push('second');
    expect(Array.from(w)).toEqual(['first', 'second']);
    
    w.push('third');
    expect(Array.from(w)).toEqual(['second', 'third']);
  }

  /**
   * Test window with complex objects
   * @memberof Tests__Logic
   */
  static window_complex_objects_test() {
    const w = new Window(3);
    const obj1 = { id: 1, name: 'Alice' };
    const obj2 = { id: 2, name: 'Bob' };
    const obj3 = { id: 3, name: 'Charlie' };
    const obj4 = { id: 4, name: 'David' };
    
    w.push(obj1);
    w.push(obj2);
    w.push(obj3);
    expect(Array.from(w)).toEqual([obj1, obj2, obj3]);
    
    w.push(obj4);
    expect(Array.from(w)).toEqual([obj2, obj3, obj4]);
  }

  /**
   * Test slow iterator path (when primary iterator is past halfway)
   * @memberof Tests__Logic
   */
  static window_slow_iterator_test() {
    const w = new Window(4);
    w.push(1);
    w.push(2);
    w.push(3);
    w.push(4);
    
    // Get primary iterator and advance it past halfway
    const iter1 = w[Symbol.iterator]();
    iter1.next(); // index 0
    iter1.next(); // index 1
    iter1.next(); // index 2 (past halfway for size 4)
    
    // Next iterator should use slow path
    const iter2 = w[Symbol.iterator]();
    const values = Array.from(iter2);
    expect(values).toEqual([1, 2, 3, 4]);
  }
}

testClass(Tests__Logic);

module.exports = { Tests__Logic };
