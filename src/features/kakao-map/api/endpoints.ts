const MAP = '/map';

export const MAP_ENDPOINTS = {
  /** 주변 매장 목록 조회 */
  GET_NEARBY_STORES: `${MAP}/stores'`,
  /** 매장 상세 정보 조회 */
  GET_STORE_DETAIL: `${MAP}/detail/stores`,
  /** 매장 즐겨찾기 토글 */
  TOGGLE_FAVORITE: MAP,
  /** 카테고리별 브랜드 조회 */
  GET_CATEGORY_BRANDS: '/category',
  /** 즐겨찾기 조회 */
  GET_BOOKMARK: `${MAP}/stores/bookmark`,
} as const;

export type MapEndpoint = (typeof MAP_ENDPOINTS)[keyof typeof MAP_ENDPOINTS];
