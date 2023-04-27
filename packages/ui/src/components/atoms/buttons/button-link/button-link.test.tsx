import { render, screen as screenTL } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ButtonLink } from './button-link';

describe('button', () => {
  it('renders a link', () => {
    const body = 'natus';
    const target = '#';

    render(<ButtonLink to={target}>{body}</ButtonLink>);
    expect(screenTL.getByRole('link', { name: body })).toHaveAttribute(
      'href',
      target
    );
  });

  it('renders a span when it has disabled state', () => {
    const body = 'enim';

    render(
      <ButtonLink isDisabled to="#">
        {body}
      </ButtonLink>
    );
    expect(
      screenTL.queryByRole('link', { name: body })
    ).not.toBeInTheDocument();
    expect(screenTL.getByText(body)).toBeInTheDocument();
  });

  it('renders a span when it has loading state', () => {
    const body = 'quis';

    render(
      <ButtonLink isLoading to="#">
        {body}
      </ButtonLink>
    );
    expect(
      screenTL.queryByRole('link', { name: body })
    ).not.toBeInTheDocument();
    expect(screenTL.getByText(body)).toBeInTheDocument();
  });
});
