import { userApi } from '@user/index';
import type { AxiosError } from 'axios';
import { toast } from 'sonner';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import type { ApiError } from '@/shared/client/client.type';
import type { SimpleUserInfo } from '@/shared/types';

interface UserState {
  user: SimpleUserInfo | null;
  isAuthChecked: boolean; // 유저가 로그인 되어있는지 체크
  initAuthState: () => Promise<void>;
  setUser: (user: SimpleUserInfo) => void;
  clearUser: () => void;
  logout: () => Promise<void>;
  userInfo: () => Promise<void>;
}

export const userStore = create<UserState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthChecked: false,

      // 쿠키 기반 초기 인증 상태 확인
      initAuthState: async () => {
        try {
          // sessionStorage에 사용자 정보가 있으면 서버에서 검증
          const storedUser = get().user;
          if (storedUser) {
            console.log(
              '📦 sessionStorage에서 사용자 정보 발견 - 서버 검증 시작'
            );
            await get().userInfo();
          } else {
            // HttpOnly 쿠키는 체크할 수 없으므로 바로 서버에 요청
            console.log('🔍 초기 인증 상태 확인 시작');
            await get().userInfo();
          }
        } catch {
          console.log('초기 인증 상태 확인 완료 (에러 발생)');
          // userInfo에서 이미 에러 처리됨
        }
      },

      setUser: user => set({ user, isAuthChecked: true }),

      clearUser: () => {
        set({ user: null, isAuthChecked: true });
        // sessionStorage에서도 완전히 제거
        sessionStorage.removeItem('user-storage');
      },

      logout: async () => {
        try {
          const res = await userApi.logout();
          get().clearUser(); // clearUser 호출로 sessionStorage도 함께 정리
          toast.info(res.message);
        } catch (error) {
          toast.error('❌ 로그아웃 실패했습니다. 다시 시도해주세요');
          throw error;
        }
      },

      userInfo: async () => {
        try {
          const res = await userApi.getUserInfo();
          console.log('📡 서버 응답:', {
            statusCode: res.statusCode,
            data: res.data,
          });

          if ((res.statusCode === 200 || res.statusCode === 0) && res.data) {
            const { userName, grade, profileImage, role } = res.data;
            get().setUser({ userName, grade, profileImage, role });
          } else {
            console.warn('⚠️ 유저 정보 조회 실패: 응답 데이터 없음', res);
            get().clearUser();
          }
        } catch (error: unknown) {
          const err = error as AxiosError<ApiError>;
          // 401이면 clearUser(), 그 외 에러는 유지
          if (err.response?.data?.statusCode === 401) {
            console.log('🔐 401 에러 - 인증 만료로 로그아웃 처리');
            get().clearUser();
          } else {
            console.warn('⚠️ 유저 정보 조회 실패(비401): 상태 유지', err);
            set({ isAuthChecked: true });
          }
        }
      },
    }),
    {
      name: 'user-storage',
      // sessionStorage 사용 (브라우저 탭 닫으면 자동 삭제)
      storage: createJSONStorage(() => sessionStorage),
      // 저장할 state만 선택
      partialize: state => ({
        user: state.user,
        isAuthChecked: state.isAuthChecked,
      }),
      onRehydrateStorage: () => state => {
        if (state) {
          // 복원된 상태가 있으면 서버에서 재검증 필요
          console.log('🔄 sessionStorage에서 사용자 상태 복원됨');
          userStore.setState({ isAuthChecked: true });
        } else {
          // 복원할 데이터가 없으면 인증 확인 완료로 설정
          userStore.setState({ isAuthChecked: true, user: null });
        }
      },
    }
  )
);

export const useIsLoggedIn = () => {
  const user = userStore(state => state.user);
  const isAuthChecked = userStore(state => state.isAuthChecked);

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
