import { useEffect } from 'react';

import type { UserInfomation } from '@/features/user';
import { userApi } from '@/features/user';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * 사용자 인증 상태 관리를 위한 Zustand 스토어
 *
 * 주요 기능:
 * - 로그인/로그아웃 상태 관리
 * - 앱 초기화 시 자동 인증 확인
 * - 사용자 정보 전역 상태 제공
 *
 * 참고:
 * - 토큰 관리, 리프레시, 온보딩 리다이렉트는 모두 백엔드에서 처리
 * - HttpOnly 쿠키 기반 인증으로 프론트엔드에서 토큰 직접 관리 불필요
 */
interface UserState {
  // 상태
  user: UserInfomation | null; // 사용자 정보 (null이면 로그아웃 상태)
  isLoading: boolean; // 인증 상태 확인 중 여부
  isInitialized: boolean; // 앱 초기화 완료 여부
  lastAuthCheck: number; // 마지막 인증 확인 시간 (캐싱용)

  // 액션
  setUser: (user: UserInfomation) => void; // 사용자 정보 설정
  clearUser: () => void; // 사용자 상태 초기화
  updateUser: (updates: Partial<UserInfomation>) => void; // 사용자 정보 부분 업데이트
  initializeAuth: () => Promise<void>; // 앱 시작 시 인증 상태 확인
  refreshUserInfo: () => Promise<void>; // 사용자 정보 강제 갱신
  logout: () => Promise<void>; // 로그아웃 처리
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      // 초기 상태
      user: null,
      isLoading: false,
      isInitialized: false,
      lastAuthCheck: 0,

      // 사용자 정보 설정
      setUser: user =>
        set({
          user,
          isLoading: false,
          isInitialized: true,
          lastAuthCheck: Date.now(),
        }),

      // 사용자 상태 초기화 (로그아웃 시)
      clearUser: () =>
        set({
          user: null,
          isLoading: false,
          isInitialized: true,
          lastAuthCheck: Date.now(),
        }),

      // 사용자 정보 부분 업데이트 (프로필 수정 등에 사용)
      updateUser: updates => {
        const current = get().user;
        if (!current) return;
        set({
          user: { ...current, ...updates },
          lastAuthCheck: Date.now(),
        });
        // set(state => ({
        //   user: state.user ? { ...state.user, ...updates } : null,
        //   lastAuthCheck: Date.now(),
        // })),
      },

      // 앱 초기화 시 인증 상태 확인
      initializeAuth: async () => {
        console.log('🔄 initializeAuth 시작됨');
        console.log('상태: ', {
          isInitialized: get().isInitialized,
          isLoading: get().isLoading,
        });

        if (get().isInitialized || get().isLoading) return;
        set({ isLoading: true });

        try {
          const user = await userApi.getUserInfo();
          console.log('✅ getUserInfo() 호출 결과:', user);
          set({
            user,
            isInitialized: true,
            isLoading: false,
            lastAuthCheck: Date.now(),
          });
          console.log('🧠 Zustand 상태에 user 저장 완료:', user);
        } catch (e) {
          console.warn('initializeAuth 실패:', e);
          set({
            user: null,
            isInitialized: true,
            isLoading: false,
          });
        }
      },

      refreshUserInfo: async () => {
        if (get().isLoading) return;
        set({ isLoading: true });

        try {
          const user = await userApi.getUserInfo();
          set({ user, isLoading: false, lastAuthCheck: Date.now() });
        } catch (e) {
          console.error('refreshUserInfo 실패:', e);
          set({ isLoading: false });
        }
      },

      logout: async () => {
        try {
          await userApi.logout();
        } catch (e) {
          console.error('logout 실패:', e);
        } finally {
          get().clearUser();
        }
      },
    }),
    {
      name: 'user-store',
      partialize: state => ({
        isInitialized: state.isInitialized,
        lastAuthCheck: state.lastAuthCheck,
      }),
      version: 1,
    }
  )
);

// 사용자 인증 상태 확인을 위한 편의 훅들
export const useIsLoggedIn = () => {
  return useUserStore(state => state.user !== null);
};

export const useIsAuthLoading = () => {
  return useUserStore(state => state.isLoading);
};

export const useIsAuthInitialized = () => {
  return useUserStore(state => state.isInitialized);
};

// 사용자 정보 관련 편의 훅
export const useUser = () => {
  return useUserStore(state => state.user);
};

export const useUserActions = () => {
  return useUserStore(state => ({
    setUser: state.setUser,
    clearUser: state.clearUser,
    updateUser: state.updateUser,
    refreshUserInfo: state.refreshUserInfo,
    logout: state.logout,
  }));
};

//추후 삭제 예정
export const AuthLogger = () => {
  const user = useUser();

  useEffect(() => {
    if (user) {
      console.log(`✅ 로그인 완료! 안녕하세요, ${user.userName}님`);
    }
  }, [user]);

  return null; // UI 없이 부착만
};
