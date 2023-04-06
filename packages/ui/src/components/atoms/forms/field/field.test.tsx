/* eslint-disable max-statements */
import { render, screen as screenTL } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Field } from './field';

describe('field', () => {
  it('renders an input', () => {
    render(<Field type="text" />);
    expect(screenTL.getByRole('textbox')).toBeInTheDocument();
  });

  it('renders a textarea', () => {
    render(<Field type="textarea" />);
    expect(screenTL.getByRole('textbox')).toBeInTheDocument();
  });
});
