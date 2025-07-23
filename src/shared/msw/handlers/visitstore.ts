import type { LocationParams, NearbyStore } from '@barcode/api/barcode.type';
import { BARCODE_ENDPOINTS } from '@barcode/api/endpoints';
import { http } from 'msw';

import { createErrorResponse } from '@/shared/utils/createErrorResponse';
import { createResponse } from '@/shared/utils/createResponse';

const store: NearbyStore = {
  store_id: 1,
  store_name: '스타벅스 선릉점',
};

export const visitStoreHandler = [
  http.post(BARCODE_ENDPOINTS.NEARBY, async ({ request }) => {
    const { lat, lon, radius } = (await request.json()) as LocationParams;

    if (!lat || !lon || !radius) {
      return createErrorResponse('좌표값이 누락되었습니다.', 400);
    }

    return createResponse(store, '바코드 킨 위치 매장 정보 조회 성공');
  }),
];
