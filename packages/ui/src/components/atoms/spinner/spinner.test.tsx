import { render, screen as screenTL } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Spinner } from './spinner';

describe('spinner', () => {
  it('renders a spinner', () => {
    const body = 'aliquid';

    render(<Spinner>{body}</Spinner>);
    expect(screenTL.getByText(body)).toBeInTheDocument();
  });
});
