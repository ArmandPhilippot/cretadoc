import { render, screen as screenTL } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { NavItem } from '../nav-item';
import { NavList } from './nav-list';

describe('nav-list', () => {
  it('renders a list in a nav element', () => {
    const anchor = 'temporibus';
    const target = '#';

    render(
      <NavList>
        <NavItem label={anchor} to={target} />
      </NavList>
    );
    expect(screenTL.getByRole('navigation')).toBeInTheDocument();
    expect(screenTL.getByRole('list')).toBeInTheDocument();
  });
});
