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
import { BackToTop } from '../back-to-top';
import { Colophon } from '../colophon';
import { SkipToContent } from '../skip-to-content';
import * as styles from './layout.css';

export const Layout: FC = () => {
  const { name, theme } = useConfig();
  const mainId = useId();
  const topId = useId();
  const footerAlignment = 'center';

  return (
    <BaseLayout data-theme={isString(theme) ? theme : theme.light} id={topId}>
      <SkipToContent targetId={mainId} />
      <Header>
        <Branding brand={name} to={ROUTES.HOMEPAGE} />
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
