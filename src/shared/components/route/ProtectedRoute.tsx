import { type ReactElement, useEffect, useState } from 'react';

import { PATH } from '@paths';
import { useAuthState } from '@user/store/userStore';
import { useNavigate } from 'react-router-dom';

import { useModalStore } from '@/shared/store';

interface ProtectedRouteProps {
  children: ReactElement;
  requireAuth?: boolean;
  requireAdminRole?: boolean;
  redirectTo?: string;
}

export const ProtectedRoute = ({
  children,
  requireAuth = true,
  requireAdminRole = false,
  redirectTo = PATH.HOME,
}: ProtectedRouteProps) => {
  const { isLoggedIn, user, isLoading } = useAuthState();
  const navigate = useNavigate();
  const openModal = useModalStore(state => state.openModal);
  const [hasTriggeredModal, setHasTriggeredModal] = useState(false);

  useEffect(() => {
    if (isLoading) {
      return;
    }

    if (hasTriggeredModal) {
      return;
    }

    if (requireAuth && !isLoggedIn) {
      setHasTriggeredModal(true);
      openModal('login', {}, () => {
        navigate(redirectTo, { replace: true });
      });
      return;
    }

    if (isLoggedIn && requireAdminRole) {
      if (user?.role !== 'ADMIN') {
        navigate(redirectTo, { replace: true });
        return;
      }
    }
    if (hasTriggeredModal) {
      setHasTriggeredModal(false);
    }
  }, [
    isLoggedIn,
    isLoading,
    hasTriggeredModal,
    requireAuth,
    requireAdminRole,
    user,
    navigate,
    redirectTo,
    openModal,
  ]);

  if (isLoading) {
    return <div className="w-full h-full" />;
  }

  if (requireAuth && !isLoggedIn) {
    return <div className="w-full h-full" />;
  }

  return children;
};

export const AdminRoute = ({ children }: { children: ReactElement }) => (
  <ProtectedRoute requireAdminRole={true}>{children}</ProtectedRoute>
);

export const AuthRoute = ({ children }: { children: ReactElement }) => (
  <ProtectedRoute requireAuth={true}>{children}</ProtectedRoute>
);
