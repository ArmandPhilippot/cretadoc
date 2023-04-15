import { render, screen as screenTL } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Select, type SelectOption } from './select';

const setValue = () => {
  /** Do nothing. */
};

describe('select', () => {
  const options: SelectOption[] = [
    { label: 'ipsam', value: 'magnam' },
    { label: 'recusandae', value: 'suscipit' },
    { label: 'qui', value: 'explicabo' },
  ];
  const selectedValue = options[1]?.value ?? '';

  it('renders a select element', () => {
    render(
      <Select onChange={setValue} options={options} value={selectedValue} />
    );
    expect(screenTL.getByRole('combobox')).toBeInTheDocument();
  });

  it('renders a select element with multiple attribute', () => {
    render(
      <Select
        multiple={true}
        onChange={setValue}
        options={options}
        value={[selectedValue]}
      />
    );
    expect(screenTL.getByRole('listbox')).toBeInTheDocument();
  });

  it('renders the select options', () => {
    render(
      <Select onChange={setValue} options={options} value={selectedValue} />
    );

    const renderedOptions = screenTL.getAllByRole('option');
    expect(renderedOptions).toHaveLength(options.length);
  });

  it('accepts a placeholder option', () => {
    const placeholder = 'ipsa';

    render(
      <Select
        onChange={setValue}
        options={options}
        placeholder={placeholder}
        value={selectedValue}
      />
    );

    expect(
      screenTL.getByRole('option', { name: placeholder })
    ).toBeInTheDocument();
  });
});
