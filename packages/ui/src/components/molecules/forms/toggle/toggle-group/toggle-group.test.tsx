import { render, screen as screenTL } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ToggleItem } from '../toggle-item';
import { ToggleGroup } from './toggle-group';

const handleToggle = () => {
  /* Do nothing. */
};

describe('toggle-group', () => {
  it('renders the toggle items', () => {
    const items = [
      { id: 'item-1', label: 'Item 1', name: 'item-1' },
      { id: 'item-2', label: 'Item 2', name: 'item-2' },
      { id: 'item-3', label: 'Item 3', name: 'item-3' },
    ];
    render(
      <ToggleGroup>
        {items.map((item) => (
          <ToggleItem key={item.id} {...item} onToggle={handleToggle} />
        ))}
      </ToggleGroup>
    );
    expect(screenTL.getAllByRole('checkbox')).toHaveLength(items.length);
  });
});
