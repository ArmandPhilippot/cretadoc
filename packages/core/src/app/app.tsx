/* eslint-disable react/jsx-no-literals */
import { UIProvider } from '@cretadoc/ui';
import { IntlProvider } from 'react-intl';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Layout, RouterLink } from '../components';
import { HomePage } from '../pages/home.page';
import { NotFoundPage } from '../pages/not-found.page';
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
            <Route path={ROUTES.NOT_FOUND} element={<NotFoundPage />} />
            <Route
              path="*"
              element={<Navigate to={ROUTES.NOT_FOUND} replace />}
            />
          </Route>
        </Routes>
      </UIProvider>
    </IntlProvider>
  );
};
