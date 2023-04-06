import { render, screen as screenTL } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Fieldset } from '../fieldset';
import { Legend } from './legend';

describe('legend', () => {
  it('renders the fieldset legend', () => {
    const body = 'deserunt';
    render(
      <Fieldset>
        <Legend>{body}</Legend>
      </Fieldset>
    );
    expect(screenTL.getByRole('group')).toHaveTextContent(body);
  });
});
