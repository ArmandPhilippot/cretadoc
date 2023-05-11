import { render, screen as screenTL } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Aside } from './aside';

describe('aside', () => {
  it('renders an aside element', () => {
    const body = 'voluptas laudantium velit';
    render(<Aside>{body}</Aside>);
    expect(screenTL.getByRole('complementary')).toHaveTextContent(body);
  });
});
