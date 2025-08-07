import { client } from '@/shared/client';
import type { ApiResponse } from '@/shared/client/client.type';

import { USER_ENDPOINTS } from './endpoints';
import type {
  CheckEmailRequest,
  UserExtraInfoRequest,
  UserInfomation,
} from './types';

export const userApi = {
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

  getUserInfo: async (): Promise<ApiResponse<UserInfomation>> => {
    const res = await client.get<ApiResponse<UserInfomation>>(
      USER_ENDPOINTS.USER.ROOT
    );
    return res.data;
  },

  logout: async (): Promise<{ statusCode: number; message: string }> => {
    const res = await client.post<ApiResponse>(USER_ENDPOINTS.LOGOUT);
    return {
      statusCode: res.data.statusCode,
      message: res.data.message,
    };
  },

  updateUserInfo: async (data: {
    nickname: string;
    age: number;
    email: string;
  }): Promise<{ statusCode: number; message: string }> => {
    const res = await client.patch<ApiResponse>(
      USER_ENDPOINTS.USER.ROOT,
      data
    );
    return {
      statusCode: res.data.statusCode,
      message: res.data.message,
    };
  },
};
