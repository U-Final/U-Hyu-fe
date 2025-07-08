import { client } from '@shared/client/axiosClient';
import { type SignupData, type AuthResponse, type User, type ProfileUpdateData } from './auth.type';

export const authService = {
  // 카카오 로그인
  async loginWithKakao(): Promise<void> {
    window.location.href = import.meta.env.VITE_KAKAO_LOGIN_URL || '';
  },

  // 회원가입
  async signup(userData: SignupData): Promise<AuthResponse> {
    const response = await client.post('/signup', userData);
    return response.data;
  },

  // 로그아웃
  async logout(): Promise<void> {
    await client.post('/logout');
  },

  // 현재 사용자 정보 조회
  async getCurrentUser(): Promise<{ user: User }> {
    const response = await client.get('/profile');
    return response.data;
  },

  // 토큰 갱신
  async refreshToken(refreshToken: string): Promise<{ accessToken: string; refreshToken: string }> {
    const response = await client.post('/refresh', { refreshToken });
    return response.data;
  },

  // 프로필 업데이트
  async updateProfile(profileData: ProfileUpdateData): Promise<{ user: User }> {
    const response = await client.put('/profile', profileData);
    return response.data;
  },

  // 회원 탈퇴
  async deleteAccount(): Promise<void> {
    await client.delete('/auth/account');
  },
};
