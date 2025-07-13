import { useMutation, useQueryClient } from '@tanstack/react-query';
import { userApi } from '@/features/user/api/userApi';
import { userKeys } from './useUserQuery';

// 사용자 추가 정보 입력 훅 (Mutation)
export const useSubmitExtraInfo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userApi.submitExtraInfo,
    onSuccess: () => {
      // 추가 정보 입력 성공 시 사용자 정보 캐시 무효화
      queryClient.invalidateQueries({ queryKey: userKeys.info() });
    },
    onError: (error: Error) => {
      console.error('추가 정보 입력 실패:', error);
    },
  });
};

// 로그아웃 훅 (Mutation)
export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userApi.logout,
    onSuccess: () => {
      // 로그아웃 성공 시 모든 사용자 관련 캐시 무효화
      queryClient.removeQueries({ queryKey: userKeys.all });

      // 로컬 스토리지 정리
      localStorage.removeItem('accessToken');

      // 로그인 페이지로 리다이렉트
      window.location.href = '/login';
    },
    onError: (error: Error) => {
      console.error('로그아웃 실패:', error);
    },
  });
};
