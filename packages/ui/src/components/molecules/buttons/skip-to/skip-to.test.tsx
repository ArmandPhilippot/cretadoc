import { render, screen as screenTL } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { SkipTo } from './skip-to';

describe('skip-to', () => {
  it('renders a link to skip to the given target', () => {
    const label = 'quia vero';
    const target = 'repellendus';
    render(<SkipTo label={label} targetId={target} />);
    expect(screenTL.getByRole('link', { name: label })).toHaveAttribute(
      'href',
      `#${target}`
    );
  });
});
