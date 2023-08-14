import {
  Branding,
  Footer,
  Header,
  Layout as Container,
  Main,
  useBoolean,
} from '@cretadoc/ui';
import { isString } from '@cretadoc/utils';
import 'modern-normalize/modern-normalize.css';
import { Suspense, type FC } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { CRETADOC_ROOT, ROUTES } from '../../utils/constants';
import { useConfig, useOnRouteChange, useTheme } from '../../utils/hooks';
import { BackToTop } from '../back-to-top';
import { Breadcrumbs } from '../breadcrumbs';
import { Colophon } from '../colophon';
import { MainNav } from '../main-nav';
import { LoadingPage } from '../page';
import { SkipToContent } from '../skip-to-content';
import { ThemeSwitcher } from '../theme-switcher';
import * as styles from './layout.css';

const isHomepage = (path: string) => path === ROUTES.HOMEPAGE;

const CRETADOC_CONTENTS = 'cretadoc-contents';

export const Layout: FC = () => {
  const { name, theme } = useConfig();
  const { pathname } = useLocation();
  const footerAlignment = 'center';
  const themes = isString(theme) ? { dark: theme, light: theme } : theme;
  const [currentTheme, toggleTheme] = useTheme(themes);
  const {
    deactivate: closeMainNav,
    state: isMainNavOpen,
    toggle: toggleMainNav,
  } = useBoolean(false);

  useOnRouteChange(closeMainNav);

  return (
    <Container className={styles.layout} data-theme={currentTheme}>
      <SkipToContent targetId={CRETADOC_CONTENTS} />
      <Header className={styles.header}>
        <Branding brand={name} to={ROUTES.HOMEPAGE} />
        <div className={styles.navbar}>
          <MainNav
            isOpen={isMainNavOpen}
            onClickOutside={closeMainNav}
            onClose={closeMainNav}
            onToggle={toggleMainNav}
          />
          {isString(theme) ? null : (
            <ThemeSwitcher
              currentTheme={currentTheme}
              onSwitch={toggleTheme}
              themes={themes}
            />
          )}
        </div>
      </Header>
      <Main className={styles.main} id={CRETADOC_CONTENTS}>
        {isHomepage(pathname) ? null : (
          <Breadcrumbs className={styles.breadcrumbs} />
        )}
        <Suspense fallback={<LoadingPage />}>
          <Outlet />
        </Suspense>
      </Main>
      <Footer className={styles.footer}>
        <Colophon alignment={footerAlignment} />
        <BackToTop className={styles.backToTop} targetId={CRETADOC_ROOT} />
      </Footer>
    </Container>
  );
};
