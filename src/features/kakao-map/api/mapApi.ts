import { client } from '@/shared/client';
import { MAP_ENDPOINTS } from './endpoints';
import type {
  GetNearbyStoresParams,
  GetStoreDetailParams,
  ToggleFavoriteParams,
  StoreDetailResponse,
  StoreListResponse,
  ToggleFavoriteResponseType,
} from './types';
import {
  MOCK_STORES,
  createMockStoreListResponse,
  createMockStoreDetailResponse,
  createMockToggleFavoriteResponse,
} from './mockData';

// 개발 환경에서 목데이터 사용 여부
const USE_MOCK_DATA =
  import.meta.env.MODE === 'development' &&
  import.meta.env.VITE_USE_MOCK_DATA === 'true';

/**
 * 개선된 Map API 함수들
 *
 * 주요 개선사항:
 * 1. Path parameter 올바른 처리
 * 2. HTTP 메서드별 적절한 데이터 전달 방식
 * 3. 타입 안전성 강화
 * 4. 에러 처리 고려
 * 5. 개발 환경에서 목데이터 지원
 */
export const mapApi = {
  /**
   * 주변 매장 목록 조회
   * GET /map/stores?lat=37.123&lng=127.456&radius=1000
   */
  getStoreList: async (
    params: GetNearbyStoresParams
  ): Promise<StoreListResponse> => {
    if (USE_MOCK_DATA) {
      // 목데이터 사용 시 지연 시간 시뮬레이션
      await new Promise(resolve => setTimeout(resolve, 500));

      // 반경 내 매장 필터링 (간단한 거리 계산)
      const filteredStores = MOCK_STORES.filter(store => {
        const distance =
          Math.sqrt(
            Math.pow(store.latitude - params.lat, 2) +
              Math.pow(store.longitude - params.lng, 2)
          ) * 111000; // 대략적인 미터 단위 변환

        return distance <= params.radius;
      });

      return createMockStoreListResponse(filteredStores);
    }

    const response = await client.get<StoreListResponse>(
      MAP_ENDPOINTS.GET_NEARBY_STORES,
      {
        params, // query parameter로 전달
      }
    );
    return response.data;
  },

  /**
   * 매장 상세 정보 조회
   * GET /map/stores/123
   */
  getStoreDetail: async ({
    storeId,
  }: GetStoreDetailParams): Promise<StoreDetailResponse> => {
    if (USE_MOCK_DATA) {
      // 목데이터 사용 시 지연 시간 시뮬레이션
      await new Promise(resolve => setTimeout(resolve, 300));

      return createMockStoreDetailResponse(storeId);
    }

    // path parameter를 URL에 직접 포함
    const url = `${MAP_ENDPOINTS.GET_STORE_DETAIL}/${storeId}`;
    const response = await client.get<StoreDetailResponse>(url);
    return response.data;
  },

  /**
   * 매장 즐겨찾기 토글
   * POST /map/stores/123/favorite
   */
  toggleFavorite: async ({
    storeId,
  }: ToggleFavoriteParams): Promise<ToggleFavoriteResponseType> => {
    if (USE_MOCK_DATA) {
      // 목데이터 사용 시 지연 시간 시뮬레이션
      await new Promise(resolve => setTimeout(resolve, 200));

      return createMockToggleFavoriteResponse(storeId);
    }

    // RESTful한 엔드포인트 구성
    const url = `${MAP_ENDPOINTS.TOGGLE_FAVORITE}/${storeId}/favorite`;
    const response = await client.post<ToggleFavoriteResponseType>(url);
    return response.data;
  },
};

// 타입 가드 함수들 (런타임 안전성을 위한 추가 보안)
export const isValidStoreId = (storeId: unknown): storeId is number => {
  return typeof storeId === 'number' && storeId > 0;
};

export const isValidCoordinate = (coord: unknown): coord is number => {
  return typeof coord === 'number' && !isNaN(coord) && isFinite(coord);
};
