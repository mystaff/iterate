export class Tests__Iterate {
    /**
      {@linkcode Iterate__mapping#flat .flat().}: depth=0 -- no operation
      @memberof Tests__Iterate
    */
    static flat_noop(): void;
    /**
      {@linkcode Iterate__mapping#flat .flat().}: depth=1,2,Infinity
      @memberof Tests__Iterate
    */
    static flat_deep(): void;
    /**
      {@linkcode Iterate__mapping#map .map().}: mapper functions
      @memberof Tests__Iterate
    */
    static map_mapperFunctions(): void;
    /**
      {@linkcode Iterate__mapping#map .map().}: mapper parameters
      @memberof Tests__Iterate
    */
    static map_mapperParams(): void;
    /**
      {@linkcode Iterate__mapping#flatMap .flatMap().}: mapper functions
      @memberof Tests__Iterate
    */
    static flatMap_mapperFunctions(): void;
    /**
      {@linkcode Iterate__mapping#flatMap .flatMap().}: mapper parameter
      @memberof Tests__Iterate
    */
    static flatMap_mapperParam(): void;
    /**
      {@linkcode Iterate__mapping#dim .dim().}: multi-dimensional cartesian product
      @memberof Tests__Iterate
    */
    static dim_test(): void;
}
