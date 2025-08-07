import { useMutation, useQueryClient } from '@tanstack/react-query';
import { userApi } from '@user/api/userApi';
import { userStore } from '@user/store/userStore';
import { toast } from 'sonner';

import { userKeys } from './useUserQuery';

// 이메일 중복확인 훅 (Mutation)
export const useCheckEmailMutation = () => {
  return useMutation<
    { statusCode: number; message: string },
    Error,
    { email: string }
  >({
    mutationFn: userApi.checkEmail,
    onError: () => {
      // 에러는 상위 컴포넌트에서 처리됨
    },
  });
};

// 사용자 추가 정보 입력 훅 (Mutation)
export const useSubmitExtraInfo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userApi.submitExtraInfo,
    onSuccess: () => {
      // 추가 정보 입력 성공 시 사용자 정보 캐시 무효화
      queryClient.invalidateQueries({ queryKey: userKeys.info() });
    },
    onError: () => {
      // 에러는 상위 컴포넌트에서 처리됨
    },
  });
};

// 로그아웃 훅 (Mutation)
export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => userStore.getState().logout(), // 스토어 액션 호출
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: userKeys.all });
      window.location.href = '/';
    },
    onError: () => {
      toast.error('로그아웃에 실패했습니다. 다시 시도해주세요.');
    },
  });
};
