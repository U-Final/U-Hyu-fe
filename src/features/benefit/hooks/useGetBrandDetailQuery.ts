import { getBrandDetail } from '@benefit/api/benefitApi';
import type { BrandDetailRes } from '@benefit/api/types';
import { useQuery } from '@tanstack/react-query';

export const useGetBrandDetailQuery = (brandId: number) =>
  useQuery<BrandDetailRes>({
    queryKey: ['brandDetail', brandId],
    queryFn: () => getBrandDetail(brandId),
  });