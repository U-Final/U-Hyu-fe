import { userApi } from '@user/index';
import type { AxiosError } from 'axios';
import { toast } from 'sonner';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import type { ApiError } from '@/shared/client/client.type';
import type { SimpleUserInfo } from '@/shared/types';
import { mockUserInfoData } from '@mypage/api/mockData';

interface UserState {
  user: SimpleUserInfo | null;
  isAuthChecked: boolean;
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

      initAuthState: async () => {
        if (import.meta.env.VITE_DEV_USER_ENABLED === 'true') {
          const mockUser: SimpleUserInfo = {
            userName: mockUserInfoData.userName,
            grade: mockUserInfoData.grade,
            profileImage: mockUserInfoData.profileImage,
            role: mockUserInfoData.role,
          };
          set({ user: mockUser, isAuthChecked: true });
          return;
        }

        try {
          const storedUser = get().user;
          if (storedUser) {
            await get().userInfo();
          } else {
            await get().userInfo();
          }
        } catch {
          // userInfo에서 이미 에러 처리됨
        }
      },

      setUser: user => set({ user, isAuthChecked: true }),

      clearUser: () => {
        set({ user: null, isAuthChecked: true });
        sessionStorage.removeItem('user-storage');
      },

      logout: async () => {
        try {
          const res = await userApi.logout();
          get().clearUser();
          toast.info(res.message);
        } catch {
          // 로그아웃 실패 시 무시
        }
      },

      userInfo: async () => {
        try {
          const res = await userApi.getUserInfo();

          if ((res.statusCode === 200 || res.statusCode === 0) && res.data) {
            const { userName, grade, profileImage, role } = res.data;
            get().setUser({ userName, grade, profileImage, role });
          } else {
            get().clearUser();
          }
        } catch (error: unknown) {
          const err = error as AxiosError<ApiError>;
          if (err.response?.data?.statusCode === 401) {
            get().clearUser();
          } else {
            set({ isAuthChecked: true });
          }
        }
      },
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => sessionStorage),
      partialize: state => ({
        user: state.user,
        isAuthChecked: state.isAuthChecked,
      }),
      onRehydrateStorage: () => state => {
        if (state) {
          userStore.setState({ isAuthChecked: true });
        } else {
          userStore.setState({ isAuthChecked: true, user: null });
        }
      },
    }
  )
);

export const useIsLoggedIn = () => {
  const user = userStore(state => state.user);
  const isAuthChecked = userStore(state => state.isAuthChecked);

  if (import.meta.env.VITE_DEV_USER_ENABLED === 'true') {
    return true;
  }

  if (!isAuthChecked) {
    return false;
  }

  return user !== null;
};

export const useAuthState = () => {
  const user = userStore(state => state.user);
  const isAuthChecked = userStore(state => state.isAuthChecked);

  if (import.meta.env.VITE_DEV_USER_ENABLED === 'true') {
    return {
      user,
      isLoggedIn: true,
      isAuthChecked: true,
      isLoading: false,
    };
  }

  return {
    user,
    isLoggedIn: isAuthChecked && user !== null,
    isAuthChecked,
    isLoading: !isAuthChecked,
  };
};

export const useUser = () => {
  const user = userStore(state => state.user);

  if (import.meta.env.VITE_DEV_USER_ENABLED === 'true' && !user) {
    return {
      userName: mockUserInfoData.userName,
      grade: mockUserInfoData.grade,
      profileImage: mockUserInfoData.profileImage,
      role: mockUserInfoData.role,
    };
  }

  return user;
};
