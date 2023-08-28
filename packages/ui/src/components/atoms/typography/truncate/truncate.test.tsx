import { render, screen as screenTL } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Truncate } from './truncate';

describe('truncate', () => {
  it('can truncate a text', () => {
    const text = 'Eos delectus dolorem.';
    const max = '5ch';

    render(<Truncate max={max}>{text}</Truncate>);

    expect(screenTL.getByText(text)).toHaveAttribute('title', text);
  });
});
