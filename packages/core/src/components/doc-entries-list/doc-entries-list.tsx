import type { DocEntry } from '@cretadoc/api';
import {
  type CardItem,
  CardsList,
  Pagination,
  Card,
  ButtonLink,
  Heading,
  VisuallyHidden,
} from '@cretadoc/ui';
import { type FC, useCallback, type ReactNode } from 'react';
import { useIntl } from 'react-intl';
import { removeTrailingSlashes } from '../../utils/client';
import { PAGINATED_SLUG_PREFIX } from '../../utils/constants';
import * as styles from './doc-entries-list.css';

export type DocEntriesListProps = {
  /**
   * The base url for the links.
   */
  baseUrl: string;
  /**
   * The current page number.
   */
  currentPage: number;
  /**
   * The entries to list in the current page.
   */
  entries: DocEntry[];
  /**
   * The total number of pages.
   */
  totalPages: number;
};

export const DocEntriesList: FC<DocEntriesListProps> = ({
  baseUrl,
  currentPage,
  entries,
  totalPages,
}) => {
  const slugBase = removeTrailingSlashes(baseUrl);
  const intl = useIntl();
  const paginationLabel = intl.formatMessage({
    defaultMessage: 'Pagination of the documentation',
    description: 'DocEntriesList: pagination accessible name',
    id: 'V5bcyj',
  });

  const explore = useCallback(
    (title: string) =>
      intl.formatMessage(
        {
          defaultMessage: 'Explore<a11y> {title}</a11y>',
          description: 'DocEntriesList: open dir link anchor',
          id: '11hovo',
        },
        {
          a11y: (chunks: ReactNode) => (
            <VisuallyHidden>{chunks}</VisuallyHidden>
          ),
          title,
        }
      ),
    [intl]
  );

  const readMoreAbout = useCallback(
    (title: string) =>
      intl.formatMessage(
        {
          defaultMessage: 'Read more<a11y> about {title}</a11y>',
          description: 'DocEntriesList: read more link anchor',
          id: 'ynkRza',
        },
        {
          a11y: (chunks: ReactNode) => (
            <VisuallyHidden>{chunks}</VisuallyHidden>
          ),
          title,
        }
      ),
    [intl]
  );

  const renderPaginationLink = useCallback(
    (page: number) => `${slugBase}${PAGINATED_SLUG_PREFIX}/${page}`,
    [slugBase]
  );

  const getCardItems = (): CardItem[] =>
    entries.map((entry) => {
      const cardLink = `${slugBase}${entry.slug}`;
      const callToAction =
        entry.type === 'directory'
          ? explore(entry.meta?.title ?? entry.name)
          : readMoreAbout(entry.meta?.title ?? entry.name);

      return {
        card: (
          <Card
            actions={<ButtonLink to={cardLink}>{callToAction}</ButtonLink>}
            heading={
              <Heading level={2}>{entry.meta?.title ?? entry.name}</Heading>
            }
          />
        ),
        id: entry.id,
      };
    });

  return (
    <>
      <CardsList items={getCardItems()} />
      {totalPages > 1 ? (
        <Pagination
          aria-label={paginationLabel}
          // eslint-disable-next-line react/jsx-no-literals
          alignment="center"
          className={styles.pagination}
          current={currentPage}
          total={totalPages}
          renderLink={renderPaginationLink}
        />
      ) : null}
    </>
  );
};
