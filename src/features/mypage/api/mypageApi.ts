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

export const fetchUserInfo = async (): Promise<UserInfoData> => {
  const res = await client.get<ApiResponse<UserInfoData>>(MYPAGE_ENDPOINTS.USER_INFO);
  if (res.data.statusCode !== 0 || !res.data.data) {
    throw new Error(res.data.message || 'Invalid API response: missing data');
  }
  
  return res.data.data;
};

export const updateUserInfo = async (update: UpdateUserRequest): Promise<UpdateUserResponseData> => {
  const res = await client.patch<ApiResponse<UpdateUserResponseData>>(MYPAGE_ENDPOINTS.UPDATE_USER, update);
  
  if (res.data.statusCode !== 0 || !res.data.data) {
    throw new Error(res.data.message || 'Invalid API response: missing data');
  }
  
  return res.data.data;
};

export const fetchActivityStatistics = async (): Promise<ActivityStatistics> => {
  const res = await client.get<ApiResponse<ActivityStatistics>>(MYPAGE_ENDPOINTS.STATISTICS);
  
  if (res.data.statusCode !== 0 || !res.data.data) {
    throw new Error(res.data.message || 'Invalid API response: missing data');
  }
  
  return res.data.data;
};

export const fetchAllBookmarks = async (): Promise<Bookmark[]> => {
  const res = await client.get<ApiResponse<Bookmark[]>>(MYPAGE_ENDPOINTS.BOOKMARK_LIST);
  
  if (res.data.statusCode !== 0 || !res.data.data) {
    throw new Error(res.data.message || 'Invalid API response: missing data');
  }
  
  return res.data.data;
};

export const fetchBookmarkList = async (page = 1, size = 5): Promise<Bookmark[]> => {
  const allBookmarks = await fetchAllBookmarks();
  
  const start = (page - 1) * size;
  const end = start + size;
  const pagedBookmarks = allBookmarks.slice(start, end);
  
  return pagedBookmarks;
};

export const deleteBookmark = async (bookmarkId: number): Promise<{ statusCode: number; message: string }> => {
  const res = await client.delete<ApiResponse<string>>(MYPAGE_ENDPOINTS.BOOKMARK_DETAIL(bookmarkId));
  
  if (res.data.statusCode !== 0) {
    throw new Error(res.data.message || '즐겨찾기 삭제에 실패했습니다.');
  }
  
  return {
    statusCode: res.data.statusCode,
    message: res.data.message,
  };
};

export const fetchActivityBenefit = async () => mockBenefit;
export const fetchActivityBrands = async () => mockBrands;
export const fetchActivityFavorites = async () => mockFavoriteBrands;