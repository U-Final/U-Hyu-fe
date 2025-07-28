import { type ReactElement, useEffect, useState } from 'react';

import { PATH } from '@paths';
import { useNavigate } from 'react-router-dom';

import { useModalStore } from '@/shared/store';
import { useAuthState } from '@/shared/store/userStore';

interface ProtectedRouteProps {
  children: ReactElement;
  requireAuth?: boolean;
  requiredRole?: 'ADMIN' | 'USER';
  redirectTo?: string;
}

export const ProtectedRoute = ({
  children,
  requireAuth = true,
  requiredRole,
  redirectTo = PATH.HOME,
}: ProtectedRouteProps) => {
  const { isLoggedIn, user, isLoading } = useAuthState();
  const navigate = useNavigate();
  const openModal = useModalStore(state => state.openModal);
  const [hasTriggeredModal, setHasTriggeredModal] = useState(false);

  useEffect(() => {
    if (import.meta.env.DEV) {
      console.log('🔍 ProtectedRoute - 상태 확인:', {
        isLoading,
        isLoggedIn,
        user,
        requireAuth,
        requiredRole,
        hasTriggeredModal,
        userRole: user?.role,
      });
    }

    // 아직 인증 확인 중이면 아무것도 하지 않음
    if (isLoading) {
      return;
    }

    // 이미 모달을 띄웠으면 중복 실행 방지
    if (hasTriggeredModal) {
      return;
    }

    // 인증이 필요한데 로그인하지 않은 경우
    if (requireAuth && !isLoggedIn) {
      if (import.meta.env.DEV) {
        console.log('❌ ProtectedRoute - 로그인 필요하지만 미로그인');
      }
      setHasTriggeredModal(true);
      openModal('login', {}, () => {
        // 모달 닫힐 때 홈으로 리다이렉트
        navigate(redirectTo, { replace: true });
      });
      return;
    }

    // 권한이 맞지 않는 경우
    if (requiredRole && user?.role !== requiredRole) {
      if (import.meta.env.DEV) {
        console.log('❌ ProtectedRoute - 권한 불일치:', {
          requiredRole,
          userRole: user?.role,
        });
      }
      setHasTriggeredModal(true);
      openModal('login', {}, () => {
        // 모달 닫힐 때 홈으로 리다이렉트
        navigate(redirectTo, { replace: true });
      });
      return;
    }

    if (import.meta.env.DEV) {
      console.log('✅ ProtectedRoute - 접근 허용');
    }

    // 성공적으로 접근 가능한 경우 모달 상태 리셋
    if (hasTriggeredModal) {
      setHasTriggeredModal(false);
    }
  }, [
    isLoggedIn,
    isLoading,
    hasTriggeredModal,
    requireAuth,
    requiredRole,
    user,
    navigate,
    redirectTo,
    openModal,
  ]);

  // 로딩 중이면 빈 화면 표시
  if (isLoading) {
    return <div className="w-full h-full" />;
  }

  // 인증이 필요한데 로그인하지 않은 경우
  if (requireAuth && !isLoggedIn) {
    // 모달이 표시되는 동안은 빈 화면 표시
    return <div className="w-full h-full" />;
  }

  return children;
};

export const AdminRoute = ({ children }: { children: ReactElement }) => (
  <ProtectedRoute requiredRole="ADMIN">{children}</ProtectedRoute>
);

export const UserRoute = ({ children }: { children: ReactElement }) => (
  <ProtectedRoute requiredRole="USER">{children}</ProtectedRoute>
);
