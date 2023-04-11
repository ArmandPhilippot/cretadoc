import { render, screen as screenTL } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Button, Heading, Img, Link } from '../../atoms';
import { Card } from './card';

describe('card', () => {
  it('accepts a cover', () => {
    const alt = 'voluptatem';
    const src = 'https://picsum.photos/640/480';

    render(<Card cover={<Img alt={alt} src={src} />} />);
    expect(screenTL.getByRole('img', { name: alt })).toHaveAttribute(
      'src',
      src
    );
  });

  it('accepts a heading', () => {
    const level = 2;
    const title = 'praesentium deleniti in';

    render(<Card heading={<Heading level={level}>{title}</Heading>} />);
    expect(screenTL.getByRole('heading', { level })).toHaveTextContent(title);
  });

  it('accepts an excerpt', () => {
    const excerpt =
      'Qui dignissimos culpa et repellat quod et aut exercitationem voluptatem.';

    render(<Card excerpt={excerpt} />);
    expect(screenTL.getByText(excerpt)).toBeInTheDocument();
  });

  it('accepts one action', () => {
    const cta = 'eaque';
    const target = '#';

    render(<Card actions={<Link to={target}>{cta}</Link>} />);
    expect(screenTL.getByRole('link', { name: cta })).toHaveAttribute(
      'href',
      target
    );
  });

  it('accepts multiple actions', () => {
    const action1 = {
      cta: 'nobis',
      target: '/an-url',
    };

    const action2 = {
      cta: 'unde',
      onClick: () => {
        /* Do nothing. */
      },
    };

    render(
      <Card
        actions={[
          <Link key="action1" to={action1.target}>
            {action1.cta}
          </Link>,
          <Button key="action2" onClick={action2.onClick}>
            {action2.cta}
          </Button>,
        ]}
      />
    );
    expect(screenTL.getByRole('link', { name: action1.cta })).toHaveAttribute(
      'href',
      action1.target
    );
    expect(screenTL.getByRole('button')).toHaveTextContent(action2.cta);
  });
});
