import { render, screen as screenTL } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { NavLink } from './nav-link';
import * as styles from './nav-link.css';

describe('nav-link', () => {
  it('renders a nav link', () => {
    const anchor = 'totam';
    const target = '#';

    render(<NavLink to={target}>{anchor}</NavLink>);
    expect(screenTL.getByRole('link', { name: anchor })).toHaveAttribute(
      'href',
      target
    );
  });

  it('renders a disabled nav link', () => {
    const anchor = 'totam';
    const target = '#';

    render(
      <NavLink isDisabled to={target}>
        {anchor}
      </NavLink>
    );
    expect(
      screenTL.queryByRole('link', { name: anchor })
    ).not.toBeInTheDocument();
    expect(screenTL.getByText(anchor)).toBeInTheDocument();
  });

  it('renders a selected nav link', () => {
    const anchor = 'totam';
    const target = '#';

    render(
      <NavLink isSelected to={target}>
        {anchor}
      </NavLink>
    );
    expect(screenTL.getByRole('link', { name: anchor })).toHaveClass(
      styles.link({ isSelected: true })
    );
  });
});
