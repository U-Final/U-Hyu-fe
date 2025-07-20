// src/features/user/hooks/useUserInfoQuery.ts
import type { UserInfo } from '@/features/home/api/homeApi';
import { fetchUserInfo } from '@/features/home/api/homeApi';
import { useQuery } from '@tanstack/react-query';

export const useUserInfoQuery = () =>
  useQuery<UserInfo>({
    queryKey: ['userInfo'],
    queryFn: fetchUserInfo,
  });
