import type { UserInfo } from '@mypage/api/types';

export const mockUser: UserInfo = {
  id: 1,
  createdAt: '2025-07-21T05:49:15.658Z',
  updatedAt: '2025-07-21T05:49:15.658Z',
  userName: '김민수',
  nickname: 'GOOD4',
  kakaoId: 12345,
  email: 'minsu.kim@email.com',
  age: '28',
  gender: 'MALE',
  role: 'USER',
  status: 'ACTIVE',
  grade: 'VVIP',
  profileImage: '/images/profile/image.png',
  age_range: '20-29',
  marker: {
    id: 8,
    createdAt: '2025-07-21T05:49:15.658Z',
    updatedAt: '2025-07-21T05:49:15.658Z',
    markerImage: 'marker8.png',
  },
  userRole: 'USER',
  userGrade: 'VVIP',
  brandIds: [1, 4, 3],
};
