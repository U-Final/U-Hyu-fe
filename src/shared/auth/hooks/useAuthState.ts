// hooks/auth/useAuthState.ts
import { useUserStore } from '@/shared/auth/store/userStore';

export const useAuthState = () => {
  const user = useUserStore((state) => state.user);
  const isAuthenticated = useUserStore((state) => state.isAuthenticated());
  const isAdmin = useUserStore((state) => state.isAdmin());
  const isUser = useUserStore((state) => state.isUser());
  const membershipLevel = useUserStore((state) => state.getMembershipLevel());
  const isVIPLevel = useUserStore((state) => state.isVIPLevel());
  const isPremiumMember = useUserStore((state) => state.isPremiumMember());

  return {
    user,
    isAuthenticated,
    isAdmin,
    isUser,
    membershipLevel,
    isVIPLevel,
    isPremiumMember,
  };
};
