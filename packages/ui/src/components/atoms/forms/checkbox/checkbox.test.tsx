import { render, screen as screenTL } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Checkbox } from './checkbox';

const handleChange = () => {
  /**
   * Do nothing.
   */
};

describe('checkbox', () => {
  it('renders a checkbox', () => {
    render(<Checkbox id="default" name="default" onChange={handleChange} />);
    expect(screenTL.getByRole('checkbox')).toBeInTheDocument();
  });

  it('renders a checked checkbox', () => {
    render(
      <Checkbox id="checked" name="checked" isChecked onChange={handleChange} />
    );
    expect(screenTL.getByRole('checkbox')).toBeChecked();
  });

  it('renders a disabled checkbox', () => {
    render(
      <Checkbox
        id="disabled"
        name="disabled"
        isDisabled
        onChange={handleChange}
      />
    );
    expect(screenTL.getByRole('checkbox')).toBeDisabled();
  });

  it('renders a required checkbox', () => {
    render(
      <Checkbox
        id="required"
        name="required"
        isRequired
        onChange={handleChange}
      />
    );
    expect(screenTL.getByRole('checkbox')).toBeRequired();
  });
});
