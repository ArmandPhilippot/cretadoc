import {
  render as rtlRender,
  type RenderOptions,
} from '@testing-library/react';
import type { FC, ReactElement, ReactNode } from 'react';
import { IntlProvider } from 'react-intl';
import { MemoryRouter } from 'react-router-dom';
import type { CretadocClientConfig } from '../../src/types/config';
import { ConfigProvider } from '../../src/utils/contexts';

type ProvidersConfig = {
  config?: CretadocClientConfig;
  locale?: 'en';
};

type AllProvidersProps = ProvidersConfig & {
  children: ReactNode;
};

const AllProviders: FC<AllProvidersProps> = ({
  children,
  config,
  locale = 'en',
}) => (
  <ConfigProvider config={config}>
    <IntlProvider locale={locale}>
      <MemoryRouter>{children}</MemoryRouter>
    </IntlProvider>
  </ConfigProvider>
);

type CustomRenderOptions = {
  providers?: ProvidersConfig;
  testingLibrary?: Omit<RenderOptions, 'wrapper'>;
};

const render = (ui: ReactElement, options: CustomRenderOptions = {}) =>
  rtlRender(ui, {
    wrapper: (props) => <AllProviders {...props} {...options.providers} />,
    ...options.testingLibrary,
  });

export * from '@testing-library/react';
export { render };
