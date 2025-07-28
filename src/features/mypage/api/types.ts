import type { ApiResponse } from '@/shared/client/client.type';
import type { UserInfoData } from '@/shared/types';

// 공통 타입들은 @/shared/types에서 import하여 사용
export type {
  UserRole,
  UserGrade,
  UserGender,
  Marker,
  UserInfo,
  UserInfoData,
  UpdateUserRequest,
} from '@/shared/types';

// 개인정보 수정 API 응답 데이터 구조
export interface UpdateUserResponseData {
  userId: number;
}

// API 응답 타입들 - 공통 ApiResponse 타입 사용
export type UserInfoResponse = ApiResponse<UserInfoData>;
export type UpdateUserResponse = ApiResponse<UpdateUserResponseData>;

// 즐겨찾기 관련 타입
export interface Bookmark {
  id: number;
  storeId: number;
  storeName: string;
  storeAddress: string;
  brandName: string;
  createdAt: string;
}

export interface BookmarkListData {
  bookmarks: Bookmark[];
  totalCount: number;
}

export type BookmarkListResponse = ApiResponse<BookmarkListData>;

export interface AddBookmarkRequest {
  storeId: number;
}

// 활동 내역 관련 타입
export interface ActivityBenefit {
  id: number;
  benefitName: string;
  brandName: string;
  usedAt: string;
  benefitType: string;
}

export interface ActivityBrand {
  id: number;
  brandName: string;
  visitCount: number;
  lastVisitAt: string;
}

export interface ActivityData {
  benefits: ActivityBenefit[];
  brands: ActivityBrand[];
  totalBenefitCount: number;
  totalBrandCount: number;
}

export type ActivityResponse = ApiResponse<ActivityData>;
