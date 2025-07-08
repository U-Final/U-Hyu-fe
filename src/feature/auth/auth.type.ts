export type Role = 'USER' | 'ADMIN';

export type MembershipLevel = 'EXCELLENT' | 'VIP' | 'VVIP';

export type Gender = 'MALE' | 'FEMALE';

export interface User {
  id: string;
  email: string;
  nickname: string;
  role: Role;
  membershipLevel: MembershipLevel;
  profileImageUrl?: string;
  gender?: Gender;
  interestedBrands: string[];
  interestedCategories: string[];
  accessToken: string;
  refreshToken: string;
  createdAt: string;
  updatedAt: string;
  recentBrands: string[];
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
  accessToken: string;
  refreshToken: string;
}
