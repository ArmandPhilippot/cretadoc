import { Spinner } from '@cretadoc/ui';
import type { FC } from 'react';
import { useIntl } from 'react-intl';
import { useParams } from 'react-router-dom';
import { MarkdownContents } from '../components';
import { use404If, usePage } from '../utils/hooks';

export const RegularPage: FC = () => {
  const intl = useIntl();
  const { slug } = useParams();
  const { isLoading, isValidating, page } = usePage({
    slug: slug ? `/${slug}` : undefined,
  });

  const loadingPage = intl.formatMessage({
    defaultMessage: 'The requested page is loading...',
    id: 'R1rt/u',
    description: 'Page: loading page message',
  });

  use404If(!isValidating && !isLoading && !page);

  if (isValidating || isLoading) return <Spinner>{loadingPage}</Spinner>;

  return <MarkdownContents contents={page?.contents ?? ''} />;
};
