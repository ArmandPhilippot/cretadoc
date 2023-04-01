import { render, screen as screenTL } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Link } from './link';

describe('link', () => {
  it('creates a link element with body and target', () => {
    const body = 'illo';
    const target = '#aut';

    render(<Link to={target}>{body}</Link>);
    expect(screenTL.getByRole('link', { name: body })).toHaveAttribute(
      'href',
      target
    );
  });
});
