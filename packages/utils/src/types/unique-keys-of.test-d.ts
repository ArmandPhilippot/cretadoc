import { describe, expectTypeOf, it } from 'vitest';
import type { UniqueKeysOf } from './unique-keys-of';

describe('UniqueKeysOf', () => {
  it('creates a new type with unique keys of the first type', () => {
    type Obj1 = {
      foo: string;
      bar: boolean;
    };

    type Obj2 = {
      bar: boolean;
      baz: number;
    };

    expectTypeOf({ foo: 'bar' }).toEqualTypeOf<UniqueKeysOf<Obj1, Obj2>>();
    expectTypeOf({ foo: 'bar', bar: true }).not.toEqualTypeOf<
      UniqueKeysOf<Obj1, Obj2>
    >();
  });
});
