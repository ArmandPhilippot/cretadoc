import { describe, expectTypeOf, it } from 'vitest';
import type { NullableOptionalKeysOf } from './nullable-optional-keys-of';

describe('NullableOptionalKeysOf', () => {
  type ObjectWithOptionalKeys = {
    number: number;
    string: string;
    maybeNumber?: number;
    maybeBoolean?: boolean;
  };

  it('converts a type with optional keys to nullable keys', () => {
    const obj: NullableOptionalKeysOf<ObjectWithOptionalKeys> = {
      number: 42,
      string: '',
      maybeNumber: null,
      maybeBoolean: null,
    };

    expectTypeOf(obj.number).toEqualTypeOf<ObjectWithOptionalKeys['number']>();
    expectTypeOf(obj.string).toEqualTypeOf<ObjectWithOptionalKeys['string']>();
    expectTypeOf(obj.maybeNumber).not.toEqualTypeOf<
      ObjectWithOptionalKeys['maybeNumber']
    >();
    expectTypeOf(obj.maybeNumber).toEqualTypeOf<number | null>();
    expectTypeOf(obj.maybeBoolean).not.toEqualTypeOf<
      ObjectWithOptionalKeys['maybeBoolean']
    >();
    expectTypeOf(obj.maybeBoolean).toEqualTypeOf<boolean | null>();
  });

  it('converts a type with optional keys to optional or nullable keys', () => {
    const obj: NullableOptionalKeysOf<ObjectWithOptionalKeys, true> = {
      number: 42,
      string: '',
      maybeNumber: null,
      maybeBoolean: null,
    };

    expectTypeOf(obj.number).toEqualTypeOf<ObjectWithOptionalKeys['number']>();
    expectTypeOf(obj.string).toEqualTypeOf<ObjectWithOptionalKeys['string']>();
    expectTypeOf(obj.maybeNumber).not.toEqualTypeOf<
      ObjectWithOptionalKeys['maybeNumber']
    >();
    expectTypeOf(obj.maybeNumber).toEqualTypeOf<number | null | undefined>();
    expectTypeOf(obj.maybeBoolean).not.toEqualTypeOf<
      ObjectWithOptionalKeys['maybeBoolean']
    >();
    expectTypeOf(obj.maybeBoolean).toEqualTypeOf<boolean | null | undefined>();
  });
});
