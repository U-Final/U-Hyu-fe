import { http, HttpResponse } from 'msw';
import {
  MOCK_STORES,
  createMockStoreListResponse,
  createMockStoreDetailResponse,
  createMockToggleFavoriteResponse,
} from '@/features/kakao-map/api/mockData';
import type {
  StoreDetailResponse,
  StoreListResponse,
  ToggleFavoriteResponseType,
} from '@/features/kakao-map/api/types';

export const mapHandlers = [
  // 주변 매장 목록 조회
  http.get('*/map/stores', ({ request }) => {
    const url = new URL(request.url);
    const lat = Number(url.searchParams.get('lat'));
    const lng = Number(url.searchParams.get('lng'));
    const radius = Number(url.searchParams.get('radius'));

    // Validate parameters
    if (isNaN(lat) || isNaN(lng) || isNaN(radius) || radius <= 0) {
      return HttpResponse.json(
        {
          status: 400,
          message:
            '잘못된 요청 파라미터입니다. lat, lng, radius는 유효한 숫자여야 하며, radius는 0보다 커야 합니다.',
          data: null,
          timestamp: new Date().toISOString(),
        },
        { status: 400 }
      );
    }

    // 반경 내 매장 필터링
    const filteredStores = MOCK_STORES.filter(store => {
      const distance =
        Math.sqrt(
          Math.pow(store.latitude - lat, 2) + Math.pow(store.longitude - lng, 2)
        ) * 111000; // 대략적인 미터 단위 변환

      return distance <= radius;
    });

    const response: StoreListResponse =
      createMockStoreListResponse(filteredStores);
    return HttpResponse.json(response, { status: 200 });
  }),

  // 매장 상세 정보 조회
  http.get('*/map/stores/:storeId', ({ params }) => {
    const storeId = Number(params.storeId);

    // Validate storeId parameter
    if (isNaN(storeId) || storeId <= 0) {
      return HttpResponse.json(
        {
          status: 400,
          message:
            '잘못된 매장 ID입니다. storeId는 유효한 양의 정수여야 합니다.',
          data: null,
          timestamp: new Date().toISOString(),
        },
        { status: 400 }
      );
    }

    try {
      const response: StoreDetailResponse =
        createMockStoreDetailResponse(storeId);
      return HttpResponse.json(response, { status: 200 });
    } catch {
      return HttpResponse.json(
        {
          status: 404,
          message: '매장을 찾을 수 없습니다.',
          data: null,
          timestamp: new Date().toISOString(),
        },
        { status: 404 }
      );
    }
  }),

  // 매장 즐겨찾기 토글
  http.post('*/map/stores/:storeId/favorite', ({ params }) => {
    const storeId = Number(params.storeId);

    // Validate storeId parameter
    if (isNaN(storeId) || storeId <= 0) {
      return HttpResponse.json(
        {
          status: 400,
          message:
            '잘못된 매장 ID입니다. storeId는 유효한 양의 정수여야 합니다.',
          data: null,
          timestamp: new Date().toISOString(),
        },
        { status: 400 }
      );
    }

    const response: ToggleFavoriteResponseType =
      createMockToggleFavoriteResponse(storeId);
    return HttpResponse.json(response, { status: 200 });
  }),
];
