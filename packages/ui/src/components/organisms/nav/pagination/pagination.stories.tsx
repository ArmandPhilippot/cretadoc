import type { Meta, StoryObj } from '@storybook/react';
import { Pagination, type RenderPaginationItemAriaLabel } from './pagination';

const meta = {
  title: 'Components/Organisms/Nav/Pagination',
  component: Pagination,
} satisfies Meta<typeof Pagination>;

export default meta;

type Story = StoryObj<typeof meta>;

const PaginationTemplate: Story = {
  args: {
    current: 1,
    renderLink: (page) => `#${page}`,
    total: 10,
  },
};

export const FirstPageSelected: Story = {
  name: 'Selected: first page',
  args: {
    ...PaginationTemplate.args,
    current: 1,
  },
};

export const InnerPageSelected: Story = {
  name: 'Selected: inner page',
  args: {
    ...PaginationTemplate.args,
    current: 4,
    total: 10,
  },
};

export const LastPageSelected: Story = {
  name: 'Selected: last page',
  args: {
    ...PaginationTemplate.args,
    current: 10,
    total: 10,
  },
};

export const Siblings: Story = {
  args: {
    ...PaginationTemplate.args,
    current: 10,
    siblings: 3,
    total: 20,
  },
};

export const BackwardForwardLabel: Story = {
  name: 'Previous & Next: label',
  args: {
    ...InnerPageSelected.args,
    renderNextLinkLabel: (icon) => <>Next {icon}</>,
    renderPrevLinkLabel: (icon) => <>{icon} Previous</>,
  },
};

export const BackwardForwardHidden: Story = {
  name: 'Previous & Next: hidden',
  args: {
    ...InnerPageSelected.args,
    hideNextLink: true,
    hidePrevLink: true,
  },
};

const renderItemAriaLabel: RenderPaginationItemAriaLabel = (
  kind,
  num,
  isSelected
) => {
  switch (kind) {
    case 'next':
      return `Go to next page (page ${num})`;
    case 'previous':
      return `Go to previous page (page ${num})`;
    case 'number':
    default:
      return `Page ${num}${isSelected ? ', current page' : ''}`;
  }
};

export const AriaLabels: Story = {
  args: {
    ...InnerPageSelected.args,
    renderItemAriaLabel,
  },
};

export const VariantBorderedPageNumbers: Story = {
  name: 'Variant: bordered page numbers',
  args: {
    ...PaginationTemplate.args,
    isPageNumbersBordered: true,
  },
};

export const VariantBorderedBackwardForward: Story = {
  name: 'Variant: bordered next & previous links',
  args: {
    ...PaginationTemplate.args,
    isBackwardForwardBordered: true,
  },
};

export const VariantBordered: Story = {
  name: 'Variant: bordered',
  args: {
    ...PaginationTemplate.args,
    isBackwardForwardBordered: true,
    isPageNumbersBordered: true,
  },
};
