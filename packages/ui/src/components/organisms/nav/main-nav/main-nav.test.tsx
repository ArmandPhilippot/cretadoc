import { fireEvent, render, screen as screenTL } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { NavItem, type NavItemProps, NavList } from '../../../molecules';
import { MainNav } from './main-nav';

describe('main-nav', () => {
  it('renders a hamburger button', () => {
    const body = 'eius porro voluptate';
    const toggleLabel = 'deleniti';
    const onToggle = vi.fn();

    render(
      <MainNav onToggle={onToggle} toggleBtnLabel={toggleLabel}>
        {body}
      </MainNav>
    );
    expect(
      screenTL.getByRole('button', { name: toggleLabel })
    ).toBeInTheDocument();
    fireEvent.click(screenTL.getByRole('button', { name: toggleLabel }));
    expect(onToggle).toHaveBeenCalledOnce();
  });

  it('renders a hidden navigation', () => {
    const items: NavItemProps[] = [
      { id: 'item-1', label: 'Item 1', to: '#' },
      { id: 'item-2', label: 'Item 2', to: '#' },
    ];
    const { container } = render(
      <MainNav>
        <NavList>
          {items.map((item) => (
            <NavItem key={item.id} {...item} />
          ))}
        </NavList>
      </MainNav>
    );
    const renderedList = container.querySelector('ul');

    expect(renderedList).toBeInTheDocument();
    expect(renderedList).not.toBeVisible();
  });

  it('renders a visible navigation', () => {
    const items: NavItemProps[] = [
      { id: 'item-1', label: 'Item 1', to: '#' },
      { id: 'item-2', label: 'Item 2', to: '#' },
    ];
    render(
      <MainNav isOpen>
        <NavList>
          {items.map((item) => (
            <NavItem key={item.id} {...item} />
          ))}
        </NavList>
      </MainNav>
    );
    expect(screenTL.getByRole('list')).toBeVisible();
  });
});
