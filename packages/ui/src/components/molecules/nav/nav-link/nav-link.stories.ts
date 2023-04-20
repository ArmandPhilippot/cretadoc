import type { Meta, StoryObj } from '@storybook/react';
import { NavLink } from './nav-link';

const meta = {
  title: 'Components/Molecules/Nav/Nav Link',
  component: NavLink,
} satisfies Meta<typeof NavLink>;

export default meta;

type Story = StoryObj<typeof meta>;

const NavLinkTemplate: Story = {
  args: {
    children: 'A nav link',
    to: '#',
  },
};

export const RegularVariant: Story = {
  name: 'Regular',
  args: {
    ...NavLinkTemplate.args,
  },
};

export const BlockVariant: Story = {
  name: 'Block',
  args: {
    ...NavLinkTemplate.args,
    variant: 'block',
  },
};

export const RegularIsDisabled: Story = {
  name: 'Regular: Disabled',
  args: {
    ...RegularVariant.args,
    isDisabled: true,
  },
};

export const RegularIsSelected: Story = {
  name: 'Regular: Selected',
  args: {
    ...RegularVariant.args,
    isSelected: true,
  },
};

export const RegularIsDisabledAndSelected: Story = {
  name: 'Regular: Disabled & Selected',
  args: {
    ...RegularVariant.args,
    isDisabled: true,
    isSelected: true,
  },
};

export const BlockIsDisabled: Story = {
  name: 'Block: Disabled',
  args: {
    ...BlockVariant.args,
    isDisabled: true,
  },
};

export const BlockIsSelected: Story = {
  name: 'Block: Selected',
  args: {
    ...BlockVariant.args,
    isSelected: true,
  },
};

export const BlockIsDisabledAndSelected: Story = {
  name: 'Block: Disabled & Selected',
  args: {
    ...BlockVariant.args,
    isDisabled: true,
    isSelected: true,
  },
};

export const BlockRadiusBoth: Story = {
  name: 'Block: Radius on both sides',
  args: {
    ...BlockIsSelected.args,
    radiusOn: 'both',
  },
};

export const BlockRadiusLeft: Story = {
  name: 'Block: Radius on left side',
  args: {
    ...BlockIsSelected.args,
    radiusOn: 'left',
  },
};

export const BlockRadiusRight: Story = {
  name: 'Block: Radius on right side',
  args: {
    ...BlockIsSelected.args,
    radiusOn: 'right',
  },
};
