import { render, screen as screenTL } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Article } from './article';

describe('article', () => {
  it('renders an article element', () => {
    const body = 'voluptas laudantium velit';
    render(<Article>{body}</Article>);
    expect(screenTL.getByRole('article')).toHaveTextContent(body);
  });
});
