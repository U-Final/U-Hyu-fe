import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { BrandWithFavoriteCard } from '../BrandWithFavoriteCard';

const meta: Meta<typeof BrandWithFavoriteCard> = {
  title: 'Components/Card/BrandWithFavoriteCard',
  component: BrandWithFavoriteCard,
};

export default meta;
type Story = StoryObj<typeof BrandWithFavoriteCard>;

export const Default: Story = {
  render: () => {
    const [isStarFilled, setIsStarFilled] = useState(false);

    return (
      <BrandWithFavoriteCard
        logoUrl="/public/favicon/android-icon-144x144.png"
        isStarFilled={isStarFilled}
        onFavoriteClick={() => setIsStarFilled(prev => !prev)}
      >
        <div>
          <h3 className="text-base font-semibold">뚜레쥬르 선릉점</h3>
          <ul className="text-sm space-y-0.5">
            <li>VVIP: 150원 할인</li>
            <li>VIP: 100원 할인</li>
          </ul>
        </div>
      </BrandWithFavoriteCard>
    );
  },
};
