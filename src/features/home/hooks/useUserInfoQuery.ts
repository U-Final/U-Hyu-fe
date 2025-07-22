// src/features/user/hooks/useUserInfoQuery.ts
import { fetchUserInfo } from '@home/api/homeApi';
import type { UserInfo } from '@home/api/home.types';
import { useQuery } from '@tanstack/react-query';

export const useUserInfoQuery = () =>
  useQuery<UserInfo>({
    queryKey: ['userInfo'],
    queryFn: fetchUserInfo,
  });
