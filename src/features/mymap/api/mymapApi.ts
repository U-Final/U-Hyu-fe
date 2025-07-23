import { client } from '@/shared/client';
import type { ApiResponse } from '@/shared/client/client.type';

import { MYMAP_ENDPOINTS } from './endpoint';
import type { MyMapListRes } from './types';

// My Map 목록 조회 api
export const getMyMapList = async (): Promise<MyMapListRes[]> => {
  const res = await client.get<ApiResponse<MyMapListRes[]>>(
    MYMAP_ENDPOINTS.MYMAP.ROOT
  );

  return res.data.data!;
};
