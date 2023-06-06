import type { ReplaceTypesIn } from '@cretadoc/utils';
import { describe, expect, it } from 'vitest';
import type { CretadocClientConfig } from '../../types';
import { DEFAULT_CLIENT_CONFIG } from '../constants';
import { validateClientConfig } from './validate-client-config';

describe('validate-client-config', () => {
  it('returns an empty array if the config is valid', () => {
    expect(validateClientConfig(DEFAULT_CLIENT_CONFIG)).toStrictEqual([]);
  });

  it('returns an array of errors if the config is invalid', () => {
    const config: Partial<ReplaceTypesIn<CretadocClientConfig, number>> = {
      copyright: 42,
    };

    expect(validateClientConfig(config)).toHaveLength(1);
  });

  it('throws an error if the config has invalid keys', () => {
    const config = {
      copyright: 'some string',
      foo: 'bar',
    };

    expect(() => validateClientConfig(config)).toThrowError();
  });
});
