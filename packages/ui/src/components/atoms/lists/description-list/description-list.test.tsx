import { render, screen as screenTL } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Description } from './description';
import { DescriptionList } from './description-list';
import * as styles from './description-list.css';
import { Group } from './group';
import { Term } from './term';

describe('description-list', () => {
  it('renders a term associated with a description', () => {
    const term = 'sit';
    const description = 'possimus dolore rerum';

    render(
      <DescriptionList>
        <Term>{term}</Term>
        <Description>{description}</Description>
      </DescriptionList>
    );
    expect(screenTL.getByRole('term')).toHaveTextContent(term);
    expect(screenTL.getByRole('definition')).toHaveTextContent(description);
  });

  it('renders a term associated with a description inside a group', () => {
    const term = 'sit';
    const description = 'possimus dolore rerum';

    const { container } = render(
      <DescriptionList>
        <Group>
          <Term>{term}</Term>
          <Description>{description}</Description>
        </Group>
      </DescriptionList>
    );
    expect(container.querySelector('div')).toBeInTheDocument();
    expect(screenTL.getByRole('term')).toHaveTextContent(term);
    expect(screenTL.getByRole('definition')).toHaveTextContent(description);
  });

  it('accepts a spacing attribute', () => {
    const term = 'sit';
    const description = 'possimus dolore rerum';

    render(
      <DescriptionList spacing="lg">
        <Term>{term}</Term>
        <Description>{description}</Description>
      </DescriptionList>
    );
    expect(screenTL.getByRole('term')).toHaveTextContent(term);
    expect(screenTL.getByRole('definition')).toHaveTextContent(description);
  });

  it('renders a group with spacing attribute', () => {
    const term = 'sit';
    const description = 'possimus dolore rerum';

    render(
      <DescriptionList>
        <Group spacing="sm">
          <Term>{term}</Term>
          <Description>{description}</Description>
        </Group>
      </DescriptionList>
    );
    expect(screenTL.getByRole('term')).toHaveTextContent(term);
    expect(screenTL.getByRole('definition')).toHaveTextContent(description);
  });

  it('renders an inlined list', () => {
    const term = 'sit';
    const description = 'possimus dolore rerum';

    const { container } = render(
      <DescriptionList isInline>
        <Term>{term}</Term>
        <Description>{description}</Description>
      </DescriptionList>
    );
    expect(container.querySelector('dl')).toHaveClass(
      styles.list({ isInline: true })
    );
    expect(screenTL.getByRole('term')).toHaveTextContent(term);
    expect(screenTL.getByRole('definition')).toHaveTextContent(description);
  });

  it('renders an inlined group', () => {
    const term = 'sit';
    const description = 'possimus dolore rerum';

    const { container } = render(
      <DescriptionList>
        <Group isInline>
          <Term>{term}</Term>
          <Description>{description}</Description>
        </Group>
      </DescriptionList>
    );
    expect(container.querySelector('div')).toHaveClass(
      styles.group({ isInline: true })
    );
    expect(screenTL.getByRole('term')).toHaveTextContent(term);
    expect(screenTL.getByRole('definition')).toHaveTextContent(description);
  });
});
