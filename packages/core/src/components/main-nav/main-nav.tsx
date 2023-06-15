import {
  MainNav as MainNavBase,
  type MainNavProps as MainNavBaseProps,
  NavItem,
  Spinner,
  NavList,
} from '@cretadoc/ui';
import type { FC } from 'react';
import { useIntl } from 'react-intl';
import { useParams } from 'react-router-dom';
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
  const { slug } = useParams();
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

  const noPagesFound = intl.formatMessage({
    defaultMessage: 'No pages found.',
    description: 'MainNav: no pages found',
    id: 'hUSHbO',
  });

  const getPages = () => {
    // eslint-disable-next-line react/jsx-no-literals
    if (isLoading) return <Spinner position="top">{loadingTxt}</Spinner>;

    if (pages?.length)
      return (
        <NavList spacing={null}>
          {pages.map((page) => (
            <NavItem
              isSelected={slug === page.slug}
              key={page.id}
              label={page.name}
              to={page.slug}
              // eslint-disable-next-line react/jsx-no-literals
              variant="block"
            />
          ))}
        </NavList>
      );

    return noPagesFound;
  };

  return (
    <MainNavBase
      {...props}
      toggleBtnLabel={openBtnLabel}
      closeBtnLabel={closeBtnLabel}
      hasCloseBtn
    >
      {getPages()}
    </MainNavBase>
  );
};
