import type { UpdateUserResponseData, UserInfoData } from '@mypage/api/types';

import type { ApiResponse } from '@/shared/client/client.type';

export const mockUserInfoData: UserInfoData = {
  profileImage:
    'http://img1.kakaocdn.net/thumb/R640x640.q70/?fname=http://t1.kakaocdn.net/account_images/default_profile.jpeg',
  userName: '테스트 유저',
  nickName: '테스트 유저',
  email: 'test@test.com',
  age: 27,
  gender: 'MALE',
  grade: 'VIP',
  role: 'ADMIN',
  interestedBrandList: [2, 15, 25],
  updatedAt: '2025-07-28T02:25:39.470165',
};

export const mockUpdateUserResponse: UpdateUserResponseData = {
  userId: 9,
};

export const mockUserInfoResponse: ApiResponse<UserInfoData> = {
  statusCode: 0,
  message: '정상 처리 되었습니다.',
  data: mockUserInfoData,
};

export const mockUpdateUserResponseFull: ApiResponse<UpdateUserResponseData> = {
  statusCode: 0,
  message: '정상 처리 되었습니다.',
  data: mockUpdateUserResponse,
};
