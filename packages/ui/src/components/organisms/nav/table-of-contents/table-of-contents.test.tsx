import { render, screen as screenTL } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import {
  TableOfContents,
  type TableOfContentsTreeNode,
} from './table-of-contents';

const getHeadingsCountFrom = (tree: TableOfContentsTreeNode[]) => {
  let headingsCount = tree.length;

  tree.forEach((node) => {
    if (node.children) headingsCount += getHeadingsCountFrom(node.children);
  });

  return headingsCount;
};

describe('table-of-contents', () => {
  it('renders a title with a list of headings', () => {
    const headings: TableOfContentsTreeNode[] = [
      { children: [], id: 'heading-1', label: 'Heading 1' },
      { children: [], id: 'heading-2', label: 'Heading 2' },
      {
        children: [
          { children: [], id: 'subheading-1', label: 'Subheading 1' },
          {
            children: [
              {
                children: [],
                id: 'nested-1',
                label: 'Nested heading 1',
              },
              {
                children: [],
                id: 'nested-2',
                label: 'Nested heading 2',
              },
            ],
            id: 'subheading-2',
            label: 'Subheading 2',
          },
          { children: [], id: 'subheading-3', label: 'Subheading 3' },
        ],
        id: 'heading-3',
        label: 'Heading 3',
      },
      { children: [], id: 'heading-4', label: 'Heading 4' },
      { children: [], id: 'heading-5', label: 'Heading 5' },
    ];
    const title = 'deleniti voluptatibus impedit';

    render(<TableOfContents heading={title} tree={headings} />);
    expect(screenTL.getByText(title)).toBeInTheDocument();
    expect(screenTL.getAllByRole('link')).toHaveLength(
      getHeadingsCountFrom(headings)
    );
  });

  it('can render a collapsible list', () => {
    const headings: TableOfContentsTreeNode[] = [
      { children: [], id: 'heading-1', label: 'Heading 1' },
      { children: [], id: 'heading-2', label: 'Heading 2' },
      { children: [], id: 'heading-3', label: 'Heading 3' },
      { children: [], id: 'heading-4', label: 'Heading 4' },
    ];
    const title = 'deleniti voluptatibus impedit';
    render(<TableOfContents heading={title} isCollapsible tree={headings} />);
    expect(screenTL.getByRole('button', { name: title })).toBeInTheDocument();
    const list = screenTL.getByRole('list', { hidden: true });
    expect(list).toBeInTheDocument();
    expect(list).not.toBeVisible();
  });
});
