import { describe, expect, it } from 'vitest';
import { getKeyPathValue } from './get-key-path-value';

describe('get-key-path-value', () => {
  it('returns the value of a key path when it is a string', () => {
    const obj = {
      foo: {
        bar: {
          baz: 'illum',
        },
      },
    };

    expect(getKeyPathValue(obj, 'foo.bar.baz')).toBe(obj.foo.bar.baz);
  });

  it('returns an empty string if the value is not a string', () => {
    const obj = {
      foo: 'any-string',
      bar: {
        baz: 42,
      },
    };

    expect(getKeyPathValue(obj, 'bar.baz')).toBe('');
  });
});
