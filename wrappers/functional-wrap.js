const WrappersFunctionalWrap = {
  /** Use this argument to indicate the currying argument in supported function calls
    @member curryArgument
  */

  /** Wrapper function to support the currying functions
    @function
    @param {Function} func  Source function
    @param {Symbol} [symbol=_]  Curry argument symbol
    @returns {Function}  Wrapped function
  */
  curryFunction: (func, symbol) => function curryWrappedFunction(...args) {
    if (!symbol) { symbol = WrappersFunctionalWrap.curryArgument; }
    let idx = -1;
    const curry = [];
    while ((idx = args.indexOf(symbol, idx + 1)) >= 0) { curry.push(idx); }
    if (curry.length) {
      return (...inner) => {
        curry.forEach((argsIdx, innerIdx) => { args[argsIdx] = inner[innerIdx]; });
        return func.apply(this, args);
      };
    }
    if (args.length === func.length) { return func.apply(this, args); }
    return func.bind(this, ...args);
  },
};

module.exports = WrappersFunctionalWrap;
