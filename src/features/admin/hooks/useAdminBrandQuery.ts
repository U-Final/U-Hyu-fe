import { useQuery } from '@tanstack/react-query';
import { adminApi } from '@admin/api/adminApi';
import type { AdminBrandListParams } from '@admin/api/types';

// 브랜드 목록 조회
export const useAdminBrandListQuery = (
  params?: AdminBrandListParams,
  options?: { enabled?: boolean }
) => {
  return useQuery({
    queryKey: ['adminBrandList', params],
    queryFn: () => adminApi.getAdminBrandList(params),
    enabled: options?.enabled ?? true,
    refetchOnMount: 'always',
    gcTime: 0,
  });
}; 