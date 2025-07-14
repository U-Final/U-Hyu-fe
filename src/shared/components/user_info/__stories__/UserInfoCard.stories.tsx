import type { Meta, StoryObj } from '@storybook/react';
import UserInfoCard from '../UserInfoCard';

const meta: Meta<typeof UserInfoCard> = {
  title: 'User/UserInfoCard',
  component: UserInfoCard,
};

export default meta;
type Story = StoryObj<typeof UserInfoCard>;

export const Default: Story = {
  args: {
    name: '김민수',
    nickname: 'GOOD4',
    gender: '남성',
    age: 28,
    email: 'minsu.kim@email.com',
    onEdit: () => alert('수정 버튼 클릭됨!'),
  },
};
