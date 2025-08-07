import type { ApiResponse } from '@/shared/client/client.type';
import type { UserInfoData } from '@/shared/types';

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

export type UserInfoResponse = ApiResponse<UserInfoData>;
export type UpdateUserResponse = ApiResponse<UpdateUserResponseData>;

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
