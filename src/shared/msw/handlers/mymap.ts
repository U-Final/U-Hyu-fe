import { MYMAP_ENDPOINTS } from '@/features/mymap/api/endpoint';
import { MOCK_MYMAP_LIST } from '@/features/mymap/api/mockData';
import type { MyMapListUpdateReq, MyMapStoreAddReq } from '@mymap/api/types';
import { http } from 'msw';

import { createErrorResponse } from '@/shared/utils/createErrorResponse';
import { createResponse } from '@/shared/utils/createResponse';

let nextId = MOCK_MYMAP_LIST.length + 1;

export const mymapHandlers = [
  // My Map 목록 조회 MSW 핸들러
  http.get(MYMAP_ENDPOINTS.MYMAP.ROOT, () => {
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
      myMapListId: body.myMapListId,
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
];
