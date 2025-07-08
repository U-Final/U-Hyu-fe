// hooks/auth/usePermissions.ts
import { useUserStore } from '@/shared/auth/store/userStore';

export const usePermissions = () => {
  const canAccessAdmin = useUserStore((state) => state.canAccessAdmin());
  const canViewStats = useUserStore((state) => state.canViewStats());
  const canPerformCRUD = useUserStore((state) => state.canPerformCRUD());
  const canManageUsers = useUserStore((state) => state.canManageUsers());

  return {
    canAccessAdmin,
    canViewStats,
    canPerformCRUD,
    canManageUsers,
  };
};
