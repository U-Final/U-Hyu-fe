import { client } from '@/shared/client';
import type { ApiResponse } from '@/shared/client/client.type';

import { BRAND_ENDPOINTS } from './endpoints';
import type { ApiBrand } from './types';

/**
 * 관심 브랜드 목록 조회 API
 */
export const getInterestBrands = async (): Promise<ApiBrand[]> => {
  const res = await client.get<ApiResponse<ApiBrand[]>>(BRAND_ENDPOINTS.BRAND);

  if (!res.data.data) {
    throw new Error('Invalid API response: missing data');
  }

  return res.data.data;
};
