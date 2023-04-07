import { render, screen as screenTL } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { UIProvider } from './context';
import { CustomLink, TestingComponent } from './context.fixtures';

describe('components-provider', () => {
  it('provides expected components context to child elements', () => {
    const target = '/an-url';
    const anchor = 'ducimus';

    render(
      <UIProvider components={{ LinkComponent: CustomLink }}>
        <TestingComponent to={target}>{anchor}</TestingComponent>
      </UIProvider>
    );
    expect(screenTL.getByRole('link', { name: anchor })).toHaveAttribute(
      'href',
      target
    );
  });
});
