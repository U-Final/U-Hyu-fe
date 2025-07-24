import { client } from '@/shared/client';

import { USER_ENDPOINTS } from './endpoints';
import type {
  CheckEmailResponse,
  LogoutResponse,
  UpdateUserInfoRequest,
  UpdateUserInfoResponse,
  UserExtraInfoRequest,
  UserExtraInfoResponse,
  GetUserInfoResponse
} from './types';

export const userApi = {
  // 사용자 추가 정보 입력
  submitExtraInfo: async (
    data: UserExtraInfoRequest
  ): Promise<UserExtraInfoResponse> => {
    const response = await client.post<UserExtraInfoResponse>(
      USER_ENDPOINTS.EXTRA_INFO,
      data
    );
    return response.data;
  },

  // 이메일 중복 확인
  checkEmail: async (email: string): Promise<CheckEmailResponse> => {
    const response = await client.post<CheckEmailResponse>(
      USER_ENDPOINTS.CHECK_EMAIL,
      { email }
    );
    return response.data;
  },

  // 유저 정보 조회
  getUserInfo: async (): Promise<GetUserInfoResponse> => {
    const response = await client.get<GetUserInfoResponse>(
      USER_ENDPOINTS.GET_USER_INFO
    );
    return response.data;
  },

  // 유저 정보 수정 - 마이페이지
  updateUserInfo: async (
    data: UpdateUserInfoRequest
  ): Promise<UpdateUserInfoResponse> => {
    const response = await client.patch<UpdateUserInfoResponse>(
      USER_ENDPOINTS.UPDATE_USER_INFO,
      data
    );
    return response.data;
  },

  // 로그아웃
  logout: async (): Promise<LogoutResponse> => {
    const response = await client.post<LogoutResponse>(USER_ENDPOINTS.LOGOUT);
    return response.data;
  },
};
