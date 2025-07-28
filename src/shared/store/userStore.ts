import { type UserGrade, type UserRole, userApi } from '@user/index';
import { create } from 'zustand';

interface SimpleUserInfo {
  userName: string;
  grade: UserGrade | null;
  profileImage: string;
  markerId: number | null;
  role?: UserRole;
}

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
      console.log('🚪 로그아웃 성공:', res.message);
      userStore.getState().clearUser();
    } catch (error) {
      console.error('❌ 로그아웃 실패:', error);
      alert('로그아웃에 실패했습니다. 다시 시도해주세요.');
      throw error;
    }
  },
  userInfo: async () => {
    try {
      const res = await userApi.getUserInfo();
      const { userName, grade, profileImage, markerId, role } = res;
      userStore
        .getState()
        .setUser({ userName, grade, profileImage, markerId, role }); // 성공 시 저장
    } catch (error) {
      console.warn('⚠️ 유저 정보 불러오기 실패:', error);
      userStore.getState().clearUser(); // 실패 시 초기화
    }
  },
}));

export const useIsLoggedIn = () => {
  const user = userStore(state => state.user);
  const isAuthChecked = userStore(state => state.isAuthChecked);
  return isAuthChecked && user !== null;
};

export const useUser = () => userStore(state => state.user);
