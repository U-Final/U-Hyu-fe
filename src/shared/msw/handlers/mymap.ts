import { MYMAP_ENDPOINTS } from '@/features/mymap/api/endpoint';
import {
  MOCK_MYMAP_DATA_BY_UUID,
  MOCK_MYMAP_LIST,
  MOCK_STORE_BOOKMARK_STATUS,
} from '@/features/mymap/api/mockData';
import type { MyMapListUpdateReq, MyMapStoreAddReq } from '@mymap/api/types';
import { http } from 'msw';

import { createErrorResponse } from '@/shared/utils/createErrorResponse';
import { createResponse } from '@/shared/utils/createResponse';

let nextId = Math.max(...MOCK_MYMAP_LIST.map(m => m.myMapListId), 0) + 1;
// 임시 저장소: 각 myMapListId에 매핑된 storeId Set
const MOCK_MYMAP_STORE: Record<number, Set<number>> = {};

export const mymapHandlers = [
  // My Map 목록 조회 MSW 핸들러
  http.get(MYMAP_ENDPOINTS.MYMAP.LIST, () => {
    const shouldFail = false;

    if (shouldFail) {
      //실패 시
      return createErrorResponse('에러처리.', 400);
    }
    return createResponse(MOCK_MYMAP_LIST, '성공');
  }),

  // My Map 추가 MSW 핸들러
  http.post(MYMAP_ENDPOINTS.MYMAP.ROOT, async ({ request }) => {
    const body = (await request.json()) as MyMapStoreAddReq;

    if (!body?.title || !body?.markerColor || !body?.uuid) {
      return createErrorResponse('요청 값 누락', 400);
    }

    const newMap = {
      myMapListId: nextId++,
      title: body.title,
      markerColor: body.markerColor,
      uuid: body.uuid,
    };

    MOCK_MYMAP_LIST.push(newMap);

    return createResponse(
      { myMapListId: newMap.myMapListId },
      '추가 성공',
      201
    );
  }),

  // My Map 수정 MSW 핸들러
  http.patch(MYMAP_ENDPOINTS.MYMAP.ROOT, async ({ request }) => {
    const body = (await request.json()) as MyMapListUpdateReq;

    if (!body?.myMapListId || !body?.title || !body?.markerColor) {
      return createErrorResponse('요청 데이터가 올바르지 않습니다.', 400);
    }

    const index = MOCK_MYMAP_LIST.findIndex(
      map => map.myMapListId === body.myMapListId
    );

    if (index === -1) {
      return createErrorResponse('해당 My Map 항목을 찾을 수 없습니다.', 404);
    }

    MOCK_MYMAP_LIST[index] = {
      ...MOCK_MYMAP_LIST[index],
      title: body.title,
      markerColor: body.markerColor,
    };

    return createResponse({ myMapListId: body.myMapListId }, '수정 성공');
  }),

  // My Map 삭제 MSW 핸들러
  http.delete(MYMAP_ENDPOINTS.MYMAP.DELETE_MSW(), async ({ params }) => {
    const id = Number(params.myMapListId);

    const index = MOCK_MYMAP_LIST.findIndex(map => map.myMapListId === id);
    if (index === -1) {
      return createErrorResponse('해당 My Map 항목을 찾을 수 없습니다.', 404);
    }

    // 배열 자체를 재할당하지 않고 splice로 제거
    MOCK_MYMAP_LIST.splice(index, 1);

    return createResponse({ Resultcode: 1 }, '삭제 성공');
  }),

  // My Map에 매장 추가/삭제 MSW 핸들러
  http.post(MYMAP_ENDPOINTS.MYMAP.TOGGLE_STORE_MSW(), async ({ params }) => {
    const myMapListId = Number(params.myMapListId);
    const storeId = Number(params.store_id);

    if (isNaN(myMapListId) || isNaN(storeId)) {
      return createErrorResponse('ID 형식이 올바르지 않습니다.', 400);
    }

    // 해당 myMapListId가 존재하는지 확인
    const exists = MOCK_MYMAP_LIST.some(m => m.myMapListId === myMapListId);
    if (!exists) {
      return createErrorResponse('해당 My Map 항목을 찾을 수 없습니다.', 404);
    }

    if (!MOCK_MYMAP_STORE[myMapListId]) {
      MOCK_MYMAP_STORE[myMapListId] = new Set();
    }

    const storeSet = MOCK_MYMAP_STORE[myMapListId];
    let isMyMapped: boolean;

    if (storeSet.has(storeId)) {
      storeSet.delete(storeId);
      isMyMapped = false;
    } else {
      storeSet.add(storeId);
      isMyMapped = true;
    }

    return createResponse(
      {
        myMapListId,
        storeId,
        isMyMapped,
      },
      isMyMapped ? '매장이 추가되었습니다.' : '매장이 삭제되었습니다.'
    );
  }),

  // my map 매장 등록 유무 조회 MSW 핸들러
  http.get(MYMAP_ENDPOINTS.MYMAP.STATE_MSW(), async ({ params }) => {
    const { store_id } = params;

    if (!store_id) {
      return createErrorResponse('storeId가 없습니다.', 400);
    }

    return createResponse(
      MOCK_STORE_BOOKMARK_STATUS,
      '북마크 상태 불러오기 성공'
    );
  }),

  // My Map 상세 조회 (UUID 기반)
  http.get(MYMAP_ENDPOINTS.MYMAP.VIEW_MSW(), async ({ params }) => {
    const uuid = params.uuid;

    if (!uuid) {
      return createErrorResponse('UUID가 없습니다.', 400);
    }

    if (uuid === MOCK_MYMAP_DATA_BY_UUID.uuid) {
      return createResponse(
        MOCK_MYMAP_DATA_BY_UUID,
        '마이맵 상세 불러오기 성공'
      );
    }

    return createErrorResponse('해당 UUID의 마이맵이 존재하지 않습니다.', 404);
  }),
];
