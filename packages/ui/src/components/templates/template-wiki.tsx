import { type FC, useCallback } from 'react';
import { Article, Header, Heading, Link, VisuallyHidden } from '../atoms';
import { Card } from '../molecules';
import {
  type CardItem,
  CardsList,
  Pagination,
  type BreadcrumbsItem,
} from '../organisms';
import { Template } from './template';
import * as styles from './template.css';

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
  const pageTitle = 'Wiki';
  const breadcrumbs: BreadcrumbsItem[] = [
    { id: 'home', label: 'Home', url: '/' },
    {
      id: 'wiki',
      label: pageTitle,
      url: '/?path=/story/components-templates--homepage',
    },
  ];

  return (
    <Template breadcrumbs={breadcrumbs} isWiki>
      <Article className={styles.page({ hasTwoColumns: false })}>
        <Header>
          <Heading level={1}>{pageTitle}</Heading>
        </Header>
        <div>
          <CardsList items={cards} />
          <Pagination
            aria-label="Wiki pagination"
            alignment="center"
            current={1}
            total={6}
            renderLink={renderLink}
          />
        </div>
      </Article>
    </Template>
  );
};
