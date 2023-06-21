import { describe, expect, it } from 'vitest';
import type { Mutators } from '../../types';
import { isValidContext, validateContext } from './contexts';

describe('validate-context', () => {
  it('returns a reference error when mutators are undefined', () => {
    const key: keyof Mutators = 'doc';
    const result = validateContext(
      {
        // @ts-expect-error -- We only need a defined key, not a valid one.
        loaders: { [key]: {} },
        mutators: { [key]: undefined },
      },
      key
    );

    expect(result.length).toBe(1);
    expect(result[0]?.errorKind).toBe('reference');
    expect(result[0]?.key).toBe(key);
    expect(result[0]?.reason).toBe('missing mutators');
    expect(result[0]?.received).toBe(typeof undefined);
  });

  it('returns a reference error when loaders are undefined', () => {
    const key: keyof Mutators = 'doc';
    const result = validateContext(
      {
        loaders: { [key]: undefined },
        // @ts-expect-error -- We only need a defined key, not a valid one.
        mutators: { [key]: {} },
      },
      key
    );

    expect(result.length).toBe(1);
    expect(result[0]?.errorKind).toBe('reference');
    expect(result[0]?.key).toBe(key);
    expect(result[0]?.reason).toBe('missing loaders');
    expect(result[0]?.received).toBe(typeof undefined);
  });
});

describe('is-valid-context', () => {
  it('returns true when there is no errors', () => {
    expect(isValidContext({}, 'doc', [])).toBe(true);
  });

  it('returns false when some errors exist', () => {
    expect(
      isValidContext({}, 'doc', [
        { errorKind: 'range', reason: 'any', received: 'something' },
      ])
    ).toBe(false);
  });
});
