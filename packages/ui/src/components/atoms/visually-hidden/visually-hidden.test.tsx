import { render, screen as screenTL } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { VisuallyHidden } from './visually-hidden';

describe('visually-hidden', () => {
  it('renders its contents', () => {
    const body = 'vitae';

    render(<VisuallyHidden>{body}</VisuallyHidden>);
    expect(screenTL.getByText(body)).toBeInTheDocument();
  });
});
