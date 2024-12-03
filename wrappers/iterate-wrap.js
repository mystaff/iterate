const WrappersIterateWrap = {
  /** Wrapper function to support chaining for generator chaining methods
    @param {Function} genFunc  Generator function
    @returns {Function}  Wrapped function
  */
  chainGeneratorFunction: (genFunc) => function chainWrappedGeneratorFunction(...args) {
    this.iterator = genFunc.apply(this, args);
    return this;
  },

  /** Wrapper function to support chaining for generator static creation methods
    @param {Function} genFunc  Generator function
    @param {constructor} Class  Create instance of this class as a result
    @returns {Function}  Wrapped function
  */
  creationGeneratorFunction: (genFunc, Class) => function creationWrappedGeneratorFunction(...args) {
    return new Class(genFunc.apply(this, args));
  },
};

module.exports = WrappersIterateWrap;
