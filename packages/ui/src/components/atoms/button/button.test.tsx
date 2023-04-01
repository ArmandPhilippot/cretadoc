import { render, screen as screenTL } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Button } from './button';

describe('button', () => {
  it('renders a button', () => {
    const body = 'natus';

    render(<Button>{body}</Button>);
    expect(screenTL.getByRole('button', { name: body })).toHaveAttribute(
      'type',
      'button'
    );
  });

  it('renders a reset button', () => {
    const body = 'eius';

    render(<Button type="reset">{body}</Button>);
    expect(screenTL.getByRole('button', { name: body })).toHaveAttribute(
      'type',
      'reset'
    );
  });

  it('renders a submit button', () => {
    const body = 'molestiae';

    render(<Button type="submit">{body}</Button>);
    expect(screenTL.getByRole('button', { name: body })).toHaveAttribute(
      'type',
      'submit'
    );
  });

  it('renders a disabled button when it has disabled state', () => {
    const body = 'enim';

    render(<Button isDisabled>{body}</Button>);
    expect(screenTL.getByRole('button', { name: body })).toHaveAttribute(
      'disabled',
      ''
    );
  });

  it('renders a disabled button when it has loading state', () => {
    const body = 'quis';

    render(<Button isLoading>{body}</Button>);
    expect(screenTL.getByRole('button', { name: body })).toHaveAttribute(
      'disabled',
      ''
    );
  });
});
