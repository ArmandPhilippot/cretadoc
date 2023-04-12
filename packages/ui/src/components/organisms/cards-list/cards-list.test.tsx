import { render, screen as screenTL } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Card } from '../../molecules';
import { CardsList } from './cards-list';

describe('cards-list', () => {
  it('renders the right number of cards', () => {
    const cards = ['Card1', 'Card2', 'Card3', 'Card4'];
    render(
      <CardsList>
        {cards.map((card) => (
          <Card key={card} excerpt={card} />
        ))}
      </CardsList>
    );
    expect(screenTL.getAllByRole('listitem')).toHaveLength(cards.length);
  });
});
