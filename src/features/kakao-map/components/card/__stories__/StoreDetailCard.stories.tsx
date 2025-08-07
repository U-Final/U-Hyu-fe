import { useState } from 'react';

import { GRADE } from '@/features/kakao-map/api/types';
import type { Meta, StoryObj } from '@storybook/react-vite';

import StoreDetailCard from '../StoreDetailCard';

const meta: Meta<typeof StoreDetailCard> = {
  title: 'KakaoMap/StoreDetailCard',
  component: StoreDetailCard,
};
export default meta;

type Story = StoryObj<typeof StoreDetailCard>;

export const Default: Story = {
  args: {
    storeName: 'CGV 강남점',
    isFavorite: true,
    favoriteCount: 15000,
    benefits: {
      grade: 'VIP' as GRADE,
      benefitText: '2D영화 2천원 할인',
    },
    usageLimit: '월 1회',

    usageMethod:
      "U+ 멤버십앱 메인 화면 우측 상단 검색(돋보기 모양) 클릭 > CGV 검색 > 제휴사 클릭 후 '다운로드' 클릭",
  },
};

export const SingleFavorite: Story = {
  args: {
    storeName: 'CGV 동대문',
    isFavorite: false,
    favoriteCount: 1,
    benefits: {
      grade: 'VIP' as GRADE,
      benefitText: '3천원 할인',
    },
    usageLimit: '월 1회',
    usageMethod: '키오스크 어쩌구',
  },
};

export const InteractiveFavorite: Story = {
  render: args => {
    const [isFavorite, setIsFavorite] = useState(args.isFavorite);
    return (
      <StoreDetailCard
        {...args}
        isFavorite={isFavorite}
        handleToggleFavorite={() => setIsFavorite(prev => !prev)}
      />
    );
  },
  args: {
    storeName: 'CGV 강남점',
    isFavorite: true,
    favoriteCount: 15000,
    benefits: {
      grade: 'VIP' as GRADE,
      benefitText: '2D영화 2천원 할인',
    },
    usageLimit: '월 1회',
    usageMethod:
      "U+ 멤버십앱 메인 화면 우측 상단 검색(돋보기 모양) 클릭 > CGV 검색 > 제휴사 클릭 후 '다운로드' 클릭",
  },
};
