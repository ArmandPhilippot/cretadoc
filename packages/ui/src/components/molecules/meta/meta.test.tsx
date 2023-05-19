import { render, screen as screenTL } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Meta, type MetaItem } from './meta';

describe('meta', () => {
  it('renders the given items', () => {
    const items: MetaItem[] = [
      { id: 'publication-date', label: 'Published on', value: '18/05' },
      { id: 'update-date', label: 'Updated on', value: '19/05' },
    ];

    render(<Meta items={items} />);
    expect(screenTL.getAllByRole('term')).toHaveLength(items.length);
  });

  it('can render inlined items', () => {
    const items: MetaItem[] = [
      { id: 'publication-date', label: 'Published on', value: '18/05' },
      { id: 'update-date', label: 'Updated on', value: '19/05' },
    ];

    render(<Meta isInline items={items} />);
    expect(screenTL.getAllByRole('term')).toHaveLength(items.length);
  });
});
