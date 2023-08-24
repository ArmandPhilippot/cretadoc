import { describe, expectTypeOf, it } from 'vitest';
import type { ReplaceTypesIn } from './replace-types-in';

describe('ReplaceTypesIn', () => {
  type OriginalType = {
    boolean: boolean;
    nested: {
      number: number;
    };
    number: number;
    string: string;
  };

  it('replaces the type of each key of an object type with the given type', () => {
    const updatedObject: ReplaceTypesIn<OriginalType, string> = {
      boolean: 'foo',
      nested: {
        number: 'foo',
      },
      number: 'foo',
      string: 'foo',
    };

    expectTypeOf(updatedObject.boolean).toEqualTypeOf<string>();
    expectTypeOf(updatedObject.number).toEqualTypeOf<string>();
    expectTypeOf(updatedObject.string).toEqualTypeOf<string>();
    expectTypeOf(updatedObject.nested.number).toEqualTypeOf<string>();
  });
});
