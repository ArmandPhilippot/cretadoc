import {
  MainNav as MainNavBase,
  type MainNavProps as MainNavBaseProps,
  NavItem,
  NavList,
} from '@cretadoc/ui';
import { Suspense, type FC } from 'react';
import { useIntl } from 'react-intl';
import { useLocation } from 'react-router-dom';
import { useConfig, usePagesList } from '../../utils/hooks';
import { Loading } from '../loading';

export type MainNavProps = Omit<
  MainNavBaseProps,
  'children' | 'closeBtnLabel' | 'hasCloseBtn'
>;

export const MainNav: FC<MainNavProps> = (props) => {
  const { doc, pages: pagesConfig } = useConfig();
  const { isLoading, pages } = usePagesList({
    exclude: {
      names: pagesConfig.legalNotice ? [pagesConfig.legalNotice] : [],
    },
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

  const loadingItems = intl.formatMessage({
    defaultMessage: 'Loading navigation items...',
    description: 'MainNav: loading text',
    id: '44f+HY',
  });

  const getPages = () => {
    if (isLoading) return <Loading msg={loadingItems} />;

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
        <Suspense fallback={<Loading msg={loadingItems} />}>
          {getPages()}
          <NavItem
            isSelected={pathname.startsWith(doc.slug)}
            // eslint-disable-next-line react/jsx-no-literals
            key="documentation-index"
            label={doc.label}
            to={doc.slug}
            // eslint-disable-next-line react/jsx-no-literals
            variant="block"
          />
        </Suspense>
      </NavList>
    </MainNavBase>
  );
};
