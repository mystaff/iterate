const WrappersIterateWrap = {
  /** Wrapper function to support chaining for generator chaining methods
    @param {Function} genFunc  Generator function
    @returns {Function}  Wrapped function
  */
  chainGeneratorFunction: (genFunc) => function chainWrappedGeneratorFunction(...args) {
    const context = Object.create(this.constructor.prototype);
    context.iterator = this.iterator;
    if (this.context) {
      context.context = this.context;
      this.context.chain = context;
    }
    this.context = context;
    this.generatorFn = genFunc;
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
    return new Class(genFunc, ...args);
  },
};

module.exports = WrappersIterateWrap;
