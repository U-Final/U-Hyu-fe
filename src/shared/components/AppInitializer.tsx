import { useEffect } from 'react';

import { useLocation } from 'react-router-dom';

import { PATH } from '@/routes/path';

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
  const location = useLocation();
  const initAuthState = userStore(state => state.initAuthState);

  // 관리자 페이지에서는 사용자 정보 요청을 하지 않음
  const isAdminPage = location.pathname === PATH.ADMIN;

  // 관리자 페이지가 아닐 때만 사용자 정보 요청
  // const { data, isSuccess, isError } = useUserInfo(!isAdminPage);

  // 개발 환경에서 로깅
  if (import.meta.env.DEV) {
    console.log(
      '🔍 AppInitializer - 현재 경로:',
      location.pathname,
      '관리자 페이지 여부:',
      isAdminPage
    );
  }

  useEffect(() => {
    if (!isAdminPage) {
      // 쿠키 체크 → 필요시에만 서버 호출
      initAuthState();
    } else {
      // 관리자 페이지에서는 인증 체크 건너뛰기
      userStore.setState({ isAuthChecked: true, user: null });
    }
  }, [isAdminPage, initAuthState]);

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
