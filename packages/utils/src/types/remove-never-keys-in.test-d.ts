import { describe, expectTypeOf, it } from 'vitest';
import type { RemoveNeverKeysIn } from './remove-never-keys-in';

describe('RemoveNeverKeysIn', () => {
  it('creates a new type without keys of never type', () => {
    type ObjWithNeverKeys = {
      foo: string;
      bar: boolean;
      baz: never;
      qux: never;
    };

    expectTypeOf({ bar: true, foo: 'baz' }).toEqualTypeOf<
      RemoveNeverKeysIn<ObjWithNeverKeys>
    >();
  });

  it('can create a new type with generic types', () => {
    type ObjWithNeverKeys<T extends boolean> = {
      foo: string;
      bar: boolean;
      baz: T extends true ? number : never;
      qux: T extends false ? null : never;
    };

    const obj1: RemoveNeverKeysIn<ObjWithNeverKeys<true>> = {
      bar: true,
      foo: 'baz',
      baz: 42,
    };

    const obj2: RemoveNeverKeysIn<ObjWithNeverKeys<false>> = {
      bar: true,
      foo: 'baz',
      qux: null,
    };

    expectTypeOf(obj1).toEqualTypeOf<
      RemoveNeverKeysIn<ObjWithNeverKeys<true>>
    >();
    expectTypeOf(obj1).not.toMatchTypeOf<
      RemoveNeverKeysIn<ObjWithNeverKeys<false>>
    >();
    expectTypeOf(obj2).toEqualTypeOf<
      RemoveNeverKeysIn<ObjWithNeverKeys<false>>
    >();
    expectTypeOf(obj2).not.toMatchTypeOf<
      RemoveNeverKeysIn<ObjWithNeverKeys<true>>
    >();
  });
});
