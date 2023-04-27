import type { Meta, StoryObj } from '@storybook/react';
import { ButtonLink } from './button-link';

const meta = {
  component: ButtonLink,
  title: 'Components/Atoms/Buttons/ButtonLink',
} satisfies Meta<typeof ButtonLink>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Button Link',
    isDisabled: false,
    isLoading: false,
    to: '#',
  },
};

export const Primary: Story = {
  name: 'Kind: Primary',
  args: {
    ...Default.args,
    kind: 'primary',
  },
};

export const Secondary: Story = {
  name: 'Kind: Secondary',
  args: {
    ...Default.args,
    kind: 'secondary',
  },
};

export const Neutral: Story = {
  name: 'Kind: Neutral',
  args: {
    ...Default.args,
    kind: 'neutral',
  },
};

export const Enabled: Story = {
  name: 'State: Enabled',
  args: {
    ...Default.args,
    isDisabled: false,
    isLoading: false,
  },
};

export const Disabled: Story = {
  name: 'State: Disabled',
  args: {
    ...Default.args,
    isDisabled: true,
  },
};

export const Loading: Story = {
  name: 'State: Loading',
  args: {
    ...Default.args,
    isLoading: true,
  },
};
