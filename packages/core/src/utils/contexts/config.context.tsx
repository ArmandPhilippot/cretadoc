import { type FC, type ReactNode, createContext, useMemo } from 'react';
import type { CretadocConfig } from '../../types/config';
import { DEFAULT_CONFIG } from '../constants';
import { mergeConfigWithDefaults } from '../helpers';

export type ConfigContextProps = {
  config: CretadocConfig;
};

export const ConfigContext = createContext<ConfigContextProps>({
  config: DEFAULT_CONFIG,
});

export type ConfigProviderProps = {
  children: ReactNode;
  config?: Partial<CretadocConfig>;
};

export const ConfigProvider: FC<ConfigProviderProps> = ({
  children,
  config,
}) => {
  const memoizedConfig = useMemo(() => {
    return {
      config: config ? mergeConfigWithDefaults(config) : DEFAULT_CONFIG,
    };
  }, [config]);

  return (
    <ConfigContext.Provider value={memoizedConfig}>
      {children}
    </ConfigContext.Provider>
  );
};
