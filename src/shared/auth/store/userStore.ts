import { create, type StateCreator } from 'zustand';
import { persist } from 'zustand/middleware';
import { type User, type MembershipLevel } from '@/shared/auth/types/auth.type';
import { getUserInfoFromToken } from '@/shared/auth/utils/jwtUtils';

// 쿠키에서 토큰 가져오는 유틸리티
const getCookie = (name: string): string | null => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
  return null;
};

interface UserState {
  user: User | null;

  // 액션
  setCredentials: (user: User) => void;
  removeCredentials: () => void;
  updateUserFromToken: () => void;
  updateProfile: (profileData: Partial<User>) => void;

  // 상태 확인 함수들
  isAuthenticated: () => boolean;
  isAdmin: () => boolean;
  isUser: () => boolean;

  // 권한 확인 함수들
  canAccessAdmin: () => boolean;
  canViewStats: () => boolean;
  canPerformCRUD: () => boolean;
  canManageUsers: () => boolean;

  // 멤버십 관련 함수들
  getMembershipLevel: () => MembershipLevel | null;
  isVIPLevel: () => boolean;
  isPremiumMember: () => boolean;
}

const userStoreSlice: StateCreator<UserState> = (set, get) => ({
  user: null,

  setCredentials: (user) => set({ user }),

  removeCredentials: () => set({ user: null }),

  // JWT 토큰에서 사용자 정보 추출하여 스토어 업데이트
  updateUserFromToken: () => {
    const accessToken = getCookie('accessToken');
    if (accessToken) {
      const userInfo = getUserInfoFromToken(accessToken);
      if (userInfo) {
        set({ user: userInfo });
      }
    }
  },

  updateProfile: (profileData) =>
    set((state) => ({
      user: state.user
        ? {
            ...state.user,
            ...profileData,
            updatedAt: new Date().toISOString(),
          }
        : null,
    })),

  // 상태 확인
  isAuthenticated: () => !!get().user,
  isAdmin: () => get().user?.role === 'ADMIN',
  isUser: () => get().user?.role === 'USER',

  // 권한 확인
  canAccessAdmin: () => get().user?.role === 'ADMIN',
  canViewStats: () => get().user?.role === 'ADMIN',
  canPerformCRUD: () => get().user?.role === 'ADMIN',
  canManageUsers: () => get().user?.role === 'ADMIN',

  // 멤버십 관련
  getMembershipLevel: () => get().user?.membershipLevel || null,
  isVIPLevel: () => {
    const level = get().user?.membershipLevel;
    return level === 'VIP' || level === 'VVIP';
  },
  isPremiumMember: () => {
    const level = get().user?.membershipLevel;
    return level === 'VIP' || level === 'VVIP'; // EXCELLENT도 포함하려면 level !== 'BASIC'
  },
});

const persistedUserStore = persist<UserState>(userStoreSlice, {
  name: 'user-auth-storage',
});

export const useUserStore = create(persistedUserStore);
