import { render, screen as screenTL } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Overlay } from './overlay';

describe('overlay', () => {
  it('renders its children', () => {
    const body = 'non quibusdam ipsum';
    render(<Overlay>{body}</Overlay>);
    expect(screenTL.getByText(body)).toBeInTheDocument();
  });
});
