export type Role = 'USER' | 'ADMIN';

export type MembershipLevel = 'EXCELLENT' | 'VIP' | 'VVIP'; // 우수, vip, vvip

export type Gender = 'MALE' | 'FEMALE';
export interface User {
  id: string;
  email: string;
  nickname: string;
  role: Role;
  membershipLevel: MembershipLevel;
  profileImageUrl?: string; // 카카오 프로필 이미지
  gender?: Gender;
  interestedBrands: string[]; // 관심 브랜드
  interestedCategories: string[]; // 관심 카테고리
  createdAt: string;
  updatedAt: string;
  recentBrands: string[]; // 최근 이용한 브랜드
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupData {
  email: string;
  password: string;
  nickname: string;
  gender?: Gender;
  interestedBrands?: string[];
  interestedCategories?: string[];
  recentBrands: string[];
}

export interface ProfileUpdateData {
  nickname?: string;
  profileImageUrl?: string;
  gender?: Gender;
  interestedBrands?: string[];
  interestedCategories?: string[];
  recentBrands?: string[];
}

export interface AuthResponse {
  user: User;
}
