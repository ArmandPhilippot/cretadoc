import {
  Branding,
  Footer,
  Header,
  Layout,
  Main,
  useBoolean,
} from '@cretadoc/ui';
import { isString } from '@cretadoc/utils';
import 'modern-normalize/modern-normalize.css';
import { type FC, useId } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import {
  BackToTop,
  Breadcrumbs,
  Colophon,
  MainNav,
  SkipToContent,
  ThemeSwitcher,
} from '../components';
import type { CretadocConfig } from '../types/config';
import { ROUTES } from '../utils/constants';
import { useOnRouteChange, useTheme } from '../utils/hooks';
import * as styles from './app.css';

const isHomepage = (slug: string) => slug === ROUTES.HOMEPAGE;

export type AppProps = Pick<CretadocConfig, 'name' | 'theme'>;

export const App: FC<AppProps> = ({ name, theme }) => {
  const { pathname } = useLocation();
  const mainId = useId();
  const topId = useId();
  const footerAlignment = 'center';
  const hasMultipleThemes = !isString(theme);
  const themes = hasMultipleThemes ? theme : { dark: theme, light: theme };
  const [currentTheme, toggleTheme] = useTheme(themes);
  const {
    deactivate: closeMainNav,
    state: isMainNavOpen,
    toggle: toggleMainNav,
  } = useBoolean(false);

  useOnRouteChange(closeMainNav);

  return (
    <Layout className={styles.layout} data-theme={currentTheme} id={topId}>
      <SkipToContent targetId={mainId} />
      <Header className={styles.header}>
        <Branding brand={name} to={ROUTES.HOMEPAGE} />
        <div className={styles.navbar}>
          <MainNav
            isOpen={isMainNavOpen}
            onClickOutside={closeMainNav}
            onClose={closeMainNav}
            onToggle={toggleMainNav}
          />
          {hasMultipleThemes ? (
            <ThemeSwitcher
              currentTheme={currentTheme}
              onSwitch={toggleTheme}
              themes={themes}
            />
          ) : null}
        </div>
      </Header>
      <Main className={styles.main} id={mainId}>
        {isHomepage(pathname) ? null : (
          <Breadcrumbs className={styles.breadcrumbs} />
        )}
        <div className={styles.page}>
          <Outlet />
        </div>
      </Main>
      <Footer className={styles.footer}>
        <Colophon alignment={footerAlignment} />
        <BackToTop className={styles.backToTop} targetId={topId} />
      </Footer>
    </Layout>
  );
};
