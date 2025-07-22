import { RECOMMEND_ENDPOINT } from '@recommendation/api/endpoints';
import type { RecommendStore } from '@recommendation/api/recommendedStores.types';

import { client } from '@/shared/client';
import type { ApiResponse } from '@/shared/client/client.type';

export interface GetRecommendedStoresParams {
  lat: number;
  lon: number;
  radius: number;
}

export const getRecommededStores = async (
  params: GetRecommendedStoresParams
): Promise<RecommendStore[]> => {
  const res = await client.get<ApiResponse<RecommendStore[]>>(
    RECOMMEND_ENDPOINT,
    { params }
  );
  return res.data.data!;
};
