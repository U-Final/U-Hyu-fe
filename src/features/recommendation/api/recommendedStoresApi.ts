import { RECOMMEND_ENDPOINT } from '@recommendation/api/endpoints';
import type { RecommendStore } from '@recommendation/api/recommendedStores.types';

import { client } from '@/shared/client';
import type { ApiResponse } from '@/shared/client/client.type';

export interface GetRecommendedStoresParams {
  lat: number;
  lon: number;
  radius: number;
}

export const getRecommendedStores = async (
  params: GetRecommendedStoresParams
): Promise<RecommendStore[]> => {
  const res = await client.get<ApiResponse<RecommendStore[]>>(
    RECOMMEND_ENDPOINT,
    { params }
  );
  if (!res.data.data) {
    throw new Error('추천 매장 데이터를 불러올 수 없음!');
  }
  return res.data.data;
};
