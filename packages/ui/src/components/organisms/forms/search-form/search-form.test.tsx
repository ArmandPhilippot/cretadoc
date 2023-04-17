import { render, screen as screenTL } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Button, Input } from '../../../atoms';
import { SearchForm } from './search-form';

describe('search-form', () => {
  it('renders a labelled searchbox with a submit button', () => {
    const cta = 'Launch search';
    const label = 'Search:';

    render(
      <SearchForm
        button={<Button type="submit">{cta}</Button>}
        field={<Input id="search" name="search" type="search" />}
        label={label}
      />
    );

    expect(screenTL.getByRole('searchbox')).toHaveAccessibleName(label);
    expect(screenTL.getByRole('button')).toHaveTextContent(cta);
  });
});
