import { render, screen as screenTL } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { RadioGroup, type RadioGroupItem } from './radio-group';

const handleChange = () => {
  /* Do nothing. */
};

describe('radio-group', () => {
  it('renders a group of labelled radio buttons', () => {
    const items: RadioGroupItem[] = [
      { id: 'option-1', label: 'Option 1', value: 'option-1' },
      { id: 'option-2', label: 'Option 2', value: 'option-2' },
      { id: 'option-3', label: 'Option 3', value: 'option-3' },
    ];
    const legend = 'sint ratione voluptate';
    const name = 'voluptas';

    render(
      <RadioGroup
        items={items}
        legend={legend}
        name={name}
        onChange={handleChange}
      />
    );

    const radios = screenTL.getAllByRole('radio');
    expect(
      screenTL.getByRole('radiogroup', { name: legend })
    ).toBeInTheDocument();
    expect(radios).toHaveLength(items.length);
  });
});
