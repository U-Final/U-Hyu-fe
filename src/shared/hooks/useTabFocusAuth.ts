import { useEffect } from 'react';

import { userStore } from '@/shared/store/userStore';
import { hasValidAuthCookie } from '@/shared/utils/cookieAuthUtils';

export const useTabFocusAuth = () => {
  // const initAuthState = userStore(state => state.initAuthState);

  useEffect(() => {
    const handleVisibilityChange = () => {
      // 탭이 다시 보이게 될 때 (다른 탭에서 돌아올 때)
      if (!document.hidden) {
        const { user, isAuthChecked } = userStore.getState();
        const hasCookie = hasValidAuthCookie();

        // 인증 체크가 완료된 상태에서만 동기화
        if (isAuthChecked) {
          // 쿠키는 있는데 유저 정보가 없으면 → 방금 로그인 완료
          if (hasCookie && !user) {
            console.log('🎉 로그인 완료 감지 - 유저 정보 조회');
            userStore.getState().userInfo();
          }
          // 쿠키는 없는데 유저 정보가 있으면 → 다른 탭에서 로그아웃
          else if (!hasCookie && user) {
            console.log('👋 로그아웃 감지 - 상태 클리어');
            userStore.getState().clearUser();
          }
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);
};
