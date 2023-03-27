import { describe, expectTypeOf, it } from 'vitest';
import type { KeyPathIn } from './key-path-in';

describe('KeyPathIn', () => {
  it('converts an object type to an union of key paths', () => {
    type ObjectType = {
      foo: {
        bar: number;
      };
      baz: boolean;
    };

    const foo: keyof ObjectType = 'foo';
    const bar: keyof ObjectType['foo'] = 'bar';
    const fooBar = `${foo}.${bar}` as const;

    expectTypeOf(foo).toMatchTypeOf<KeyPathIn<ObjectType>>();
    expectTypeOf(bar).not.toMatchTypeOf<KeyPathIn<ObjectType>>();
    expectTypeOf(fooBar).toMatchTypeOf<KeyPathIn<ObjectType>>();
  });
});
