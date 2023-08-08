import type { FC } from 'react';
import { useLoaderData, useParams } from 'react-router-dom';
import { DocEntriesList, Page } from '../components';
import type { docEntriesLoader } from '../routes/loaders';
import { PER_PAGE } from '../utils/constants';
import { useConfig, useDocEntries } from '../utils/hooks';

export const DocIndexPage: FC = () => {
  const { doc } = useConfig();
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
  const totalPages = docEntries?.pageInfo.total
    ? Math.ceil(docEntries.pageInfo.total / PER_PAGE)
    : 1;

  return (
    <Page isLoading={isLoading || isValidating} title={doc.label}>
      <DocEntriesList
        baseUrl={doc.slug}
        currentPage={currentPage}
        entries={entries}
        totalPages={totalPages}
      />
    </Page>
  );
};
