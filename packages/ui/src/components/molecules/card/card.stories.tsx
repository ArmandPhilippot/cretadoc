import type { Meta, StoryObj } from '@storybook/react';
import { Button, ButtonLink, Heading, Img, Link } from '../../atoms';
import { Card } from './card';

const meta = {
  title: 'Components/Molecules/Card',
  component: Card,
} satisfies Meta<typeof Card>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    heading: <Heading level={2}>Card title</Heading>,
  },
};

export const CoverAndHeading: Story = {
  args: {
    ...Default.args,
    cover: <Img alt="The card cover" src="https://picsum.photos/640/480" />,
  },
};

export const ExcerptAndHeading: Story = {
  args: {
    ...Default.args,
    excerpt:
      'Enim rem nisi et. Sequi ut veniam dolores est eius sed quo dolores. Quia porro adipisci. Id doloremque sint non magnam corporis eum voluptates quam. Ipsum iste cum magni.',
  },
};

export const SingleActionAndHeading: Story = {
  args: {
    ...Default.args,
    actions: <Link to="#card">Read more</Link>,
  },
};

export const MultipleActionsAndHeading: Story = {
  args: {
    ...Default.args,
    actions: [
      <Button key="like-btn">Like</Button>,
      <Link key="read-more-link" to="#card">
        Read more
      </Link>,
    ],
  },
};

export const CoverExcerptAndHeading: Story = {
  args: {
    ...CoverAndHeading.args,
    ...ExcerptAndHeading.args,
  },
};

export const CoverHeadingAndActions: Story = {
  args: {
    ...CoverAndHeading.args,
    ...SingleActionAndHeading.args,
  },
};

export const ExcerptHeadingAndActions: Story = {
  args: {
    ...ExcerptAndHeading.args,
    ...SingleActionAndHeading.args,
  },
};

export const All: Story = {
  args: {
    ...CoverAndHeading.args,
    ...ExcerptAndHeading.args,
    actions: [
      <Button key="like-btn">Like</Button>,
      <ButtonLink key="read-more-link" to="#card">
        Read more
      </ButtonLink>,
    ],
  },
};
