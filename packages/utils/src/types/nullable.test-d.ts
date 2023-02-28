import { describe, expectTypeOf, it } from 'vitest';
import type { Nullable } from './nullable';

describe('Nullable', () => {
  it('converts a type to be of the given type or null', () => {
    const number = 42;
    expectTypeOf('foo').toMatchTypeOf<Nullable<string>>();
    expectTypeOf(null).toMatchTypeOf<Nullable<string>>();
    expectTypeOf(undefined).not.toMatchTypeOf<Nullable<string>>();
    expectTypeOf(number).not.toMatchTypeOf<Nullable<string>>();
  });
});
