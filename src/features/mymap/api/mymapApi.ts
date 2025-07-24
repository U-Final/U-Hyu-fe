import { client } from '@/shared/client';
import type { ApiResponse } from '@/shared/client/client.type';

import { MYMAP_ENDPOINTS } from './endpoint';
import type { MyMapListRes } from './types';

// My Map 목록 조회 api
export const getMyMapList = async (): Promise<MyMapListRes[]> => {
  const res = await client.get<ApiResponse<MyMapListRes[]>>(
    MYMAP_ENDPOINTS.MYMAP.ROOT
  );

  if (!res.data.data) {
    throw new Error('MyMap 목록 데이터를 불러올 수 없습니다');
  }
  return res.data.data;
};
