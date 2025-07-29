export const ADMIN_ENDPOINTS = {
  // 통계
  STAT_BOOKMARK: '/admin/statistics/bookmark',
  STAT_FILTERING: '/admin/statistics/filter',

  STAT_RECOMMEND: '/admin/statistics/recommendation',
  STAT_MEMBERSHIP: '/admin/statistics/membership',
  STAT_TOTAL: '/admin/statistics/total',
  // 브랜드(제휴처) 관련
  CATEGORY_LIST: '/admin/categories',
  BRAND_LIST: '/admin/brands',
  BRAND_CREATE: '/admin/brand',
  BRAND_UPDATE: (brandId: number) => `/admin/brands/${brandId}`,
  BRAND_DELETE: (brandId: number) => `/admin/brands/${brandId}`,
};
