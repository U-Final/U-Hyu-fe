export const MAP_ENDPOINTS = {
  /** 주변 매장 목록 조회 */
  GET_NEARBY_STORES: '/map/stores',
  /** 매장 상세 정보 조회 */
  GET_STORE_DETAIL: '/map/stores',
  /** 매장 즐겨찾기 토글 */
  TOGGLE_FAVORITE: '/map/stores',
} as const;

export type MapEndpoint = (typeof MAP_ENDPOINTS)[keyof typeof MAP_ENDPOINTS];
