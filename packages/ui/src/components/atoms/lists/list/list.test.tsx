import { render, screen as screenTL } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { List } from './list';
import { ListItem } from './list-item';

describe('list', () => {
  it('renders an unordered list', () => {
    const items = [<ListItem key="aut">aut</ListItem>];
    render(<List>{items}</List>);
    expect(screenTL.getByRole('list')).toBeInTheDocument();
  });

  it('renders an ordered list', () => {
    const items = [<ListItem key="aut">aut</ListItem>];
    render(<List isOrdered>{items}</List>);
    expect(screenTL.getByRole('list')).toBeInTheDocument();
  });

  it('renders a list with a custom spacing', () => {
    const items = [<ListItem key="aut">aut</ListItem>];
    render(<List spacing="xl">{items}</List>);
    expect(screenTL.getByRole('list')).toBeInTheDocument();
  });
});
