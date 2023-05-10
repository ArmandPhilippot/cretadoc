import { isNull } from '@cretadoc/utils';
import type { FC } from 'react';
import { Nav, type NavProps } from '../../../atoms';
import {
  type NavItemProps,
  NavList,
  type NavListProps,
} from '../../../molecules';
import {
  BackwardForward,
  Ellipsis,
  PageNumber,
  type RenderBackwardForwardLabel,
} from './items';

export type PaginationItemKind = 'next' | 'number' | 'previous';

export type RenderPaginationItemAriaLabel = <T extends PaginationItemKind>(
  kind: T,
  num: number,
  isSelected: boolean
) => string;

export type RenderPaginationLink = (page: number) => string;

export type PaginationProps = Omit<NavProps, 'children'> &
  Pick<NavListProps<false>, 'alignment' | 'spacing'> & {
    /**
     * The currently active page number.
     */
    current: number;
    /**
     * Should we hide the forward link?
     *
     * @default false
     */
    hideNextLink?: boolean;
    /**
     * Should we hide the backward link?
     *
     * @default false
     */
    hidePrevLink?: boolean;
    /**
     * Should we had borders around previous & next buttons?
     *
     * @default false
     */
    isBackwardForwardBordered?: boolean;
    /**
     * Should we had borders around page numbers?
     *
     * @default false
     */
    isPageNumbersBordered?: boolean;
    /**
     * Function used to provide an accessible label to pagination items.
     */
    renderItemAriaLabel?: RenderPaginationItemAriaLabel;
    /**
     * Function used to create the href provided for each page link.
     */
    renderLink: RenderPaginationLink;
    /**
     * Function used to render the next link anchor.
     */
    renderNextLinkLabel?: RenderBackwardForwardLabel;
    /**
     * Function used to render the previous link anchor.
     */
    renderPrevLinkLabel?: RenderBackwardForwardLabel;
    /**
     * The number of pages to show on each side of the current page.
     *
     * @default 1
     */
    siblings?: number;
    /**
     * The total number of pages.
     */
    total: number;
    /**
     * The item variants.
     *
     * @default 'block'
     */
    variant?: NavItemProps['variant'];
  };

/**
 * Pagination component.
 */
export const Pagination: FC<PaginationProps> = ({
  alignment,
  current,
  hideNextLink = false,
  hidePrevLink = false,
  isBackwardForwardBordered,
  isPageNumbersBordered,
  renderItemAriaLabel,
  renderLink,
  renderNextLinkLabel,
  renderPrevLinkLabel,
  siblings = 1,
  spacing = null,
  total,
  variant = 'block',
  ...props
}) => {
  const isFirstPageSelected = current === 1;
  const isLastPageSelected = current === total;
  const displayRange =
    isFirstPageSelected || isLastPageSelected ? siblings + 1 : siblings;
  const hasPreviousPage = current > 1;
  const hasNextPage = current < total;

  const pages = Array.from({ length: total }, (_, index) => {
    const page = index + 1;
    const isFirstPage = page === 1;
    const isLastPage = page === total;
    const isOutOfRangeFromStart = page < current - displayRange && !isFirstPage;
    const isOutOfRangeFromEnd = page > current + displayRange && !isLastPage;
    const isOutOfRange = isOutOfRangeFromStart || isOutOfRangeFromEnd;
    const ellipsisId = isOutOfRangeFromStart
      ? 'start-ellipsis'
      : 'end-ellipsis';

    return {
      id: isOutOfRange ? ellipsisId : `page-${page}`,
      number: isOutOfRangeFromStart || isOutOfRangeFromEnd ? null : page,
    };
  }).filter(
    (page, index, allPages) =>
      index === 0 || page.number !== allPages[index - 1]?.number
  );

  return (
    <Nav {...props}>
      <NavList alignment={alignment} isInline spacing={spacing}>
        <>
          {!hidePrevLink && hasPreviousPage ? (
            <BackwardForward
              borderColor="primary"
              isBordered={isBackwardForwardBordered}
              kind="backward"
              linkAriaLabel={
                renderItemAriaLabel
                  ? renderItemAriaLabel('previous', current - 1, false)
                  : 'Go to previous page'
              }
              renderLabel={renderPrevLinkLabel}
              to={renderLink(current - 1)}
              variant={variant}
            />
          ) : null}
          {pages.map((page) => {
            const isCurrentPage = page.number === current;

            if (isNull(page.number))
              return (
                <Ellipsis
                  isBordered={isPageNumbersBordered}
                  variant={isPageNumbersBordered ? 'block' : 'regular'}
                  key={page.id}
                />
              );

            const defaultAriaLabel = isCurrentPage
              ? `Page ${page.number}`
              : `Go to page ${page.number}`;

            const linkAriaLabel = renderItemAriaLabel
              ? renderItemAriaLabel('number', page.number, isCurrentPage)
              : defaultAriaLabel;

            return (
              <PageNumber
                borderColor="primary"
                isBordered={isPageNumbersBordered}
                isCurrentPage={isCurrentPage}
                key={page.id}
                linkAriaLabel={linkAriaLabel}
                number={page.number}
                to={renderLink(page.number)}
                variant={variant}
              />
            );
          })}
          {!hideNextLink && hasNextPage ? (
            <BackwardForward
              borderColor="primary"
              isBordered={isBackwardForwardBordered}
              kind="forward"
              linkAriaLabel={
                renderItemAriaLabel
                  ? renderItemAriaLabel('next', current + 1, false)
                  : 'Go to next page'
              }
              renderLabel={renderNextLinkLabel}
              to={renderLink(current + 1)}
              variant={variant}
            />
          ) : null}
        </>
      </NavList>
    </Nav>
  );
};
