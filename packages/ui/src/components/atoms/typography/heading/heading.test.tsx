/* eslint-disable max-statements */
import { render, screen as screenTL } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Heading } from './heading';

describe('heading', () => {
  it('renders a H1 element', () => {
    const body = 'This is a H1 element.';
    render(<Heading level={1}>{body}</Heading>);
    expect(screenTL.getByRole('heading', { level: 1 })).toHaveTextContent(body);
  });

  it('renders a H2 element', () => {
    const body = 'This is a H2 element.';
    render(<Heading level={2}>{body}</Heading>);
    expect(screenTL.getByRole('heading', { level: 2 })).toHaveTextContent(body);
  });

  it('renders a H3 element', () => {
    const body = 'This is a H3 element.';
    render(<Heading level={3}>{body}</Heading>);
    expect(screenTL.getByRole('heading', { level: 3 })).toHaveTextContent(body);
  });

  it('renders a H4 element', () => {
    const body = 'This is a H4 element.';
    render(<Heading level={4}>{body}</Heading>);
    expect(screenTL.getByRole('heading', { level: 4 })).toHaveTextContent(body);
  });

  it('renders a H5 element', () => {
    const body = 'This is a H5 element.';
    render(<Heading level={5}>{body}</Heading>);
    expect(screenTL.getByRole('heading', { level: 5 })).toHaveTextContent(body);
  });

  it('renders a H6 element', () => {
    const body = 'This is a H6 element.';
    render(<Heading level={6}>{body}</Heading>);
    expect(screenTL.getByRole('heading', { level: 6 })).toHaveTextContent(body);
  });

  it('render a fake H1', () => {
    const body = 'This is a fake H1 element.';
    render(
      <Heading isFake level={1}>
        {body}
      </Heading>
    );
    expect(
      screenTL.queryByRole('heading', { level: 1, name: body })
    ).not.toBeInTheDocument();
    expect(screenTL.getByText(body)).toBeInTheDocument();
  });

  it('render a fake H2', () => {
    const body = 'This is a fake H2 element.';
    render(
      <Heading isFake level={2}>
        {body}
      </Heading>
    );
    expect(
      screenTL.queryByRole('heading', { level: 2, name: body })
    ).not.toBeInTheDocument();
    expect(screenTL.getByText(body)).toBeInTheDocument();
  });

  it('render a fake H3', () => {
    const body = 'This is a fake H3 element.';
    render(
      <Heading isFake level={3}>
        {body}
      </Heading>
    );
    expect(
      screenTL.queryByRole('heading', { level: 3, name: body })
    ).not.toBeInTheDocument();
    expect(screenTL.getByText(body)).toBeInTheDocument();
  });

  it('render a fake H4', () => {
    const body = 'This is a fake H4 element.';
    render(
      <Heading isFake level={4}>
        {body}
      </Heading>
    );
    expect(
      screenTL.queryByRole('heading', { level: 4, name: body })
    ).not.toBeInTheDocument();
    expect(screenTL.getByText(body)).toBeInTheDocument();
  });

  it('render a fake H5', () => {
    const body = 'This is a fake H5 element.';
    render(
      <Heading isFake level={5}>
        {body}
      </Heading>
    );
    expect(
      screenTL.queryByRole('heading', { level: 5, name: body })
    ).not.toBeInTheDocument();
    expect(screenTL.getByText(body)).toBeInTheDocument();
  });

  it('render a fake H6', () => {
    const body = 'This is a fake H6 element.';
    render(
      <Heading isFake level={6}>
        {body}
      </Heading>
    );
    expect(
      screenTL.queryByRole('heading', { level: 6, name: body })
    ).not.toBeInTheDocument();
    expect(screenTL.getByText(body)).toBeInTheDocument();
  });
});
