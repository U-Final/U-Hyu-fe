// src/features/user/hooks/useUserInfoQuery.ts
import type { UserInfo } from '@/features/home/api/homeApi';
import { fetchUserInfo } from '@/features/home/api/homeApi';
import { useQuery } from '@tanstack/react-query';

export const useUserInfoQuery = () =>
  useQuery<UserInfo>({
    queryKey: ['userInfo'],
    queryFn: fetchUserInfo,
    staleTime: 0, // 항상 최신으로 간주 → 매번 요청
    refetchOnMount: true, // 다시 마운트되면 항상 재요청
    retry: false, // 404 등 실패 시 재시도 안 함
  });
