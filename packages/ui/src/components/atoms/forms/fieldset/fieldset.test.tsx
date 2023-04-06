import { render, screen as screenTL } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Field } from '../field/field';
import { Fieldset } from './fieldset';

describe('fieldset', () => {
  it('renders a group of form elements', () => {
    render(
      <Fieldset>
        <Field type="text" />
      </Fieldset>
    );
    expect(screenTL.getByRole('group')).toBeInTheDocument();
    expect(screenTL.getByRole('textbox')).toBeInTheDocument();
  });

  it('renders a disabled group of form elements', () => {
    render(
      <Fieldset isDisabled>
        <Field type="text" />
      </Fieldset>
    );
    expect(screenTL.getByRole('group')).toBeDisabled();
    expect(screenTL.getByRole('textbox')).toBeDisabled();
  });
});
