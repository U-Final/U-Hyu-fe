import { userApi } from '@user/index';
import type { AxiosError } from 'axios';
import { toast } from 'sonner';
import { create } from 'zustand';

import type { ApiError } from '@/shared/client/client.type';
import type { SimpleUserInfo } from '@/shared/types';

interface UserState {
  user: SimpleUserInfo | null;
  isAuthChecked: boolean; // 유저가 로그인 되어있는지 ㅊㅔ크
  setUser: (user: SimpleUserInfo) => void;
  clearUser: () => void;
  logout: () => Promise<void>;
  userInfo: () => Promise<void>;
}

export const userStore = create<UserState>(set => ({
  user: null,
  isAuthChecked: false,
  setUser: user => set({ user, isAuthChecked: true }),
  clearUser: () => set({ user: null, isAuthChecked: true }),
  logout: async () => {
    try {
      const res = await userApi.logout();
      userStore.getState().clearUser();
      toast.info(res.message);
    } catch (error) {
      toast.error('❌ 로그아웃 실패했습니다. 다시 시도해주세요');
      throw error;
    }
  },
  userInfo: async () => {
    try {
      if (import.meta.env.DEV) {
        console.log('🔄 유저 정보 조회 시작...');
      }

      const res = await userApi.getUserInfo();

      if (res.statusCode === 200 && res.data) {
        const { userName, grade, profileImage, role } = res.data;
        userStore.getState().setUser({ userName, grade, profileImage, role });
      } else {
        console.warn('⚠️ 유저 정보 조회 실패: 응답 데이터 없음', res);
        userStore.getState().clearUser();
      }
    } catch (error: unknown) {
      const err = error as AxiosError<ApiError>;
      // 401이면 clearUser(), 그 외 에러는 유지
      if (err.response?.data?.statusCode === 401) {
        userStore.getState().clearUser();
      } else {
        console.warn('⚠️ 유저 정보 조회 실패(비401): 상태 유지', err);
      }
    }
  },
}));

export const useIsLoggedIn = () => {
  const user = userStore(state => state.user);
  const isAuthChecked = userStore(state => state.isAuthChecked);
  if (import.meta.env.DEV) {
    console.log('user', user);
  }
  // 인증 확인이 완료되지 않았다면 false 반환 (초기 로딩 중)
  if (!isAuthChecked) {
    return false;
  }

  // 인증 확인이 완료되었다면 user 존재 여부로 판단
  return user !== null;
};

export const useAuthState = () => {
  const user = userStore(state => state.user);
  const isAuthChecked = userStore(state => state.isAuthChecked);

  return {
    user,
    isLoggedIn: isAuthChecked && user !== null,
    isAuthChecked,
    isLoading: !isAuthChecked,
  };
};

export const useUser = () => userStore(state => state.user);
