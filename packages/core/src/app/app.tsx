import { UIProvider } from '@cretadoc/ui';
import { IntlProvider } from 'react-intl';
import { Route, Routes } from 'react-router-dom';
import { Layout, RouterLink } from '../components';
import { HomePage } from '../pages/homepage';
import { DEFAULT_LOCALE, ROUTES } from '../utils/constants';
import { useConfig } from '../utils/hooks';

export const App = () => {
  const { locale } = useConfig();

  return (
    <IntlProvider defaultLocale={DEFAULT_LOCALE} locale={locale}>
      <UIProvider components={{ LinkComponent: RouterLink }}>
        <Routes>
          <Route path={ROUTES.HOMEPAGE} element={<Layout />}>
            <Route index element={<HomePage />} />
          </Route>
        </Routes>
      </UIProvider>
    </IntlProvider>
  );
};
