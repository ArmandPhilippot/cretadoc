import {
  Branding,
  Footer,
  Header,
  Layout,
  Main,
  useBoolean,
} from '@cretadoc/ui';
import { isString } from '@cretadoc/utils';
import { type FC, useId } from 'react';
import { Outlet } from 'react-router-dom';
import { BackToTop } from '../components/back-to-top';
import { Colophon } from '../components/colophon';
import { MainNav } from '../components/main-nav';
import { SkipToContent } from '../components/skip-to-content';
import { ThemeSwitcher } from '../components/theme-switcher';
import type { CretadocConfig } from '../types/config';
import { ROUTES } from '../utils/constants';
import { useOnRouteChange, useTheme } from '../utils/hooks';
import * as styles from './app.css';
import 'modern-normalize/modern-normalize.css';

export type AppProps = Pick<CretadocConfig, 'name' | 'theme'>;

export const App: FC<AppProps> = ({ name, theme }) => {
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
        <div>
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
        <Outlet />
      </Main>
      <Footer className={styles.footer}>
        <Colophon alignment={footerAlignment} />
        <BackToTop targetId={topId} />
      </Footer>
    </Layout>
  );
};
