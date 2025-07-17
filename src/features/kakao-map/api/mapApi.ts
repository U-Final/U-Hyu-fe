import { client } from '@client/axiosClient';
import { MAP_ENDPOINTS } from './endpoints';
import type {
  GetNearbyStoresParams,
  GetStoreDetailParams,
  ToggleFavoriteParams,
  StoreDetailResponse,
  StoreListResponse,
  ToggleFavoriteResponseType,
} from './types';

/**
 * 개선된 Map API 함수들
 *
 * 주요 개선사항:
 * 1. Path parameter 올바른 처리
 * 2. HTTP 메서드별 적절한 데이터 전달 방식
 * 3. 타입 안전성 강화
 * 4. 에러 처리 고려
 */
export const mapApi = {
  /**
   * 주변 매장 목록 조회
   * GET /map/stores?lat=37.123&lng=127.456&radius=1000
   */
  getStoreList: async (
    params: GetNearbyStoresParams
  ): Promise<StoreListResponse> => {
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
