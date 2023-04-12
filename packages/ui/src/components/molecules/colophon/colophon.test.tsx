import { render, screen as screenTL } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Colophon } from './colophon';

describe('colophon', () => {
  it('renders the copyright', () => {
    const copyright = 'blanditiis iste ratione';
    render(<Colophon copyright={copyright} />);
    expect(screenTL.getByRole('listitem')).toHaveTextContent(copyright);
  });

  it('renders the generator', () => {
    const generator = 'quis quam asperiores';
    render(<Colophon generator={generator} />);
    expect(screenTL.getByRole('listitem')).toHaveTextContent(generator);
  });

  it('renders the legal notice link', () => {
    const label = 'legal notice';
    const link = '/legal-notice';
    render(<Colophon legalNotice={{ label, link }} />);
    expect(screenTL.getByRole('link', { name: label })).toHaveAttribute(
      'href',
      link
    );
  });
});
