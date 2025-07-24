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

// 유저 정보 조회 응답 타입 (실제 API 응답에 맞춰 수정)
export interface UserInfo {
  profileImage: string;
  userName: string;
  nickName: string | null;
  email: string;
  age: number | null;
  gender: UserGender;
  grade: UserGrade | null;
  role: UserRole;
  status: UserStatus;
  favoriteBrands: string[];
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
