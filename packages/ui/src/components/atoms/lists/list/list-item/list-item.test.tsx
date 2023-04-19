import { render, screen as screenTL } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ListItem } from './list-item';
import * as styles from './list-item.css';

describe('list-item', () => {
  it('renders the list item contents', () => {
    const body = 'blanditiis';

    render(<ListItem>{body}</ListItem>);
    expect(screenTL.getByRole('listitem')).toHaveTextContent(body);
  });

  it('renders a bordered list item', () => {
    const body = 'blanditiis';

    render(<ListItem isBordered>{body}</ListItem>);

    const item = screenTL.getByRole('listitem');

    expect(item).toHaveTextContent(body);
    expect(item).toHaveClass(styles.item({ isBordered: true }));
  });

  it('renders a top bordered list item', () => {
    const body = 'blanditiis';

    render(
      <ListItem isBordered border="top">
        {body}
      </ListItem>
    );

    const item = screenTL.getByRole('listitem');

    expect(item).toHaveTextContent(body);
    expect(item).toHaveClass(styles.item({ border: 'top', isBordered: true }));
  });

  it('renders a bordered list item with colored borders', () => {
    const body = 'blanditiis';

    render(
      <ListItem isBordered borderColor="critical">
        {body}
      </ListItem>
    );

    const item = screenTL.getByRole('listitem');

    expect(item).toHaveTextContent(body);
    expect(item).toHaveClass(styles.item({ isBordered: true }));
  });

  it('renders a bordered list item with inverted border color', () => {
    const body = 'blanditiis';

    render(
      <ListItem isBordered borderColor="inverted">
        {body}
      </ListItem>
    );

    const item = screenTL.getByRole('listitem');

    expect(item).toHaveTextContent(body);
    expect(item).toHaveClass(styles.item({ isBordered: true }));
  });

  it('renders a list item with padding', () => {
    const body = 'blanditiis';

    render(
      <ListItem paddingBlock="lg" paddingInline="xs">
        {body}
      </ListItem>
    );

    const item = screenTL.getByRole('listitem');

    expect(item).toHaveTextContent(body);
  });
});
