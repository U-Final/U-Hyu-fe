import { client } from '@/shared/client';
import type { ApiResponse } from '@/shared/client/client.type';

import { MAP_ENDPOINTS } from './endpoints';
import type {
  CategoryBrandsResponse,
  GetCategoryBrandsParams,
  GetNearbyStoresParams,
  GetStoreDetailParams,
  StoreDetailResponse,
  StoreListResponse,
  StoreSummary,
  ToggleFavoriteParams,
  ToggleFavoriteResponseType,
} from './types';

/**
 * Map API 함수들
 * MSW가 활성화된 경우 자동으로 목 데이터를 사용합니다.
 */
export const mapApi = {
  /**
   * 주변 매장 목록 조회
   * GET /map/stores?lat=37.123&lon=127.456&radius=1000
   */
  getStoreList: async (
    params: GetNearbyStoresParams
  ): Promise<StoreListResponse> => {
    const response = await client.get<StoreListResponse>(
      MAP_ENDPOINTS.GET_NEARBY_STORES,
      {
        params,
      }
    );
    return response.data;
  },

  /**
   * 매장 상세 정보 조회
   * GET /map/detail/stores/123
   */
  getStoreDetail: async ({
    storeId,
  }: GetStoreDetailParams): Promise<StoreDetailResponse> => {
    const url = `${MAP_ENDPOINTS.GET_STORE_DETAIL}/${storeId}`;
    const response = await client.get<StoreDetailResponse>(url);
    return response.data;
  },

  /**
   * 매장 즐겨찾기 토글
   * POST /map/123
   */
  toggleFavorite: async ({
    storeId,
  }: ToggleFavoriteParams): Promise<ToggleFavoriteResponseType> => {
    const url = `${MAP_ENDPOINTS.TOGGLE_FAVORITE}/${storeId}`;
    const response = await client.post<ToggleFavoriteResponseType>(url);
    return response.data;
  },

  /**
   * 카테고리별 브랜드 목록 조회
   * GET /category/2
   */
  getCategoryBrands: async ({
    categoryId,
  }: GetCategoryBrandsParams): Promise<CategoryBrandsResponse> => {
    const url = `${MAP_ENDPOINTS.GET_CATEGORY_BRANDS}/${categoryId}`;
    const response = await client.get<CategoryBrandsResponse>(url);
    return response.data;
  },

    /**
   * 즐겨찾기 조회
   * GET map/stores/bookmark
   */
  getBookmark: async (): Promise<StoreSummary[]> => {
    const res = await client.get<ApiResponse<StoreSummary[]>>(
      MAP_ENDPOINTS.GET_BOOKMARK
    );
    return res.data.data ?? [];
  },
};

// 타입 가드 함수들 (런타임 안전성을 위한 추가 보안)
export const isValidStoreId = (storeId: unknown): storeId is number => {
  return typeof storeId === 'number' && storeId > 0;
};

export const isValidCoordinate = (coord: unknown): coord is number => {
  return typeof coord === 'number' && !isNaN(coord) && isFinite(coord);
};

export const isValidCategoryId = (
  categoryId: unknown
): categoryId is number => {
  return typeof categoryId === 'number' && categoryId > 0;
};
