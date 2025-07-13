import type { Meta, StoryObj } from '@storybook/react-vite';
import { BrandCard } from '../BrandCard';

const meta: Meta<typeof BrandCard> = {
  title: 'Components/Card/BrandCard',
  component: BrandCard,
};

export default meta;
type Story = StoryObj<typeof BrandCard>;

export const Default: Story = {
  render: () => (
    <BrandCard logoUrl="/public/favicon/android-icon-144x144.png">
      <div>
        <h3 className="text-base font-semibold">뚜레쥬르 선릉점</h3>
        <ul className="text-sm space-y-0.5">
          <li>VVIP: 150원 할인</li>
          <li>VIP: 100원 할인</li>
        </ul>
      </div>
    </BrandCard>
  ),
};
