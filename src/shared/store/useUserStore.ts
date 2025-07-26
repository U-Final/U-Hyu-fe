import { userApi } from '@/features/user';
import type { UserInfo } from '@/features/user';
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
  user: UserInfo | null; // 사용자 정보 (null이면 로그아웃 상태)
  isLoading: boolean; // 인증 상태 확인 중 여부
  isInitialized: boolean; // 앱 초기화 완료 여부
  lastAuthCheck: number; // 마지막 인증 확인 시간 (캐싱용)

  // 액션
  setUser: (user: UserInfo) => void; // 사용자 정보 설정
  clearUser: () => void; // 사용자 상태 초기화
  updateUser: (updates: Partial<UserInfo>) => void; // 사용자 정보 부분 업데이트
  initializeAuth: () => Promise<void>; // 앱 시작 시 인증 상태 확인
  refreshUserInfo: () => Promise<void>; // 사용자 정보 강제 갱신
  logout: () => Promise<void>; // 로그아웃 처리
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      // 초기 상태
      user:
        import.meta.env.MODE === 'development'
          ? {
              profileImage: '/images/profile/image.png',
              userName: '테스트사용자',
              nickName: '테스트닉네임',
              email: 'test@example.com',
              age: 25,
              gender: 'FEMALE',
              grade: 'VIP',
              role: 'USER',
              status: 'ACTIVE',
              favoriteBrands: [1, 2, 3, 4, 5],
              markerId: 1,
              markers: [1, 2, 3],
            }
          : null,
      isLoading: false,
      isInitialized: import.meta.env.MODE === 'development',
      lastAuthCheck: import.meta.env.MODE === 'development' ? Date.now() : 0,

      // 사용자 정보 설정
      setUser: (user: UserInfo) =>
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
      updateUser: (updates: Partial<UserInfo>) =>
        set(state => ({
          user: state.user ? { ...state.user, ...updates } : null,
          lastAuthCheck: Date.now(),
        })),

      // 앱 초기화 시 인증 상태 확인
      initializeAuth: async () => {
        const { isInitialized, isLoading } = get();

        // 이미 초기화되었거나 로딩 중이면 중복 호출 방지
        if (isInitialized || isLoading) return;

        set({ isLoading: true });

        try {
          // 백엔드에서 쿠키 검증 및 사용자 정보 반환
          // 토큰 만료 시 자동 리프레시, 온보딩 필요시 자동 리다이렉트 처리됨
          const response = await userApi.getUserInfo();

          if (response.data) {
            set({
              user: response.data,
              isLoading: false,
              isInitialized: true,
              lastAuthCheck: Date.now(),
            });
          } else {
            // 사용자 정보가 없으면 로그아웃 상태로 처리
            set({
              user: null,
              isLoading: false,
              isInitialized: true,
              lastAuthCheck: Date.now(),
            });
          }
        } catch (error) {
          // 인증 실패 시 로그아웃 상태로 처리
          // 백엔드에서 401/403 등의 에러 또는 리다이렉트 처리
          console.warn('사용자 인증 확인 실패:', error);
          set({
            user: null,
            isLoading: false,
            isInitialized: true,
            lastAuthCheck: Date.now(),
          });
        }
      },

      // 사용자 정보 강제 갱신 (프로필 업데이트 후 등)
      refreshUserInfo: async () => {
        const { isLoading } = get();

        if (isLoading) return;

        set({ isLoading: true });

        try {
          const response = await userApi.getUserInfo();

          if (response.data) {
            set({
              user: response.data,
              isLoading: false,
              lastAuthCheck: Date.now(),
            });
          } else {
            get().clearUser();
          }
        } catch (error) {
          console.error('사용자 정보 갱신 실패:', error);
          set({ isLoading: false });
          // 갱신 실패 시에는 기존 사용자 정보 유지
        }
      },

      // 로그아웃 처리
      logout: async () => {
        set({ isLoading: true });

        try {
          // 백엔드 로그아웃 API 호출 (쿠키 삭제, 세션 종료)
          await userApi.logout();
        } catch (error) {
          console.error('로그아웃 요청 실패:', error);
          // 백엔드 요청 실패해도 프론트엔드 상태는 초기화
        } finally {
          // 프론트엔드 상태 초기화
          set({
            user: null,
            isLoading: false,
            isInitialized: true,
            lastAuthCheck: Date.now(),
          });
        }
      },
    }),
    {
      name: 'user-store',
      // 민감한 사용자 정보는 persist하지 않고, 상태 정보만 저장
      partialize: state => ({
        isInitialized: state.isInitialized,
        lastAuthCheck: state.lastAuthCheck,
      }),
      // 버전 관리 (스키마 변경 시 자동 마이그레이션)
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
