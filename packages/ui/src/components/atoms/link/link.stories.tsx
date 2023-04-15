import type { Meta, StoryObj } from '@storybook/react';
import { Link } from './link';

const meta = {
  component: Link,
  title: 'Components/Atoms/Link',
} satisfies Meta<typeof Link>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'A link',
    to: '#',
  },
};

export const Lang: Story = {
  args: {
    children: 'Cretadoc repository',
    hrefLang: 'en',
    to: 'https://github.com/ArmandPhilippot/cretadoc',
  },
  render: (args) => (
    <>
      Go to the <Link {...args} />.
    </>
  ),
};
