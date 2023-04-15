import type { Meta, StoryObj } from '@storybook/react';
import { ListItem } from '../list-item';
import { List } from './list';

const meta = {
  component: List,
  title: 'Components/Atoms/Lists/List',
} satisfies Meta<typeof List>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: [
      <ListItem key="item-1">Item 1</ListItem>,
      <ListItem key="item-2">Item 2</ListItem>,
      <ListItem key="item-3">Item 3</ListItem>,
    ],
    hasMarker: true,
    isInline: false,
    isOrdered: false,
  },
};

export const OrderedList: Story = {
  args: {
    ...Default.args,
    isOrdered: true,
  },
};

export const UnorderedList: Story = {
  args: {
    ...Default.args,
    isOrdered: false,
  },
};

export const Nested: Story = {
  args: {
    ...Default.args,
    children: [
      <ListItem key="item-1">Item 1</ListItem>,
      <ListItem key="item-2">
        Item 2
        <List isOrdered>
          <ListItem>Nested item 1</ListItem>
          <ListItem>Nested item 2</ListItem>
        </List>
      </ListItem>,
      <ListItem key="item-3">Item 3</ListItem>,
    ],
    isOrdered: false,
  },
};

export const WithMarker: Story = {
  args: {
    ...Default.args,
    hasMarker: true,
  },
};

export const WithoutMarker: Story = {
  args: {
    ...Default.args,
    hasMarker: false,
  },
};

export const InlineList: Story = {
  args: {
    ...Default.args,
    children: [
      <ListItem key="item-1">Item 1</ListItem>,
      <ListItem key="sep-1">{'>'}</ListItem>,
      <ListItem key="item-2">Item 2</ListItem>,
      <ListItem key="sep-2">{'>'}</ListItem>,
      <ListItem key="item-3">Item 3</ListItem>,
    ],
    hasMarker: false,
    isInline: true,
    spacing: 'xs',
  },
};

export const ListInInlineList: Story = {
  args: {
    ...InlineList.args,
    children: [
      <ListItem key="item-1">Item 1</ListItem>,
      <ListItem key="item-2">
        Item 2
        <List>
          <ListItem>Nested item 1</ListItem>
          <ListItem>Nested item 2</ListItem>
        </List>
      </ListItem>,
      <ListItem key="item-3">Item 3</ListItem>,
    ],
  },
};
