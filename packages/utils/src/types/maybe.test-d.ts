import { describe, expectTypeOf, it } from 'vitest';
import type { Maybe } from './maybe';

describe('Maybe', () => {
  it('converts a type to be of the given type or undefined', () => {
    const number = 42;
    expectTypeOf('foo').toMatchTypeOf<Maybe<string>>();
    expectTypeOf(undefined).toMatchTypeOf<Maybe<string>>();
    expectTypeOf(null).not.toMatchTypeOf<Maybe<string>>();
    expectTypeOf(number).not.toMatchTypeOf<Maybe<string>>();
  });
});
