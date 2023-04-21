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

  it('can hide the item', () => {
    const label = 'laboriosam minima qui';
    const items: BreadcrumbsItem[] = [
      { id: 'item-1', label: 'ad', url: '#' },
      { id: 'item-2', label: 'qui', url: '#' },
    ];

    render(<Breadcrumbs aria-label={label} isLastItemHidden items={items} />);
    expect(screenTL.getAllByRole('listitem')).toHaveLength(items.length);
  });
});
