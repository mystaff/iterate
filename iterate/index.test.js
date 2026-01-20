/** @file Iterate Jest Tests */

const { testClass } = require('../jest-helper');
const _ = require('..');
const Iterate = require('.');

class Tests__Iterate {
  /**
    {@linkcode Iterate new Iterate()}: empty iterate
    @memberof Tests__Iterate
  */
  static new_voidIterate() {
    const empty = new Iterate();
    expect(empty.toArray()).toEqual([]);
  }

  /**
    {@linkcode Iterate#return .return()}: finish iterator before it yielded all values
    @memberof Tests__Iterate
  */
  static return_test() {
    let finished = false;
    const iterate = Iterate.from(function* generator() {
      try {
        yield 1;
        yield 2;
        yield 3;
        yield 4;
        yield 5;
      } finally {
        finished = true;
      }
    });
    for (const value of iterate) {
      if (value > 2) { break; }
    }
    expect(finished).toBe(true);
    expect(iterate.iterator.next()).toEqual({ done: true, value: undefined });
    expect(iterate.iterator).toBe(_.voidIterator);
  }

  /**
    {@linkcode Iterate#throw .throw()}: inform iterator about error condition
    @memberof Tests__Iterate
  */
  static throw_test() {
    let error = null;
    const iterate = Iterate.from(function* generator() {
      try {
        yield 1;
        yield 2;
        yield 3;
        yield 4;
        yield 5;
      } catch (err) {
        error = err;
      }
    });
    expect(iterate.next()).toEqual({ done: false, value: 1 });
    expect(iterate.next()).toEqual({ done: false, value: 2 });
    iterate.throw(new Error('terminated'));
    expect(error.message).toBe('terminated');
    expect(iterate.next()).toEqual({ done: true, value: undefined });
    expect(iterate.iterator).toBe(_.voidIterator);
  }

  /**
    {@linkcode Iterate#context .context}: add new link in the middle of the pipeline before a context
    @memberof Tests__Iterate
  */
  static context_addLinkBefore() {
    const iterate = Iterate.from([1, 1, 1]);
    iterate.map((x) => x + 2);
    iterate.map((x) => x * 3);
    const mapMul3Context = iterate.context;
    iterate.map((x) => x + 4);
    mapMul3Context.map((x) => x - 1);
    const expected = (((1 + 2) - 1) * 3) + 4;
    expect(iterate.toArray()).toEqual([expected, expected, expected]);
  }

  /**
    {@linkcode Iterate#getInitialContext .getInitialContext()}: get first context of pipeline
    @memberof Tests__Iterate
  */
  static getInitialContext_test() {
    const iterate = Iterate.from([1, 2, 3]);
    const initialContext = iterate.map((v) => v + 1).context;
    iterate.filter((v) => v > 2);
    iterate.map(String);
    expect(iterate.getInitialContext()).toBe(initialContext);
  }

  /**
    {@linkcode Iterate#unlink .unlink()}: last link in transformation chain
    @memberof Tests__Iterate
  */
  static unlink_last() {
    const iterate = Iterate.from([1, 1, 1]);
    const originalIterator = iterate.iterator;
    expect(iterate.next().value).toBe(1);
    const mapContext = iterate.map((v) => v + 1).context;
    const iteratorOfMap = iterate.iterator;
    expect(iterate.next().value).toBe(2);
    mapContext.unlink();
    expect(iterate.next().value).toBe(1);
    expect(Array.from(iterate)).toEqual([]);
    expect(mapContext.context).toBe(null);
    expect(mapContext.chain).toBe(null);
    expect(mapContext.pipeline).toBe(null);
    expect(mapContext.iterator).toBe(null);
    expect(mapContext.currentIterator).toBe(iteratorOfMap);
    expect(iterate.iterator).toBe(originalIterator);
  }

  /**
    {@linkcode Iterate#unlink .unlink()}: other than last link in transformation chain
    @memberof Tests__Iterate
  */
  static unlink_notLast() {
    const iterate = Iterate.from([1, 1, 1]);
    expect(iterate.next().value).toBe(1);
    const mapContext = iterate.map((v) => v + 1).context;
    const iteratorOfFilter = iterate.filter((v) => v > 1).iterator;
    expect(iterate.next().value).toBe(2);
    mapContext.unlink();
    expect(Array.from(iterate)).toEqual([]); // last element is filtered out
    expect(iterate.iterator).toBe(iteratorOfFilter);
  }

  /**
    {@linkcode Iterate#insert .insert()}: append pipeline with another pipeline
    @memberof Tests__Iterate
  */
  static insert_append() {
    const sourcePipeline = Iterate.empty().map((x) => x * 2).map((x) => x + 2);
    const destinationPipeline = Iterate.from([1, 1, 1]).map((x) => x * 3).map((x) => x + 3);
    expect(destinationPipeline.next().value).toBe(6); // (1 * 3) + 3
    destinationPipeline.insert(sourcePipeline);
    expect(destinationPipeline.next().value).toBe(14); // (((1 * 3) + 3) * 2) + 2
    expect(Array.from(destinationPipeline)).toEqual([14]);
  }

  /**
    {@linkcode Iterate#insert .insert()}: append pipeline with empty pipeline (nothing to append)
    @memberof Tests__Iterate
  */
  static insert_appendEmpty() {
    const sourcePipeline = Iterate.empty();
    const destinationPipeline = Iterate.from([1, 1, 1]).map((x) => x * 2).map((x) => x + 2);
    expect(destinationPipeline.next().value).toBe(4); // (1 * 2) + 2
    destinationPipeline.insert(sourcePipeline);
    expect(destinationPipeline.next().value).toBe(4);
    expect(Array.from(destinationPipeline)).toEqual([4]);
  }

  /**
    {@linkcode Iterate#insert .insert()}: insert pipeline before specified {@linkplain IterateContext context}
    @memberof Tests__Iterate
  */
  static insert_before() {
    const sourcePipeline = Iterate.empty().map((x) => x * 2).map((x) => x + 2);
    const add2Iterator = sourcePipeline.iterator;
    const destinationPipeline = Iterate.from([1, 1, 1, 1]).map((x) => x * 3).map((x) => x + 3);
    const add3Iterator = destinationPipeline.iterator;
    expect(destinationPipeline.next().value).toBe(6); // (1 * 3) + 3
    const add3Context = destinationPipeline.context;
    add3Context.insert(sourcePipeline);
    expect(destinationPipeline.iterator).toBe(add3Iterator);
    expect(destinationPipeline.context.iterator).toBe(add2Iterator);
    expect(destinationPipeline.next().value).toBe(11); // (((1 * 3) * 2) + 2) + 3
    expect(sourcePipeline.next().value).toBe(8); // ((1 * 3) * 2) + 2
    expect(Array.from(destinationPipeline)).toEqual([11]);
  }

  /**
    {@linkcode Iterate#insert .insert()}: insert single {@linkplain IterateContext context} before specified context
    @memberof Tests__Iterate
  */
  static insert_contextBefore() {
    const sourcePipeline = Iterate.from([1]).map((x) => x + 2);
    const add2Iterator = sourcePipeline.iterator;
    const add2Context = sourcePipeline.context;
    add2Context.map((x) => x * 2); // insert before add2
    add2Context.unlink();
    const destinationPipeline = Iterate.from([1, 1, 1, 1]);
    destinationPipeline.map((x) => x * 3);
    const mul3Iterator = destinationPipeline.iterator;
    const mul3Context = destinationPipeline.context;
    destinationPipeline.map((x) => x + 3);
    const add3Iterator = destinationPipeline.iterator;
    const add3Context = destinationPipeline.context;
    expect(destinationPipeline.next().value).toBe(6); // (1 * 3) + 3
    add3Context.insert(add2Context);
    expect(destinationPipeline.iterator).toBe(add3Iterator);
    expect(destinationPipeline.context).toBe(add3Context);
    expect(destinationPipeline.context.iterator).toBe(add2Iterator);
    expect(destinationPipeline.context.context).toBe(add2Context);
    expect(destinationPipeline.context.context.iterator).toBe(mul3Iterator);
    expect(destinationPipeline.context.context.context).toBe(mul3Context);
    expect(destinationPipeline.next().value).toBe(8); // ((1 * 3) + 2) + 3
    expect(Array.from(sourcePipeline)).toEqual([2]); // 1 * 2
    expect(Array.from(destinationPipeline)).toEqual([8, 8]);
  }
}

testClass(Tests__Iterate);

module.exports = { Tests__Iterate };
