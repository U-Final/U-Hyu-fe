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
      userStore.getState().clearUser();
    } catch (error) {
      console.error('❌ 로그아웃 실패:', error);
      alert('로그아웃에 실패했습니다. 다시 시도해주세요.');
      throw error;
    }
  },
}));

export const useIsLoggedIn = () => {
  const user = userStore(state => state.user);
  const isAuthChecked = userStore(state => state.isAuthChecked);
  return isAuthChecked && user !== null;
};
