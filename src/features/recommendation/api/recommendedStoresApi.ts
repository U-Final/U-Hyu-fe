import type { Store } from '@kakao-map/types/store';
import { RECOMMEND_ENDPOINT } from '@recommendation/api/endpoints';

import { client } from '@/shared/client';
import type { ApiResponse } from '@/shared/client/client.type';

export interface GetRecommendedStoresParams {
  lat: number;
  lon: number;
  radius: number;
}

export const getRecommendedStores = async (
  params: GetRecommendedStoresParams
): Promise<Store[]> => {
  const res = await client.get<ApiResponse<Store[]>>(RECOMMEND_ENDPOINT, {
    params,
  });

  return res.data.data ?? [];
};
