import type { Meta, StoryObj } from '@storybook/react';
import { List } from './list';
import { ListItem } from './list-item';

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
          <ListItem>
            Nested item 3
            <List>
              <ListItem>Deeper item 1</ListItem>
              <ListItem>Deeper item 2</ListItem>
              <ListItem>Deeper item 3</ListItem>
            </List>
          </ListItem>
        </List>
      </ListItem>,
      <ListItem key="item-3">Item 3</ListItem>,
    ],
    isOrdered: false,
  },
};

export const HierarchicalList: Story = {
  args: {
    ...OrderedList.args,
    children: [
      <ListItem key="item-1">
        Item 1
        <List isHierarchical isOrdered>
          <ListItem>Subitem 1</ListItem>
          <ListItem>Subitem 2</ListItem>
        </List>
      </ListItem>,
      <ListItem key="item-2">
        Item 2
        <List isHierarchical isOrdered>
          <ListItem>Subitem 1</ListItem>
          <ListItem>
            Subitem 2
            <List isHierarchical isOrdered>
              <ListItem>Nested item 1</ListItem>
              <ListItem>Nested item 2</ListItem>
            </List>
          </ListItem>
          <ListItem>Subitem 3</ListItem>
        </List>
      </ListItem>,
      <ListItem key="item-3">Item 3</ListItem>,
    ],
    isHierarchical: true,
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

export const WithBorderedItems: Story = {
  args: {
    ...Default.args,
    children: [
      <ListItem isBordered key="item-1" paddingBlock="xs" paddingInline="xxs">
        Item 1
      </ListItem>,
      <ListItem isBordered key="item-2" paddingBlock="xs" paddingInline="xxs">
        Item 2
      </ListItem>,
      <ListItem isBordered key="item-3" paddingBlock="xs" paddingInline="xxs">
        Item 3
      </ListItem>,
    ],
    hasMarker: false,
    spacing: null,
  },
};

export const InlineWithBorderedItems: Story = {
  args: {
    ...WithBorderedItems.args,
    isInline: true,
    spacing: null,
  },
};
