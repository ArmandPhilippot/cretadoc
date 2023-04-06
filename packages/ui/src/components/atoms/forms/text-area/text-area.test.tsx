/* eslint-disable max-statements */
import { render, screen as screenTL } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { TextArea } from './text-area';

describe('text-area', () => {
  it('renders a textarea', () => {
    render(<TextArea />);
    expect(screenTL.getByRole('textbox')).toBeInTheDocument();
  });

  it('renders a disabled textarea', () => {
    render(<TextArea isDisabled />);
    expect(screenTL.getByRole('textbox')).toBeDisabled();
  });

  it('renders a readonly textarea', () => {
    render(<TextArea isReadOnly />);
    expect(screenTL.getByRole('textbox')).toHaveAttribute('readonly', '');
  });

  it('renders a required textarea', () => {
    render(<TextArea isRequired />);
    expect(screenTL.getByRole('textbox')).toBeRequired();
  });
});
