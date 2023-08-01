import type { FC } from 'react';
import { useLoaderData, useParams } from 'react-router-dom';
import { DocEntriesList, MarkdownContents, Page } from '../components';
import type { docEntryLoader } from '../routes/loaders';
import { getSlugInfoFrom, isSlug } from '../utils/client';
import { PER_PAGE, ROUTES } from '../utils/constants';
import { useDocEntries, useDocEntry } from '../utils/hooks';

export const DocEntryPage: FC = () => {
  const { '*': splat } = useParams();
  const { slug, pageNumber } = getSlugInfoFrom(splat ?? '/');
  const currentPage = pageNumber ? Number(pageNumber) : 1;
  const { data: loadedData, errors: loadedErrors } = useLoaderData() as Awaited<
    ReturnType<typeof docEntryLoader>
  >;
  const {
    docEntry,
    isLoading: isEntryLoading,
    isValidating: isEntryValidating,
  } = useDocEntry(
    {
      slug: isSlug(slug) ? slug : '/',
    },
    {
      data: { doc: { entry: loadedData.doc?.entry } },
      errors: loadedErrors.onEntry,
    }
  );
  const {
    docEntries,
    isLoading: isEntriesLoading,
    isValidating: isEntriesValidating,
  } = useDocEntries(
    docEntry?.type === 'directory'
      ? {
          first: PER_PAGE,
          offset:
            pageNumber && pageNumber > 1
              ? (pageNumber - 1) * PER_PAGE
              : undefined,
          orderBy: { direction: 'ASC', field: 'name' },
          where: {
            slug: isSlug(slug) ? slug : undefined,
          },
        }
      : undefined,
    {
      data: { doc: { entries: loadedData.doc?.entries } },
      errors: loadedErrors.onEntries,
    }
  );
  const baseUrl = `${ROUTES.DOC}${slug}`;
  const isLoading =
    isEntriesLoading ||
    isEntriesValidating ||
    isEntryLoading ||
    isEntryValidating;

  return (
    <Page
      isLoading={isLoading}
      title={docEntry?.meta?.title ?? docEntry?.name ?? ''}
    >
      <MarkdownContents contents={docEntry?.contents} />
      {docEntry?.type === 'directory' ? (
        <DocEntriesList
          baseUrl={baseUrl}
          currentPage={currentPage}
          entries={docEntries?.edges.map((edge) => edge.node) ?? []}
          totalPages={
            docEntries?.pageInfo.total
              ? Math.ceil(docEntries.pageInfo.total / PER_PAGE)
              : 1
          }
        />
      ) : null}
    </Page>
  );
};
