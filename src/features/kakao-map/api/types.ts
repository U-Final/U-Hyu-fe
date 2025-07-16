/**
 * 공통 API 응답 구조
 */
export interface BaseResponse<T> {
  statusCode: number;
  message: string;
  data: T;
}

/**
 * 매장 혜택 정보
 */
export interface StoreBenefit {
  grade: string;
  benefitText: string;
}

/**
 * 매장 상세 정보
 */
export interface StoreDetail {
  storeName: string;
  isFavorite: boolean;
  favoriteCount: number;
  benefits: StoreBenefit;
  usageLimit: string;
  usageMethod: string;
}

/**
 * 매장 목록 정보
 */
export interface StoreSummary {
  storeId: number;
  storeName: string;
  categoryName: string;
  addressDetail: string;
  benefit: string;
  logo_image: string;
  brandName: string;
  latitude: number;
  longitude: number;
}

/**
 * 즐겨찾기 토글 응답
 */
export interface ToggleFavoriteResponse {
  storeId: number;
  isBookmarked: boolean;
}

/**
 * API 응답 타입들
 */
export type StoreDetailResponse = BaseResponse<StoreDetail>;
export type StoreListResponse = BaseResponse<StoreSummary[]>;
export type ToggleFavoriteResponseType = BaseResponse<ToggleFavoriteResponse>;

/**
 * API 요청 파라미터 타입들
 */
export interface GetNearbyStoresParams {
  lat: number;
  lng: number;
  radius: number;
}

export interface GetStoreDetailParams {
  storeId: number;
}

export interface ToggleFavoriteParams {
  storeId: number;
}
