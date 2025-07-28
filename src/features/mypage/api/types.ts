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

// Postman API 응답과 완전히 일치하는 데이터 구조
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

// 개인정보 수정 API 응답 데이터 구조
export interface UpdateUserResponseData {
  userId: number;
}

// API 응답 타입들
export interface UserInfoResponse {
  statusCode: number;
  message: string;
  data: UserInfoData;
}

export interface UpdateUserResponse {
  statusCode: number;
  message: string;
  data: UpdateUserResponseData;
}

// 기존 UserInfo 타입 (내부 사용용)
export interface UserInfo {
  id: number;
  createdAt: string;
  updatedAt: string;
  userName: string;
  nickName: string;
  kakaoId: number;
  email: string;
  age: number;
  gender: Gender;
  role: UserRole;
  status: UserStatus;
  grade: UserGrade;
  profileImage: string;
  age_range?: string;
  marker: Marker;
  brandIds: number[];
}

// 개인정보 수정 요청 타입 (실제 수정 가능한 필드들)
export interface UpdateUserRequest {
  updatedNickName?: string;
  updatedGrade?: UserGrade;
  updatedBrandIdList?: number[];
}

// 즐겨찾기 관련 타입
export interface Bookmark {
  id: number;
  storeId: number;
  storeName: string;
  storeAddress: string;
  brandName: string;
  createdAt: string;
}

export interface BookmarkListResponse {
  bookmarks: Bookmark[];
  totalCount: number;
}

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

export interface ActivityResponse {
  benefits: ActivityBenefit[];
  brands: ActivityBrand[];
  totalBenefitCount: number;
  totalBrandCount: number;
}
