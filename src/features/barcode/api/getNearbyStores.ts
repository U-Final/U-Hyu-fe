import type { LocationParams } from '@barcode/api/barcode.type';
import { MAP_ENDPOINTS } from '@kakao-map/api/endpoints';
import type { StoreSummary } from '@kakao-map/api/types';

import { client } from '@/shared/client';
import type { ApiResponse } from '@/shared/client/client.type';

export const getNearbyStores = async (
  params: LocationParams
): Promise<StoreSummary[]> => {
  const res = await client.get<ApiResponse<StoreSummary[]>>(
    MAP_ENDPOINTS.GET_NEARBY_STORES,
    {
      params,
    }
  );
  return res.data.data ?? [];
};
