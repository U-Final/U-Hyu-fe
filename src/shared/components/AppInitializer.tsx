import { useEffect } from 'react';

import { useUserInfo } from '@user/hooks/useUserQuery';

import { userStore } from '@/shared/store/userStore';
import { initViewportHeight, cleanupViewportHeight } from '@/shared/utils/viewport';
import { initScrollRestore, initKeyboardHandler } from '@/shared/utils/scrollRestore';

const AppInitializer = () => {
  const { data, isSuccess, isError } = useUserInfo();
  const setUser = userStore(state => state.setUser);
  const clearUser = userStore(state => state.clearUser);

  // 사용자 정보 초기화
  useEffect(() => {
    if (isSuccess && data) {
      setUser(data);
    } else if (isError) {
      clearUser();
    }
  }, [isSuccess, isError, data, setUser, clearUser]);

  // 뷰포트 높이 및 스크롤 복원 초기화 (모바일 최적화)
  useEffect(() => {
    // 뷰포트 높이 초기화 (iOS Safari 주소창 대응)
    initViewportHeight();
    
    // 스크롤 복원 시스템 초기화
    const cleanupScrollRestore = initScrollRestore();
    
    // 키보드 핸들러 초기화 (iOS Safari 키보드 대응)
    const cleanupKeyboardHandler = initKeyboardHandler();
    
    return () => {
      cleanupViewportHeight();
      cleanupScrollRestore();
      cleanupKeyboardHandler();
    };
  }, []);

  return null;
};

export default AppInitializer;
