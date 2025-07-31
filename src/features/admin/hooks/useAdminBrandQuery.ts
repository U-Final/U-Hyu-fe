import { useQuery } from '@tanstack/react-query';
import {
  getAdminBrands,
  getBrandDetail,
} from '@admin/api';

export function useAdminBrandsQuery() {
  return useQuery({
    queryKey: ['admin', 'brands'],
    queryFn: () => getAdminBrands(),
    enabled: false, // 수동으로만 요청
    staleTime: 0, // 항상 stale 상태로 유지하여 매번 새로운 데이터 요청
    gcTime: 0, // 캐시 즉시 삭제
  });
}

export function useAdminBrandDetailQuery(brandId: number) {
  return useQuery({
    queryKey: ['admin', 'brands', brandId],
    queryFn: () => getBrandDetail(brandId),
    enabled: !!brandId,
  });
} 