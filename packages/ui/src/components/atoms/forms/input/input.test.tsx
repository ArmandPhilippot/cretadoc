/* eslint-disable max-statements */
import { render, screen as screenTL } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Input } from './input';

describe('input', () => {
  it('renders a date input', () => {
    const { container } = render(<Input type="date" />);
    expect(container.querySelector('input')).toHaveAttribute('type', 'date');
  });

  it('renders a datetime input', () => {
    const { container } = render(<Input type="datetime-local" />);
    expect(container.querySelector('input')).toHaveAttribute(
      'type',
      'datetime-local'
    );
  });

  it('renders an email input', () => {
    render(<Input type="email" />);
    expect(screenTL.getByRole('textbox')).toHaveAttribute('type', 'email');
  });

  it('renders a month input', () => {
    const { container } = render(<Input type="month" />);
    expect(container.querySelector('input')).toHaveAttribute('type', 'month');
  });

  it('renders a number input', () => {
    render(<Input type="number" />);
    expect(screenTL.getByRole('spinbutton')).toHaveAttribute('type', 'number');
  });

  it('renders a password input', () => {
    const { container } = render(<Input type="password" />);
    expect(container.querySelector('input')).toHaveAttribute(
      'type',
      'password'
    );
  });

  it('renders a search input', () => {
    render(<Input type="search" />);
    expect(screenTL.getByRole('searchbox')).toHaveAttribute('type', 'search');
  });

  it('renders a tel input', () => {
    render(<Input type="tel" />);
    expect(screenTL.getByRole('textbox')).toHaveAttribute('type', 'tel');
  });

  it('renders a text input', () => {
    render(<Input type="text" />);
    expect(screenTL.getByRole('textbox')).toHaveAttribute('type', 'text');
  });

  it('renders a time input', () => {
    const { container } = render(<Input type="time" />);
    expect(container.querySelector('input')).toHaveAttribute('type', 'time');
  });

  it('renders an url input', () => {
    render(<Input type="url" />);
    expect(screenTL.getByRole('textbox')).toHaveAttribute('type', 'url');
  });

  it('renders a week input', () => {
    const { container } = render(<Input type="week" />);
    expect(container.querySelector('input')).toHaveAttribute('type', 'week');
  });

  it('renders a disabled input', () => {
    render(<Input isDisabled type="text" />);
    expect(screenTL.getByRole('textbox')).toBeDisabled();
  });

  it('renders a readonly input', () => {
    render(<Input isReadOnly type="text" />);
    expect(screenTL.getByRole('textbox')).toHaveAttribute('readonly', '');
  });

  it('renders a required input', () => {
    render(<Input isRequired type="text" />);
    expect(screenTL.getByRole('textbox')).toBeRequired();
  });
});
