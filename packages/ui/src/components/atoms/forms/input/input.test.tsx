/* eslint-disable max-statements */
import { render, screen as screenTL } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Input } from './input';

describe('input', () => {
  it('renders a date input', () => {
    const { container } = render(
      <Input id="date-field" name="date-field" type="date" />
    );
    expect(container.querySelector('input')).toHaveAttribute('type', 'date');
  });

  it('renders a datetime input', () => {
    const { container } = render(
      <Input id="datetime-field" name="datetime-field" type="datetime-local" />
    );
    expect(container.querySelector('input')).toHaveAttribute(
      'type',
      'datetime-local'
    );
  });

  it('renders an email input', () => {
    render(<Input id="email-field" name="email-field" type="email" />);
    expect(screenTL.getByRole('textbox')).toHaveAttribute('type', 'email');
  });

  it('renders a month input', () => {
    const { container } = render(
      <Input id="month-field" name="month-field" type="month" />
    );
    expect(container.querySelector('input')).toHaveAttribute('type', 'month');
  });

  it('renders a number input', () => {
    render(<Input id="number-field" name="number-field" type="number" />);
    expect(screenTL.getByRole('spinbutton')).toHaveAttribute('type', 'number');
  });

  it('renders a password input', () => {
    const { container } = render(
      <Input id="password-field" name="password-field" type="password" />
    );
    expect(container.querySelector('input')).toHaveAttribute(
      'type',
      'password'
    );
  });

  it('renders a search input', () => {
    render(<Input id="search-field" name="search-field" type="search" />);
    expect(screenTL.getByRole('searchbox')).toHaveAttribute('type', 'search');
  });

  it('renders a tel input', () => {
    render(<Input id="tel-field" name="tel-field" type="tel" />);
    expect(screenTL.getByRole('textbox')).toHaveAttribute('type', 'tel');
  });

  it('renders a text input', () => {
    render(<Input id="text-field" name="text-field" type="text" />);
    expect(screenTL.getByRole('textbox')).toHaveAttribute('type', 'text');
  });

  it('renders a time input', () => {
    const { container } = render(
      <Input id="time-field" name="time-field" type="time" />
    );
    expect(container.querySelector('input')).toHaveAttribute('type', 'time');
  });

  it('renders an url input', () => {
    render(<Input id="url-field" name="url-field" type="url" />);
    expect(screenTL.getByRole('textbox')).toHaveAttribute('type', 'url');
  });

  it('renders a week input', () => {
    const { container } = render(
      <Input id="week-field" name="week-field" type="week" />
    );
    expect(container.querySelector('input')).toHaveAttribute('type', 'week');
  });

  it('renders a disabled input', () => {
    render(
      <Input isDisabled id="disabled-field" name="disabled-field" type="text" />
    );
    expect(screenTL.getByRole('textbox')).toBeDisabled();
  });

  it('renders a readonly input', () => {
    render(
      <Input isReadOnly id="readonly-field" name="readonly-field" type="text" />
    );
    expect(screenTL.getByRole('textbox')).toHaveAttribute('readonly', '');
  });

  it('renders a required input', () => {
    render(
      <Input isRequired id="required-field" name="required-field" type="text" />
    );
    expect(screenTL.getByRole('textbox')).toBeRequired();
  });
});
