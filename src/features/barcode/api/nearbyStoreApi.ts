import type { LocationParams, NearbyStore } from '@barcode/api/barcode.type';
import { BARCODE_ENDPOINTS } from '@barcode/api/endpoints';

import { client } from '@/shared/client';
import type { ApiResponse } from '@/shared/client/client.type';

// 사용자 위치 기반 추천 매장 1개 요청
export const postNearbyStore = async (
  params: LocationParams
): Promise<NearbyStore | null> => {
  const res = await client.post<ApiResponse<NearbyStore | null>>(
    BARCODE_ENDPOINTS.NEARBY,
    params
  );
  return res.data.data ?? null;
};
