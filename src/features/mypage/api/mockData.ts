import type { UserInfomation } from '@user/api/types';

import type { ApiResponse } from '@/shared/client/client.type';

export const mockUserInfoResponse: ApiResponse<UserInfomation> = {
  statusCode: 0,
  message: '정상 처리 되었습니다.',
  data: {
    profileImage:
      'http://img1.kakaocdn.net/thumb/R640x640.q70/?fname=http://t1.kakaocdn.net/account_images/default_profile.jpeg',
    userName: '유휴 테스트',
    nickName: '유휴 테스트',
    email: 'ehdcks1256@kakao.com',
    age: 20,
    gender: 'MALE',
    grade: 'VIP',
    markerId: 1,
    role: 'USER',
    updatedAt: '2025-07-20T05:17:08.734511',
  },
};
