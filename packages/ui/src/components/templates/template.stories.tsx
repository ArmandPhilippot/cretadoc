import type { Meta, StoryObj } from '@storybook/react';
import { Template } from './template';
import { HomePageTemplate } from './template-homepage';
import { WikiTemplate } from './template-wiki';

const meta = {
  title: 'Components/Templates',
  component: Template,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Template>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Homepage: Story = {
  render: () => <HomePageTemplate />,
};

export const Wiki: Story = {
  render: () => <WikiTemplate />,
};
