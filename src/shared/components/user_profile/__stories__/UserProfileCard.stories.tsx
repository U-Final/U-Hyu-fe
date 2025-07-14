import type { Meta, StoryObj } from '@storybook/react';
import UserProfileCard from '../UserProfileCard';

const meta: Meta<typeof UserProfileCard> = {
  title: 'User/UserProfileCard',
  component: UserProfileCard,
};

export default meta;
type Story = StoryObj<typeof UserProfileCard>;

export const Default: Story = {
  args: {
    profileImage:
      'http://img1.kakaocdn.net/thumb/R640x640.q70/?fname=http://t1.kakaocdn.net/account_images/default_profile.jpeg',
    nickname: '박희준',
    updatedAt: '2025-07-10',
    grade: 'VVIP',
  },
};