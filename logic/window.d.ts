export = Window;
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
declare class Window {
    /**
     * Creates a new Window with the specified size
     * @param {number} size - The fixed size of the circular buffer
     * @see {@link Tests__Logic.window_constructor_test} - Test Window constructor and basic properties
     */
    constructor(size: number);
    /**
     * The internal circular buffer array
     * @type {Array}
     */
    buffer: any[];
    /**
     * The primary iterator instance for this window
     * @type {WindowIterator}
     */
    iterator: WindowIterator;
    /**
     * The current write position in the circular buffer
     * @type {number}
     */
    index: number;
    /**
     * Fills the entire buffer with the specified value
     * @param {*} value - The value to fill the buffer with
     * @returns {Window} This window instance for chaining
     * @see {@link Tests__Logic.window_fill_test} - Test Window fill method with different values
     */
    fill(value: any): Window;
    /**
     * Pushes a new value into the window at the current index position.
     * When the buffer is full, this overwrites the oldest value (circular behavior).
     * @param {*} value - The value to push into the window
     * @returns {number} The buffer length plus 1 (for compatibility)
     * @see {@link Tests__Logic.window_circular_wrapping_test} - Test circular buffer wrapping behavior
     * @see {@link Tests__Logic.window_size_two_test} - Test window with size 2 (smallest practical size)
     */
    push(value: any): number;
    /**
     * Returns the value at the current index position (the oldest value in the window)
     * @returns {*} The value at the current index position
     * @see {@link Tests__Logic.window_shift_test} - Test shift method returns correct oldest value
     */
    shift(): any;
    /**
     * A fallback generator that yields values in insertion order.
     * This is used when the optimal iterator is not available.
     * @generator
     * @yields {*} Values from the buffer in insertion order
     * @private
     * @see {@link Tests__Logic.window_slow_iterator_test} - Test slow iterator path (when primary iterator is past halfway)
     */
    private getSlowIterator;
    /**
     * Returns an iterator for the window. The implementation chooses between:
     * - The primary iterator (if available and not in use)
     * - A new WindowIterator instance (if the primary iterator is in early iteration)
     * - A slow generator-based iterator (if the primary iterator is past halfway)
     *
     * @returns {Iterator} An iterator that yields values in insertion order
     * @see {@link Tests__Logic.window_test} - `Window`: Window
     * @see {@link Tests__Logic.window_empty_iteration_test} - Test empty window iteration
     * @see {@link Tests__Logic.window_multiple_iterations_test} - Test multiple concurrent iterations
     * @see {@link Tests__Logic.window_complex_objects_test} - Test window with complex objects
     */
    [Symbol.iterator](): Iterator<any, any, any>;
}
import WindowIterator = require("./window-iterator");
