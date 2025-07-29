import { useEffect } from 'react';

import { useUserInfo } from '@user/hooks/useUserQuery';
import type { AxiosError } from 'axios';

import type { ApiError } from '@/shared/client/client.type';
import { userStore } from '@/shared/store/userStore';
import {
  initKeyboardHandler,
  initScrollRestore,
} from '@/shared/utils/scrollRestore';
import {
  cleanupViewportHeight,
  initViewportHeight,
} from '@/shared/utils/viewport';

const AppInitializer = () => {
  const { data, isSuccess, isError } = useUserInfo();
  const setUser = userStore(state => state.setUser);
  const clearUser = userStore(state => state.clearUser);

  // 사용자 정보 초기화
  useEffect(() => {
    if (isSuccess && data.data) {
      setUser(data.data);
    } else if (isError) {
      const err = data as unknown as AxiosError<ApiError>;

      // 401 Unauthorized일 때만 clearUser() 처리
      if (err?.response?.data?.statusCode === 401) {
        clearUser();
      } else {
        console.warn('⚠️ 사용자 정보 로딩 실패(비401): 상태 유지');
      }
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
