import { describe, expectTypeOf, it } from 'vitest';
import type { CommonKeysOf } from './common-keys-of';

describe('CommonKeysOf', () => {
  it('creates a new type with common keys of two types', () => {
    type Obj1 = {
      foo: string;
      bar: boolean;
    };

    type Obj2 = {
      bar: boolean;
      baz: number;
    };

    expectTypeOf({ bar: true }).toEqualTypeOf<CommonKeysOf<Obj1, Obj2>>();
    expectTypeOf({ foo: 'baz', bar: true }).not.toEqualTypeOf<
      CommonKeysOf<Obj1, Obj2>
    >();
  });
});
