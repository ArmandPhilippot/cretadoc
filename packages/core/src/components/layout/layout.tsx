import {
  Branding,
  Colophon,
  Footer,
  Header,
  Layout as BaseLayout,
  Main,
} from '@cretadoc/ui';
import { isString } from '@cretadoc/utils';
import type { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { ROUTES } from '../../utils/constants';
import { useConfig } from '../../utils/hooks';
import * as styles from './layout.css';

export const Layout: FC = () => {
  const { name, theme } = useConfig();

  return (
    <BaseLayout data-theme={isString(theme) ? theme : theme.light}>
      <Header>
        <Branding brand={name} to={ROUTES.HOMEPAGE} />
      </Header>
      <Main className={styles.main}>
        <Outlet />
      </Main>
      <Footer>
        <Colophon />
      </Footer>
    </BaseLayout>
  );
};
