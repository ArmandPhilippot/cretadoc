import { render, screen as screenTL } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Icon } from './icon';

describe('icon', () => {
  it('renders a cross svg icon', () => {
    const { container } = render(<Icon shape="cross" />);
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('renders a hamburger svg icon', () => {
    const { container } = render(<Icon shape="hamburger" />);
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('renders a search icon', () => {
    const { container } = render(<Icon shape="search" />);
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('can have an img role', () => {
    // eslint-disable-next-line jsx-a11y/prefer-tag-over-role -- Valid usage.
    render(<Icon shape="hamburger" role="img" />);
    expect(screenTL.getByRole('img')).toBeInTheDocument();
  });

  it('accepts a title', () => {
    const title = 'non facilis quis';
    render(<Icon shape="hamburger" title={title} />);
    expect(screenTL.getByTitle(title)).toBeInTheDocument();
  });

  it('accepts a description', () => {
    const description = 'animi ipsum velit';
    render(<Icon shape="hamburger" description={description} />);
    expect(screenTL.getByText(description)).toBeInTheDocument();
  });
});
