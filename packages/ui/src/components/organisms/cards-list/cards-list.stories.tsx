import type { Meta, StoryObj } from '@storybook/react';
import { useEffect, useState } from 'react';
import { Card } from '../../molecules';
import { All } from '../../molecules/card/card.stories';
import { type CardItem, CardsList, type CardsListProps } from './cards-list';

type RenderCardsListProps<T extends boolean> = CardsListProps<T> & {
  cardsNumber?: number;
};

const RenderCardsList = <T extends boolean>({
  cardsNumber = 2,
  items: _items,
  ...args
}: RenderCardsListProps<T>) => {
  const [items, setItems] = useState<CardItem[]>([]);

  useEffect(() => {
    setItems(
      Array.from({ length: cardsNumber }, (_v, k) => k).map((id) => {
        return { id: `card-${id}`, card: <Card {...All.args} /> };
      })
    );
  }, [cardsNumber]);

  return <CardsList {...args} items={items} />;
};

const meta = {
  title: 'Components/Organisms/Cards List',
  component: CardsList,
  argTypes: {
    maxCardWidth: {
      control: {
        type: 'text',
      },
      description:
        'Define the max width of a card: a length or percentage with unit.',
      table: {
        category: 'Options',
        defaultValue: { summary: '35ch' },
      },
      type: {
        name: 'string',
        required: false,
      },
    },
  },
  render: RenderCardsList,
} satisfies Meta<typeof CardsList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {
    cardsNumber: 3,
    items: [],
    maxCardWidth: '35ch',
  },
};
