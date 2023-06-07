import { UIProvider } from '@cretadoc/ui';
import { IntlProvider } from 'react-intl';
import { Route, Routes } from 'react-router-dom';
import { Layout, RouterLink } from '../components';
import { HomePage } from '../pages/homepage';
import { ROUTES } from '../utils/constants';
import { useConfig } from '../utils/hooks';
import './app.css';

export const App = () => {
  const { locale, name, theme } = useConfig();

  return (
    <IntlProvider locale={locale}>
      <UIProvider components={{ LinkComponent: RouterLink }}>
        <Routes>
          <Route
            path={ROUTES.HOMEPAGE}
            element={<Layout name={name} theme={theme} />}
          >
            <Route index element={<HomePage />} />
          </Route>
        </Routes>
      </UIProvider>
    </IntlProvider>
  );
};
