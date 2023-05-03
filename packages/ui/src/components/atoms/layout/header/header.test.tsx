import { render, screen as screenTL } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Header } from './header';

describe('header', () => {
  it('renders a header element', () => {
    render(<Header />);
    expect(screenTL.getByRole('banner')).toBeInTheDocument();
  });
});
