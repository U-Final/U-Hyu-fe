export type UserGrade = 'GOOD' | 'VIP' | 'VVIP';

export type UserGender = 'MALE' | 'FEMALE';
export type UserRole = 'USER' | 'ADMIN';
export type UserStatus = 'ACTIVE' | 'INACTIVE' | 'SUSPENDED';

export interface UserExtraInfoRequest {
  grade: UserGrade;
  recentBrands: string[];
  interestedBrands: string[];
}

export interface UserExtraInfoResponse {
  code: number;
  status: number;
  message: string;
}

// 이메일 중복 확인 관련 타입
export interface CheckEmailRequest {
  email: string;
}

export interface CheckEmailResponse {
  statusCode: number;
  message: string;
  data: {
    isAvailable: boolean; // true: 사용 가능, false: 이미 사용 중
    email: string;
  };
}

// 유저 정보 조회 응답 타입
export interface UserInfo {
  name: string;
  nickname: string;
  email: string;
  age: number;
  gender: UserGender;
  role: UserRole;
  status: UserStatus;
  grade: UserGrade;
  profile_image: string;
  updatedAt: string;
  profileImage: string;
  favorite_brands: string[];
  markers: string[];
}

export interface UpdateUserInfoRequest {
  nickname: string;
  age: number;
  email: string;
}

export interface UpdateUserInfoResponse {
  code: number;
  status: number;
  message: string;
}

export interface GetUserInfoResponse {
  code: number;
  status: number;
  message: string;
  data: UserInfo;
}

// 로그아웃 응답 타입
export interface LogoutResponse {
  code: string;
  message: string;
}
