import { describe, expect, it } from 'vitest';
import { ERROR } from '../constants';
import { ConfigError } from '../exceptions';
import { validateConfig } from './config';

describe('validate-config', () => {
  it('throws an error when the config is not an exported object', () => {
    expect(() => validateConfig('')).toThrow(
      new ConfigError(ERROR.EMPTY.CONFIG)
    );
    expect.assertions(1);
  });

  it('throws an error when the name key has an invalid type', () => {
    const brandName = 42;
    expect(() => validateConfig({ name: brandName })).toThrowError(
      new RegExp(ERROR.INVALID.TYPE('string', typeof brandName))
    );
    expect.assertions(1);
  });

  it('throws an error when the copyright key has an invalid type', () => {
    const copyright = 42;
    expect(() => validateConfig({ copyright })).toThrowError(
      new RegExp(ERROR.INVALID.TYPE('string', typeof copyright))
    );
    expect.assertions(1);
  });

  it('throws an error when the hideGenerator key has an invalid type', () => {
    const hideGenerator = 42;
    expect(() => validateConfig({ hideGenerator })).toThrowError(
      new RegExp(ERROR.INVALID.TYPE('boolean', typeof hideGenerator))
    );
    expect.assertions(1);
  });
});
