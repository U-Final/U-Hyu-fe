export type UserRole = 'USER' | 'ADMIN';
export type UserGrade = 'GOOD' | 'VIP' | 'VVIP';
export type UserGender = 'MALE' | 'FEMALE' | 'OTHER';

export interface Marker {
  id: number;
  createdAt: string;
  updatedAt: string;
  markerImage: string;
}

export interface UserInfo {
  profileImage: string;
  userName: string;
  nickName: string | null;
  email: string;
  age: number | null;
  gender: UserGender | null;
  grade: UserGrade | null;
  updatedAt: string;
  role?: UserRole;
}

export interface UserInfoData {
  profileImage: string;
  userName: string;
  nickName: string | null;
  email: string;
  age: number | null;
  gender: UserGender | null;
  grade: UserGrade | null;
  interestedBrandList?: number[];
  updatedAt: string;
  role?: UserRole;
}

export interface SimpleUserInfo {
  userName: string;
  grade: UserGrade | null;
  profileImage: string;
  role?: UserRole;
}

export interface UpdateUserRequest {
  updatedNickName?: string;
  updatedGrade?: UserGrade;
  updatedBrandIdList?: number[];
}

export interface UserExtraInfoRequest {
  age: number;
  gender: UserGender;
  grade: UserGrade;
  recentBrands: number[];
  interestedBrands: number[];
}

export interface CheckEmailRequest {
  email: string;
}
