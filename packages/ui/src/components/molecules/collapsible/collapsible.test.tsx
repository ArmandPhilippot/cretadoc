import { fireEvent, render, screen as screenTL } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Icon } from '../../atoms';
import { Collapsible } from './collapsible';

const icon = (
  <Icon animationSpeed="fast" color="primary" shape="angle" size="sm" />
);

describe('collapsible', () => {
  it('renders a collapsed content', () => {
    const summary = 'facilis et hic';
    const body = 'possimus iste est';
    render(
      <Collapsible icon={icon} summary={summary}>
        {body}
      </Collapsible>
    );
    expect(screenTL.getByRole('button', { name: summary })).toBeVisible();
    expect(screenTL.getByText(body)).toBeInTheDocument();
    expect(screenTL.getByText(body)).not.toBeVisible();
  });

  it('calls onExpand prop on click', () => {
    const onExpand = vi.fn();
    const summary = 'facilis et hic';
    const body = 'possimus iste est';
    render(
      <Collapsible icon={icon} onExpand={onExpand} summary={summary}>
        {body}
      </Collapsible>
    );
    expect(screenTL.getByText(body)).not.toBeVisible();
    fireEvent.click(screenTL.getByText(summary));
    expect(onExpand).toHaveBeenCalledOnce();
  });

  it('can render a dissociated button', () => {
    const expandLabel = 'magni';
    const summary = 'facilis et hic';
    const body = 'possimus iste est';
    render(
      <Collapsible
        expandBtnLabel={expandLabel}
        hasDissociatedBtn
        icon={icon}
        summary={summary}
      >
        {body}
      </Collapsible>
    );
    expect(
      screenTL.queryByRole('button', { name: summary })
    ).not.toBeInTheDocument();
    expect(screenTL.getByText(summary)).toBeInTheDocument();
    expect(
      screenTL.getByRole('button', { name: expandLabel })
    ).toBeInTheDocument();
  });
});
