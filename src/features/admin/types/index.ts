// 관리자 통계 관련 타입
export interface BrandStatDetail {
  brandName: string;
  sumBookmarksByBrand: number;
}

export interface CategoryStat {
  categoryId: number;
  categoryName: string;
  sumStatisticsBookmarksByCategory?: number;
  sumStatisticsFilterByCategory?: number;
  sumStatisticsMembershipUsageByCategory?: number;
  bookmarksByBrandList?: BrandStatDetail[];
}

export interface TotalStat {
  totalBookmark: number;
  totalFiltering: number;
  totalMembershipUsage: number;
}

export interface RecommendStat {
  categoryId: number;
  categoryName: string;
  sumStatisticsRecommendByCategory: number;
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
