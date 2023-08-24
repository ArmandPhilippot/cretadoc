import { describe, expectTypeOf, it } from 'vitest';
import type { RequiredKeysOf } from './required-keys-of';

describe('RequiredKeysOf', () => {
  it('creates a new type with required keys in the given type', () => {
    type WithOptionalKeys = {
      foo: string;
      bar?: boolean;
      baz: number;
      qux?: string;
    };

    expectTypeOf({ foo: 'bar', baz: 42 }).toEqualTypeOf<
      RequiredKeysOf<WithOptionalKeys>
    >();
    expectTypeOf({ foo: 'bar', baz: 42, bar: false }).not.toMatchTypeOf<
      RequiredKeysOf<WithOptionalKeys>
    >;
  });
});
