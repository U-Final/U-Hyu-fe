import { create, type StateCreator } from 'zustand';
import { persist } from 'zustand/middleware';
import { type User, type MembershipLevel } from '@features/auth/auth.type';

interface UserState {
  user: User | null;

  // 액션
  setCredentials: (user: User) => void;
  removeCredentials: () => void;
  updateTokens: (accessToken: string, refreshToken: string) => void;
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

  updateTokens: (accessToken, refreshToken) =>
    set((state) => ({
      user: state.user
        ? {
            ...state.user,
            accessToken,
            refreshToken,
          }
        : null,
    })),

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
    return level !== 'EXCELLENT';
  },
});

const persistedUserStore = persist<UserState>(userStoreSlice, {
  name: 'user-auth-storage',
  partialize: (state) => ({
    ...state,
    user: state.user
      ? {
          id: state.user.id,
          email: state.user.email,
          nickname: state.user.nickname,
          role: state.user.role,
          membershipLevel: state.user.membershipLevel,
          profileImageUrl: state.user.profileImageUrl,
          gender: state.user.gender,
          interestedBrands: state.user.interestedBrands,
          interestedCategories: state.user.interestedCategories,
          createdAt: state.user.createdAt,
          updatedAt: state.user.updatedAt,
          recentBrands: state.user.recentBrands,
          accessToken: '', // 빈 문자열로 설정 (실제로는 저장되지 않음)
          refreshToken: '', // 빈 문자열로 설정 (실제로는 저장되지 않음)
        }
      : null,
  }),
});

export const useUserStore = create(persistedUserStore);
