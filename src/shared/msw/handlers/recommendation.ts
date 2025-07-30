import { RECOMMEND_ENDPOINT } from '@recommendation/api/endpoints';
import { mockRecommendStores } from '@recommendation/api/recommendedStores.mock';
import { http } from 'msw';

import { createErrorResponse } from '@/shared/utils/createErrorResponse';
import { createResponse } from '@/shared/utils/createResponse';

export const recommendHandlers = [
  http.get(RECOMMEND_ENDPOINT.NEARBY, () => {
    const shouldFail = false;
    if (shouldFail) return createErrorResponse('추천된 매장 조회시 에러', 400);

    return createResponse(mockRecommendStores, '추천 매장 조회 성공');
  }),
];
