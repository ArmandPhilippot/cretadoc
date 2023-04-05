import { render, screen as screenTL } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Form } from './form';

describe('form', () => {
  it('renders a form without role', () => {
    const body = 'earum';

    const { container } = render(<Form>{body}</Form>);
    expect(screenTL.queryByRole('form')).not.toBeInTheDocument();
    expect(container.querySelector('form')).toBeInTheDocument();
  });

  it('renders a form with role when it has a name', () => {
    const body = 'earum';
    const label = 'ipsa';

    render(<Form aria-label={label}>{body}</Form>);
    expect(screenTL.getByRole('form', { name: label })).toBeInTheDocument();
  });
});
