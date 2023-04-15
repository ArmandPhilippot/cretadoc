import { render, screen as screenTL } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Radio } from './radio';

const handleChange = () => {
  /**
   * Do nothing.
   */
};

describe('radio', () => {
  it('renders a radio button', () => {
    render(<Radio id="default" name="default" onChange={handleChange} />);
    expect(screenTL.getByRole('radio')).toBeInTheDocument();
  });

  it('renders a checked radio button', () => {
    render(
      <Radio id="checked" isChecked name="checked" onChange={handleChange} />
    );
    expect(screenTL.getByRole('radio')).toBeChecked();
  });

  it('renders a disabled radio button', () => {
    render(
      <Radio id="disabled" isDisabled name="disabled" onChange={handleChange} />
    );
    expect(screenTL.getByRole('radio')).toBeDisabled();
  });

  it('renders a required radio button', () => {
    render(
      <Radio id="required" isRequired name="required" onChange={handleChange} />
    );
    expect(screenTL.getByRole('radio')).toBeRequired();
  });
});
