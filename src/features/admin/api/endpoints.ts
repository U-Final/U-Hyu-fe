// 관리자 API 엔드포인트
export const ADMIN_ENDPOINTS = {
  // 통계 관련
  TOTAL_STATS: '/admin/statistics/total',
  BOOKMARK_STATS: '/admin/statistics/bookmark',
  FILTERING_STATS: '/admin/statistics/filter',
  RECOMMEND_STATS: '/admin/statistics/recommendation',
  MEMBERSHIP_STATS: '/admin/statistics/membershipUsage',
  
  // 브랜드 관리 관련
  BRAND_LIST: '/admin/brand',
  BRAND_CREATE: '/admin/brand',
  BRAND_UPDATE: (brandId: number) => `/admin/brands/${brandId}`,
  BRAND_DELETE: (brandId: number) => `/admin/brands/${brandId}`,
} as const;
