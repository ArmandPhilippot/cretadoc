import { describe, expect, it, vi } from 'vitest';
import { DEFAULT_CONFIG } from '../constants';
import { ConfigError } from '../exceptions';
import { isConfigShapeValid } from './is-config-shape-valid';

describe('is-config-shape-valid', () => {
  it('returns true when the given config has valid keys', () => {
    expect(isConfigShapeValid(DEFAULT_CONFIG)).toBe(true);
  });

  it('returns false when the given config has valid keys', () => {
    expect(isConfigShapeValid({ foo: 'bar' })).toBe(false);
  });

  it('throws an error if the given config is not an object', () => {
    expect(() => isConfigShapeValid('foo')).toThrow(
      new ConfigError(
        `Configuration file found but it does not export a configuration.`
      )
    );
  });

  it('prints a list of the extra keys when config has extra keys', () => {
    const spy = vi.spyOn(console, 'warn');
    const extraProps = {
      foo: 'bar',
    };
    const config = {
      ...DEFAULT_CONFIG,
      ...extraProps,
    };
    const isValid = isConfigShapeValid(config);
    expect(isValid).toBe(true);
    expect(spy).toHaveBeenCalledOnce();
  });
});
