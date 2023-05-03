import { render, screen as screenTL } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Footer } from './footer';

describe('footer', () => {
  it('renders a footer element', () => {
    render(<Footer />);
    expect(screenTL.getByRole('contentinfo')).toBeInTheDocument();
  });
});
