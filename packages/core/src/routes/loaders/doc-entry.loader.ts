import type {
  DocEntryConnectionPayload,
  DocEntryPayload,
  DocPayload,
} from '@cretadoc/api';
import { HTTP_STATUS_CODE, type Maybe } from '@cretadoc/utils';
import { type LoaderFunctionArgs, redirect } from 'react-router-dom';
import { docEntriesQuery, docEntryQuery, fetchAPI } from '../../services';
import { getSlugInfoFrom, isSlug } from '../../utils/client';
import { PER_PAGE, ROUTES } from '../../utils/constants';

type ErrorMessage = { message: string };

type DocEntryLoaderReturn = {
  data: DocPayload<DocEntryPayload & DocEntryConnectionPayload>;
  errors: {
    onEntry: Maybe<ErrorMessage[]>;
    onEntries: Maybe<ErrorMessage[]>;
  };
};

export const docEntryLoader = async ({
  request,
}: LoaderFunctionArgs): Promise<DocEntryLoaderReturn> => {
  const url = new URL(request.url);
  const { slug: fullSlug, pageNumber } = getSlugInfoFrom(url.pathname);

  if (pageNumber === 1)
    // eslint-disable-next-line @typescript-eslint/no-throw-literal
    throw redirect(fullSlug);

  const slug = fullSlug.replace(ROUTES.DOC, '');
  const loadedDocEntry = await fetchAPI(
    {
      query: docEntryQuery,
      variables: {
        slug: isSlug(slug) ? slug : '/',
      },
    },
    url.origin
  );

  if (!loadedDocEntry.data?.doc?.entry)
    // eslint-disable-next-line @typescript-eslint/no-throw-literal
    throw redirect(url.href, { status: HTTP_STATUS_CODE.NOT_FOUND });

  const loadedDocEntries = await fetchAPI(
    {
      query: docEntriesQuery,
      variables: {
        first: PER_PAGE,
        offset:
          pageNumber && pageNumber > 1
            ? (pageNumber - 1) * PER_PAGE
            : undefined,
        orderBy: { direction: 'ASC', field: 'name' },
        where: {
          slug: isSlug(slug) ? slug : undefined,
        },
      },
    },
    url.origin
  );

  return {
    data: {
      doc: {
        entry: loadedDocEntry.data.doc.entry,
        entries: loadedDocEntries.data?.doc?.entries,
      },
    },
    errors: {
      onEntry: loadedDocEntry.errors,
      onEntries: loadedDocEntries.errors,
    },
  };
};
