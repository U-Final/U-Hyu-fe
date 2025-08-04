// 기존 통계 관련 타입들
export interface TotalStats {
  totalBookmark: number;
  totalFiltering: number;
  totalMembershipUsage: number;
}

export interface BookmarkStat {
  categoryId: number;
  categoryName: string;
  sumStatisticsBookmarksByCategory: number;
  bookmarksByBrandList?: BrandStatDetail[];
}

export interface FilteringStat {
  categoryId: number;
  categoryName: string;
  sumStatisticsFilterByCategory: number;
}

export interface RecommendStat {
  categoryId: number;
  categoryName: string;
  sumStatisticsRecommendationByCategory: number;
  recommendationsByBrandList?: BrandStatDetail[];
}

export interface MembershipStat {
  categoryId: number;
  categoryName: string;
  sumStatisticsMembershipUsageByCategory: number;
  membershipUsageByBrandList?: MembershipBrandDetail[];
}

export interface BrandStatDetail {
  brandName: string;
  sumBookmarksByBrand?: number;
  sumRecommendationsByBrand?: number;
  sumMembershipUsageByBrand?: number;
}

export interface MembershipBrandDetail {
  brandName: string;
  sumMembershipUsageByBrand: number;
}

// 새로운 브랜드 관리 API 타입들
export interface AdminBrandBenefit {
  grade: 'VVIP' | 'VIP' | 'GOOD';
  description: string;
  benefitType: 'DISCOUNT' | 'POINT' | 'GIFT';
}

export interface AdminBrand {
  brandId: number;
  brandName: string;
  brandImg: string;
  data: AdminBrandBenefit[];
  categoryId: number;
  usageLimit: string;
  usageMethod: string;
  storeType: 'ONLINE' | 'OFFLINE';
}

export interface AdminBrandListResponse {
  brandList: AdminBrand[];
  hasNext: boolean;
  totalPages: number;
  currentPage: number;
}

export interface AdminBrandCreateRequest {
  brandName: string;
  brandImg: string;
  data: AdminBrandBenefit[];
  categoryId: number;
  usageLimit: string;
  usageMethod: string;
  storeType: 'ONLINE' | 'OFFLINE';
}

export interface AdminBrandUpdateRequest {
  brandName: string;
  brandImg: string;
  data: AdminBrandBenefit[];
  categoryId: number;
  usageLimit: string;
  usageMethod: string;
  storeType: 'ONLINE' | 'OFFLINE';
}

export interface AdminBrandCreateResponse {
  brandId: number;
}

export interface AdminBrandUpdateResponse {
  brandId: number;
}

export interface AdminBrandDeleteResponse {
  data: string;
} 