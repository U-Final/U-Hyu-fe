import type { 
  UserInfoData, 
  UpdateUserResponseData,
  UpdateUserRequest,
  ActivityStatistics,
  Bookmark
} from './types';
import { MYPAGE_ENDPOINTS } from './endpoints';
import { mockBenefit, mockBrands, mockFavoriteBrands } from '../types/mockActivity';
import type { ApiResponse } from '@/shared/client/client.type';
import { client } from '@/shared/client';

// --- 마이페이지(개인정보/브랜드 등) 기존 API ---
export const fetchUserInfo = async (): Promise<UserInfoData> => {
  const res = await client.get<ApiResponse<UserInfoData>>(MYPAGE_ENDPOINTS.USER_INFO);
  if (!res.data.data) throw new Error('Invalid API response: missing data');
  return res.data.data;
};

export const updateUserInfo = async (update: UpdateUserRequest): Promise<UpdateUserResponseData> => {
  const res = await client.patch<ApiResponse<UpdateUserResponseData>>(MYPAGE_ENDPOINTS.UPDATE_USER, update);
  if (!res.data.data) throw new Error('Invalid API response: missing data');
  return res.data.data;
};

// --- 액티비티(활동내역/즐겨찾기) API ---
export const fetchActivityStatistics = async (): Promise<ActivityStatistics> => {
  const res = await client.get<ApiResponse<ActivityStatistics>>(MYPAGE_ENDPOINTS.STATISTICS);
  if (!res.data.data) throw new Error('Invalid API response: missing data');
  return res.data.data;
};

export const fetchBookmarkList = async (page = 1, size = 5): Promise<Bookmark[]> => {
  const res = await client.get<ApiResponse<Bookmark[]>>(
    `${MYPAGE_ENDPOINTS.BOOKMARK_LIST}?page=${page}&size=${size}`
  );
  if (!res.data.data) throw new Error('Invalid API response: missing data');
  return res.data.data;
};

export const deleteBookmark = async (bookmarkId: number): Promise<{ statusCode: number; message: string }> => {
  const res = await client.delete<ApiResponse<string>>(MYPAGE_ENDPOINTS.BOOKMARK_DETAIL(bookmarkId));
  return {
    statusCode: res.data.statusCode,
    message: res.data.message,
  };
};

// --- (개발용) 기존 Mock 데이터 함수는 필요시 유지 ---
export const fetchActivityBenefit = async () => mockBenefit;
export const fetchActivityBrands = async () => mockBrands;
export const fetchActivityFavorites = async () => mockFavoriteBrands; 