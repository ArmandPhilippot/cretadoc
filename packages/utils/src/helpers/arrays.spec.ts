import { describe, expect, it } from 'vitest';
import { removeUndefined } from './arrays';

describe('remove-undefined', () => {
  it('removes undefined values from an array', () => {
    const boolean = true;
    const string = 'foo';
    const number = 42;
    const object = {
      key: 'value',
    };
    const dataWithUndefinedValues = [
      string,
      undefined,
      number,
      boolean,
      undefined,
      object,
    ];
    const definedData = dataWithUndefinedValues.filter(removeUndefined);

    /* @ts-expect-error - The array should contain only defined values. */
    expect(definedData.includes(undefined)).toBe(false);
  });
});
