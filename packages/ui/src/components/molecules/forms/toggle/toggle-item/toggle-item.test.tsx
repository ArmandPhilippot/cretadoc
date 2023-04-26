import { render, screen as screenTL } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ToggleItem } from './toggle-item';

const handleToggle = () => {
  /* Do nothing. */
};

describe('toggle-item', () => {
  it('renders an unchecked item', () => {
    const label = 'quia';
    render(
      <ToggleItem id="item" label={label} name="item" onToggle={handleToggle} />
    );
    expect(screenTL.getByRole('checkbox', { name: label })).not.toBeChecked();
  });

  it('renders an checked item', () => {
    const label = 'quia';
    render(
      <ToggleItem
        id="item"
        isChecked
        label={label}
        name="item"
        onToggle={handleToggle}
      />
    );
    expect(screenTL.getByRole('checkbox', { name: label })).toBeChecked();
  });

  it('renders disabled item', () => {
    const label = 'quia';
    render(
      <ToggleItem
        id="item"
        isDisabled
        label={label}
        name="item"
        onToggle={handleToggle}
      />
    );
    expect(screenTL.getByRole('checkbox', { name: label })).toBeDisabled();
  });
});
