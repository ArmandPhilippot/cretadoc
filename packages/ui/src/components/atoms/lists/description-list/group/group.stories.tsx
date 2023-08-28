import type { Meta, StoryObj } from '@storybook/react';
import { Description } from '../description';
import { DescriptionList } from '../description-list';
import { Term } from '../term';
import { Group } from './group';

const meta = {
  title: 'Components/Atoms/Lists/Description List/Group',
  component: Group,
  render: ({ children, ...props }) => (
    <DescriptionList>
      <Group {...props}>{children}</Group>
    </DescriptionList>
  ),
} satisfies Meta<typeof Group>;

export default meta;

type Story = StoryObj<typeof meta>;

const GroupTemplate: Story = {
  args: {
    children: [
      <Term key="term">A term</Term>,
      <Description key="description">A description.</Description>,
    ],
  },
};

export const Stacked: Story = {
  name: 'Alignment: Stacked',
  args: {
    ...GroupTemplate.args,
    isInline: false,
  },
};

export const Inlined: Story = {
  name: 'Alignment: Inlined',
  args: {
    ...GroupTemplate.args,
    isInline: true,
  },
};

export const SpacingXXS: Story = {
  name: 'Spacing: Double extra-small',
  args: {
    ...GroupTemplate.args,
    spacing: 'xxs',
  },
};

export const SpacingXS: Story = {
  name: 'Spacing: Extra-small',
  args: {
    ...GroupTemplate.args,
    spacing: 'xs',
  },
};

export const SpacingSM: Story = {
  name: 'Spacing: Small',
  args: {
    ...GroupTemplate.args,
    spacing: 'sm',
  },
};

export const SpacingMD: Story = {
  name: 'Spacing: Medium',
  args: {
    ...GroupTemplate.args,
    spacing: 'md',
  },
};

export const SpacingLG: Story = {
  name: 'Spacing: Large',
  args: {
    ...GroupTemplate.args,
    spacing: 'lg',
  },
};

export const SpacingXL: Story = {
  name: 'Spacing: Extra-large',
  args: {
    ...GroupTemplate.args,
    spacing: 'xl',
  },
};

export const SpacingXXL: Story = {
  name: 'Spacing: Double extra-large',
  args: {
    ...GroupTemplate.args,
    spacing: 'xxl',
  },
};
