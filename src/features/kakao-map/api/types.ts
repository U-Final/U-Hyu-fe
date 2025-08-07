import type { ApiResponse } from '@/shared/client/client.type';

/**
 * 매장 혜택 정보 타입
 */

export enum GRADE {
  VIP = 'VIP',
  VVIP = 'VVIP',
  GOOD = '우수',
}

export interface StoreBenefit {
  grade: GRADE;
  benefitText: string;
}

/**
 * 매장 상세 정보 타입 
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
 * 매장 목록 정보 타입
 */
export interface StoreSummary {
  storeId: number;
  storeName: string;
  categoryName: string;
  addressDetail: string;
  benefit: string;
  logoImage: string;
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

/**
 * 카카오 키워드 검색 API 관련 타입들
 */

/**
 * 카카오 장소 검색 결과 개별 아이템
 */
export interface KakaoPlace {
  /** 장소 ID */
  id: string;
  /** 장소명 */
  place_name: string;
  /** 카테고리 이름 */
  category_name: string;
  /** 카테고리 그룹 코드 */
  category_group_code: string;
  /** 카테고리 그룹 이름 */
  category_group_name: string;
  /** 전화번호 */
  phone: string;
  /** 지번 주소 */
  address_name: string;
  /** 도로명 주소 */
  road_address_name: string;
  /** 경도 (longitude) */
  x: string;
  /** 위도 (latitude) */
  y: string;
  /** 장소 상세 페이지 URL */
  place_url: string;
  /** 중심좌표까지의 거리 (단위: meter) */
  distance: string;
}

/**
 * 카카오 키워드 검색 응답의 메타 정보
 */
export interface KakaoSearchMeta {
  /** 질의어의 지역 및 키워드 분석 정보 */
  same_name: {
    region: string[];
    keyword: string;
    selected_region: string;
  };
  /** 현재 페이지에서 노출 가능한 문서 수 */
  pageable_count: number;
  /** 전체 문서 수 */
  total_count: number;
  /** 현재 페이지가 마지막 페이지인지 여부 */
  is_end: boolean;
}

/**
 * 카카오 키워드 검색 API 응답
 */
export interface KakaoKeywordSearchResponse {
  meta: KakaoSearchMeta;
  documents: KakaoPlace[];
}

/**
 * 카카오 키워드 검색 옵션
 */
export interface KakaoKeywordSearchOptions {
  /** 키워드 필터링을 위한 카테고리 코드 */
  category_group_code?: string;
  /** 중심 좌표 (특정 지역을 기준으로 검색) */
  location?: { lat: number; lng: number };
  /** x 좌표 (경도) - location 값이 있으면 무시됨 */
  x?: number;
  /** y 좌표 (위도) - location 값이 있으면 무시됨 */
  y?: number;
  /** 중심 좌표로부터의 거리(반경) 필터링 값 (미터 단위, 기본값: 5000, 0~20000) */
  radius?: number;
  /** 검색할 사각형 영역 */
  bounds?: {
    sw: { lat: number; lng: number };
    ne: { lat: number; lng: number };
  };
  /** 사각 영역 문자열 (좌x,좌y,우x,우y) - bounds 값이 있으면 무시됨 */
  rect?: string;
  /** 한 페이지에 보여질 목록 개수 (기본값: 15, 1~15) */
  size?: number;
  /** 검색할 페이지 (기본값: 1, size 값에 따라 1~45) */
  page?: number;
  /** 정렬 옵션 ('ACCURACY' | 'DISTANCE') */
  sort?: 'ACCURACY' | 'DISTANCE';
  /** 지정한 Map 객체의 중심 좌표를 사용할지 여부 (기본값: false) */
  useMapCenter?: boolean;
  /** 지정한 Map 객체의 영역을 사용할지 여부 (기본값: false) */
  useMapBounds?: boolean;
}

/**
 * 내부적으로 사용할 정규화된 장소 정보
 */
export interface NormalizedPlace {
  id: string;
  name: string;
  category: string;
  categoryGroupCode?: string;
  address: string;
  roadAddress: string;
  phone: string;
  latitude: number;
  longitude: number;
  distance?: number;
  url: string;
}
