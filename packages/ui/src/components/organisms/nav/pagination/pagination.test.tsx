/* eslint-disable react/jsx-no-bind */
import { render, screen as screenTL } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import {
  Pagination,
  type RenderPaginationItemAriaLabel,
  type RenderPaginationLink,
} from './pagination';

const renderLink: RenderPaginationLink = (page) => `${page}`;

describe('pagination', () => {
  it('renders the pages numbers and next link when first page is selected', () => {
    const total = 10;
    /** First page & the two next pages + 1 ellipsis + last page + next link */
    const expectedItemsCount = 6;

    render(<Pagination current={1} renderLink={renderLink} total={total} />);
    expect(screenTL.getAllByRole('listitem')).toHaveLength(expectedItemsCount);
  });

  it('renders the pages numbers and previous link when last page is selected', () => {
    const total = 10;
    /**
     * Last page & the two previous pages + 1 ellipsis + first page + previous
     * link
     */
    const expectedItemsCount = 6;

    render(<Pagination current={10} renderLink={renderLink} total={total} />);
    expect(screenTL.getAllByRole('listitem')).toHaveLength(expectedItemsCount);
  });

  it('renders the pages numbers, previous link and next link when inner page is selected', () => {
    const total = 10;
    /**
     * Selected page & its siblings + 2 ellipsis + first & last pages +
     * previous & next link
     */
    const expectedItemsCount = 9;

    render(<Pagination current={5} renderLink={renderLink} total={total} />);
    expect(screenTL.getAllByRole('listitem')).toHaveLength(expectedItemsCount);
  });

  it('can hide the next link', () => {
    const total = 10;
    /** First page & the two next pages + 1 ellipsis + last page */
    const expectedItemsCount = 5;

    render(
      <Pagination
        current={1}
        hideNextLink
        renderLink={renderLink}
        total={total}
      />
    );
    expect(screenTL.getAllByRole('listitem')).toHaveLength(expectedItemsCount);
  });

  it('can hide the previous link', () => {
    const total = 10;
    /** Last page & the two previous pages + 1 ellipsis + first page */
    const expectedItemsCount = 5;

    render(
      <Pagination
        current={10}
        hidePrevLink
        renderLink={renderLink}
        total={total}
      />
    );
    expect(screenTL.getAllByRole('listitem')).toHaveLength(expectedItemsCount);
  });

  it('can render a custom next link anchor', () => {
    const total = 10;
    const anchor = 'perspiciatis';

    render(
      <Pagination
        current={1}
        renderLink={renderLink}
        renderNextLinkLabel={() => anchor}
        total={total}
      />
    );

    const allLinks = screenTL.getAllByRole('link');
    const lastLink = allLinks[allLinks.length - 1];
    expect(lastLink).toHaveTextContent(anchor);
  });

  it('can render a custom previous link anchor', () => {
    const total = 10;
    const anchor = 'non';

    render(
      <Pagination
        current={10}
        renderLink={renderLink}
        renderPrevLinkLabel={() => anchor}
        total={total}
      />
    );

    const allLinks = screenTL.getAllByRole('link');
    const firstLink = allLinks[0];
    expect(firstLink).toHaveTextContent(anchor);
  });

  it('can render an aria-label for each item', () => {
    const nextLabel = 'voluptas';
    const prevLabel = 'sunt';
    const pageLabel = 'omnis';
    /**
     * Selected page siblings + first page + last page
     */
    const expectedPagesCount = 4;

    const renderItemAriaLabel: RenderPaginationItemAriaLabel = (kind) => {
      switch (kind) {
        case 'next':
          return nextLabel;
        case 'previous':
          return prevLabel;
        case 'number':
        default:
          return pageLabel;
      }
    };

    render(
      <Pagination
        current={5}
        renderItemAriaLabel={renderItemAriaLabel}
        renderLink={renderLink}
        total={10}
      />
    );
    expect(screenTL.getByRole('link', { name: prevLabel })).toBeInTheDocument();
    expect(screenTL.getByRole('link', { name: nextLabel })).toBeInTheDocument();
    expect(screenTL.getAllByRole('link', { name: pageLabel })).toHaveLength(
      expectedPagesCount
    );
  });
});
