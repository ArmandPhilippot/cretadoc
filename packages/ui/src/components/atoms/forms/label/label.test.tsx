import { render, screen as screenTL } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Label } from './label';

describe('label', () => {
  it('renders a the label of a form element', () => {
    const body = 'dolorem';

    render(<Label>{body}</Label>);
    expect(screenTL.getByText(body)).toBeInTheDocument();
  });

  it('renders a label associated to a required field', () => {
    const body = 'dolorem';
    const defaultRequiredSymbol = '*';

    render(<Label isRequired>{body}</Label>);
    expect(screenTL.getByText(body)).toBeInTheDocument();
    expect(screenTL.getByText(defaultRequiredSymbol)).toBeInTheDocument();
  });

  it('renders a label with a custom required symbol', () => {
    const body = 'dolorem';
    const requiredSymbol = '!';

    render(
      <Label isRequired requiredSymbol={requiredSymbol}>
        {body}
      </Label>
    );
    expect(screenTL.getByText(body)).toBeInTheDocument();
    expect(screenTL.getByText(requiredSymbol)).toBeInTheDocument();
  });
});
