import { render, screen as screenTL } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Nav } from './nav';

describe('nav', () => {
  it('renders a nav element', () => {
    const label = 'porro';
    render(<Nav aria-label={label} />);
    expect(
      screenTL.getByRole('navigation', { name: label })
    ).toBeInTheDocument();
  });
});
