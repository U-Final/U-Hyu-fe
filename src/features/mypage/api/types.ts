export type UserRole = 'USER' | 'ADMIN';
export type UserStatus = 'ACTIVE' | 'DELETED';
export type UserGrade = 'VVIP' | 'VIP' | 'GOOD';
export type Gender = 'MALE' | 'FEMALE';

export interface Marker {
  id: number;
  createdAt: string;
  updatedAt: string;
  markerImage: string;
}

export interface UserInfo {
  id: number;
  createdAt: string;
  updatedAt: string;
  userName: string;
  nickname: string;
  kakaoId: number;
  email: string;
  age: string;
  gender: Gender;
  role: UserRole;
  status: UserStatus;
  grade: UserGrade;
  profileImage: string;
  age_range?: string;
  marker: Marker;
  brandIds: number[];
}

export interface UpdateUserRequest {
  updatedProfileImage?: string;
  updatedNickName?: string;
  updatedGrade?: UserGrade;
  updatedBrandIdList?: number[];
  markerId?: number;
}

export interface UserInfoResponse {
  statusCode: number;
  message: string;
  data: {
    profileImage: string;
    userName: string;
    nickName: string;
    email: string;
    age: string;
    gender: Gender;
    grade: UserGrade;
    updatedAt: string;
  };
}
