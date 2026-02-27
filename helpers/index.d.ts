export = Helpers;
/**
  @class
  This class describes versatile useful **helper functions and objects** available from this library.
  It consists of the functions, which are directly accessible from the package import namespace.

  All these functions are described through the following **sections**:

  -- {@linkplain Helpers__mapping **mapping**} -- Functional helpers for **data mapping**.

  -- {@linkplain Helpers__casting **casting**} -- Functional helpers for **type cast** and conversion.

  -- {@linkplain Helpers__wrapping **wrapping**} -- Various **wrappers and reflections**
    for iterators and functional helpers.

  All the functions are covered by the **tests** in {@linkplain Tests__Helpers **Tests for Helpers**} section,
  which can also be used as **examples**.
  @hideconstructor
*/
declare const Helpers: {
    voidFunction: () => void;
    Function: Function;
    voidAsyncFunction: () => Promise<void>;
    AsyncFunction: Function;
    voidIterator: Iterator<any, any, any>;
    voidGeneratorFunction: () => Generator<never, void, unknown>;
    GeneratorFunction: Function;
    voidAsyncIterator: AsyncIterator<any, any, any>;
    voidAsyncGeneratorFunction: () => AsyncGenerator<never, void, unknown>;
    exhaustedIteratorResult: IteratorResult;
    AsyncGeneratorFunction: Function;
    chainGeneratorFunctionWrapper: (genFunc: Function) => Function;
    generationGeneratorFunctionWrapper: (genFunc: Function, Class: constructor) => Function;
    wrapProperties(object: any, types: Set<constructor>, wrapper: (arg0: Function) => any, ...args: any[]): void;
    unwindObjectPrototypes(object: any, to?: any): any;
    flattenObjectPrototypes(object: any, prototype?: any): void;
    fatal(error: any): never;
    curry: (func: Function | object | string | number | symbol, context?: Function | object | null, ...args?: any[]) => Function;
    curryFunction: (func: Function) => Function;
    curryMethod: (func: Function | string | number | symbol, context: object) => Function;
    curryContext: (func: Function) => Function;
    curryMethods(object: object, methodNames?: Iterable<string | symbol> | object | null, curried?: object): object;
    objectPropertyNames(object: object, typeSet?: Set<string> | null, prototypeSet?: Set<object> | null, depth?: number): any;
    functionTypes: Set<string>;
    curryInstance(object: object, curried?: object): object;
    delay(milliseconds: number, result: any): Promise<any>;
    arrayFromAsync(iterable: AsyncIterable<any>): Array<any>;
    getIterable: (iterator: Iterator<any, any, any>) => Iterable<any>;
    getAsyncIterable: (asyncIterator: AsyncIterator<any, any, any>) => AsyncIterable<any>;
    Window: typeof import("../logic/window");
    WindowIterator: typeof import("../logic/window-iterator");
    echo: (value: any) => any;
    echoAsync: (value: any) => any;
    valueFn: (value: any) => MappingFunction;
    isNullish: (value: any) => boolean;
    isNotNullish: (value: any) => boolean;
    not: (value: any) => boolean;
    inOf: (object: object) => MappingFunction;
    in: (key: any) => MappingFunction;
    hasOwnOf: (object: object) => MappingFunction;
    hasOwn: (key: any) => MappingFunction;
    propertyOf: (object: object) => MappingFunction;
    property: (key: any) => MappingFunction;
    getOf: (map: (Map<any, any> | WeakMap<any, any>)) => MappingFunction;
    get: (key: any) => MappingFunction;
    atOf: (array: any[]) => MappingFunction;
    at: (index: any) => MappingFunction;
    hasOf: (mapOrSet: (Map<any, any> | Set<any> | WeakMap<any, any> | WeakSet<any>)) => MappingFunction;
    has: (item: any) => MappingFunction;
    pigOf(collection: (any[] | Map<any, any> | WeakMap<any, any> | Set<any> | WeakSet<any> | object)): MappingFunction;
    pig(key: any): MappingFunction;
    times(count: number): MappingFunction;
    trueTimes(count: number): MappingFunction;
    counter(start: number, step?: number): MappingFunction;
    trueCounter(start: number, step?: number): MappingFunction;
    lag(steps: number, { window, defaultValue, map }?: object): MappingFunction;
    window(count: number, { window, defaultValue, map }?: object): MappingFunction;
    stretch(count: number): MappingFunction;
    ifNull: (mapper: MappingFunction, ...args: any[]) => MappingFunction;
    nullDefault: (defaultValue: any) => MappingFunction;
    if: (conditionPredicator: PredicatorPipeline, truthyMapper: MapperPipeline, falsyMapper: MapperPipeline) => MappingFunction;
    mappingByParam: (paramTypeMap: any) => (parameter: any) => any;
    mapperParam(parameter: MapperParam): MappingFunction;
    predicatorParam(parameter: PredicatorParam): MappingFunction;
    pipelineMapping: (functions: MappingFunction[], optimize?: boolean) => MappingFunction;
    mapInPlace(object: any | any[], mapperFunction: any, ...args: any[]): any | any[];
    mapper: (functions: MapperPipeline, optimize?: boolean) => MapperFunction;
    predicator: (functions: PredicatorPipeline, optimize?: boolean) => PredicatorFunction;
};
import Helpers__mapping = require("./mapping");
