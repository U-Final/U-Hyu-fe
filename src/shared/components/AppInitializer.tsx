import { useEffect } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();
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

  // 🔥 새로 추가: 인증 리다이렉트 처리
  useEffect(() => {
    const handleAuthRedirect = async () => {
      const currentPath = location.pathname;

      // 서버에서 리다이렉트된 인증 관련 페이지들
      const authRedirectPages: string[] = [PATH.EXTRA_INFO, PATH.HOME];

      if (authRedirectPages.includes(currentPath)) {
        console.log('🎉 인증 리다이렉트 감지 - 경로:', currentPath);

        try {
          // 서버 리다이렉트로 온 경우 로그인 완료 상태
          await userStore.getState().userInfo();
          console.log('✅ 로그인 상태 업데이트 완료');
        } catch (error) {
          console.error('❌ 로그인 상태 업데이트 실패:', error);
          // 실패 시 홈으로 리다이렉트 (무한 루프 방지)
          if (currentPath !== PATH.HOME) {
            navigate(PATH.HOME);
          }
        }
      }
    };

    handleAuthRedirect();
  }, [location.pathname, navigate]);

  // 🔥 수정: 탭 활성화 시 인증 상태 동기화
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        console.log('🔄 탭 활성화 - 인증 상태 체크');

        const currentPath = location.pathname;
        const { user, isAuthChecked } = userStore.getState();

        const authPages: string[] = [PATH.EXTRA_INFO, PATH.HOME];
        // 인증 관련 페이지에서는 무조건 유저 정보 재조회
        if (authPages.includes(currentPath)) {
          if (!user) {
            userStore.getState().userInfo();
          }
          return;
        }

        // 일반 페이지에서는 기존 로직
        if (isAuthChecked) {
          userStore.getState().userInfo();
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () =>
      document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [location.pathname]);

  useEffect(() => {
    const authRedirectPages: string[] = [PATH.EXTRA_INFO];
    const isAuthRedirectPage = authRedirectPages.includes(location.pathname);

    if (!isAdminPage && !isAuthRedirectPage) {
      // 일반 페이지에서는 기존 방식으로 인증 체크
      initAuthState();
    } else if (isAdminPage) {
      userStore.setState({ isAuthChecked: true, user: null });
    }
    // 인증 리다이렉트 페이지는 위의 handleAuthRedirect에서 처리
  }, [isAdminPage, location.pathname, initAuthState]);

  // useTabFocusAuth();

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
