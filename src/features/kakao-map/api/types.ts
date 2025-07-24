import type { ApiResponse } from '@/shared/client/client.type';

/**
 * 매장 혜택 정보 타입
 */
export interface StoreBenefit {
  grade: string;
  benefitText: string;
}

/**
 * 매장 상세 정보 타입
 */
export interface StoreDetail {
  storeName: string;
  isFavorite: boolean;
  favoriteCount: number;
  benefits: string;
  usageLimit: string;
  usageMethod: string;
}

/**
 * 매장 목록 정보 타입
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
 * 즐겨찾기 토글 응답 타입
 */
export interface ToggleFavoriteResponse {
  storeId: number;
  isBookmarked: boolean;
}

/**
 * API 응답 래퍼 타입들
 */
export type StoreDetailResponse = ApiResponse<StoreDetail>;
export type StoreListResponse = ApiResponse<StoreSummary[]>;
export type ToggleFavoriteResponseType = ApiResponse<ToggleFavoriteResponse>;

/**
 * 주변 매장 조회 API 파라미터
 * GET /map/stores의 쿼리 파라미터와 매핑됨
 */
export interface GetNearbyStoresParams {
  /** 위도 (필수) */
  lat: number;
  /** 경도 (필수) */
  lon: number;
  /** 반경 (미터 단위, 필수) */
  radius: number;
  /** 카테고리 필터 (선택사항) */
  category?: string;
  /** 브랜드 필터 (선택사항) */
  brand?: string;
}

/**
 * 매장 상세 정보 조회 API 파라미터
 */
export interface GetStoreDetailParams {
  storeId: number;
}

/**
 * 즐겨찾기 토글 API 파라미터
 */
export interface ToggleFavoriteParams {
  storeId: number;
}

/**
 * 카테고리별 브랜드 정보 타입
 */
export interface CategoryBrand {
  brandId: number;
  brandName: string;
}

/**
 * 카테고리별 브랜드 조회 API 파라미터
 */
export interface GetCategoryBrandsParams {
  categoryId: number;
}

/**
 * 카테고리별 브랜드 조회 API 응답 타입
 */
export type CategoryBrandsResponse = ApiResponse<CategoryBrand[]>;
