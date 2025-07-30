import type { ApiResponse } from '@/shared/client/client.type';
import type { UserInfoData, UpdateUserResponseData } from '@mypage/api/types';

// 실제 API 응답 구조에 맞춘 목업 데이터
export const mockUserInfoData: UserInfoData = {
  profileImage:
    'http://img1.kakaocdn.net/thumb/R640x640.q70/?fname=http://t1.kakaocdn.net/account_images/default_profile.jpeg',
  userName: '박희준',
  nickName: '길길길길길동이',
  email: 'isk8520@naver.com',
  age: 27,
  gender: 'MALE',
  grade: 'VVIP',
  role: 'ADMIN',
  brandIdList: [1, 2, 3],
  updatedAt: '2025-07-28T02:25:39.470165',
};

// 개인정보 수정 API 응답 목업 데이터
export const mockUpdateUserResponse: UpdateUserResponseData = {
  userId: 9,
};

// 공통 응답 형식을 사용한 목업 데이터
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
