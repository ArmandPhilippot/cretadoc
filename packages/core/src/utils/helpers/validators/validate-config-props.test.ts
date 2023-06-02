import { describe, expect, it } from 'vitest';
import { DEFAULT_CONFIG } from '../../constants';
import { ConfigError } from '../../exceptions';
import { validateConfigProps } from './validate-config-props';

describe('validate-config-props', () => {
  it('returns an empty array when all config properties are valid', () => {
    expect(validateConfigProps(DEFAULT_CONFIG)).toStrictEqual([]);
  });

  it('throws an error if the config contains invalid properties', () => {
    const config = {
      foo: 'bar',
    };

    expect(() => validateConfigProps(config)).toThrow(
      new ConfigError(`Invalid property. Received: foo`)
    );
  });
});
