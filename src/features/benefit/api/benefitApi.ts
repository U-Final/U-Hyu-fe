import { BENEFIT_ENDPOINTS } from '@benefit/api/endpoints';
import type { BrandListParams, BrandListRes } from '@benefit/api/types';

import { client } from '@/shared/client';
import type { ApiResponse } from '@/shared/client/client.type';

// 제휴처 목록 페이지 api
export const getBrandList = async (
  params?: BrandListParams
): Promise<BrandListRes> => {
  const res = await client.get<ApiResponse<BrandListRes>>(
    BENEFIT_ENDPOINTS.BENEFIT.ROOT,
    { params }
  );

  return res.data.data!;
};
