import type { FC } from 'react';
import { useIntl } from 'react-intl';
import { useLoaderData, useParams } from 'react-router-dom';
import { DocEntriesList, Page } from '../components';
import type { docEntriesLoader } from '../routes/loaders';
import { PER_PAGE, ROUTES } from '../utils/constants';
import { useDocEntries } from '../utils/hooks';

export const DocIndexPage: FC = () => {
  const intl = useIntl();
  const { page } = useParams();
  const currentPage = page ? Number(page) : 1;
  const fallbackData = useLoaderData() as Awaited<
    ReturnType<typeof docEntriesLoader>
  >;
  const { docEntries, isLoading, isValidating } = useDocEntries(
    {
      first: PER_PAGE,
      offset: currentPage > 1 ? (currentPage - 1) * PER_PAGE : undefined,
      orderBy: { direction: 'ASC', field: 'name' },
    },
    fallbackData
  );
  const entries = docEntries?.edges.map((edge) => edge.node) ?? [];
  const pageTitle = intl.formatMessage({
    defaultMessage: 'Documentation',
    description: 'DocPage: page title',
    id: 'MkRy8U',
  });
  const totalPages = docEntries?.pageInfo.total
    ? Math.ceil(docEntries.pageInfo.total / PER_PAGE)
    : 1;

  return (
    <Page isLoading={isLoading || isValidating} title={pageTitle}>
      <DocEntriesList
        baseUrl={ROUTES.DOC}
        currentPage={currentPage}
        entries={entries}
        totalPages={totalPages}
      />
    </Page>
  );
};
