import type { Meta, StoryObj } from '@storybook/react';
import { contract } from '../../../../../themes';
import { Description } from '../description';
import { DescriptionList } from '../description-list';
import { Term } from './term';

const meta = {
  title: 'Components/Atoms/Lists/Description List/Term',
  component: Term,
  render: ({ children, ...props }) => (
    <DescriptionList>
      <Term {...props}>{children}</Term>
      <Description>The description of the term.</Description>
    </DescriptionList>
  ),
} satisfies Meta<typeof Term>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'A term to describe.',
  },
};

export const ColorCritical: Story = {
  name: 'Color: Critical',
  args: {
    ...Default.args,
    color: 'critical',
  },
};

export const ColorInfo: Story = {
  name: 'Color: Info',
  args: {
    ...Default.args,
    color: 'info',
  },
};

export const ColorInverted: Story = {
  name: 'Color: Inverted',
  args: {
    ...Default.args,
    color: 'inverted',
    style: { background: contract.color.background.inverted.base },
  },
};

export const ColorMuted: Story = {
  name: 'Color: Muted',
  args: {
    ...Default.args,
    color: 'muted',
  },
};

export const ColorRegular: Story = {
  name: 'Color: Regular',
  args: {
    ...Default.args,
    color: 'regular',
  },
};

export const ColorSuccess: Story = {
  name: 'Color: Success',
  args: {
    ...Default.args,
    color: 'success',
  },
};

export const ColorWarning: Story = {
  name: 'Color: Warning',
  args: {
    ...Default.args,
    color: 'warning',
  },
};
