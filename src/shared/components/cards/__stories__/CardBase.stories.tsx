import type { Meta, StoryObj } from '@storybook/react-vite';
import { CardBase } from '../CardBase';

const meta: Meta<typeof CardBase> = {
  title: 'Components/Card/CardBase',
  component: CardBase,
};

export default meta;
type Story = StoryObj<typeof CardBase>;

export const Default: Story = {
  render: () => (
    <CardBase>
      <h3 className="text-base font-semibold">기본 카드</h3>
      <p className="text-sm text-gray">내용을 여기에 넣을 수 있어요.</p>
    </CardBase>
  ),
};
