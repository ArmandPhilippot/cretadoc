import { render, screen as screenTL } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { BooleanField } from './boolean-field';

const handleChange = () => {
  /**
   * Do nothing.
   */
};

describe('boolean field', () => {
  it('renders a checkbox', () => {
    render(
      <BooleanField
        id="checkbox"
        name="checkbox"
        onChange={handleChange}
        type="checkbox"
      />
    );
    expect(screenTL.getByRole('checkbox')).toBeInTheDocument();
  });

  it('renders a radio button', () => {
    render(
      <BooleanField
        id="radio"
        name="radio"
        onChange={handleChange}
        type="radio"
      />
    );
    expect(screenTL.getByRole('radio')).toBeInTheDocument();
  });
});
