import type { UserInfo } from './types';

export const mockUserInfo: UserInfo = {
  id: 1,
  createdAt: '2025-07-21T05:49:15.658Z',
  updatedAt: '2025-07-21T05:49:15.658Z',
  userName: '홍길동',
  nickName: '길동이',
  kakaoId: 12345,
  email: 'gildong@example.com',
  age: '28',
  gender: 'MALE',
  role: 'USER',
  status: 'ACTIVE',
  grade: 'VIP',
  profileImage: '/images/profile/image.png',
  age_range: '20-29',
  marker: {
    id: 8,
    createdAt: '2025-07-21T05:49:15.658Z',
    updatedAt: '2025-07-21T05:49:15.658Z',
    markerImage: 'marker8.png',
  },
  brandIds: [1, 4, 3],
};