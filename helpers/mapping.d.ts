export var mapperByType: Map<any, (value: any) => any>;
export var predicatorByType: Map<any, any>;
export function mapperParam(parameter: any): any;
export function predicatorParam(parameter: any): any;
export var collectionGetOfMethodsByType: Map<WeakMap<object, any>, (mapOrSet: (Map<any, any> | Set<any> | WeakMap<any, any> | WeakSet<any>)) => MappingFunction>;
/**
 * A mapping function. Used to somehow transform the value.
 * Optionally can use additional arguments and context provided by the caller for such transformation.
 */
export type MappingFunction = (value: any, ...args?: any[]) => any;
/**
 * A mapping pipeline -- an array of {@linkcode MappingFunction} functions.
 * The input value is passed to 1st function in a pipeline, then the result of 1st passed to 2nd, etc.
 * The result of last function in pipeline is the result of processing the input value through a pipeline.
 * Empty array means that no processing is needed and the input value is the result of a pipeline as-is.
 * The context and additional `args` of {@linkcode MappingFunction} are passed to each function in a pipeline as-is.
 * Also, it can be a single {@linkcode MappingFunction}, which is a shorthand of an array, containing only that function.
 */
export type MappingPipeline = MappingFunction[] | MappingFunction;
/**
 * Mapper function.
 * A {@linkcode MappingFunction} which advises that its result will be directly
 *   or indirectly (via other mapper functions)
 * used in further data processing instead of the input value.
 */
export type MapperFunction = MappingFunction;
/**
 * Predicator function.
 * A {@linkcode MappingFunction} which advises that its result will be used as a predicate (or one of the predicates)
 * defining if and/or how the input value will be used in further data processing.
 */
export type PredicatorFunction = MappingFunction;
/**
 * Mapper parameter, which type/value is a shorthand to {@linkcode MapperFunction} as following:
 *  * _negative number_ -- {@linkcode Helpers__mapping.lag lag(-number)}
 *  * _positive number or zero_ -- {@linkcode Helpers__mapping.stretch stretch(number)}
 *  * `false` -- {@linkcode Helpers__mapping.not not}
 *  * `true` -- {@linkcode Helpers__mapping.isNotNullish isNotNullish}
 *  * `null`, `undefined` -- {@linkcode Helpers__mapping.isNullish isNullish}
 *  * `Array` -- {@linkcode Helpers__mapping.mapper mapper(array)}
 *  * `Map` or `WeakMap` -- {@linkcode Helpers__mapping.getOf getOf(map)}
 *  * `Set` or `WeakSet` -- {@linkcode Helpers__mapping.hasOf hasOf(set)}
 *  * `String` or `Symbol` -- {@linkcode Helpers__mapping.pig propGet(stringOrSymbol)}
 *  * _any function_ -- the {@linkplain MapperFunction mapper function} as-is
 *  * _default_ (`Object`) -- {@linkcode Helpers__mapping.propertyOf propertyOf(object)}
 *
 * These parameters may be used as quick and simple shorthand to avoid creating dedicated mapper functions.\
 * So instead of:
 * ```js
 * const objectIds = objectsIterate.map((object) => object.id).toArray();
 * ```
 * you may use:
 * ```js
 * const objectIds = objectsIterate.map('id').toArray();
 * ```
 * However, it's better to create a mapper function instead of a sequence of simple mapper parameters.\
 * Instead of:
 * ```js
 * const results = objectsIterate.map('metadata', '0', 'name').toArray();
 * ```
 * it's better to use:
 * ```js
 * const getFirstMetadataName = (object) => object?.metadata?.[0]?.name; // pre-create the function in global scope
 * ...
 * const results = objectsIterate.map(getFirstMetadataName).toArray(); // use single mapper function directly
 * ```
 * Also it's better to create a single mapper function instead of long sequence of simple mapper functions.\
 * Instead of:
 * ```js
 * const results = numbersIterate.map(_.add(1), _.multiply(2), _.divide(3)).toArray();
 * ```
 * it's better to use:
 * ```js
 * const calculateExpression = (x) => ((x + 1) * 2) / 3; // pre-create the function in global scope
 * ...
 * const results = numbersIterate.map(calculateExpression).toArray(); // use single mapper function directly
 * ```
 */
export type MapperParam = any;
/**
 * Predicator parameter, which type/value is a shorthand to {@linkcode PredicatorFunciton} as following:
 *  * `Number` -- {@linkcode Helpers__mapping.trueTimes times(number)}
 *  * `false` -- {@linkcode Helpers__mapping.not not}
 *  * `true` -- {@linkcode Helpers__mapping.isNotNullish isNotNullish}
 *  * `null`, `undefined` -- {@linkcode Helpers__mapping.isNullish isNullish}
 *  * `Array` -- {@linkcode Helpers__mapping.predicator mapper(array)} --
 * nested {@linkcode PredicatorPipeline predicator pipeline}
 *  * `Map` or `WeakMap` -- {@linkcode Helpers__mapping.getOf getOf(map)}
 *  * `Set` or `WeakSet` -- {@linkcode Helpers__mapping.hasOf hasOf(set)}
 *  * `String` or `Symbol` -- {@linkcode Helpers__mapping.pig propGet(stringOrSymbol)}
 *  * _any function_ -- the {@linkplain PredicatorFunction predicator function} as-is
 *  * _default_ (`Object`) -- {@linkcode Helpers__mapping.propertyOf propertyOf(object)}
 */
export type PredicatorParam = any;
/**
 * A mapper pipeline -- an array of {@linkcode MapperParam} parameters (or single mapper parameter),
 * which represents a {@linkcode MappingPipeline} of {@linkcode MapperFunction} functions corresponding
 *   to these parameters.
 * The result of last {@linkcode MapperFunction} is the result of a pipeline.
 */
export type MapperPipeline = MapperParam[] | MapperParam;
/**
 * A predicator pipeline -- an array of {@linkcode PredicatorParam} parameters (or single predicator parameter),
 * which represents a {@linkcode MappingPipeline} of {@linkcode PredicatorFunction} functions
 *   corresponding to these parameters.
 * The result of last {@linkcode PredicatorFunction} is treated as a boolean predication result of a pipeline.
 */
export type PredicatorPipeline = PredicatorParam[] | PredicatorParam;
