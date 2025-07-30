import { useQuery } from '@tanstack/react-query';
import {
  getAdminBrands,
  getAdminBrandDetail,
} from '../api/adminApi';

export function useAdminBrandsQuery() {
  return useQuery({
    queryKey: ['admin', 'brands'],
    queryFn: getAdminBrands,
  });
}

export function useAdminBrandDetailQuery(brandId: number) {
  return useQuery({
    queryKey: ['admin', 'brands', brandId],
    queryFn: () => getAdminBrandDetail(brandId),
    enabled: !!brandId,
  });
} 