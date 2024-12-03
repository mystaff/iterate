const Iterate__creation = require('./creation');

if (false) { // eslint-disable-line
  const { Tests__Iterate } = require('./mapping.test'); // eslint-disable-line
  const Iterate = require('.'); // eslint-disable-line
  const { MapperParam, MapperFunction } = require('../helpers/mapping'); // eslint-disable-line
  const Helpers__mapping = require('../helpers/mapping'); // eslint-disable-line
}

/**
  @class
  Sync iteration mapping methods of {@link Iterate} class
  @hideconstructor
*/
class Iterate__mapping extends Iterate__creation {
  /** Map

    * {@linkplain Tests__Iterate.map_test Unit Test}
    @param {...MapperParam} mapper  {@linkplain MapperParam Mapper parameters},
      for which {@link Helpers__mapping.mapperParam _.mapperParam()} will be called
      to resolve it to a {@linkplain MapperFunction mapper function} to transform the iterator items.
    @this {Iterate}  Pipeline
    @returns {Iterate}  {@link Iterate this} for chaining
  */
  * map(...mapper) {
    yield* this.iterator;
    mapper[0]();
  }
}

module.exports = Iterate__mapping;
