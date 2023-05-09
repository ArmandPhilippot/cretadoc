import { type FC, useCallback } from 'react';
import { Heading, Link, VisuallyHidden } from '../atoms';
import { Card } from '../molecules';
import { type CardItem, CardsList, Pagination } from '../organisms';
import { Template } from './template';

export const WikiTemplate: FC = () => {
  const cards: CardItem[] = [
    {
      card: (
        <Card
          actions={
            <Link to="#">
              Read more<VisuallyHidden> about Card 1</VisuallyHidden>
            </Link>
          }
          excerpt="Illum dolorum officiis est dolorem ut expedita sunt quis natus. Eum et totam ratione aut omnis a. Magni sit magni."
          heading={<Heading level={2}>Card 1</Heading>}
        />
      ),
      id: 'card-1',
    },
    {
      card: (
        <Card
          actions={
            <Link to="#">
              Read more<VisuallyHidden> about Card 2</VisuallyHidden>
            </Link>
          }
          excerpt="Illum dolorum officiis est dolorem ut expedita sunt quis natus. Eum et totam ratione aut omnis a. Magni sit magni."
          heading={<Heading level={2}>Card 2</Heading>}
        />
      ),
      id: 'card-2',
    },
    {
      card: (
        <Card
          actions={
            <Link to="#">
              Read more<VisuallyHidden> about Card 3</VisuallyHidden>
            </Link>
          }
          excerpt="Illum dolorum officiis est dolorem ut expedita sunt quis natus. Eum et totam ratione aut omnis a. Magni sit magni."
          heading={<Heading level={2}>Card 3</Heading>}
        />
      ),
      id: 'card-3',
    },
    {
      card: (
        <Card
          actions={
            <Link to="#">
              Read more<VisuallyHidden> about Card 4</VisuallyHidden>
            </Link>
          }
          excerpt="Illum dolorum officiis est dolorem ut expedita sunt quis natus. Eum et totam ratione aut omnis a. Magni sit magni."
          heading={<Heading level={2}>Card 4</Heading>}
        />
      ),
      id: 'card-4',
    },
    {
      card: (
        <Card
          actions={
            <Link to="#">
              Read more<VisuallyHidden> about Card 5</VisuallyHidden>
            </Link>
          }
          excerpt="Illum dolorum officiis est dolorem ut expedita sunt quis natus. Eum et totam ratione aut omnis a. Magni sit magni."
          heading={<Heading level={2}>Card 5</Heading>}
        />
      ),
      id: 'card-5',
    },
    {
      card: (
        <Card
          actions={
            <Link to="#">
              Read more<VisuallyHidden> about Card 6</VisuallyHidden>
            </Link>
          }
          excerpt="Illum dolorum officiis est dolorem ut expedita sunt quis natus. Eum et totam ratione aut omnis a. Magni sit magni."
          heading={<Heading level={2}>Card 6</Heading>}
        />
      ),
      id: 'card-6',
    },
    {
      card: (
        <Card
          actions={
            <Link to="#">
              Read more<VisuallyHidden> about Card 7</VisuallyHidden>
            </Link>
          }
          excerpt="Illum dolorum officiis est dolorem ut expedita sunt quis natus. Eum et totam ratione aut omnis a. Magni sit magni."
          heading={<Heading level={2}>Card 7</Heading>}
        />
      ),
      id: 'card-7',
    },
    {
      card: (
        <Card
          actions={
            <Link to="#">
              Read more<VisuallyHidden> about Card 8</VisuallyHidden>
            </Link>
          }
          excerpt="Illum dolorum officiis est dolorem ut expedita sunt quis natus. Eum et totam ratione aut omnis a. Magni sit magni."
          heading={<Heading level={2}>Card 8</Heading>}
        />
      ),
      id: 'card-8',
    },
  ];
  const renderLink = useCallback((page: number) => `#${page}`, []);

  return (
    <Template>
      <Heading level={1}>Wiki</Heading>
      <CardsList items={cards} />
      <Pagination current={1} total={6} renderLink={renderLink} />
    </Template>
  );
};
