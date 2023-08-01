import {
  MainNav as MainNavBase,
  type MainNavProps as MainNavBaseProps,
  NavItem,
  Spinner,
  NavList,
} from '@cretadoc/ui';
import type { FC } from 'react';
import { useIntl } from 'react-intl';
import { useLocation } from 'react-router-dom';
import { ROUTES } from '../../utils/constants';
import { useConfig, usePagesList } from '../../utils/hooks';

export type MainNavProps = Omit<
  MainNavBaseProps,
  'children' | 'closeBtnLabel' | 'hasCloseBtn'
>;

export const MainNav: FC<MainNavProps> = (props) => {
  const { pages: config } = useConfig();
  const { isLoading, pages } = usePagesList({
    exclude: { names: config.legalNotice ? [config.legalNotice] : [] },
  });
  const { pathname } = useLocation();
  const intl = useIntl();

  const openBtnLabel = intl.formatMessage({
    defaultMessage: 'Open the main navigation',
    description: 'MainNav: open button label',
    id: 'fyZzW1',
  });

  const closeBtnLabel = intl.formatMessage({
    defaultMessage: 'Close the main navigation',
    description: 'MainNav: close button label',
    id: 'XMShu1',
  });

  const loadingTxt = intl.formatMessage({
    defaultMessage: 'Loading navigation items...',
    description: 'MainNav: loading text',
    id: '44f+HY',
  });

  const docLabel = intl.formatMessage({
    defaultMessage: 'Documentation',
    description: 'MainNav: documentation link anchor',
    id: 'OdcBgG',
  });

  const getPages = () => {
    // eslint-disable-next-line react/jsx-no-literals
    if (isLoading) return <Spinner position="top">{loadingTxt}</Spinner>;

    if (pages?.length)
      return pages.map((page) => (
        <NavItem
          isSelected={pathname === page.slug}
          key={page.id}
          label={page.meta?.title ?? page.name}
          to={page.slug}
          // eslint-disable-next-line react/jsx-no-literals
          variant="block"
        />
      ));

    return [];
  };

  return (
    <MainNavBase
      {...props}
      toggleBtnLabel={openBtnLabel}
      closeBtnLabel={closeBtnLabel}
      hasCloseBtn
    >
      <NavList spacing={null}>
        <>
          {getPages()}
          <NavItem
            isSelected={pathname.startsWith(ROUTES.DOC)}
            // eslint-disable-next-line react/jsx-no-literals
            key="documentation-index"
            label={docLabel}
            to={ROUTES.DOC}
            // eslint-disable-next-line react/jsx-no-literals
            variant="block"
          />
        </>
      </NavList>
    </MainNavBase>
  );
};
