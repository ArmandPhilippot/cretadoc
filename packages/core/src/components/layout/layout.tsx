import {
  Branding,
  Footer,
  Header,
  Layout as BaseLayout,
  Main,
} from '@cretadoc/ui';
import { isString } from '@cretadoc/utils';
import { type FC, useId } from 'react';
import { Outlet } from 'react-router-dom';
import type { CretadocConfig } from '../../types/config';
import { ROUTES } from '../../utils/constants';
import { useTheme } from '../../utils/hooks';
import { BackToTop } from '../back-to-top';
import { Colophon } from '../colophon';
import { SkipToContent } from '../skip-to-content';
import { ThemeSwitcher } from '../theme-switcher';
import * as styles from './layout.css';

export type LayoutProps = Pick<CretadocConfig, 'name' | 'theme'>;

export const Layout: FC<LayoutProps> = ({ name, theme }) => {
  const mainId = useId();
  const topId = useId();
  const footerAlignment = 'center';
  const hasMultipleThemes = !isString(theme);
  const themes = hasMultipleThemes ? theme : { dark: theme, light: theme };
  const [currentTheme, toggleTheme] = useTheme(themes);

  return (
    <BaseLayout data-theme={currentTheme} id={topId}>
      <SkipToContent targetId={mainId} />
      <Header className={styles.header}>
        <Branding brand={name} to={ROUTES.HOMEPAGE} />
        <div>
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
      <Footer>
        <Colophon alignment={footerAlignment} />
        <BackToTop targetId={topId} />
      </Footer>
    </BaseLayout>
  );
};
