import { type FC, type ReactNode, createContext, useMemo } from 'react';
import type { CretadocClientConfig } from '../../types/config';
import { DEFAULT_CLIENT_CONFIG } from '../constants';

export type ConfigContextProps = {
  config: CretadocClientConfig;
};

export const ConfigContext = createContext<ConfigContextProps>({
  config: DEFAULT_CLIENT_CONFIG,
});

export type ConfigProviderProps = {
  children: ReactNode;
  config?: Partial<CretadocClientConfig>;
};

export const ConfigProvider: FC<ConfigProviderProps> = ({
  children,
  config,
}) => {
  const memoizedConfig = useMemo(() => {
    return {
      config: config
        ? { ...DEFAULT_CLIENT_CONFIG, ...config }
        : DEFAULT_CLIENT_CONFIG,
    };
  }, [config]);

  return (
    <ConfigContext.Provider value={memoizedConfig}>
      {children}
    </ConfigContext.Provider>
  );
};
