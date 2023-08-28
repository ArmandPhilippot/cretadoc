import { render, screen as screenTL } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Breadcrumbs, type BreadcrumbsItem } from './breadcrumbs';

describe('breadcrumbs', () => {
  it('renders its items', () => {
    const label = 'laboriosam minima qui';
    const items: BreadcrumbsItem[] = [
      { id: 'item-1', label: 'ad', url: '#' },
      { id: 'item-2', label: 'qui', url: '#' },
    ];

    render(<Breadcrumbs aria-label={label} items={items} />);
    expect(
      screenTL.getByRole('navigation', { name: label })
    ).toBeInTheDocument();
    expect(screenTL.getAllByRole('listitem')).toHaveLength(items.length);
  });

  it('can hide the last item', () => {
    const label = 'laboriosam minima qui';
    const items: BreadcrumbsItem[] = [
      { id: 'item-1', label: 'ad', url: '#' },
      { id: 'item-2', label: 'qui', url: '#' },
    ];

    render(<Breadcrumbs aria-label={label} isLastItemHidden items={items} />);
    expect(screenTL.getAllByRole('listitem')).toHaveLength(items.length);
  });

  it('can collapse the items', () => {
    const label = 'laboriosam minima qui';
    const ellipsisLabel = 'ut unde sed';
    const maxItems = 4;
    const items: BreadcrumbsItem[] = [
      { id: 'item-1', label: 'item-1', url: '#' },
      { id: 'item-2', label: 'item-2', url: '#' },
      { id: 'item-3', label: 'item-3', url: '#' },
      { id: 'item-4', label: 'item-4', url: '#' },
      { id: 'item-5', label: 'item-5', url: '#' },
      { id: 'item-6', label: 'item-6', url: '#' },
    ];

    render(
      <Breadcrumbs
        aria-label={label}
        ellipsisLabel={ellipsisLabel}
        items={items}
        maxItems={maxItems}
      />
    );
    expect(screenTL.getAllByRole('listitem')).toHaveLength(maxItems);
    expect(
      screenTL.getByRole('button', { name: ellipsisLabel })
    ).toBeInTheDocument();
  });
});
