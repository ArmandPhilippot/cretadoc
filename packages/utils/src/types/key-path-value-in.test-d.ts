import { describe, expectTypeOf, it } from 'vitest';
import type { KeyPathValueIn } from './key-path-value-in';

describe('KeyPathValueIn', () => {
  it('retrieve the value type from a key path', () => {
    type ObjectType = {
      foo: {
        bar: number;
      };
      baz: boolean;
    };

    const boolean = false;
    const number = 42;

    expectTypeOf(boolean).toMatchTypeOf<KeyPathValueIn<ObjectType>>();
    expectTypeOf(number).toMatchTypeOf<KeyPathValueIn<ObjectType>>();
    expectTypeOf({ bar: 42 }).toMatchTypeOf<KeyPathValueIn<ObjectType>>();

    expectTypeOf(boolean).toMatchTypeOf<KeyPathValueIn<ObjectType, 'baz'>>();
    expectTypeOf(boolean).not.toMatchTypeOf<
      KeyPathValueIn<ObjectType, 'foo'>
    >();

    expectTypeOf(number).toMatchTypeOf<KeyPathValueIn<ObjectType, 'foo.bar'>>();
    expectTypeOf(number).not.toMatchTypeOf<KeyPathValueIn<ObjectType, 'foo'>>();
  });
});
