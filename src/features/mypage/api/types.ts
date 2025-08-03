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

export interface UpdateUserResponseData {
  userId: number;
}

// API 응답 타입들 - 공통 ApiResponse 타입 사용
export type UserInfoResponse = ApiResponse<UserInfoData>;
export type UpdateUserResponse = ApiResponse<UpdateUserResponseData>;

// 액티비티(활동내역) 관련 타입
export interface ActivityBrand {
  bestBrandId: number;
  bestBrandName: string;
  bestBrandImage: string;
  visitCount?: number;
  lastVisitAt?: string;
}

export interface ActivityStore {
  recentStoreId: number;
  recentStoreName: string;
  recentBrandImage: string;
}

export interface ActivityStatistics {
  discountMoney: number | null;
  bestBrandList: ActivityBrand[];
  recentStoreList: ActivityStore[];
}

// 즐겨찾기(Bookmark) 관련 타입
export interface Bookmark {
  bookmarkId: number;
  storeId: number;
  logoImage: string;
  storeName: string;
  addressDetail: string;
  benefit: string | null;
}

export type BookmarkListResponse = ApiResponse<Bookmark[]>;

export interface ActivityBenefit {
  id: number;
  benefitName: string;
  brandName: string;
  usedAt: string;
  benefitType: string;
}
