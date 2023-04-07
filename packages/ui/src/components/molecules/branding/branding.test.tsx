import { render, screen as screenTL } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Img } from '../../atoms';
import { Branding } from './branding';

describe('branding', () => {
  it('renders the branding title and link', () => {
    const brand = 'facilis non hic';
    const target = '#';
    render(<Branding brand={brand} to={target} />);
    expect(screenTL.getByRole('link')).toHaveTextContent(brand);
  });

  it('renders the branding logo', () => {
    const brand = 'facilis non hic';
    const target = '#';
    const logoAltTxt = 'totam sunt enim';
    render(
      <Branding
        brand={brand}
        logo={<Img alt={logoAltTxt} src="/non-existent-src" />}
        to={target}
      />
    );
    expect(screenTL.getByRole('img', { name: logoAltTxt })).toBeInTheDocument();
  });
});
