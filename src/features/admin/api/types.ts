// 기본 통계 응답 타입
export interface BrandStatDetail {
  brandName: string;
  sumBookmarksByBrand: number;
}

export interface MembershipBrandDetail {
  brandName: string;
  sumMembershipUsageByBrand: number;
}

export interface RecommendBrandDetail {
  brandName: string;
  sumRecommendationsByBrand: number;
}

// 즐겨찾기 통계
export interface BookmarkStat {
  categoryId: number;
  categoryName: string;
  sumStatisticsBookmarksByCategory: number;
  bookmarksByBrandList: BrandStatDetail[];
}

// 필터링 통계
export interface FilteringStat {
  categoryId: number;
  categoryName: string;
  sumStatisticsFilterByCategory: number;
}

// 추천 통계
export interface RecommendStat {
  categoryId: number;
  categoryName: string;
  sumStatisticsRecommendationByCategory: number;
  recommendationsByBrandList: RecommendBrandDetail[];
}

// 멤버십 통계
export interface MembershipStat {
  categoryId: number;
  categoryName: string;
  sumStatisticsMembershipUsageByCategory: number;
  membershipUsageByBrandList: MembershipBrandDetail[];
}

// 통합 카테고리 통계 (하위 호환성을 위해 유지)
export interface CategoryStat {
  categoryId: number;
  categoryName: string;
  sumStatisticsBookmarksByCategory?: number;
  sumStatisticsFilterByCategory?: number;
  sumStatisticsMembershipUsageByCategory?: number;
  bookmarksByBrandList?: BrandStatDetail[];
  membershipUsageByBrandList?: MembershipBrandDetail[];
}

// 전체 통계
export interface TotalStat {
  totalBookmark: number;
  totalFiltering: number;
  totalMembershipUsage: number;
}

export interface Category {
  categoryId: number;
  categoryName: string;
}

// 브랜드 관리 관련 타입
export interface AdminBrand {
  brandId: number;
  brandName: string;
  brandImg: string;
  categoryId: number;
  usageLimit: string;
  usageMethod: string;
  storeType: 'ONLINE' | 'OFFLINE';
  status: boolean; // 활성/비활성 여부
  data: BrandBenefit[];
}

export interface BrandBenefit {
  grade: string;
  description: string;
  benefitType: 'DISCOUNT' | 'GIFT';
}

// 탭 관련 타입
export interface Tab {
  key: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

export type TabKey = 'bookmark' | 'filtering' | 'recommendation' | 'membership' | 'total' | 'brands';

// 브랜드 생성/수정 요청 타입
export interface CreateBrandRequest {
  brandName: string;
  brandImg: string;
  categoryId: number;
  usageLimit: string;
  usageMethod: string;
  storeType: 'ONLINE' | 'OFFLINE';
  data: BrandBenefit[];
}

export interface UpdateBrandRequest {
  brandName?: string;
  brandImg?: string;
  categoryId?: number;
  usageLimit?: string;
  usageMethod?: string;
  storeType?: 'ONLINE' | 'OFFLINE';
  status?: boolean;
  data?: BrandBenefit[];
} 