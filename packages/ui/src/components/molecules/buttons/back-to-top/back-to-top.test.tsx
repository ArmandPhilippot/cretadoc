import { render, screen as screenTL } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { BackToTop } from './back-to-top';

describe('back-to-top', () => {
  it('renders a back to top link', () => {
    const target = 'repellat';
    render(<BackToTop targetId={target} />);
    expect(screenTL.getByRole('link', { name: 'Back to top' })).toHaveAttribute(
      'href',
      `#${target}`
    );
  });

  it('renders a back to top link with a custom label', () => {
    const target = 'repellat';
    const label = 'dolore';
    render(<BackToTop label={label} targetId={target} />);
    expect(screenTL.getByRole('link', { name: label })).toHaveAttribute(
      'href',
      `#${target}`
    );
  });

  it('renders a back to top link with a visible label', () => {
    const target = 'repellat';
    const label = 'dolore';
    render(<BackToTop isLabelVisible label={label} targetId={target} />);
    expect(screenTL.getByText(label)).toBeVisible();
  });

  it('renders a hidden back to top link', () => {
    const target = 'repellat';
    const label = 'dolore';
    render(<BackToTop isVisible={false} label={label} targetId={target} />);
    const btnLink = screenTL.getByText(label);
    expect(btnLink).toBeInTheDocument();
    expect(btnLink).not.toBeVisible();
  });
});
