import { Spinner } from '@cretadoc/ui';
import type { FC } from 'react';
import { useIntl } from 'react-intl';
import { useLoaderData, useParams } from 'react-router-dom';
import type { pageLoader } from 'src/routes/loaders';
import { MarkdownContents } from '../components';
import { usePage } from '../utils/hooks';

export const RegularPage: FC = () => {
  const intl = useIntl();
  const { slug } = useParams();
  const fallbackData = useLoaderData() as Awaited<
    ReturnType<typeof pageLoader>
  >;
  const { isLoading, isValidating, page } = usePage(
    {
      slug: slug ? `/${slug}` : undefined,
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
