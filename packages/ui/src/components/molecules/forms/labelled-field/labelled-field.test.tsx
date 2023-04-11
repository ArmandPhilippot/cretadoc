import { render, screen as screenTL } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Checkbox, Field, Radio, Select } from '../../../atoms';
import { LabelledField } from './labelled-field';

describe('labelled-field', () => {
  it('renders a labelled checkbox', () => {
    const label = 'aliquid';
    render(
      <LabelledField
        field={<Checkbox id="checkbox" name="checkbox" />}
        label={label}
      />
    );
    expect(screenTL.getByLabelText(label)).toBeInTheDocument();
  });

  it('renders a labelled text field', () => {
    const label = 'aliquid';
    const type = 'text';
    render(
      <LabelledField
        field={<Field id="field" name="field" type={type} />}
        label={label}
      />
    );
    expect(screenTL.getByLabelText(label)).toHaveAttribute('type', type);
  });

  it('renders a labelled radio button', () => {
    const label = 'aliquid';
    render(
      <LabelledField field={<Radio id="radio" name="radio" />} label={label} />
    );
    expect(screenTL.getByLabelText(label)).toBeInTheDocument();
  });

  it('renders a labelled select', () => {
    const label = 'aliquid';
    render(
      <LabelledField
        field={<Select id="select" name="select" options={[]} value="" />}
        label={label}
      />
    );
    expect(screenTL.getByLabelText(label)).toBeInTheDocument();
  });
});
