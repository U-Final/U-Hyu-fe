import { BENEFIT_ENDPOINTS } from '@benefit/api/endpoints';
import type { BrandListParams, BrandListRes } from '@benefit/api/types';

import { client } from '@/shared/client';
import { ApiErrorResponse } from '@/shared/client/ApiErrorResponse';
import type { ApiResponse } from '@/shared/client/client.type';

// 제휴처 목록 페이지 api
export const getBrandList = async (
  params?: BrandListParams
): Promise<BrandListRes> => {
  const res = await client.get<ApiResponse<BrandListRes>>(
    BENEFIT_ENDPOINTS.BENEFIT.ROOT,
    { params }
  );

  if (res.data.statusCode !== 200 || !res.data.data) {
    throw new ApiErrorResponse(res.data);
  }

  return res.data.data;
};
