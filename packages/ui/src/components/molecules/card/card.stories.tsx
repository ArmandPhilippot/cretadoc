import type { Meta, StoryObj } from '@storybook/react';
import { Button, Heading, Img, Link } from '../../atoms';
import { Card } from './card';

const meta = {
  title: 'Components/Molecules/Card',
  component: Card,
} satisfies Meta<typeof Card>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const CoverOnly: Story = {
  args: {
    cover: <Img alt="The card cover" src="https://picsum.photos/640/480" />,
  },
};

export const HeadingOnly: Story = {
  args: {
    heading: <Heading level={2}>Card title</Heading>,
  },
};

export const ExcerptOnly: Story = {
  args: {
    excerpt:
      'Enim rem nisi et. Sequi ut veniam dolores est eius sed quo dolores. Quia porro adipisci. Id doloremque sint non magnam corporis eum voluptates quam. Ipsum iste cum magni.',
  },
};

export const SingleActionOnly: Story = {
  args: {
    actions: <Link to="#card">Read more</Link>,
  },
};

export const MultipleActionsOnly: Story = {
  args: {
    actions: [
      <Button key="like-btn">Like</Button>,
      <Link key="read-more-link" to="#card">
        Read more
      </Link>,
    ],
  },
};

export const CoverAndHeading: Story = {
  args: {
    ...CoverOnly.args,
    heading: (
      <Heading level={2}>
        <Link to="#another-page">Card title</Link>
      </Heading>
    ),
  },
};

export const CoverAndExcerpt: Story = {
  args: {
    ...CoverOnly.args,
    ...ExcerptOnly.args,
  },
};

export const CoverAndActions: Story = {
  args: {
    ...CoverOnly.args,
    actions: <Button>Expand</Button>,
  },
};

export const ExcerptAndHeading: Story = {
  args: {
    ...ExcerptOnly.args,
    heading: (
      <Heading level={2}>
        <Link to="#another-page">Card title</Link>
      </Heading>
    ),
  },
};

export const ExcerptAndActions: Story = {
  args: {
    ...ExcerptOnly.args,
    ...SingleActionOnly.args,
  },
};

export const HeadingAndActions: Story = {
  args: {
    ...HeadingOnly.args,
    ...SingleActionOnly.args,
  },
};

export const CoverExcerptAndHeading: Story = {
  args: {
    ...CoverOnly.args,
    ...ExcerptOnly.args,
    heading: (
      <Heading level={2}>
        <Link to="#another-page">Card title</Link>
      </Heading>
    ),
  },
};

export const CoverExcerptAndActions: Story = {
  args: {
    ...CoverOnly.args,
    ...ExcerptOnly.args,
    ...SingleActionOnly.args,
  },
};

export const CoverHeadingAndActions: Story = {
  args: {
    ...CoverOnly.args,
    ...HeadingOnly.args,
    ...SingleActionOnly.args,
  },
};

export const ExcerptHeadingAndActions: Story = {
  args: {
    ...ExcerptOnly.args,
    ...HeadingOnly.args,
    ...SingleActionOnly.args,
  },
};

export const All: Story = {
  args: {
    ...CoverOnly.args,
    ...ExcerptOnly.args,
    ...HeadingOnly.args,
    ...MultipleActionsOnly.args,
  },
};
