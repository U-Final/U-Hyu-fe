import { type UserInfomation, userApi } from '@user/index';
import { create } from 'zustand';

interface UserState {
  user: UserInfomation | null;
  isAuthChecked: boolean; // 유저가 로그인 되어있는지 ㅊㅔ크
  setUser: (user: UserInfomation) => void;
  clearUser: () => void;
  logout: () => Promise<void>;
}

export const userStore = create<UserState>(set => ({
  user: null,
  isAuthChecked: false,
  setUser: user => set({ user, isAuthChecked: true }),
  clearUser: () => set({ user: null, isAuthChecked: true }),
  logout: async () => {
    try {
      const res = await userApi.logout();
      console.log('🚪 로그아웃 성공:', res.message);
    } catch (error) {
      console.error('❌ 로그아웃 실패:', error);
    } finally {
      set({ user: null, isAuthChecked: true }); // 상태 초기화
    }
  },
}));

export const useIsLoggedIn = () => {
  const user = userStore(state => state.user);
  const isAuthChecked = userStore(state => state.isAuthChecked);
  return isAuthChecked && user !== null;
};
