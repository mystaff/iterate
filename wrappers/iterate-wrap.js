const WrappersIterateWrap = {
  iterateProperties: {
    iterator: { value: null, enumerable: false, configurable: true, writable: true },
    //generatorFn: { value: null, enumerable: false, configurable: true, writable: true },
    context: { value: null, enumerable: false, configurable: true, writable: true },
    chain: { value: null, enumerable: false, configurable: true, writable: true },
    pipeline: { value: null, enumerable: false, configurable: true, writable: true },
    source: { value: null, enumerable: false, configurable: true, writable: true },
    params: { value: null, enumerable: false, configurable: true, writable: true },
  },

  /** Wrapper function to support chaining for generator chaining methods
    @param {Function} genFunc  Generator function
    @returns {Function}  Wrapped function
  */
  chainGeneratorFunction: (genFunc) => function chainWrappedGeneratorFunction(...args) {
    const context = Object.create(this.constructor.prototype);
    Object.defineProperties(context, WrappersIterateWrap.iterateProperties);
    context.params = args;
    context.iterator = this.iterator;
    if (this.context) {
      context.context = this.context;
      this.context.chain = context;
    }
    this.context = context;
    context.generatorFn = genFunc;
    this.iterator = genFunc.apply(context, args);
    if (this.pipeline) {
      context.pipeline = this.pipeline;
      context.chain = this;
    } else {
      context.pipeline = this;
    }
    return this;
  },

  /** Wrapper function to support chaining for generator static generation methods
    @param {Function} genFunc  Generator function
    @param {constructor} Class  Create instance of this class as a result
    @returns {Function}  Wrapped function
  */
  generationGeneratorFunction: (genFunc, Class) => function generationWrappedGeneratorFunction(...args) {
    const instance = new Class(genFunc, ...args);
    instance.source = args;
    return instance;
  },
};

module.exports = WrappersIterateWrap;
