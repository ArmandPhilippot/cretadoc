import { render, screen as screenTL } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { NavItem } from './nav-item';

describe('nav-item', () => {
  it('renders a link in a list item', () => {
    const anchor = 'magnam';
    const target = '#';

    render(<NavItem label={anchor} to={target} />);
    expect(screenTL.getByRole('listitem')).toHaveTextContent(anchor);
    expect(screenTL.getByRole('link', { name: anchor })).toHaveAttribute(
      'href',
      target
    );
  });

  it('renders the given separator', () => {
    const anchor = 'magnam';
    const target = '#';
    const sep = '>';

    render(<NavItem label={anchor} sep={sep} to={target} />);
    expect(screenTL.getByRole('listitem')).toHaveTextContent(sep);
  });

  it('renders a collapsed item', () => {
    const label = 'voluptatum';
    const target = '#';
    const expandBtnLabel = 'rem';
    const children = 'dolor nobis reiciendis';
    render(
      <NavItem expandBtnAriaLabel={expandBtnLabel} label={label} to={target}>
        {children}
      </NavItem>
    );
    expect(
      screenTL.getByRole('button', { name: expandBtnLabel })
    ).toBeInTheDocument();
    const renderedChildren = screenTL.getByText(children);
    expect(renderedChildren).toBeInTheDocument();
    expect(renderedChildren).not.toBeVisible();
  });
});
