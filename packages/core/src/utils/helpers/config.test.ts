import { describe, expect, it } from 'vitest';
import { CONFIG_FILE_NAME, DEFAULT_CONFIG } from '../constants';
import { ConfigError } from '../exceptions';
import { getFullConfigFrom } from './config';

describe('validate-config', () => {
  it('returns the config when it is valid', () => {
    expect(getFullConfigFrom(DEFAULT_CONFIG)).toStrictEqual(DEFAULT_CONFIG);
  });

  it('throws an error when the config is not an exported object', () => {
    expect(() => getFullConfigFrom('')).toThrow(
      new ConfigError(
        `Found a ${CONFIG_FILE_NAME} file but it does not export a configuration. Some keys are required for Cretadoc to work properly.`
      )
    );
    expect.assertions(1);
  });

  it('throws an error when the config is invalid', () => {
    const config = {
      copyright: 42,
      name: false,
    };
    expect(() => getFullConfigFrom(config)).toThrowError();
  });
});
