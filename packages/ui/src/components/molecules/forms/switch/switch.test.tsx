import { render, screen as screenTL } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Switch, type SwitchItem } from './switch';

const items: [SwitchItem, SwitchItem] = [
  {
    id: 'item-1',
    label: 'Item 1',
    value: 'item-1',
  },
  { id: 'item-2', label: 'Item 2', value: 'item-2' },
];

const handleSwitch = () => {
  /* Do nothing */
};

describe('switch', () => {
  it('accepts two items', () => {
    render(
      <Switch
        items={items}
        name="switch"
        onSwitch={handleSwitch}
        value={items[0].value}
      />
    );
    expect(screenTL.getAllByRole('radio')).toHaveLength(items.length);
  });

  it('accepts a legend', () => {
    const legend = 'esse qui doloribus';
    render(
      <Switch
        items={items}
        legend={legend}
        name="switch"
        onSwitch={handleSwitch}
        value={items[0].value}
      />
    );
    expect(screenTL.getByRole('group')).toHaveAccessibleName(legend);
  });
});
