import { render, screen as screenTL } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Drawer } from './drawer';

describe('drawer', () => {
  it('renders its children', () => {
    const body = 'necessitatibus dolore voluptas';
    render(<Drawer>{body}</Drawer>);
    expect(screenTL.getByText(body)).toBeInTheDocument();
  });

  it('can have a close button', () => {
    const body = 'necessitatibus dolore voluptas';
    const btn = 'Close the panel';
    render(
      <Drawer closeBtnLabel={btn} hasCloseBtn>
        {body}
      </Drawer>
    );
    expect(screenTL.getByRole('button', { name: btn })).toBeInTheDocument();
  });
});
