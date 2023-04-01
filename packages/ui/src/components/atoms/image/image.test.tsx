import { render, screen as screenTL } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Img } from './image';

describe('img', () => {
  it('renders an image', () => {
    const alt = 'officiis';
    const src = 'https://picsum.photos/640/480';

    render(<Img alt={alt} src={src} />);
    expect(screenTL.getByRole('img', { name: alt })).toHaveAttribute(
      'src',
      src
    );
  });
});
