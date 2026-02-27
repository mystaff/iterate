export = WindowIterator;
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
declare class WindowIterator implements Iterator {
    /**
     * Creates a new WindowIterator for the given window
     * @param {Window} window - The Window instance to iterate over
     */
    constructor(window: Window);
    /**
     * Reference to the parent Window instance
     * @type {Window}
     */
    window: Window;
    /**
     * The underlying array iterator for the buffer
     * @type {Iterator}
     */
    iterator: Iterator<any, any, any>;
    /**
     * Current position in the iteration. -1 indicates the iterator is inactive/finished
     * @type {number}
     */
    index: number;
    /**
     * Resets the internal iterator to the beginning of the buffer
     * @private
     */
    private resetIterator;
    /**
     * Advances the iterator by one position and returns the value.
     * Wraps around to the beginning if the end of the buffer is reached.
     * @returns {*} The next value in the iteration
     * @private
     */
    private shift;
    /**
     * Fast-forwards the iterator to the current window index position.
     * This synchronizes the iterator with the window's current state.
     * @private
     */
    private ffwd;
    /**
     * Activates the iterator by setting its index to the window's current index
     */
    activate(): void;
    /**
     * Marks the iterator as finished by setting index to -1
     */
    finish(): void;
    /**
     * Returns the next value in the iteration sequence.
     * Implements the Iterator protocol's next() method.
     * @returns {{value: *, done: boolean}} An iterator result object
     * @see {@link Tests__Logic.window_test} - `Window`: Window
     * @see {@link Tests__Logic.window_multiple_iterations_test} - Test multiple concurrent iterations
     */
    next(): {
        value: any;
        done: boolean;
    };
    /**
     * Terminates the iterator early and returns the given value.
     * Implements the Iterator protocol's return() method.
     * @param {*} value - The value to return
     * @returns {{value: *, done: boolean}} An iterator result object with done: true
     * @see {@link Tests__Logic.window_iterator_return_test} - Test iterator return method
     */
    return(value: any): {
        value: any;
        done: boolean;
    };
    /**
     * Terminates the iterator due to an error condition.
     * Implements the Iterator protocol's throw() method.
     * @returns {{done: boolean}} An iterator result object with done: true
     * @see {@link Tests__Logic.window_iterator_throw_test} - Test iterator throw method
     */
    throw(): {
        done: boolean;
    };
    /**
     * Returns this iterator instance (makes the iterator iterable)
     * @returns {WindowIterator} This iterator instance
     */
    [Symbol.iterator](): WindowIterator;
}
