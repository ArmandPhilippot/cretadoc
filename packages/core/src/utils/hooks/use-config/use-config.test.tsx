import { renderHook } from '@testing-library/react';
import type { FC, ReactNode } from 'react';
import { describe, expect, it } from 'vitest';
import { DEFAULT_CONFIG } from '../../constants';
import { ConfigProvider, type ConfigProviderProps } from '../../contexts';
import { useConfig } from './use-config';

const createWrapper = (
  Wrapper: FC<ConfigProviderProps>,
  config: ConfigProviderProps['config']
) =>
  function CreatedWrapper({ children }: { children: ReactNode }) {
    return <Wrapper config={config}>{children}</Wrapper>;
  };

describe('use-config', () => {
  it('returns the default configuration without provider', () => {
    const { result } = renderHook(() => useConfig());
    expect(result.current.locale).toBe(DEFAULT_CONFIG.locale);
    expect(result.current.name).toBe(DEFAULT_CONFIG.name);
    expect(result.current.theme).toBe(DEFAULT_CONFIG.theme);
  });

  it('returns a merged configuration with provider', () => {
    const brandName = 'nemo';
    const { result } = renderHook(() => useConfig(), {
      wrapper: createWrapper(ConfigProvider, {
        name: brandName,
      }),
    });
    expect(result.current.locale).toBe(DEFAULT_CONFIG.locale);
    expect(result.current.name).toBe(brandName);
    expect(result.current.theme).toBe(DEFAULT_CONFIG.theme);
  });
});
