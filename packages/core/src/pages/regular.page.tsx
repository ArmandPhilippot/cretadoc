import { Spinner, useHeadingsTree } from '@cretadoc/ui';
import type { Nullable } from '@cretadoc/utils';
import { type FC, useCallback, useState } from 'react';
import { useIntl } from 'react-intl';
import { useLoaderData, useParams } from 'react-router-dom';
import { MarkdownContents, TableOfContents } from '../components';
import type { pagesLoader } from '../routes/pages';
import { useConfig, usePage } from '../utils/hooks';

/* eslint-disable max-statements */
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
  const [wrapper, setWrapper] = useState<Nullable<HTMLDivElement>>(null);
  const assignWrapper = useCallback((node: Nullable<HTMLDivElement>) => {
    if (node) setWrapper(node);
  }, []);
  const headingNodes = useHeadingsTree({
    fromLevel: 2,
    wrapper,
  });

  const loadingPage = intl.formatMessage({
    defaultMessage: 'The requested page is loading...',
    id: 'R1rt/u',
    description: 'Page: loading page message',
  });

  if (isValidating || isLoading) return <Spinner>{loadingPage}</Spinner>;

  return (
    <>
      {slug ? <TableOfContents tree={headingNodes} /> : null}
      <MarkdownContents contents={page?.contents} ref={assignWrapper} />
    </>
  );
};
/* eslint-enable max-statements */
