import type { Nullable } from '@cretadoc/utils';
import { render, screen as screenTL } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { getScrollbarWidth } from '../../utils/helpers';
import { UseScrollLockDemo } from './use-scroll-lock.demo';

describe('use-scroll-lock', () => {
  it('disable scroll on body element', async () => {
    const user = userEvent.setup();

    render(<UseScrollLockDemo />);
    expect(document.body).not.toHaveStyle({ overflow: 'hidden' });

    await user.click(
      screenTL.getByRole('checkbox', { name: 'Lock body scroll' })
    );
    expect(document.body).toHaveStyle({ overflow: 'hidden' });
  });

  it('disable scroll on div element', async () => {
    const user = userEvent.setup();
    const { container } = render(<UseScrollLockDemo />);
    const div = container.querySelector(
      '#locked-div'
    ) satisfies Nullable<HTMLElement>;
    const divPaddingRight = div ? window.getComputedStyle(div).paddingRight : 0;
    const scrollbarWidth = getScrollbarWidth(div);

    expect(div).not.toHaveStyle({ overflow: 'hidden' });

    await user.click(
      screenTL.getByRole('checkbox', { name: 'Lock div scroll' })
    );
    expect(div).toHaveStyle({ overflow: 'hidden' });
    expect(div).toHaveStyle({
      paddingRight: `calc(${divPaddingRight} + ${scrollbarWidth}px)`,
    });
  });
});
