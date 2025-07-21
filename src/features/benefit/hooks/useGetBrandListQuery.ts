import { getBrandList } from '@benefit/api/benefitApi';
import type { BrandListParams, BrandListRes } from '@benefit/api/types';
import { useQuery } from '@tanstack/react-query';

export const useGetBrandListQuery = (params?: BrandListParams) =>
  useQuery<BrandListRes>({
    queryKey: ['brandList', params],
    queryFn: () => getBrandList(params),
    enabled: !!params,
  });
