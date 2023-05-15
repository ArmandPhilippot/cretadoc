/* eslint-disable max-statements */
import { render, screen as screenTL } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { UseScrollPositionDemo } from './use-scroll-position.demo';

describe('use-scroll-position', () => {
  it('returns the scroll position of the window element', () => {
    const initialPos = 0;

    render(<UseScrollPositionDemo />);

    const posX = screenTL.getByRole('listitem', { name: 'Window position X' });
    const posY = screenTL.getByRole('listitem', { name: 'Window position Y' });

    expect(posX).toHaveTextContent(`x: ${initialPos}`);
    expect(posY).toHaveTextContent(`y: ${initialPos}`);

    /**
     * JSDOM has not implemented a layout system so it seems we cannot test the
     * updated position even if we use `fireEvent.scroll` API.
     */
  });
});
