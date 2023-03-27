/* eslint-disable @typescript-eslint/no-magic-numbers */
/* eslint-disable max-statements */
import { describe, expect, expectTypeOf, it } from 'vitest';
import { deepFreeze, getValueByKeyPath, isObjKeyExist } from './objects';

describe('deep-freeze', () => {
  it('returns a frozen object', () => {
    type UnionOfLiteral = 'foo' | 'bar' | 'baz';
    type DataType = {
      array: unknown[];
      bigint: bigint;
      boolean: boolean;
      date: Date;
      function: (_: string) => boolean;
      literal: UnionOfLiteral;
      map: Map<string, string>;
      nested: {
        boolean: boolean;
        function: (_: number) => number;
        object: Record<string, unknown>;
        string: string;
      };
      null: null;
      number: number;
      regex: RegExp;
      set: Set<string>;
      string: string;
      symbol: symbol;
      undefined: undefined;
    };

    const obj: DataType = {
      array: ['foo', 42],
      bigint: 100n,
      boolean: true,
      date: new Date(),
      function: (_: string) => true,
      literal: 'bar',
      map: new Map(),
      nested: {
        boolean: false,
        function: () => 42,
        object: {},
        string: 'baz',
      },
      null: null,
      number: 42,
      regex: /w+/g,
      set: new Set(),
      string: 'foo',
      symbol: Symbol('baz'),
      undefined,
    };

    const immutableObj = deepFreeze(obj);

    expect(() => {
      // @ts-expect-error: we are assigning a new value to a readonly property.
      immutableObj.array = ['bar', 8];
    }).toThrowError();
    expect(() => {
      // @ts-expect-error: we are assigning a new value to a readonly property.
      immutableObj.bigint = 42n;
    }).toThrowError();
    expect(() => {
      // @ts-expect-error: we are assigning a new value to a readonly property.
      immutableObj['boolean'] = false;
    }).toThrowError();
    expect(() => {
      // @ts-expect-error: we are assigning a new value to a readonly property.
      immutableObj.date = new Date('2002');
    }).toThrowError();
    expect(() => {
      // @ts-expect-error: we are assigning a new value to a readonly property.
      immutableObj['function'] = () => 42;
    }).toThrowError();
    expectTypeOf(immutableObj.literal).toEqualTypeOf<UnionOfLiteral>();
    expect(() => {
      // @ts-expect-error: we are assigning a new value to a readonly property.
      immutableObj.literal = 'baz';
    }).toThrowError();
    expect(() => {
      // @ts-expect-error: we are assigning a new value to a readonly property.
      immutableObj.map = new Map(['foo', 'bar']);
    }).toThrowError();
    expect(() => {
      // @ts-expect-error: we are assigning a new value to a readonly property.
      immutableObj['null'] = undefined;
    }).toThrowError();
    expect(() => {
      // @ts-expect-error: we are assigning a new value to a readonly property.
      immutableObj.number = 21;
    }).toThrowError();
    expect(() => {
      // @ts-expect-error: we are assigning a new value to a readonly property.
      immutableObj.regex = /.*/;
    }).toThrowError();
    expect(() => {
      // @ts-expect-error: we are assigning a new value to a readonly property.
      immutableObj.set = new Set(42);
    }).toThrowError();
    expect(() => {
      // @ts-expect-error: we are assigning a new value to a readonly property.
      immutableObj.string = 'fooFoo';
    }).toThrowError();
    expect(() => {
      // @ts-expect-error: we are assigning a new value to a readonly property.
      immutableObj.symbol = Symbol('foo');
    }).toThrowError();
    expect(() => {
      // @ts-expect-error: we are assigning a new value to a readonly property.
      immutableObj.undefined = 'baz';
    }).toThrowError();

    // @ts-expect-error: we are assigning a new value to a readonly property.
    immutableObj.nested['boolean'] = !obj.nested['boolean'];
    expect(immutableObj.nested['boolean']).toBe(obj.nested['boolean']);
    // @ts-expect-error: we are assigning a new value to a readonly property.
    immutableObj.nested.object = undefined;
    expect(immutableObj.nested.object).toBe(obj.nested.object);
    // @ts-expect-error: we are assigning a new value to a readonly property.
    immutableObj.nested.string = 'b';
    expect(immutableObj.nested.string).toBe(obj.nested.string);
  });

  it('throws an error if it is not an object', () => {
    // @ts-expect-error: deepFreeze only accepts objects.
    expect(() => deepFreeze('foo')).toThrowError(
      'The argument must be an object.'
    );
  });
});

describe('get-value-by-key-path', () => {
  const obj = {
    foo: 'adipisci',
    bar: {
      baz: 42,
      nested: {
        qux: false,
      },
    },
  };

  it('returns the value of first level keys', () => {
    const result = getValueByKeyPath(obj, 'foo');
    expect(result).toBe(obj.foo);
  });

  it('returns the value of nested level keys', () => {
    const barBaz = getValueByKeyPath(obj, 'bar.baz');
    expect(barBaz).toBe(obj.bar.baz);

    const barNestedQux = getValueByKeyPath(obj, 'bar.nested.qux');
    expect(barNestedQux).toBe(obj.bar.nested.qux);
  });
});

describe('is-object-key-exist', () => {
  it('returns true if the key exists in the object', () => {
    const obj = { foo: '', bar: '' };
    expect(isObjKeyExist(obj, 'foo')).toBe(true);
  });

  it('returns false if the key does not exist in the object', () => {
    const obj = { foo: '', bar: '' };
    expect(isObjKeyExist(obj, 'baz')).toBe(false);
  });

  it('throws an error if the first argument is not an object', () => {
    expect(() => isObjKeyExist([], 'foo')).toThrowError(
      'First argument must be an object.'
    );
  });
});
