export class Tests__Iterate {
    /**
      {@linkcode Iterate new Iterate()}: empty iterate
      @memberof Tests__Iterate
    */
    static new_voidIterate(): void;
    /**
      {@linkcode Iterate#return .return()}: finish iterator before it yielded all values
      @memberof Tests__Iterate
    */
    static return_test(): void;
    /**
      {@linkcode Iterate#throw .throw()}: inform iterator about error condition
      @memberof Tests__Iterate
    */
    static throw_test(): void;
    /**
      {@linkcode Iterate#context .context}: add new link in the middle of the pipeline before a context
      @memberof Tests__Iterate
    */
    static context_addLinkBefore(): void;
    /**
      {@linkcode Iterate#getInitialContext .getInitialContext()}: get first context of pipeline
      @memberof Tests__Iterate
    */
    static getInitialContext_test(): void;
    /**
      {@linkcode Iterate#unlink .unlink()}: last link in transformation chain
      @memberof Tests__Iterate
    */
    static unlink_last(): void;
    /**
      {@linkcode Iterate#unlink .unlink()}: other than last link in transformation chain
      @memberof Tests__Iterate
    */
    static unlink_notLast(): void;
    /**
      {@linkcode Iterate#insert .insert()}: append pipeline with another pipeline
      @memberof Tests__Iterate
    */
    static insert_append(): void;
    /**
      {@linkcode Iterate#insert .insert()}: append pipeline with empty pipeline (nothing to append)
      @memberof Tests__Iterate
    */
    static insert_appendEmpty(): void;
    /**
      {@linkcode Iterate#insert .insert()}: insert pipeline before specified {@linkplain IterateContext context}
      @memberof Tests__Iterate
    */
    static insert_before(): void;
    /**
      {@linkcode Iterate#insert .insert()}: insert single {@linkplain IterateContext context} before specified context
      @memberof Tests__Iterate
    */
    static insert_contextBefore(): void;
}
