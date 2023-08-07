import { describe, expect, it } from 'vitest';
import { MESSAGES } from '../../constants';
import { validateArgsLength } from './validate-args-length';

describe('validate-args-length', () => {
  it('returns an error message if args length is lower than expected', () => {
    const result = validateArgsLength({ foo: 'bar' }, 2);

    expect(result).toBe(MESSAGES.NOT_ENOUGH_ARGS);
  });

  it('returns an error message if args length is greater than expected', () => {
    const result = validateArgsLength({ foo: 'bar', bar: 'baz' }, 1);

    expect(result).toBe(MESSAGES.TOO_MANY_ARGS);
  });

  it('does not return an error message if args length is the expected one', () => {
    const result = validateArgsLength({ foo: 'bar', bar: 'baz' }, 2);

    expect(result).toBeUndefined();
  });
});
