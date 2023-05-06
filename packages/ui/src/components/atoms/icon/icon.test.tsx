/* eslint-disable max-statements */
import { render, screen as screenTL } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Icon } from './icon';

describe('icon', () => {
  it('renders an angle icon', () => {
    const { container } = render(<Icon shape="angle" />);
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('renders a left oriented angle icon', () => {
    const { container } = render(<Icon orientation="left" shape="angle" />);
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('renders a right oriented angle icon', () => {
    const { container } = render(<Icon orientation="right" shape="angle" />);
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('renders a top oriented angle icon', () => {
    const { container } = render(<Icon orientation="top" shape="angle" />);
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('renders a cross svg icon', () => {
    const { container } = render(<Icon shape="cross" />);
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('renders a hamburger svg icon', () => {
    const { container } = render(<Icon shape="hamburger" />);
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('renders a moon icon', () => {
    const { container } = render(<Icon shape="moon" />);
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('renders a search icon', () => {
    const { container } = render(<Icon shape="search" />);
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('renders a sun icon', () => {
    const { container } = render(<Icon shape="sun" />);
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

  it('accepts an animation speed', () => {
    const { container } = render(
      <Icon animationSpeed="medium" shape="angle" />
    );
    expect(container.querySelector('svg')).toBeInTheDocument();
  });
});
