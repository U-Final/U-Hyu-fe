import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useUserStore } from '@shared/store/userStore';
import { authService } from '@features/auth/authService';

export const useAuthQuery = () => {
  const { user } = useUserStore();
  const queryClient = useQueryClient();

  // 사용자 정보 검증 쿼리
  const {
    data: authData,
    isLoading: isValidating,
    error: authError,
    refetch: refetchAuth,
  } = useQuery({
    queryKey: ['auth', 'me'],
    queryFn: authService.getCurrentUser,
    enabled: !!user,
    staleTime: 5 * 60 * 1000, // 5분
    retry: 1,
  });

  const forceRefresh = () => {
    queryClient.invalidateQueries({ queryKey: ['auth', 'me'] as const });
  };

  return {
    authData,
    isValidating,
    authError,
    refetchAuth,
    forceRefresh,
  };
};
