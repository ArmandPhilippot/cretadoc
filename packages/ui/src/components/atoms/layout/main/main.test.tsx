import { render, screen as screenTL } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Main } from './main';

describe('main', () => {
  it('renders a main element', () => {
    render(<Main />);
    expect(screenTL.getByRole('main')).toBeInTheDocument();
  });
});
