import { client } from '@/shared/client';
import type { ApiResponse } from '@/shared/client/client.type';

import { MYMAP_ENDPOINTS } from './endpoint';
import type {
  MyMapListDeleteParams,
  MyMapListDeleteRes,
  MyMapListRes,
  MyMapListUpdateReq,
  MyMapListUpdateRes,
  MyMapStoreAddReq,
  MyMapStoreAddRes,
} from './types';

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

// My Map 추가 API
export const addMyMap = async (
  body: MyMapStoreAddReq
): Promise<MyMapStoreAddRes> => {
  const res = await client.post<ApiResponse<MyMapStoreAddRes>>(
    MYMAP_ENDPOINTS.MYMAP.ROOT,
    body
  );
  if (!res.data.data) {
    throw new Error('My Map 추가에 실패했습니다');
  }
  return res.data.data;
};

// My Map 수정 api
export const updateMyMap = async (
  body: MyMapListUpdateReq
): Promise<MyMapListUpdateRes> => {
  const res = await client.patch<ApiResponse<MyMapListUpdateRes>>(
    MYMAP_ENDPOINTS.MYMAP.ROOT,
    body
  );

  if (!res.data.data) {
    throw new Error('My Map 수정에 실패했습니다');
  }
  return res.data.data;
};

// My Map 삭제 API
export const deleteMyMap = async (
  myMapListId: MyMapListDeleteParams['myMapListId']
): Promise<MyMapListDeleteRes> => {
  const res = await client.delete<ApiResponse<MyMapListDeleteRes>>(
    MYMAP_ENDPOINTS.MYMAP.DELETE(myMapListId)
  );

  if (!res.data.data) {
    throw new Error('My Map 삭제에 실패했습니다');
  }
  return res.data.data;
};
