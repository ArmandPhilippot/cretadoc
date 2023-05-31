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
import { ROUTES } from '../../utils/constants';
import { useConfig } from '../../utils/hooks';
import { Colophon } from '../colophon';
import { SkipToContent } from '../skip-to-content';
import * as styles from './layout.css';

export const Layout: FC = () => {
  const { name, theme } = useConfig();
  const mainId = useId();

  return (
    <BaseLayout data-theme={isString(theme) ? theme : theme.light}>
      <SkipToContent targetId={mainId} />
      <Header>
        <Branding brand={name} to={ROUTES.HOMEPAGE} />
      </Header>
      <Main className={styles.main} id={mainId}>
        <Outlet />
      </Main>
      <Footer>
        <Colophon />
      </Footer>
    </BaseLayout>
  );
};
