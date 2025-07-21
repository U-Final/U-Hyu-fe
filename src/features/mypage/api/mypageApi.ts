import type { UserInfo } from './types';
import axios from 'axios';
import { MYPAGE_ENDPOINTS } from './endpoints';
import { mockBenefit, mockBrands, mockFavoriteBrands } from '../types/mockActivity';
import type { ApiResponse } from '@/shared/client/client.type';
import type { UpdateUserRequest } from './types';

export const fetchUserInfo = async (): Promise<UserInfo> => {
  const res = await axios.get<ApiResponse<UserInfo>>(MYPAGE_ENDPOINTS.USER_INFO);
  if (!res.data.data) throw new Error('유저 정보가 없습니다');
  return res.data.data;
};

export const updateUserInfo = async (update: Partial<UpdateUserRequest>) => {
  const res = await axios.patch(MYPAGE_ENDPOINTS.USER_INFO, update);
  return res.data;
};

export const updateUserProfileImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('profileImage', file);
  // 실제 엔드포인트는 백엔드 명세에 맞게 수정 필요
  const res = await axios.post('/user/profile-image', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  // 서버는 업로드된 이미지의 URL을 반환한다고 가정
  return res.data.url;
};

export const fetchActivityBenefit = async () => {
  return mockBenefit;
};

export const fetchActivityBrands = async () => {
  return mockBrands;
};

export const fetchActivityFavorites = async () => {
  return mockFavoriteBrands;
}; 