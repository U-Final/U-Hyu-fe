import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useUserStore } from '@/shared/auth/store/userStore';
import { authService } from '@shared/auth/service/authService';
import { useEffect } from 'react';

export const useAuthQuery = () => {
  const { user, setCredentials, removeCredentials } = useUserStore();
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

  // useEffect로 성공/실패 처리
  useEffect(() => {
    if (authData?.user) {
      setCredentials(authData.user);
    }
  }, [authData, setCredentials]);

  useEffect(() => {
    if (authError) {
      removeCredentials();
    }
  }, [authError, removeCredentials]);

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
