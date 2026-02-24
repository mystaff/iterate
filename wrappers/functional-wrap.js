
// VSCode IntelliSense hack
/* eslint-disable *//* c8 ignore start */ if (false) {
  const { Tests__Helpers } = require('../helpers/wrapping.test');
} /* c8 ignore stop *//* eslint-enable */

const WrappersFunctionalWrap = {
  /** Use this argument to indicate the currying argument in supported function calls
    @member curryArgument
  */

  /**
    Curry the function, so it may be called with partially predefined context/arguments. Returns curried funciton.\
    * **Unit Tests:**
    * * {@linkplain Tests__Helpers.curry_function Curry function}
    * * {@linkplain Tests__Helpers.curry_methods Curry methods}
    * * {@linkplain Tests__Helpers.curry_asyncRace Async race using curry arguments by 2 async functions}
    * * {@linkplain Tests__Helpers.curry_asyncGeneratorRace Async race using curry arguments
      by 2 async generator functions}
    @function
    @param {function|object|string|number|symbol} func  Source to curry. Either:
    * * Function -- curry the specified function;
    * * String, number or symbol -- Curry the method, which is a property of `context` with specified name.
    @param {function|object|null} [context=null]  `this` context. Either:
    * * `null` or `undefined` -- use the calling context of the method;
    * * Curry argument `_` -- curry the context as 1st argument in curried function;
    * * `global` -- use global context. Also recommended to specify by default if context is not significant --
      this is faster than specifying `null`/`undefined`;
    * * Object or function -- context to bind to curried function.
    @param {...*} [args]  Arguments to bind or curry in specified order. Curry argument `_` specifies
      the arguments to curry. Other values are bound.
    @returns {Function}  Curried function
  */
  curry(func, context = null, ...args) /* c8 ignore next */ { /* trick the IntelliSense */ }, // eslint-disable-line
};

WrappersFunctionalWrap.curry = function curry(func, ...args) {
  const curryMap = [];
  let idx = -1;
  const { curryArgument } = WrappersFunctionalWrap;
  while ((idx = args.indexOf(curryArgument, idx + 1)) >= 0) { curryMap.push(idx); }
  if (typeof func !== 'function' && args[0] && args[0] !== curryArgument) {
    func = args[0][func]; // get method from context
  }
  if (curryMap.length) {
    if (args[0] == null) {
      args.shift();
      curryMap.forEach((argsIdx, innerIdx) => { curryMap[innerIdx] = argsIdx - 1; });
      if (typeof func === 'function') {
        return function curried(...inner) {
          curryMap.forEach((argsIdx, innerIdx) => { args[argsIdx] = inner[innerIdx]; });
          return func.call(this, ...args, ...inner.slice(curryMap.length));
        };
      }
      return function curried(...inner) {
        curryMap.forEach((argsIdx, innerIdx) => { args[argsIdx] = inner[innerIdx]; });
        return this[func].call(this, ...args, ...inner.slice(curryMap.length));
      };
    }
    if (typeof func === 'function') {
      return (...inner) => {
        curryMap.forEach((argsIdx, innerIdx) => { args[argsIdx] = inner[innerIdx]; });
        return func.call(...args, ...inner.slice(curryMap.length));
      };
    }
    return (...inner) => {
      curryMap.forEach((argsIdx, innerIdx) => { args[argsIdx] = inner[innerIdx]; });
      return args[0][func].call(...args, ...inner.slice(curryMap.length));
    };
  }
  if (args[0] != null) {
    return func.bind(...args);
  }
  if (args.length) {
    args.shift();
    return function curried(...inner) { return func.call(this, ...args, ...inner); };
  }
  if (typeof func !== 'function') {
    return (context, ...inner) => context[func].call(context, ...inner);
  }
  return (...inner) => func.call(...inner);
};

module.exports = WrappersFunctionalWrap;
