import { render, screen as screenTL } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Checkbox, Input, Radio, Select, TextArea } from '../../../atoms';
import { LabelledField } from './labelled-field';

const handleChange = () => {
  /* Do nothing. */
};

describe('labelled-field', () => {
  it('renders a labelled checkbox', () => {
    const label = 'aliquid';
    render(
      <LabelledField
        field={
          <Checkbox id="checkbox" name="checkbox" onChange={handleChange} />
        }
        label={label}
      />
    );
    expect(screenTL.getByLabelText(label)).toBeInTheDocument();
  });

  it('renders a labelled input', () => {
    const label = 'aliquid';
    const type = 'text';
    render(
      <LabelledField
        field={
          <Input id="input" name="input" onChange={handleChange} type={type} />
        }
        label={label}
      />
    );
    expect(screenTL.getByLabelText(label)).toHaveAttribute('type', type);
  });

  it('renders a labelled radio button', () => {
    const label = 'aliquid';
    render(
      <LabelledField
        field={<Radio id="radio" name="radio" onChange={handleChange} />}
        label={label}
      />
    );
    expect(screenTL.getByLabelText(label)).toBeInTheDocument();
  });

  it('renders a labelled select', () => {
    const label = 'aliquid';
    render(
      <LabelledField
        field={
          <Select
            id="select"
            name="select"
            onChange={handleChange}
            options={[]}
            value=""
          />
        }
        label={label}
      />
    );
    expect(screenTL.getByLabelText(label)).toBeInTheDocument();
  });

  it('renders a labelled textarea', () => {
    const label = 'aliquid';
    render(
      <LabelledField
        field={
          <TextArea id="textarea" name="textarea" onChange={handleChange} />
        }
        label={label}
      />
    );
    expect(screenTL.getByLabelText(label)).toBeInTheDocument();
  });
});
