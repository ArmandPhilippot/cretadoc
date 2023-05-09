import { render, screen as screenTL } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Footer } from '../footer';
import { Header } from '../header';
import { Main } from '../main';
import { Layout } from './layout';

describe('layout', () => {
  it('renders a header, a main element and a footer', () => {
    const header = 'iusto quasi consectetur';
    const body = 'rerum nobis quia';
    const footer = 'explicabo eius ut';
    render(
      <Layout>
        <Header>{header}</Header>
        <Main>{body}</Main>
        <Footer>{footer}</Footer>
      </Layout>
    );
    expect(screenTL.getByText(header)).toBeInTheDocument();
    expect(screenTL.getByRole('main')).toHaveTextContent(body);
    expect(screenTL.getByText(footer)).toBeInTheDocument();
  });
});
