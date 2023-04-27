import type { Meta, StoryObj } from '@storybook/react';
import { useCallback, useState } from 'react';
import { contract } from '../../../themes';
import { Button } from '../buttons';
import { Overlay, type OverlayProps } from './overlay';

type OverlayTemplateProps = OverlayProps & {
  isActive?: boolean;
};

const OverlayTemplate = ({
  isActive: active = false,
  ...props
}: OverlayTemplateProps) => {
  const [isActive, setIsActive] = useState(active);

  const handleClick = useCallback(() => {
    setIsActive((prev) => !prev);
  }, []);

  return (
    <div>
      <p>
        Itaque reprehenderit sint rerum placeat et sapiente similique ut
        distinctio. Libero illo reprehenderit qui quaerat dolorem. Officiis
        asperiores sapiente eaque. Aut numquam porro quasi delectus excepturi
        aut eaque et. Commodi et necessitatibus provident blanditiis rem qui
        atque.
      </p>
      <p>
        Aut architecto vitae dolor hic explicabo iure quia quae beatae.
        Exercitationem nulla dignissimos doloribus sunt at nisi. A modi quasi
        est sed quas repellendus vel sed dolores. Sed neque aperiam adipisci eos
        autem. Libero omnis quis aut quas omnis magni harum et.
      </p>
      <Button onClick={handleClick}>Open overlay</Button>
      {isActive ? <Overlay {...props} onClick={handleClick} /> : null}
    </div>
  );
};

const meta = {
  title: 'Components/Atoms/Overlay',
  component: Overlay,
  render: OverlayTemplate,
} satisfies Meta<typeof Overlay>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <div
        style={{
          background: contract.color.background.regular.base,
          padding: '1rem',
          margin: '1rem',
        }}
      >
        The modal contents.
      </div>
    ),
    isActive: true,
  },
};
