import type { 
  UserInfoData, 
  UpdateUserResponseData,
  BookmarkListResponse, 
  AddBookmarkRequest, 
  ActivityResponse 
} from './types';
import { MYPAGE_ENDPOINTS } from './endpoints';
import { mockBenefit, mockBrands, mockFavoriteBrands } from '../types/mockActivity';
import type { ApiResponse } from '@/shared/client/client.type';
import type { UpdateUserRequest } from './types';

import { client } from '@/shared/client';

// 사용자 정보 조회 API
export const fetchUserInfo = async (): Promise<UserInfoData> => {
  const res = await client.get<ApiResponse<UserInfoData>>(MYPAGE_ENDPOINTS.MYPAGE.USER_INFO);
  
  if (!res.data.data) {
    throw new Error('Invalid API response: missing data');
  }
  
  return res.data.data;
};

// 사용자 정보 업데이트 API (닉네임, 등급, 브랜드만 수정 가능)
export const updateUserInfo = async (update: UpdateUserRequest): Promise<UpdateUserResponseData> => {
  try {
    const res = await client.patch<ApiResponse<UpdateUserResponseData>>(MYPAGE_ENDPOINTS.MYPAGE.UPDATE_USER, update);
    
    if (!res.data.data) {
      throw new Error('Invalid API response: missing data');
    }
    
    return res.data.data;
  } catch (error) {
    console.error('사용자 정보 업데이트 실패:', error);
    throw error;
  }
};

// 프로필 이미지 업로드 API (기능 제거됨 - 주석처리)
/*
export const updateUserProfileImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('profileImage', file);
  
  const res = await client.post<ApiResponse<{ url: string }>>(
    MYPAGE_ENDPOINTS.MYPAGE.UPLOAD_PROFILE_IMAGE, 
    formData, 
    {
      headers: { 'Content-Type': 'multipart/form-data' },
    }
  );
  
  if (!res.data.data) {
    throw new Error('Invalid API response: missing data');
  }
  
  return res.data.data.url;
};
*/

// 마커 설정 API (기능 제거됨 - 주석처리)
/*
export const updateUserMarker = async (markerId: number): Promise<UpdateUserResponseData> => {
  try {
    const res = await client.patch<ApiResponse<UpdateUserResponseData>>(
      MYPAGE_ENDPOINTS.MYPAGE.UPDATE_USER, 
      { markerId }
    );
    
    if (!res.data.data) {
      throw new Error('Invalid API response: missing data');
    }
    
    return res.data.data;
  } catch (error) {
    console.error('마커 설정 실패:', error);
    throw error;
  }
};
*/

// 즐겨찾기 목록 조회 API
export const fetchBookmarkList = async (): Promise<BookmarkListResponse> => {
  const res = await client.get<ApiResponse<BookmarkListResponse>>(MYPAGE_ENDPOINTS.MYPAGE.BOOKMARK_LIST);
  
  if (!res.data.data) {
    throw new Error('Invalid API response: missing data');
  }
  
  return res.data.data;
};

// 즐겨찾기 추가 API
export const addBookmark = async (bookmarkData: AddBookmarkRequest): Promise<BookmarkListResponse> => {
  const res = await client.post<ApiResponse<BookmarkListResponse>>(MYPAGE_ENDPOINTS.MYPAGE.ADD_BOOKMARK, bookmarkData);
  
  if (!res.data.data) {
    throw new Error('Invalid API response: missing data');
  }
  
  return res.data.data;
};

// 즐겨찾기 삭제 API
export const deleteBookmark = async (id: number): Promise<BookmarkListResponse> => {
  const res = await client.delete<ApiResponse<BookmarkListResponse>>(MYPAGE_ENDPOINTS.MYPAGE.DELETE_BOOKMARK(id));
  
  if (!res.data.data) {
    throw new Error('Invalid API response: missing data');
  }
  
  return res.data.data;
};

// 활동 내역 조회 API
export const fetchActivity = async (): Promise<ActivityResponse> => {
  const res = await client.get<ApiResponse<ActivityResponse>>(MYPAGE_ENDPOINTS.MYPAGE.ACTIVITY);
  
  if (!res.data.data) {
    throw new Error('Invalid API response: missing data');
  }
  
  return res.data.data;
};

// Mock 데이터 함수들 (개발용)
export const fetchActivityBenefit = async () => {
  return mockBenefit;
};

export const fetchActivityBrands = async () => {
  return mockBrands;
};

export const fetchActivityFavorites = async () => {
  return mockFavoriteBrands;
}; 