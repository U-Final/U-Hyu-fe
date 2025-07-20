// src/features/user/hooks/useUserInfoQuery.ts
import type { UserInfo } from '@/features/home/api/homeApi';
import { fetchUserInfo } from '@/features/home/api/homeApi';
import type { ApiErrorResponse } from '@/shared/client/client.type';
import { useQuery } from '@tanstack/react-query';

export const useUserInfoQuery = () =>
  useQuery<UserInfo, ApiErrorResponse>({
    queryKey: ['userInfo'],
    queryFn: fetchUserInfo,
  });
