import { useQuery } from '@tanstack/react-query';
import { adminApi } from '@admin/api/adminApi';

// 브랜드 목록 조회
export const useAdminBrandListQuery = (options?: { enabled?: boolean }) => {
  return useQuery({
    queryKey: ['adminBrandList'],
    queryFn: adminApi.getAdminBrandList,
    enabled: options?.enabled ?? true,
    refetchOnMount: 'always',
    gcTime: 0,
  });
}; 