import { type ReactElement } from 'react';

import { Navigate } from 'react-router-dom';

import { PATH } from '@paths';

import { useIsLoggedIn, useUser } from '@/shared/store/userStore';

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
  const isLoggedIn = useIsLoggedIn();
  const user = useUser();

  if (requireAuth && !isLoggedIn) {
    return <Navigate to={redirectTo} replace />;
  }

  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to={redirectTo} replace />;
  }

  return children;
};

export const AdminRoute = ({ children }: { children: ReactElement }) => (
  <ProtectedRoute requiredRole="ADMIN">{children}</ProtectedRoute>
);

export const UserRoute = ({ children }: { children: ReactElement }) => (
  <ProtectedRoute requiredRole="USER">{children}</ProtectedRoute>
);