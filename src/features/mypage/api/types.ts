import type { ApiResponse } from '@/shared/client/client.type';

export type UserRole = 'USER' | 'ADMIN';
export type UserStatus = 'ACTIVE' | 'DELETED';
export type UserGrade = 'GOOD' | 'VIP' | 'VVIP';
export type Gender = 'MALE' | 'FEMALE';

export interface Marker {
  id: number;
  createdAt: string;
  updatedAt: string;
  markerImage: string;
}

export interface UserInfoData {
  profileImage: string;
  userName: string;
  nickName: string | null;
  email: string;
  age: number | null;
  gender: Gender | null;
  grade: UserGrade | null;
  brandIdList?: number[];
  updatedAt: string;
}

export interface UpdateUserResponseData {
  userId: number;
}

export interface UpdateUserRequest {
  updatedNickName?: string;
  updatedGrade?: UserGrade;
  updatedBrandIdList?: number[];
}

// 액티비티(활동내역) 관련 타입 (Postman API 기준)
export interface ActivityBrand {
  brandId: number;
  brandName: string;
  logoImage: string;
  visitCount: number;
  lastVisitAt: string;
}

export interface ActivityStore {
  storeId: number;
  storeName: string;
  logoImage: string;
  addressDetail: string;
  visitAt: string;
}

export interface ActivityStatistics {
  discountMoney: number | null;
  bestBrandList: ActivityBrand[];
  recentStoreList: ActivityStore[];
}

// 즐겨찾기(Bookmark) 관련 타입 (Postman API 기준)
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
