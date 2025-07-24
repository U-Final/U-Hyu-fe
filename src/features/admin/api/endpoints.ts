export const ADMIN_ENDPOINTS = {
  // 통계
  STAT_BOOKMARK: '/admin/statistics/bookmark',
  STAT_FILTERING: '/admin/statistics/filtering',
  STAT_SEARCH: '/admin/statistics/search',
  STAT_RECOMMEND: '/admin/statistics/recommend',
  STAT_MEMBERSHIP: '/admin/statistics/membership',
  STAT_TOTAL: '/admin/statistics/total',
  // 브랜드(제휴처) 관련 (추후 확장)
  BRAND_LIST: '/admin/brand-list',
  BRAND_DETAIL: (brandId: number) => `/admin/brand-list/${brandId}`,
  BRAND_CREATE: '/admin/brand',
  BRAND_UPDATE: (brandId: number) => `/admin/brands/${brandId}`,
  BRAND_DELETE: (brandId: number) => `/admin/brands/${brandId}`,
  CATEGORY_LIST: '/admin/categories',
};
