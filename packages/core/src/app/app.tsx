import { LinkProvider } from '@cretadoc/ui';
import type { FC, ReactNode } from 'react';
import { IntlProvider } from 'react-intl';
import { RouterLink } from '../components';
import type { CretadocClientConfig } from '../types';
import { ConfigProvider } from '../utils/contexts';

type AppProps = {
  /**
   * The client configuration.
   */
  config: CretadocClientConfig;
  /**
   * The router.
   */
  router: ReactNode;
};

export const App: FC<AppProps> = ({ config, router }) => (
  <ConfigProvider config={config}>
    <IntlProvider locale={config.locale}>
      <LinkProvider value={RouterLink}>{router}</LinkProvider>
    </IntlProvider>
  </ConfigProvider>
);
