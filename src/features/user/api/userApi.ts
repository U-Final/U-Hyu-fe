import { client } from '@/shared/client';
import type { ApiResponse } from '@/shared/client/client.type';

import { USER_ENDPOINTS } from './endpoints';
import type {
  CheckEmailRequest,
  UserExtraInfoRequest,
  UserInfomation,
} from './types';

export const userApi = {
  // 사용자 추가 정보 입력
  submitExtraInfo: async (
    data: UserExtraInfoRequest
  ): Promise<{ statusCode: number; message: string }> => {
    const res = await client.post<ApiResponse>(
      USER_ENDPOINTS.USER.EXTRA_INFO,
      data
    );
    return {
      statusCode: res.data.statusCode,
      message: res.data.message,
    };
  },

  // 이메일 중복 확인
  checkEmail: async ({
    email,
  }: CheckEmailRequest): Promise<{ statusCode: number; message: string }> => {
    const res = await client.post<ApiResponse>(
      USER_ENDPOINTS.USER.CHECK_EMAIL,
      { email }
    );
    return {
      statusCode: res.data.statusCode,
      message: res.data.message,
    };
  },

  // 유저 정보 조회
  getUserInfo: async (): Promise<UserInfomation> => {
    const res = await client.get<ApiResponse<UserInfomation>>(
      USER_ENDPOINTS.USER.ROOT
    );
    return res.data.data!;
  },

  // 로그아웃
  logout: async (): Promise<{ statusCode: number; message: string }> => {
    const res = await client.post<ApiResponse>(USER_ENDPOINTS.LOGOUT);
    return {
      statusCode: res.data.statusCode,
      message: res.data.message,
    };
  },
};
