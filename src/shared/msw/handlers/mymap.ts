import { MYMAP_ENDPOINTS } from '@/features/mymap/api/endpoint';
import { MOCK_MYMAP_LIST } from '@/features/mymap/api/mockData';
import { http } from 'msw';

import { createErrorResponse } from '@/shared/utils/createErrorResponse';
import { createResponse } from '@/shared/utils/createResponse';

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
];
