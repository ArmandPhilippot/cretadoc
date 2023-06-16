import { render, screen as screenTL } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import type { LinkProps } from '../../components';
import { LinkProvider } from './link-context';
import { LinkContextConsumer } from './link-context.fixtures';

const className = 'labore';

const CustomLink = ({ children, to }: LinkProps) => (
  <a className={className} href={to}>
    {children}
  </a>
);

describe('components-provider', () => {
  it('uses the default link when the provider is not used', () => {
    const target = '/an-url';
    const anchor = 'ducimus';

    render(<LinkContextConsumer to={target}>{anchor}</LinkContextConsumer>);

    const linkEl = screenTL.getByRole('link', { name: anchor });

    expect(linkEl).toHaveAttribute('href', target);
    expect(linkEl).not.toHaveAttribute('class', className);
  });

  it('provides the given link when the provider provides a link', () => {
    const target = '/an-url';
    const anchor = 'ducimus';

    render(
      <LinkProvider value={CustomLink}>
        <LinkContextConsumer to={target}>{anchor}</LinkContextConsumer>
      </LinkProvider>
    );

    const linkEl = screenTL.getByRole('link', { name: anchor });

    expect(linkEl).toHaveAttribute('href', target);
    expect(linkEl).toHaveAttribute('class', className);
  });

  it('uses the default link when the provider does not provide a link', () => {
    const target = '/an-url';
    const anchor = 'ducimus';

    render(
      <LinkProvider value={null}>
        <LinkContextConsumer to={target}>{anchor}</LinkContextConsumer>
      </LinkProvider>
    );

    const linkEl = screenTL.getByRole('link', { name: anchor });

    expect(linkEl).toHaveAttribute('href', target);
    expect(linkEl).not.toHaveAttribute('class', className);
  });
});
