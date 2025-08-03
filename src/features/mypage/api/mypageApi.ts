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
  
  // statusCode가 0이 아니거나 data가 없으면 에러
  if (res.data.statusCode !== 0 || !res.data.data) {
    throw new Error(res.data.message || 'Invalid API response: missing data');
  }
  
  return res.data.data;
};

export const updateUserInfo = async (update: UpdateUserRequest): Promise<UpdateUserResponseData> => {
  const res = await client.patch<ApiResponse<UpdateUserResponseData>>(MYPAGE_ENDPOINTS.UPDATE_USER, update);
  
  // statusCode가 0이 아니거나 data가 없으면 에러
  if (res.data.statusCode !== 0 || !res.data.data) {
    throw new Error(res.data.message || 'Invalid API response: missing data');
  }
  
  return res.data.data;
};

export const fetchActivityStatistics = async (): Promise<ActivityStatistics> => {
  const res = await client.get<ApiResponse<ActivityStatistics>>(MYPAGE_ENDPOINTS.STATISTICS);
  
  // statusCode가 0이 아니거나 data가 없으면 에러
  if (res.data.statusCode !== 0 || !res.data.data) {
    throw new Error(res.data.message || 'Invalid API response: missing data');
  }
  
  return res.data.data;
};

export const fetchAllBookmarks = async (): Promise<Bookmark[]> => {
  const res = await client.get<ApiResponse<Bookmark[]>>(MYPAGE_ENDPOINTS.BOOKMARK_LIST);
  
  // statusCode가 0이 아니거나 data가 없으면 에러
  if (res.data.statusCode !== 0 || !res.data.data) {
    throw new Error(res.data.message || 'Invalid API response: missing data');
  }
  
  return res.data.data;
};

export const fetchBookmarkList = async (page = 1, size = 5): Promise<Bookmark[]> => {
  // 전체 데이터를 한 번만 가져와서 캐시
  const allBookmarks = await fetchAllBookmarks();
  
  // 프론트엔드에서 페이지네이션 적용
  const start = (page - 1) * size;
  const end = start + size;
  const pagedBookmarks = allBookmarks.slice(start, end);
  
  console.log('🔧 프론트엔드 무한스크롤 페이지네이션:', { page, size, start, end, total: allBookmarks.length, paged: pagedBookmarks.length });
  
  return pagedBookmarks;
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