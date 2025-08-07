import { useQuery } from '@tanstack/react-query';
import { userApi } from '@user/api/userApi';
import type { AxiosError } from 'axios';

export const userKeys = {
  all: ['user'] as const,
  info: () => [...userKeys.all, 'info'] as const,
  emailCheck: (email: string) =>
    [...userKeys.all, 'email-check', email] as const,
} as const;

export const useCheckEmail = (email: string, enabled: boolean = false) => {
  return useQuery({
    queryKey: userKeys.emailCheck(email),
    queryFn: () => userApi.checkEmail({ email }),
    enabled: enabled && email.length > 0,
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });
};

export const useUserInfo = (enabled: boolean = true) => {
  return useQuery({
    queryKey: ['userMe'],
    queryFn: userApi.getUserInfo,
    retry: (failureCount, error) => {
      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as AxiosError;
        if (
          axiosError.response?.status === 401 ||
          axiosError.response?.status === 403
        ) {
          return false;
        }
      }
      return failureCount < 1;
    },
    refetchOnWindowFocus: false,
    enabled,
  });
};
