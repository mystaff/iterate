declare const _exports: {
    originalPrepareStackTrace: (err: Error, stackTraces: NodeJS.CallSite[]) => any;
    prepareStackTraceRelative: typeof stackTrace.prepareStackTraceRelative;
    setRelativeStackTrace: typeof stackTrace.setRelativeStackTrace;
    resetDefaultStackTrace: typeof stackTrace.resetDefaultStackTrace;
    createDebuggerCommandsClosure: typeof createDebuggerCommandsClosure;
    /**
      Debug the scope
      @param {function} scopeCallback  A dummy function accepting `(arguments, context)` parameters,
        which scope is used to pause the debugger in
      @param {object} [options]  Options
      @param {function} [options.condition=_.true]  Function accepting the same parameters as returned function,
        and returns predicate to determine whether to pause
      @param {function} [options.resultCallback=_.echo]  Function accepting the same parameters as returned function,
        and returns the result of returned function. By default: result is the same as first argument,
        so it's handy to transparently debug mapping functions
      @param {function} [options.callStackDepth=1]  How many stack frames to skip, when determining the code location
      @returns {function}
    */
    debug(scopeCallback: Function, options?: {
        condition?: Function;
        resultCallback?: Function;
        callStackDepth?: Function;
    }): Function;
};
export = _exports;
import stackTrace = require("./stack-trace");
declare function createDebuggerCommandsClosure(_: any): void;
