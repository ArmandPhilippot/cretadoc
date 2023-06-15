import { Spinner } from '@cretadoc/ui';
import type { FC } from 'react';
import { useIntl } from 'react-intl';
import { useLoaderData, useParams } from 'react-router-dom';
import { MarkdownContents } from '../components';
import type { pagesLoader } from '../routes/pages';
import { useConfig, usePage } from '../utils/hooks';

export const RegularPage: FC = () => {
  const intl = useIntl();
  const { slug } = useParams();
  const { pages } = useConfig();
  const fallbackData = useLoaderData() as Awaited<
    ReturnType<typeof pagesLoader>
  >;
  const { isLoading, isValidating, page } = usePage(
    slug
      ? {
          slug: `/${slug}`,
        }
      : {
          name: pages.homepage,
        },
    fallbackData
  );

  const loadingPage = intl.formatMessage({
    defaultMessage: 'The requested page is loading...',
    id: 'R1rt/u',
    description: 'Page: loading page message',
  });

  if (isValidating || isLoading) return <Spinner>{loadingPage}</Spinner>;

  return <MarkdownContents contents={page?.contents ?? ''} />;
};
