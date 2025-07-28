import { useQuery } from '@tanstack/react-query';
import { userApi } from '@user/api/userApi';

export const userKeys = {
  all: ['user'] as const,
  info: () => [...userKeys.all, 'info'] as const,
  emailCheck: (email: string) =>
    [...userKeys.all, 'email-check', email] as const,
} as const;

// 이메일 중복 확인 훅 (Query)
export const useCheckEmail = (email: string, enabled: boolean = false) => {
  return useQuery({
    queryKey: userKeys.emailCheck(email),
    queryFn: () => userApi.checkEmail({ email }),
    enabled: enabled && email.length > 0,
    staleTime: 10 * 60 * 1000, // 10분간 fresh 상태 유지
    gcTime: 30 * 60 * 1000, // 30분간 캐시 유지
  });
};

// 사용자 정보 조회 훅 (Query)
export const useUserInfo = () => {
  return useQuery({
    queryKey: ['userMe'],
    queryFn: userApi.getUserInfo,
    retry: false,
    refetchOnWindowFocus: false,
  });
};
