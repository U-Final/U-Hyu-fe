export type UserGrade = 'GOOD' | 'VIP' | 'VVIP';

export type UserGender = 'MALE' | 'FEMALE';
export type UserRole = 'USER' | 'ADMIN';
export type UserStatus = 'ACTIVE' | 'INACTIVE' | 'SUSPENDED';

export interface UserInfomation {
  profileImage: string;
  userName: string;
  nickName: string | null;
  email: string;
  age: number | null;
  gender: UserGender | null;
  grade: UserGrade | null;
  markerId: number | null;
  updatedAt: string;
}

export interface UserExtraInfoRequest {
  grade: UserGrade;
  recentBrands: number[];
  interestedBrands: number[];
}

// 이메일 중복 확인 관련 타입
export interface CheckEmailRequest {
  email: string;
}
