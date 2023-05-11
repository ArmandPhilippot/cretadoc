import { render, screen as screenTL } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Heading } from '../../atoms';
import { Card } from '../../molecules';
import { CardsList } from './cards-list';

describe('cards-list', () => {
  it('renders the right number of cards', () => {
    const cardsNumber = 5;
    const cards = Array.from({ length: cardsNumber }, (_v, k) => k);
    render(
      <CardsList
        items={cards.map((id) => {
          return {
            id: `card-${id}`,
            card: (
              <Card
                heading={<Heading level={2}>dignissimos cum nisi</Heading>}
              />
            ),
          };
        })}
      />
    );
    expect(screenTL.getAllByRole('listitem')).toHaveLength(cards.length);
  });
});
