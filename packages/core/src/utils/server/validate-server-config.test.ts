import type { ReplaceTypesIn } from '@cretadoc/utils';
import { describe, expect, it } from 'vitest';
import type { CretadocServerConfig } from '../../types';
import { DEFAULT_SERVER_CONFIG } from '../constants';
import { validateServerConfig } from './validate-server-config';

describe('validate-server-config', () => {
  it('returns an empty array if the config is valid', () => {
    expect(validateServerConfig(DEFAULT_SERVER_CONFIG)).toStrictEqual([]);
  });

  it('returns an array of errors if the config is invalid', () => {
    const config: ReplaceTypesIn<CretadocServerConfig, number> = {
      paths: {
        pages: 42,
      },
    };

    expect(validateServerConfig(config)).toHaveLength(1);
  });

  it('throws an error if the config has invalid keys', () => {
    const config = {
      paths: {
        pages: 'a-path',
      },
      foo: 'bar',
    };

    expect(() => validateServerConfig(config)).toThrowError();
  });
});
