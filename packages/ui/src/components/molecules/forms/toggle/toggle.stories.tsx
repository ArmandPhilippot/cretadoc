import type { Meta, StoryObj } from '@storybook/react';
import { type ChangeEventHandler, useCallback, useState, useMemo } from 'react';
import { ToggleGroup } from './toggle-group';
import { ToggleItem } from './toggle-item';

const SingleValueTemplate = () => {
  const items = [
    { id: 'single-item-1', label: 'Item 1', name: 'single-item-1' },
    { id: 'single-item-2', label: 'Item 2', name: 'single-item-2' },
    { id: 'single-item-3', label: 'Item 3', name: 'single-item-3' },
  ];
  const [selectedItem, setSelectedItem] = useState<string>();

  const handleToggle: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      setSelectedItem(e.target.id);
    },
    []
  );

  return (
    <ToggleGroup>
      {items.map((item) => (
        <ToggleItem
          key={item.id}
          {...item}
          isChecked={selectedItem === item.id}
          onToggle={handleToggle}
        />
      ))}
    </ToggleGroup>
  );
};

const MultipleValuesTemplate = () => {
  const items = useMemo(
    () => [
      { id: 'multiple-item-1', label: 'Item 1', name: 'multiple-item-1' },
      { id: 'multiple-item-2', label: 'Item 2', name: 'multiple-item-2' },
      { id: 'multiple-item-3', label: 'Item 3', name: 'multiple-item-3' },
    ],
    []
  );
  const [selectedItems, setSelectedItems] = useState<typeof items>([]);

  const handleToggle: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      const updatedItem = items.find((item) => item.id === e.target.id);

      if (!updatedItem) return;

      setSelectedItems((prevSelectedItems) => {
        if (prevSelectedItems.includes(updatedItem))
          return prevSelectedItems.filter((item) => item.id !== updatedItem.id);
        return [...prevSelectedItems, updatedItem];
      });
    },
    [items]
  );

  return (
    <ToggleGroup>
      {items.map((item) => (
        <ToggleItem
          key={item.id}
          {...item}
          isChecked={selectedItems.includes(item)}
          onToggle={handleToggle}
        />
      ))}
    </ToggleGroup>
  );
};

const meta = {
  title: 'Components/Molecules/Forms/Toggle',
  component: SingleValueTemplate,
} satisfies Meta<typeof SingleValueTemplate>;

export default meta;

type Story = StoryObj<typeof meta>;

export const SingleValue: Story = {
  render: SingleValueTemplate,
};

export const MultipleValues: Story = {
  render: MultipleValuesTemplate,
};
